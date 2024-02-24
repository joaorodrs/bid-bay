"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(body: string) {
  cookies().set("currentUser", body);

  redirect("/");
}
