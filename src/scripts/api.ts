import { FailResponseType, SuccessResponseType } from "../types/index";
export const SERVER = process.env.NEXT_PUBLIC_API_URL;

interface Config {
  url: string;
  method: string;
  body?: any;
  headers: any;
  successMessage?: string;
  errorMessage?: string;
}
class APIPromise<T> {
  private config: Config;
  private onThen: (response: SuccessResponseType<T>) => void = () => {};
  private onCatch: (response: FailResponseType) => void = () => {};
  private onFinally: () => void = () => {};

  constructor(config: Config) {
    this.config = config;
    fetch(this.config.url, {
      method: this.config.method,
      body: this.config.body,
      headers: this.config.headers,
    }).then((response) => {
      response
        .json()
        .then((json) => {
          this.handler(response.status, json);
        })
        .catch(() => {
          response
            .text()
            .then((text) => {
              this.handler(response.status, text);
            })
            .catch(() => {
              this.handler(response.status, null);
            });
        });
    });
  }

  private handler(statusCode: number, data: any) {
    if (statusCode >= 200 && statusCode < 300)
      this.onThen({
        data,
        statusCode,
        result: "success",
        message: this.config.successMessage || "Operation succeeded",
      });
    else {
      const response: FailResponseType = {
        data,
        statusCode,
        result: "failed",
        errorStatus: "networkError",
        message: this.config.errorMessage || "Operation failed",
      };
      if (statusCode === 400) response.errorStatus = "badRequest";
      else if (statusCode === 401) response.errorStatus = "unauthorized";
      else if (statusCode === 403) response.errorStatus = "permissionDenied";
      else if (statusCode === 404) response.errorStatus = "notFound";
      else if (statusCode === 405) response.errorStatus = "methodNotAllowed";
      else if (statusCode === 413) response.errorStatus = "payloadTooLarge";
      else if (statusCode === 429) response.errorStatus = "tooManyRequests";
      else if (statusCode === 500) response.errorStatus = "internalServerError";
      else if (statusCode === 503) response.errorStatus = "serviceUnavailable";
      else if (statusCode === 504) response.errorStatus = "gatewayTimeout";
      else if (statusCode === 502) response.errorStatus = "badGateway";
      this.onCatch(response);
    }
    this.onFinally();
  }

  public then(onThen: (response: SuccessResponseType<T>) => void) {
    this.onThen = onThen;
    return this;
  }

  public catch(onCatch: (response: FailResponseType) => void) {
    this.onCatch = onCatch;
    return this;
  }

  public finally(onFinally: () => void) {
    this.onFinally = onFinally;
    return this;
  }
}

// add authentication headers to other headers
function generateHeader(
  goastMode: boolean = false,
  contentType: string = "application/json",
): any {
  const header: { [k: string]: any } = {};
  if (!goastMode) {
    // Get token from cookie
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("PowerGridAccessToken="),
    );
    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      header["Authorization"] = "Bearer " + token;
    }
  }
  if (contentType.length) header["Content-Type"] = contentType;
  return header;
}

// put request
function put<R>(
  url: string,
  body: any,
  options?: { goastMode?: boolean },
): APIPromise<R> {
  return new APIPromise({
    url,
    method: "PUT",
    body: JSON.stringify(body),
    headers: generateHeader(options?.goastMode, "application/json"),
  });
}

// patch request
function patch<R>(
  url: string,
  body: any,
  options?: { goastMode?: boolean },
): APIPromise<R> {
  return new APIPromise({
    url,
    method: "PATCH",
    body: JSON.stringify(body),
    headers: generateHeader(options?.goastMode, "application/json"),
  });
}

// get request
function get<R>(
  url: string,
  options?: { goastMode?: boolean; params: { [k: string]: any } },
): APIPromise<R> {
  const generatedUrl = new URL(url);
  // add query parameters like filters or pagination parameters
  Object.keys(options?.params ?? {}).forEach((key) => {
    if (options?.params?.[key] !== undefined)
      generatedUrl.searchParams.append(key, options?.params?.[key]);
  });
  return new APIPromise({
    url: generatedUrl.href,
    method: "GET",
    headers: generateHeader(options?.goastMode),
  });
}

// export function upload<R>(
//     URL: string,
//     body: any,
//     onProgress?: (progress: number) => void,
//     getControl?: (request: XMLHttpRequest) => void,
// ): Promise<ResponseType<R>> {
//     // let abort: any;
//     const formData = new FormData();
//     const keys = Object.keys(body);
//     for (let i = 0; i < keys.length; i++) formData.set(keys[i], body[keys[i]]);
//     return new Promise((resolve, reject) => {
//         const request = new XMLHttpRequest();
//         if (getControl) getControl(request);
//         // abort = request.abort;
//         request.upload.addEventListener('progress', function (e) {
//             if (onProgress) onProgress(e.loaded);
//         });
//         request.open('post', URL);
//         request.onload = function () {
//             if (request.readyState == XMLHttpRequest.DONE)
//                 resolve({
//                     status: request.status,
//                     data: JSON.parse(request.responseText),
//                 });
//             else reject({ status: request.status, data: null });
//         };
//         request.onerror = () => reject({ status: request.status, data: null });
//         const token = AppStorage.authToken.get();
//         if (token) request.setRequestHeader('Authorization', 'Bearer ' + token.access);
//         request.timeout = 45000;
//         request.send(formData);
//     });
// }

export const __RestAPI = {
  get,
  put,
  patch,
  // upload,
};
