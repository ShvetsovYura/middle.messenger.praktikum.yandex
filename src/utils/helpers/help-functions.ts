type PlainObject<T = any> = {
  [k in string]: T;
};

type Indexed<T = unknown> = {
  [key in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') throw new Error('path must be string');
  if (object.constructor !== Object) return object;
  const res = path.split('.').reduceRight((acc: any, cur: any) => {
    if (Object.keys(acc).length === 0) {
      acc = { [cur]: value };
    } else {
      acc = { [cur]: acc };
    }
    return acc;
  }, {});
  return merge(object as Indexed, res);
}

function trim(input: string, symbols?: string): string {
  if (input && !symbols) {
    return input.trim();
  }

  const rx = new RegExp(`[${symbols}]`, 'gi');
  return input.replace(rx, '');
}

function sanitize(str: string) {
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

export default {
  isEqual,
  merge,
  set,
  isPlainObject,
  isArray,
  isArrayOrObject,
  trim,
  sanitize,
  get,
};
