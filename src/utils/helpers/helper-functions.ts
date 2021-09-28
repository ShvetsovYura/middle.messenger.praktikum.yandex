function get(obj: Record<string, any>, path: string, defaultValue?: string | number | null): any {
  const keys = path.split('.');
  let result: Record<string, any> = obj;

  for (const key of keys) {
    result = result[key];

    if (typeof result === 'undefined') {
      return defaultValue;
    }
  }

  return result;
}

export function sanitize(str: string) {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/gi;
  return str.replace(reg, (match) => map[match]);
}

export default { get };
