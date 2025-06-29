import { fetcher } from "@/api/fetcher";

// Fetch dashboard analytics for a given period
// Accepts { month, year } object
export const fetchDashboardStats = async ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  const url = `/api/v1/dashboard?month=${month}&year=${year}`;
  return fetcher(
    {
      path: url,
      shouldEncrypt: false,
      shouldDecrypt: true,
      shouldShowLoader: true,
    },
    {
      method: "GET",
    }
  );
};

// Download GSTR-1 JSON for a given period
export const downloadGSTR1 = async ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  const url = `/api/v1/gstr1?month=${month}&year=${year}`;
  return fetcher(
    {
      path: url,
      shouldEncrypt: false,
      shouldDecrypt: true,
      shouldShowLoader: true,
    },
    {
      method: "GET",
    }
  );
};
