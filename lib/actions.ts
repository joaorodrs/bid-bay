"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { db } from "./database";

export async function authenticate(body: string) {
  const parsedBody: User = JSON.parse(body);

  await db.$connect();

  const newUser = await db.user.create({
    data: {
      name: parsedBody.name,
      email: parsedBody.email,
    },
  });

  cookies().set("currentUser", JSON.stringify(newUser));
  await db.$disconnect();

  redirect("/");
}

export async function register(body: string) {
  const parsedBody: User = JSON.parse(body);

  await db.$connect();

  await db.user.create({
    data: {
      name: parsedBody.name,
      email: parsedBody.email,
    },
  });

  await db.$disconnect();

  redirect("/login");
}
