export function saveToken(token: string) {
  localStorage.setItem("intern_token", token);
}

export function getToken() {
  return localStorage.getItem("intern_token");
}

export function logout() {
  localStorage.removeItem("intern_token");
}