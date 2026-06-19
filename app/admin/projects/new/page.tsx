import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import styles from "../[id]/page.module.css";
import { NewProjectForm } from "./NewProjectForm";

export default async function NewProjectPage() {
   if (!(await isAdminAuthenticated())) {
      redirect("/admin/login");
   }

   const supabase = createSupabaseAdminClient();
   const { data } = await supabase
      .from("projects")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
   const defaultSortOrder = typeof data?.sort_order === "number" ? data.sort_order + 1 : 0;

   return (
      <main className={styles.page}>
         <header className={styles.header}>
            <div>
               <p className={styles.eyebrow}>Admin</p>
               <h1>New project</h1>
               <p>Create a new portfolio project.</p>
            </div>

            <Link href="/admin/projects">Back to projects</Link>
         </header>

         <NewProjectForm defaultSortOrder={defaultSortOrder} />
      </main>
   );
}
