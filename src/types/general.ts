export interface __PaginationType<T> {
  num_of_pages: number;
  count: number;
  data: T[];
}

export type __ResponseType<T> = __SuccessResponseType<T> | __FailResponseType;

export interface __SuccessResponseType<T> {
  data: T;
  statusCode: number;
  result: "success";
  message: string;
}

export interface __FailResponseType {
  data: any;
  statusCode: number;
  result: "failed";
  message: string;
  errorStatus:
    | "unauthorized"
    | "notFound"
    | "badRequest"
    | "internalServerError"
    | "permissionDenied"
    | "tooManyRequests"
    | "unsupportedMediaType"
    | "serviceUnavailable"
    | "gatewayTimeout"
    | "badGateway"
    | "methodNotAllowed"
    | "payloadTooLarge"
    | "networkError";
}

export type __ErrorResponseType<T> = {
  data: T | null;
  status: number;
};

export enum __ServerHeadersEnum {
  lang = "power-grid-website-lang",
  path = "power-grid-website-path",
  url = "power-grid-website-url",
}

export enum __CookiesEnum {
  accessToken = "PowerGridAccessToken",
}

export enum __BPEnum {
  XS = 391,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}
export interface __JWTTokenType {
  access: string;
  refresh: string;
  // expire_date: string;
}

export interface __NetworkLogType {
  id: string;
  url?: string;
  method?: string;
  body?: any;
  response?: string;
  start?: number;
  end?: number;
  revalidation?: number;
  goastMode?: boolean;
  statusCode?: number;
  responseHeaders?: string;
  description?: string;
  setedHeaders?: string;
}
