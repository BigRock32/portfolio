"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { CheckboxField, TextArea, TextInput } from "./ProjectFormFields";
import { ImageUploadField } from "./ImageUploadField";
import styles from "./[id]/page.module.css";

type ProjectFormAction = (formData: FormData) => void | Promise<void>;

type EditableProject = {
  description: string;
  image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  og_description: string | null;
  og_image: string | null;
  og_title: string | null;
  og_url: string | null;
  published_date: string | null;
  role: string;
  slug: string;
  sort_order: number;
  stack: string[];
  summary: string;
  title: string;
  url: string | null;
};

type FormErrors = Partial<Record<"description" | "image_file" | "slug" | "title", string>>;

type ProjectFormProps = {
  action: ProjectFormAction;
  defaultSortOrder?: number;
  mode: "create" | "edit";
  project?: EditableProject;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProjectForm({ action, defaultSortOrder = 0, mode, project }: ProjectFormProps) {
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [isSlugTouched, setIsSlugTouched] = useState(mode === "edit");
  const [errors, setErrors] = useState<FormErrors>({});

  function clearError(field: keyof FormErrors) {
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];

      return nextErrors;
    });
  }

  function validateForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const nextErrors: FormErrors = {};

    if (!String(formData.get("title") ?? "").trim()) {
      nextErrors.title = "Project title is required.";
    }

    if (!String(formData.get("slug") ?? "").trim()) {
      nextErrors.slug = "Project slug is required.";
    }

    if (!String(formData.get("description") ?? "").trim()) {
      nextErrors.description = "Project description is required.";
    }

    const imageFile = formData.get("image_file");
    const currentImageUrl = String(formData.get("current_image_url") ?? "").trim();

    if (!currentImageUrl && (!(imageFile instanceof File) || imageFile.size === 0)) {
      nextErrors.image_file = "Project image is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  return (
    <form
      className={styles.form}
      action={action}
      noValidate
      onSubmit={(event) => {
        if (!validateForm(event.currentTarget)) {
          event.preventDefault();
        }
      }}
    >
      <section className={styles.section}>
        <h2>Main info</h2>

        <TextInput
          defaultValue={project?.title ?? ""}
          error={errors.title}
          label="Title"
          name="title"
          required
          onValueChange={(value) => {
            clearError("title");

            if (!isSlugTouched) {
              const nextSlug = slugify(value);
              setSlug(nextSlug);

              if (nextSlug) {
                clearError("slug");
              }
            }
          }}
        />

        <TextInput
          error={errors.slug}
          label="Slug"
          name="slug"
          placeholder="project-slug"
          required
          value={slug}
          onValueChange={(value) => {
            setIsSlugTouched(true);
            setSlug(value);
            clearError("slug");
          }}
        />

        <TextArea
          defaultValue={project?.summary ?? ""}
          label="Summary"
          name="summary"
          rows={3}
        />

        <TextArea
          defaultValue={project?.description ?? ""}
          error={errors.description}
          label="Description"
          name="description"
          required
          rows={8}
          onValueChange={() => clearError("description")}
        />

        <TextInput defaultValue={project?.role ?? ""} label="Role" name="role" />
        <TextInput defaultValue={project?.url ?? ""} label="Project URL" name="url" />

        <input type="hidden" name="current_image_url" value={project?.image_url ?? ""} />
        <ImageUploadField
          currentImageAlt={project ? `${project.title} preview` : undefined}
          currentImageUrl={project?.image_url}
          error={errors.image_file}
          inputLabel={mode === "edit" ? "Replace image" : "Image"}
          inputRequired={mode === "create"}
          onFileChange={() => clearError("image_file")}
        />

        <TextArea
          defaultValue={project?.stack.join("\n") ?? ""}
          label="Stack, one item per line"
          name="stack"
          rows={6}
        />
      </section>

      <section className={styles.section}>
        <h2>Visibility</h2>

        <TextInput
          defaultValue={project?.published_date ?? ""}
          label="Published date"
          name="published_date"
          type="date"
        />

        <TextInput
          defaultValue={project?.sort_order ?? defaultSortOrder}
          label="Sort order"
          name="sort_order"
          type="number"
        />

        <CheckboxField
          defaultChecked={project?.is_published ?? true}
          label="Published"
          name="is_published"
        />

        <CheckboxField
          defaultChecked={project?.is_featured ?? false}
          label="Featured on homepage"
          name="is_featured"
        />
      </section>

      <section className={styles.section}>
        <h2>Open Graph</h2>

        <TextInput defaultValue={project?.og_title ?? ""} label="OG title" name="og_title" />

        <TextArea
          defaultValue={project?.og_description ?? ""}
          label="OG description"
          name="og_description"
          rows={3}
        />

        <TextInput defaultValue={project?.og_image ?? ""} label="OG image" name="og_image" />
        <TextInput defaultValue={project?.og_url ?? ""} label="OG URL" name="og_url" />
      </section>

      <div className={styles.actions}>
        <Button type="submit" variant="primary">
          {mode === "edit" ? "Save project" : "Create project"}
        </Button>
        <Button href="/admin/projects" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
