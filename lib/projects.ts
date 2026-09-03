import type { Project } from "@/data/projects";
import { createSupabaseAnonClient } from "@/lib/supabase/server";

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
  category: string;
};

function formatDate(date: string | null) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description,
    image: row.image_url ?? "",
    stack: row.stack,
    role: row.role,
    publishedDate: formatDate(row.published_date),
    url: row.url ?? "",
    category: row.category,
    og: {
      title: row.og_title ?? row.title,
      description: row.og_description ?? row.summary,
      url: row.og_url ?? row.url ?? "",
      image: row.og_image ?? row.image_url ?? undefined,
    },
  };
}

async function getPublishedProjectRows() {
  const supabase = createSupabaseAnonClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      [
        "id",
        "slug",
        "title",
        "summary",
        "description",
        "role",
        "url",
        "image_url",
        "stack",
        "og_title",
        "og_description",
        "og_image",
        "og_url",
        "published_date",
        "sort_order",
        "is_published",
        "is_featured",
        "category",
      ].join(","),
    )
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as unknown as ProjectRow[];
}

export async function getAllProjects() {
  const rows = await getPublishedProjectRows();

  return rows.map(mapProjectRow);
}

export async function getFeaturedProjects() {
  const rows = await getPublishedProjectRows();

  return rows.filter((row) => row.is_featured).map(mapProjectRow);
}
