import { fetcher } from "./fetcher";

export async function fetchInvoiceById(id: string) {
  return fetcher(
    {
      path: `/api/v1/invoices/${id}`,
      shouldEncrypt: false,
      shouldDecrypt: true,
    },
    { method: "GET" }
  );
}
