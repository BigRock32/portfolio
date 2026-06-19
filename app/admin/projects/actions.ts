"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function reorderProjects(projectIds: string[]) {
   if (!(await isAdminAuthenticated())) {
      redirect("/admin/login");
   }

   const supabase = createSupabaseAdminClient();

   for (const [index, projectId] of projectIds.entries()) {
      const { error } = await supabase
         .from("projects")
         .update({ sort_order: index })
         .eq("id", projectId);

      if (error) {
         throw new Error(error.message);
      }
   }

   revalidatePath("/");
   revalidatePath("/projects");
   revalidatePath("/admin/projects");
}