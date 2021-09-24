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

export default { get };
