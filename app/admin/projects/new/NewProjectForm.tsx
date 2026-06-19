"use client";

import { ProjectForm } from "../ProjectForm";
import { createProject } from "./actions";

type NewProjectFormProps = {
   defaultSortOrder: number;
};

export function NewProjectForm({ defaultSortOrder }: NewProjectFormProps) {
   return <ProjectForm action={createProject} defaultSortOrder={defaultSortOrder} mode="create" />;
}
