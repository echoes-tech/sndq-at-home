import { format } from "date-fns";

export function formatDate(dateString: string, formatString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, formatString);
}

export function urlParseParams(objectParse: Record<string, string> = {}) {
  const str = [];
  for (const p in objectParse)
    if (objectParse.hasOwnProperty(p)) {
      if (objectParse[p]) {
        str.push(
          encodeURIComponent(p) + "=" + encodeURIComponent(objectParse[p])
        );
      }
    }
  return str.join("&");
}
