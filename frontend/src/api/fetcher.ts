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

// Auto-refresh token on 401 errors
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

const refreshToken = async (): Promise<boolean> => {
  try {
    const response = await ky.post(joinUrl(BASE_URL, "auth/refresh"), {
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

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

  const makeRequest = async (): Promise<JsonResult> => {
    return await ky(joinUrl(BASE_URL, path), {
      method: kyOptions.method ?? "POST",
      headers: {
        ...kyOptions.headers,
        fp: getFingerprint(),
      },
      timeout: false,
      credentials: "include",
      ...kyOptions,
    }).json<JsonResult>();
  };

  try {
    if (shouldShowLoader) {
      nProgress.start();
    }

    json = await makeRequest();
  } catch (err) {
    if (kyOptions.signal?.aborted) {
      return null;
    }

    if (err instanceof HTTPError) {
      const { response } = err;

      if (response.status === 401) {
        // Check if it's a token expiration error
        const errorData = await response.json().catch(() => ({}));

        if (errorData.code === "TOKEN_EXPIRED" && !isRefreshing) {
          isRefreshing = true;

          try {
            const refreshSuccess = await refreshToken();

            if (refreshSuccess) {
              processQueue(null);
              isRefreshing = false;

              // Retry the original request
              try {
                json = await makeRequest();
              } catch (retryErr) {
                if (
                  retryErr instanceof HTTPError &&
                  retryErr.response.status === 401
                ) {
                  destroySession();
                  window.location.href = "/admin";
                }
                throw retryErr;
              }
            } else {
              processQueue(new Error("Token refresh failed"));
              isRefreshing = false;
              destroySession();
              window.location.href = "/admin";
              return null;
            }
          } catch (refreshError) {
            processQueue(refreshError);
            isRefreshing = false;
            destroySession();
            window.location.href = "/admin";
            return null;
          }
        } else if (isRefreshing) {
          // If a refresh is already in progress, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => {
            return makeRequest();
          });
        } else {
          destroySession();
          window.location.href = "/admin";
          return null;
        }
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

// Manual token refresh utility
export const manualRefreshToken = async (): Promise<boolean> => {
  try {
    const response = await ky.post(joinUrl(BASE_URL, "auth/refresh"), {
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    console.error("Manual token refresh failed:", error);
    return false;
  }
};

// Check token validity
export const verifyToken = async (): Promise<boolean> => {
  try {
    const response = await ky.post(joinUrl(BASE_URL, "auth/verify"), {
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    return false;
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
