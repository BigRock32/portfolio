
import { createClient } from "@supabase/supabase-js";
import { projects } from "../data/projects.ts";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});

function parsePublishedDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
}

const rows = projects.map((project, index) => ({
  slug: project.id,
  title: project.title,
  summary: project.summary,
  description: project.description,
  role: project.role,
  url: project.url,
  image_url: project.image,
  stack: project.stack,
  og_title: project.og.title,
  og_description: project.og.description,
  og_image: project.og.image ?? project.image,
  og_url: project.og.url,
  published_date: parsePublishedDate(project.publishedDate),
  sort_order: index,
  is_published: true,
  is_featured: ["sdi", "dune", "bd-emerson", "flower-ai", "lingo"].includes(project.id),
}));

const { error } = await supabase.from("projects").upsert(rows, {
  onConflict: "slug",
});

if (error) {
  throw error;
}

console.log(`Seeded ${rows.length} projects.`);
