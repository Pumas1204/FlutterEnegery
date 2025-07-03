import axios, { Method } from "axios";
import { CookiesEnum } from "types";
import { cookies } from "next/headers";

async function generateHeader(
  goastMode: boolean = false,
): Promise<Record<string, string>> {
  const header: Record<string, string> = { "Content-Type": "application/json" };
  if (goastMode) return header;
  try {
    const cookieStore = await cookies();
    const access = cookieStore.get(CookiesEnum.accessToken);
    if (access?.value) {
      header["Authorization"] = "Bearer " + access.value;
    }
  } catch (err) {
    console.error("Error getting cookies:", err);
  }
  return header;
}

async function request<T>(
  method: Method,
  url: string,
  data?: any,
  options?: { goastMode?: boolean; revalidate?: number; params?: any },
): Promise<{ data: T; status: number; result: "success" | "failed" }> {
  try {
    const headers = await generateHeader(options?.goastMode);
    const response = await axios({
      method,
      url,
      headers,
      data,
      params: options?.params,
    });

    return {
      data: response.data,
      status: response.status,
      result: "success",
    };
  } catch (error: any) {
    return {
      data: error.response?.data || null,
      status: error.response?.status || 500,
      result: "failed",
    };
  }
}

export const ServerCall = {
  get: <T>(
    url: string,
    options?: { goastMode?: boolean; revalidate?: number; params?: any },
  ) => request<T>("GET", url, undefined, options),
  post: <T>(
    url: string,
    data?: any,
    options?: { goastMode?: boolean; revalidate?: number; params?: any },
  ) => request<T>("POST", url, data, options),
  put: <T>(
    url: string,
    data?: any,
    options?: { goastMode?: boolean; revalidate?: number; params?: any },
  ) => request<T>("PUT", url, data, options),
  patch: <T>(
    url: string,
    data?: any,
    options?: { goastMode?: boolean; revalidate?: number; params?: any },
  ) => request<T>("PATCH", url, data, options),
  delete: <T>(
    url: string,
    options?: { goastMode?: boolean; revalidate?: number; params?: any },
  ) => request<T>("DELETE", url, undefined, options),
};
