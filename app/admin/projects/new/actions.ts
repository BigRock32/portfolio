"use server";

import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

import {
   getNullableDate,
   getNullableText,
   getNumber,
   getProjectImageUrl,
   getStack,
   requireText,
   getText
} from "@/lib/admin-project-form";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
   if (!(await isAdminAuthenticated())) {
      redirect("/admin/login");
   }

   const supabase = createSupabaseAdminClient();

   const imageUrl = await getProjectImageUrl(formData);

   if (!imageUrl) {
      throw new Error("Image is required.");
   }

   const { data, error } = await supabase
      .from("projects")
      .insert({
         slug: requireText(formData, "slug", "Slug"),
         title: requireText(formData, "title", "Title"),
         summary: getText(formData, "summary"),
         description: requireText(formData, "description", "Description"),
         role: getText(formData, "role"),
         url: getNullableText(formData, "url"),
         image_url: imageUrl,
         stack: getStack(formData),
         og_title: getNullableText(formData, "og_title"),
         og_description: getNullableText(formData, "og_description"),
         og_image: getNullableText(formData, "og_image"),
         og_url: getNullableText(formData, "og_url"),
         published_date: getNullableDate(formData, "published_date"),
         sort_order: getNumber(formData, "sort_order"),
         category: getText(formData, "category"),
         is_published: formData.get("is_published") === "on",
         is_featured: formData.get("is_featured") === "on",
      })
      .select("id")
      .single();

   if (error) {
      throw new Error(error.message);
   }

   revalidatePath("/");
   revalidatePath("/projects");
   revalidatePath("/admin/projects");

   redirect(`/admin/projects/${data.id}`);
}
