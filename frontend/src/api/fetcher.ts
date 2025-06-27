import ky, { HTTPError } from "ky";
import nProgress from "nprogress";
import { e, d } from "@/utils/crypto";

// Placeholder for fingerprint util (replace with your actual implementation)
const getFingerprint = () => "dev-fingerprint";

// Remove token utils for cookie-based auth
// const getToken = () => localStorage.getItem("token") || "";
const destroySession = () => localStorage.removeItem("token");

interface FetcherProps {
  path: string;
  shouldEncrypt?: boolean;
  shouldDecrypt?: boolean;
  shouldShowLoader?: boolean;
}

interface JsonResult {
  message: string;
  error: string;
}

// Use correct env variable name for API base URL
export const BASE_URL = import.meta.env.VITE_API_URL;

function joinUrl(base: string, path: string) {
  if (!base.endsWith("/")) base += "/";
  if (path.startsWith("/")) path = path.slice(1);
  // Remove duplicate api/v1 if present
  if (base.endsWith("api/v1/") && path.startsWith("api/v1/")) {
    path = path.replace(/^api\/v1\//, "");
  }
  return base + path;
}

export const gisHeaders = async () => ({
  fp: getFingerprint(),
  ...(!import.meta.env.PROD && {
    "allow-gis": "%?Y?_TYqc2QM7^p4t#>c",
  }),
});

export const fetchGis = async (
  url: string,
  kyOptions?: Parameters<typeof ky>[1]
) => ky.get(url, { headers: await gisHeaders(), credentials: "include" });

export const fetcher = async (
  {
    path,
    shouldEncrypt = true,
    shouldDecrypt = true,
    shouldShowLoader = true,
  }: FetcherProps,
  kyOptions: Parameters<typeof ky>[1] = {}
) => {
  if (shouldEncrypt && kyOptions.json) {
    kyOptions.json = {
      data: await e(kyOptions.json as object),
    };
  }
  let json: JsonResult | undefined;
  try {
    if (shouldShowLoader) {
      nProgress.start();
    }
    json = await ky(joinUrl(BASE_URL, path), {
      method: kyOptions.method ?? "POST",
      headers: {
        ...kyOptions.headers,
        fp: getFingerprint(),
      },
      timeout: false,
      credentials: "include",
      ...kyOptions,
    }).json<JsonResult>();
  } catch (err) {
    if (kyOptions.signal?.aborted) {
      return null;
    }
    if (err instanceof HTTPError) {
      const { response } = err;
      if (response.status === 401) {
        destroySession();
        return null;
      } else if (response.status >= 400 && response.status <= 500) {
        return await response.json();
      } else {
        return {};
      }
    } else {
      console.error(err);
      return {};
    }
  } finally {
    if (shouldShowLoader) {
      nProgress.done();
    }
  }
  if (!shouldDecrypt) {
    return json;
  }
  // Try to decrypt, but if fails, fallback to plain JSON
  try {
    const encJsonString = json?.message;
    const decJsonString = await d(encJsonString!);
    const decJson = JSON.parse(decJsonString);
    return decJson;
  } catch (err) {
    // If decryption or parsing fails, assume backend returned plain JSON
    return json;
  }
};

/**
 * Call any backend API with encryption/decryption and loader support.
 * @example
 *   await fetcher(
 *     { path: "/notification/send-notification-deputist" },
 *     {
 *       json: {
 *         filter: { deputistIds: selectedCheckBoxArray },
 *         data: {
 *           title: `Assign ${notificationTitle} To deputationists`,
 *           message: `Grievance ${grievanceId} Assigned to you successfully`,
 *         },
 *       },
 *     }
 *   );
 */

// Example: Authenticated API call using fetcher
export const fetchUserProfile = async () => {
  // This will POST to /api/user/profile with encryption and decryption enabled
  return fetcher(
    {
      path: "/api/user/profile",
      shouldEncrypt: true,
      shouldDecrypt: true,
      shouldShowLoader: true,
    },
    {
      method: "POST",
      json: {
        /* any request body if needed */
      },
    }
  );
};

// Example: Login API call (no encryption on request, but decrypt response)
export const login = async (username: string, password: string) => {
  try {
    return await fetcher(
      {
        path: "auth/login", // Remove leading /api or /api/v1
        shouldEncrypt: false,
        shouldDecrypt: true,
        shouldShowLoader: true,
      },
      {
        method: "POST",
        json: { username, password },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed", details: error };
  }
};
