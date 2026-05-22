export function saveAuthSession(data: any) {
  localStorage.setItem("intern_alley_token", data.accessToken);
  localStorage.setItem("intern_alley_user", JSON.stringify(data.user));
}

export function getToken() {
  return localStorage.getItem("intern_alley_token");
}

export function getUser() {
  return JSON.parse(localStorage.getItem("intern_alley_user") || "null");
}

export function clearAuthSession() {
  localStorage.removeItem("intern_alley_token");
  localStorage.removeItem("intern_alley_user");
}