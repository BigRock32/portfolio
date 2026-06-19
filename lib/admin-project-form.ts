import { createSupabaseAdminClient } from "@/lib/supabase/server";

const PROJECT_IMAGES_BUCKET = "project-images";

export function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function getNullableText(formData: FormData, key: string) {
  const value = getText(formData, key);

  return value.length > 0 ? value : null;
}

export function getStack(formData: FormData) {
  return getText(formData, "stack")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));

  return Number.isFinite(value) ? value : 0;
}

export function getNullableDate(formData: FormData, key: string) {
  const value = getText(formData, key);

  return value.length > 0 ? value : null;
}

export function requireText(formData: FormData, key: string, label: string) {
  const value = getText(formData, key);

  if (!value) {
    throw new Error(`${label} is required.`);
  }

  return value;
}

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  return extension ? `.${extension}` : "";
}

function hasUpload(file: FormDataEntryValue | null): file is File {
  return file instanceof File && file.size > 0;
}

async function ensureProjectImagesBucket() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    throw new Error(error.message);
  }

  if (data.some((bucket) => bucket.name === PROJECT_IMAGES_BUCKET)) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(PROJECT_IMAGES_BUCKET, {
    public: true,
  });

  if (createError) {
    throw new Error(createError.message);
  }
}

export async function getProjectImageUrl(formData: FormData, fallbackImageUrl?: string | null) {
  const file = formData.get("image_file");

  if (!hasUpload(file)) {
    return fallbackImageUrl ?? getNullableText(formData, "image_url");
  }

  await ensureProjectImagesBucket();

  const supabase = createSupabaseAdminClient();
  const slug = getText(formData, "slug") || "project";
  const path = `${slug}/${Date.now()}${getFileExtension(file)}`;
  const { error } = await supabase.storage.from(PROJECT_IMAGES_BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path);

  return data.publicUrl;
}
