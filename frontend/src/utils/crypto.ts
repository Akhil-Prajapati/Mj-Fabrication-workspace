// Simple crypto util for demonstration. Replace with real encryption in production.

export const e = async (data: object): Promise<string> => {
  // For demo: just base64 encode the JSON string
  return btoa(JSON.stringify(data));
};

export const d = async (data: string): Promise<string> => {
  // For demo: just base64 decode
  return atob(data);
};
