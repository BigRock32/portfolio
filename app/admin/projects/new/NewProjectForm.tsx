"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { createProject } from "./actions";
import styles from "../[id]/page.module.css";
import { ImageUploadField } from "../ImageUploadField";

function slugify(value: string) {
   return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9а-яё]+/gi, "-")
      .replace(/^-+|-+$/g, "");
}

export function NewProjectForm() {
   const [slug, setSlug] = useState("");
   const [isSlugTouched, setIsSlugTouched] = useState(false);

   return (
      <form className={styles.form} action={createProject}>
         <section className={styles.section}>
            <h2>Main info</h2>

            <label>
               <span>Title</span>
               <input
                  name="title"
                  required
                  onChange={(event) => {
                     if (!isSlugTouched) {
                        setSlug(slugify(event.target.value));
                     }
                  }}
               />
            </label>

            <label>
               <span>Slug</span>
               <input
                  name="slug"
                  required
                  value={slug}
                  onChange={(event) => {
                     setIsSlugTouched(true);
                     setSlug(event.target.value);
                  }}
                  placeholder="project-slug"
               />
            </label>

            <label>
               <span>Summary</span>
               <textarea name="summary" rows={3} required />
            </label>

            <label>
               <span>Description</span>
               <textarea name="description" rows={8} required />
            </label>

            <label>
               <span>Role</span>
               <input name="role" required />
            </label>

            <label>
               <span>Project URL</span>
               <input name="url" />
            </label>

            <ImageUploadField
               inputLabel="Image" inputRequired
            />

            <label>
               <span>Stack, one item per line</span>
               <textarea name="stack" rows={6} />
            </label>
         </section>

         <section className={styles.section}>
            <h2>Visibility</h2>

            <label>
               <span>Published date</span>
               <input name="published_date" type="date" />
            </label>

            <label>
               <span>Sort order</span>
               <input name="sort_order" type="number" defaultValue={0} />
            </label>

            <label className={styles.checkbox}>
               <input name="is_published" type="checkbox" defaultChecked />
               <span>Published</span>
            </label>

            <label className={styles.checkbox}>
               <input name="is_featured" type="checkbox" />
               <span>Featured on homepage</span>
            </label>
         </section>

         <section className={styles.section}>
            <h2>Open Graph</h2>

            <label>
               <span>OG title</span>
               <input name="og_title" />
            </label>

            <label>
               <span>OG description</span>
               <textarea name="og_description" rows={3} />
            </label>

            <label>
               <span>OG image</span>
               <input name="og_image" />
            </label>

            <label>
               <span>OG URL</span>
               <input name="og_url" />
            </label>
         </section>

         <div className={styles.actions}>
            <Button type="submit" variant="primary">
               Create project
            </Button>
            <Button href="/admin/projects" variant="secondary">
               Cancel
            </Button>
         </div>
      </form>
   );
}