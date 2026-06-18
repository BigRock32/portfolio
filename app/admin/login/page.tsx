import { redirect } from "next/navigation";
import { Button } from "@/components/Button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { loginAdmin } from "./actions";
import styles from "./page.module.css";

type LoginPageProps = {
   searchParams?: Promise<{
      error?: string;
   }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
   if (await isAdminAuthenticated()) {
      redirect("/admin/projects");
   }

   const params = await searchParams;
   const hasError = params?.error === "invalid";

   return (
      <main className={styles.page}>
         <form className={styles.card} action={loginAdmin}>
            <div>
               <p className={styles.eyebrow}>Admin</p>
               <h1>Project dashboard</h1>
               <p className={styles.description}>Enter the admin password to manage portfolio projects.</p>
            </div>

            <label className={styles.field}>
               <span>Password</span>
               <input name="password" type="password" required autoComplete="current-password" />
            </label>

            {hasError ? <p className={styles.error}>Incorrect password.</p> : null}

            <Button type="submit" variant="primary">Log in</Button>
         </form>
      </main>
   );
}