"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { reorderProjects } from "./actions";
import styles from "./page.module.css";

type ProjectRow = {
   id: string;
   slug: string;
   title: string;
   is_published: boolean;
   is_featured: boolean;
   sort_order: number;
   updated_at: string;
};

type AdminProjectsTableProps = {
   projects: ProjectRow[];
};

function moveItem<T>(items: T[], fromIndex: number, toIndex: number) {
   const nextItems = [...items];
   const [item] = nextItems.splice(fromIndex, 1);
   nextItems.splice(toIndex, 0, item);
   return nextItems;
}

export function AdminProjectsTable({ projects: initialProjects }: AdminProjectsTableProps) {
   const [projects, setProjects] = useState(initialProjects);
   const [draggedId, setDraggedId] = useState<string | null>(null);
   const [isPending, startTransition] = useTransition();

   function persistOrder(nextProjects: ProjectRow[]) {
      startTransition(() => {
         reorderProjects(nextProjects.map((project) => project.id));
      });
   }

   return (
      <div className={styles.tableWrap}>
         <table className={styles.table}>
            <thead>
               <tr>
                  <th />
                  <th>Order</th>
                  <th>Project</th>
                  <th>Published</th>
                  <th>Featured</th>
                  <th>Updated</th>
                  <th />
               </tr>
            </thead>

            <tbody>
               {projects.map((project, index) => (
                  <tr
                     key={project.id}
                     draggable
                     className={draggedId === project.id ? styles.draggingRow : ""}
                     onDragStart={() => setDraggedId(project.id)}
                     onDragOver={(event) => {
                        event.preventDefault();

                        if (!draggedId || draggedId === project.id) {
                           return;
                        }

                        const fromIndex = projects.findIndex((item) => item.id === draggedId);
                        const toIndex = projects.findIndex((item) => item.id === project.id);

                        if (fromIndex === -1 || toIndex === -1) {
                           return;
                        }

                        setProjects(moveItem(projects, fromIndex, toIndex));
                     }}
                     onDragEnd={() => {
                        setDraggedId(null);
                        persistOrder(projects);
                     }}
                  >
                     <td className={styles.dragHandle} aria-label="Drag project">
                        ::
                     </td>
                     <td>{index + 1}</td>
                     <td>
                        <strong>{project.title}</strong>
                        <span>{project.slug}</span>
                     </td>
                     <td>{project.is_published ? "Yes" : "No"}</td>
                     <td>{project.is_featured ? "Yes" : "No"}</td>
                     <td>{new Date(project.updated_at).toLocaleDateString("en")}</td>
                     <td>
                        <Link href={`/admin/projects/${project.id}`}>Edit</Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         {isPending ? <p className={styles.savingStatus}>Saving order...</p> : null}
      </div>
   );
}