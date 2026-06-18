import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/Button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { deleteProject, updateProject } from "./actions";
import styles from "./page.module.css";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { ImageUploadField } from "../ImageUploadField";

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

         <form className={styles.form} action={updateAction}>
            <section className={styles.section}>
               <h2>Main info</h2>

               <label>
                  <span>Title</span>
                  <input name="title" defaultValue={project.title} required />
               </label>

               <label>
                  <span>Slug</span>
                  <input name="slug" defaultValue={project.slug} required />
               </label>

               <label>
                  <span>Summary</span>
                  <textarea name="summary" defaultValue={project.summary} rows={3} required />
               </label>

               <label>
                  <span>Description</span>
                  <textarea name="description" defaultValue={project.description} rows={8} required />
               </label>

               <label>
                  <span>Role</span>
                  <input name="role" defaultValue={project.role} required />
               </label>

               <label>
                  <span>Project URL</span>
                  <input name="url" defaultValue={project.url ?? ""} />
               </label>

               <input type="hidden" name="current_image_url" value={project.image_url ?? ""} />

               <ImageUploadField
                  currentImageUrl={project.image_url}
                  currentImageAlt={`${project.title} preview`}
                  inputLabel="Replace image"
               />

               <label>
                  <span>Stack, one item per line</span>
                  <textarea name="stack" defaultValue={project.stack.join("\n")} rows={6} />
               </label>
            </section>

            <section className={styles.section}>
               <h2>Visibility</h2>

               <label>
                  <span>Published date</span>
                  <input name="published_date" type="date" defaultValue={project.published_date ?? ""} />
               </label>

               <label>
                  <span>Sort order</span>
                  <input name="sort_order" type="number" defaultValue={project.sort_order} />
               </label>

               <label className={styles.checkbox}>
                  <input name="is_published" type="checkbox" defaultChecked={project.is_published} />
                  <span>Published</span>
               </label>

               <label className={styles.checkbox}>
                  <input name="is_featured" type="checkbox" defaultChecked={project.is_featured} />
                  <span>Featured on homepage</span>
               </label>
            </section>

            <section className={styles.section}>
               <h2>Open Graph</h2>

               <label>
                  <span>OG title</span>
                  <input name="og_title" defaultValue={project.og_title ?? ""} />
               </label>

               <label>
                  <span>OG description</span>
                  <textarea name="og_description" defaultValue={project.og_description ?? ""} rows={3} />
               </label>

               <label>
                  <span>OG image</span>
                  <input name="og_image" defaultValue={project.og_image ?? ""} />
               </label>

               <label>
                  <span>OG URL</span>
                  <input name="og_url" defaultValue={project.og_url ?? ""} />
               </label>
            </section>

            <div className={styles.actions}>
               <Button type="submit" variant="primary">
                  Save project
               </Button>
               <Button href="/admin/projects" variant="secondary">
                  Cancel
               </Button>
            </div>
         </form>
         <form action={deleteAction} className={styles.deleteForm}>
            <DeleteProjectButton />
         </form>
      </main>
   );
}