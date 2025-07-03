import { CookiesEnum, ProfileType } from "types";
import { cookies } from "next/headers";
import { ServerCall } from "./index";
import { API } from "data";

export async function __getUser(): Promise<ProfileType | undefined> {
  try {
    const cookieStore = await cookies();
    const access = await cookieStore.get(CookiesEnum.accessToken);

    if (!access?.value) {
      return undefined;
    }

    const res = await ServerCall.get<{ user: ProfileType }>(API.auth.profile, {
      revalidate: 0,
    });

    if (res.result === "success") {
      return res.data.user;
    } else {
      return undefined;
    }
  } catch (_err) {
    console.log("Profile Request Error:", _err);
    return undefined;
  }
}
