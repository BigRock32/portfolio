"use server";

import { redirect } from "next/navigation";
import { createAdminSession, verifyAdminPassword } from "@/lib/admin-auth";

export async function loginAdmin(formData: FormData) {
   const password = String(formData.get("password") ?? "");

   if (!verifyAdminPassword(password)) {
      redirect("/admin/login?error=invalid");
   }

   await createAdminSession();

   redirect("/admin/projects");
}