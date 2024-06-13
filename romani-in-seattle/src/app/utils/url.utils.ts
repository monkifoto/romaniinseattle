export function formatUrl(url: string): string {
  if (!url) {
    return '';
  }

  // Check if the URL already starts with http:// or https://
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }

  return url;
}
