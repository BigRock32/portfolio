import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { deleteProject, updateProject } from "./actions";
import styles from "./page.module.css";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { ProjectForm } from "../ProjectForm";

type EditProjectPageProps = {
   params: Promise<{
      id: string;
   }>;
};

type ProjectRow = {
   id: string;
   slug: string;
   title: string;
   summary: string;
   description: string;
   role: string;
   url: string | null;
   image_url: string | null;
   stack: string[];
   og_title: string | null;
   og_description: string | null;
   og_image: string | null;
   og_url: string | null;
   published_date: string | null;
   sort_order: number;
   is_published: boolean;
   is_featured: boolean;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
   if (!(await isAdminAuthenticated())) {
      redirect("/admin/login");
   }

   const { id } = await params;
   const supabase = createSupabaseAdminClient();

   const { data, error } = await supabase
      .from("projects")
      .select(
         "id, slug, title, summary, description, role, url, image_url, stack, og_title, og_description, og_image, og_url, published_date, sort_order, is_published, is_featured",
      )
      .eq("id", id)
      .single();

   if (error || !data) {
      notFound();
   }

   const project = data as ProjectRow;
   const updateAction = updateProject.bind(null, project.id);
   const deleteAction = deleteProject.bind(null, project.id);

   return (
      <main className={styles.page}>
         <header className={styles.header}>
            <div>
               <p className={styles.eyebrow}>Admin</p>
               <h1>Edit project</h1>
               <p>{project.title}</p>
            </div>

            <Link href="/admin/projects">Back to projects</Link>
         </header>

         <ProjectForm action={updateAction} mode="edit" project={project} />
         <form action={deleteAction} className={styles.deleteForm}>
            <DeleteProjectButton />
         </form>
      </main>
   );
}
