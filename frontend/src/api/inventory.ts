import { fetcher } from "./fetcher";

export async function createInventoryItem(item) {
  console.log(item);

  return fetcher(
    { path: "/api/v1/inventory" },
    {
      method: "POST",
      json: item,
    }
  );
}

export async function getInventoryItems() {
  return fetcher({ path: "/api/v1/inventory" }, { method: "GET" });
}

export async function updateInventoryItem(itemId, item) {
  return fetcher(
    { path: `/api/v1/inventory/${itemId}` },
    {
      method: "PUT",
      json: item,
    }
  );
}

export async function deleteInventoryItem(itemId) {
  try {
    return await fetcher(
      { path: `/api/v1/inventory/${itemId}` },
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
}
