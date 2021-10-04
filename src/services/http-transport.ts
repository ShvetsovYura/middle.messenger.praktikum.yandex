enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type TRequestData = Record<string, string | number>;

type TRequestOptions = {
  method?: METHODS;
  headers?: Record<string, string>;
  timeout?: number;
  data?: unknown;
};

function queryStringify(data: TRequestData) {
  if (!data) return '';
  return Object.keys(data).reduce(
    (acc: string, key: string, index: number, arr: any[]) =>
      `${acc}${key}=${data[key]}${index < arr.length - 1 ? '&' : ''}`,
    '?',
  );
}

export default class HTTPTransport {
  get(url: string, options = {}) {
    return this.request(url, {
      ...options,
      method: METHODS.GET,
    });
  }

  post(url: string, options = {}) {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  put(url: string, options = {}) {
    return this.request(url, {
      ...options,
      method: METHODS.PUT,
    });
  }

  patch(url: string, options = {}) {
    this.request(url, {
      ...options,
      method: METHODS.PATCH,
    });
  }

  delete(url: string, options = {}) {
    return this.request(url, {
      ...options,
      method: METHODS.DELETE,
    });
  }

  request(url: string, options: TRequestOptions) {
    const { method = METHODS.GET, headers = {}, data, timeout = 5000 } = options;

    const defaultHeaders = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    const mergedHeaders: Record<string, string> = {
      ...defaultHeaders,
      ...headers,
    };

    let query: string;
    if (method === METHODS.GET) {
      query = queryStringify(data as TRequestData);
    } else {
      query = '';
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url + query);
      xhr.withCredentials = true;
      Object.keys(mergedHeaders).forEach((key: string) => {
        xhr.setRequestHeader(key, mergedHeaders[key]);
      });

      xhr.onload = () => {
        let jsonResponse = {};
        try {
          jsonResponse = JSON.parse(xhr.response);
        } catch (e) {}
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(jsonResponse);
        } else {
          reject(jsonResponse);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
