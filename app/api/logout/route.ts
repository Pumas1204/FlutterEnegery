import { CookiesEnum } from "types";
import { cookies } from "next/headers";
import { ServerCall } from "../../_lib";

export async function POST() {
  const res = await handler();
  return res;
}

function handler() {
  return new Promise<Response>((resolve) => {
    ServerCall.post("", {}, { revalidate: 0 })
      .then(async () => {
        cookies().then((instance) => {
          instance.delete(CookiesEnum.accessToken);
          resolve(Response.json({}));
        });
      })
      .catch((e) => resolve(Response.json(e.data, { status: 400 })));
  });
}
