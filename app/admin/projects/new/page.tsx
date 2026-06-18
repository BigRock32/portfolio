import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import styles from "../[id]/page.module.css";
import { NewProjectForm } from "./NewProjectForm";

export default async function NewProjectPage() {
   if (!(await isAdminAuthenticated())) {
      redirect("/admin/login");
   }

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

         <NewProjectForm />
      </main>
   );
}