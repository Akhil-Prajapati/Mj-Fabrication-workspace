// Session helpers for token and fingerprint
export function getToken(): string | null {
  return sessionStorage.getItem("token");
}

export function getFingerprint(): string | null {
  // Example: use a static or generated fingerprint for demo
  let fp = sessionStorage.getItem("fingerprint");
  if (!fp) {
    fp = Math.random().toString(36).substring(2) + Date.now();
    sessionStorage.setItem("fingerprint", fp);
  }
  return fp;
}
