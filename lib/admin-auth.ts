import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const ADMIN_COOKIE_NAME = "admin_session";

function getAdminPassword() {
   const password = process.env.ADMIN_PASSWORD;

   if (!password) {
      throw new Error("Missing ADMIN_PASSWORD.");
   }

   return password;
}

function getCookieSecret() {
   const secret = process.env.ADMIN_COOKIE_SECRET;

   if (!secret) {
      throw new Error("Missing ADMIN_COOKIE_SECRET.");
   }

   return secret;
}

function sign(value: string) {
   return createHmac("sha256", getCookieSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
   const first = Buffer.from(a);
   const second = Buffer.from(b);

   if (first.length !== second.length) {
      return false;
   }

   return timingSafeEqual(first, second);
}

export function verifyAdminPassword(password: string) {
   return safeEqual(password, getAdminPassword());
}

export async function createAdminSession() {
   const value = "admin";
   const signature = sign(value);

   const cookieStore = await cookies();

   cookieStore.set(ADMIN_COOKIE_NAME, `${value}.${signature}`, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
   });
}

export async function destroyAdminSession() {
   const cookieStore = await cookies();

   cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
   const cookieStore = await cookies();
   const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

   if (!cookie) {
      return false;
   }

   const [value, signature] = cookie.split(".");

   if (!value || !signature) {
      return false;
   }

   return value === "admin" && safeEqual(signature, sign(value));
}