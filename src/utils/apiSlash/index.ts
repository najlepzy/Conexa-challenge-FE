export function apiSlash(url: string): string {
  return url.endsWith("/") ? url : `${url}/`;
}