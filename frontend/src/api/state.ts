// src/api/state.ts
import { fetcher } from "@/api/fetcher";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export const getStates = async () => {
  const data = await fetcher({ path: "/api/v1/states" }, { method: "GET" });
  // Support both array and object response
  if (Array.isArray(data)) return data;
  if (data?.states && Array.isArray(data.states)) return data.states;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
};

export const getStateByCode = async (stateCode: string) => {
  return fetcher({ path: `/api/v1/states/${stateCode}` }, { method: "GET" });
};

export const createState = async (data: any) => {
  const res = await fetch(`${API_BASE}/states`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create state");
  return res.json();
};

export const updateState = async (stateCode: string, data: any) => {
  const res = await fetch(`${API_BASE}/states/${stateCode}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update state");
  return res.json();
};

export const deleteState = async (stateCode: string) => {
  const res = await fetch(`${API_BASE}/states/${stateCode}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete state");
  return res.json();
};
