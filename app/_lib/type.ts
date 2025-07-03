export interface __SuccessServercallType<T> {
  data: T;
  statusCode: number;
  result: "success";
}

export interface __FailServercallType {
  data: null;
  statusCode: number;
  result: "failed";
  response?: any;
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

export type ServercallResponseType<T> =
  | __SuccessServercallType<T>
  | __FailServercallType;
