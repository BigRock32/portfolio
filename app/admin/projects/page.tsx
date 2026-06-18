import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import styles from "./page.module.css";
import { AdminProjectsTable } from "./AdminProjectsTable";

type ProjectRow = {
   id: string;
   slug: string;
   title: string;
   is_published: boolean;
   is_featured: boolean;
   sort_order: number;
   updated_at: string;
};

export default async function AdminProjectsPage() {
   if (!(await isAdminAuthenticated())) {
      redirect("/admin/login");
   }

   const supabase = createSupabaseAdminClient();

   const { data: projects, error } = await supabase
      .from("projects")
      .select("id, slug, title, is_published, is_featured, sort_order, updated_at")
      .order("sort_order", { ascending: true });

   if (error) {
      throw new Error(error.message);
   }

   return (
      <main className={styles.page}>
         <header className={styles.header}>
            <div>
               <p className={styles.eyebrow}>Admin</p>
               <h1>Projects</h1>
            </div>

            <Link className={styles.newLink} href="/admin/projects/new">
               New project
            </Link>
         </header>

         <AdminProjectsTable projects={projects as ProjectRow[]} />
      </main>
   );
}