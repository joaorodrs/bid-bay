"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { db } from "./database";
import { comparePasswords, hashPassword } from "./auth";

export async function authenticate(body: string) {
  const parsedLogin: User = JSON.parse(body);

  const user = await db.user.findUnique({
    where: {
      email: parsedLogin.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
    },
  });

  await db.$disconnect();

  if (!user) throw new Error("user not found, check your credentials");

  const match = await comparePasswords(user.password, parsedLogin.password);

  if (!match) throw new Error("invalid credentials");

  cookies().set("currentUser", JSON.stringify(user));

  redirect("/");
}

export async function register(body: string) {
  const parsedBody: User = JSON.parse(body);

  await db.$connect();

  await db.user.create({
    data: {
      name: parsedBody.name,
      email: parsedBody.email,
      password: await hashPassword(parsedBody.password),
    },
  });

  await db.$disconnect();

  redirect("/auth/login");
}
