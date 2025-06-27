import { fetcher } from "./fetcher";

export async function fetchInvoices() {
  return fetcher(
    {
      path: "/api/v1/invoices",
      shouldEncrypt: false,
      shouldDecrypt: true,
    },
    { method: "GET" }
  );
}
