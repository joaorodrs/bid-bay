"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { db } from "./database";
import { comparePasswords, hashPassword } from "./auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { isRedirectError } from "next/dist/client/components/redirect";

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

  try {
    await db.user.create({
      data: {
        name: parsedBody.name,
        email: parsedBody.email,
        password: await hashPassword(parsedBody.password),
      },
    });
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new Error("user already registered in");
      }

      throw new Error(err.message);
    }
  }

  await db.$disconnect();

  redirect("/auth/login");
}

export async function getPosts() {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        published: "asc",
      },
      select: {
        id: true,
        title: true,
        published: true,
        content: true,
        description: true,
      },
    });

    return posts;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw new Error(err.message);
    }
  }

  await db.$disconnect();
}

export async function createPost(body: string) {
  const parsedBody = JSON.parse(body);
  const currentUser = cookies().get("currentUser");

  const user: User | undefined = currentUser
    ? JSON.parse(currentUser?.value)
    : undefined;

  try {
    await db.post.create({
      data: {
        ...parsedBody,
        authorId: user?.id,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw new Error(err.message);
    }
  }

  await db.$disconnect();

  redirect("/");
}
