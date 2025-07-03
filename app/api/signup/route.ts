import { cookies } from "next/headers";
import { __CookiesEnum } from "types/general";
import { ServerCall } from "../../_lib/serverCall";
import { __FailServercallType } from "../../_lib/type";

interface SignupResponse {
  status: string;
  message: string;
  tokens: {
    access: string;
    refresh: string;
  };
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    if (!process.env.NEXT_PUBLIC_BACKEND_BASE_URL) {
      return Response.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }
    const res = await ServerCall.post<SignupResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/usr/auth/register/`,
      formData,
      { revalidate: 0 },
    );
    if (res.result === "success" && res.data?.status === "success") {
      const cookieStore = await cookies();
      cookieStore.set(__CookiesEnum.accessToken, res.data.tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      return Response.json(res.data);
    } else {
      const errorResponse = (res as unknown as __FailServercallType)
        .response || { error: "Signup failed" };
      return Response.json(errorResponse, { status: 400 });
    }
  } catch (_error) {
    console.log(_error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
