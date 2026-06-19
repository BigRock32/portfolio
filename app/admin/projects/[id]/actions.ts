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


export async function updateProject(projectId: string, formData: FormData) {
   if (!(await isAdminAuthenticated())) {
      redirect("/admin/login");
   }

   const supabase = createSupabaseAdminClient();

   const currentImageUrl = getNullableText(formData, "current_image_url");
   const imageUrl = await getProjectImageUrl(formData, currentImageUrl);

   if (!imageUrl) {
      throw new Error("Image is required.");
   }

   const { error } = await supabase
      .from("projects")
      .update({
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
         is_published: formData.get("is_published") === "on",
         is_featured: formData.get("is_featured") === "on",
      })
      .eq("id", projectId);



   if (error) {
      throw new Error(error.message);
   }

   revalidatePath("/");
   revalidatePath("/projects");
   revalidatePath("/admin/projects");

   redirect("/admin/projects");
}

export async function deleteProject(projectId: string) {
   if (!(await isAdminAuthenticated())) {
      redirect("/admin/login");
   }

   const supabase = createSupabaseAdminClient();

   const { error } = await supabase.from("projects").delete().eq("id", projectId);

   if (error) {
      throw new Error(error.message);
   }

   revalidatePath("/");
   revalidatePath("/projects");
   revalidatePath("/admin/projects");

   redirect("/admin/projects");
}
