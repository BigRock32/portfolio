import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");
const projectsFile = resolve(rootDir, "data/projects.ts");
const cacheFile = resolve(rootDir, "data/og-cache.json");

const entityMap = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
};

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_match, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&(amp|quot|#39|apos|lt|gt);/g, (match) => entityMap[match] ?? match)
    .trim();
}

function getStringProperty(block, property) {
  const match = block.match(new RegExp(`${property}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  return match ? match[1].replace(/\\"/g, '"') : "";
}

function extractProjectBlocks(source) {
  const arrayStart = source.indexOf("export const projects");
  const assignmentStart = source.indexOf("=", arrayStart);
  const bracketStart = source.indexOf("[", assignmentStart);
  const blocks = [];
  let depth = 0;
  let blockStart = -1;

  for (let index = bracketStart + 1; index < source.length; index += 1) {
    const char = source[index];

    if (char === "{") {
      if (depth === 0) {
        blockStart = index;
      }
      depth += 1;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0 && blockStart !== -1) {
        blocks.push(source.slice(blockStart, index + 1));
        blockStart = -1;
      }
    }

    if (char === "]" && depth === 0) {
      break;
    }
  }

  return blocks;
}

function getMeta(html, selectors) {
  for (const selector of selectors) {
    const pattern = new RegExp(
      `<meta\\s+(?=[^>]*(?:property|name)=["']${selector}["'])(?=[^>]*content=["']([^"']+)["'])[^>]*>`,
      "i",
    );
    const match = html.match(pattern);
    if (match?.[1]) {
      return decodeHtml(match[1]);
    }
  }

  return "";
}

function normalizeUrl(value, baseUrl) {
  if (!value) {
    return "";
  }

  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return "";
  }
}

async function fetchOg(project) {
  if (!project.url || project.url.includes("example.com")) {
    return {
      image: project.image,
      status: "skipped-placeholder-url",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(project.url, {
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent":
          "Mozilla/5.0 (compatible; VasiliiPortfolioBot/1.0; +https://github.com/BigRock32)",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        image: project.image,
        status: `http-${response.status}`,
      };
    }

    const html = await response.text();
    const title =
      getMeta(html, ["og:title", "twitter:title"]) ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ||
      "";
    const description = getMeta(html, ["og:description", "twitter:description", "description"]);
    const image = normalizeUrl(
      getMeta(html, ["og:image:secure_url", "og:image", "twitter:image", "twitter:image:src"]),
      response.url,
    );
    const url = normalizeUrl(getMeta(html, ["og:url"]), response.url);

    return {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url: url ? new URL(url).hostname.replace(/^www\./, "") : new URL(response.url).hostname.replace(/^www\./, ""),
      image: image || project.image,
      status: image ? "ok" : "missing-og-image",
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      image: project.image,
      status: error instanceof Error ? error.name : "fetch-error",
    };
  } finally {
    clearTimeout(timeout);
  }
}

const source = await readFile(projectsFile, "utf8");
const projects = extractProjectBlocks(source)
  .map((block) => ({
    id: getStringProperty(block, "id"),
    title: getStringProperty(block, "title"),
    url: getStringProperty(block, "url"),
    image: getStringProperty(block, "image"),
  }))
  .filter((project) => project.id && project.url);

const nextCache = {};

for (const project of projects) {
  process.stdout.write(`Fetching ${project.id}... `);
  const og = await fetchOg(project);
  nextCache[project.id] = og;
  process.stdout.write(`${og.status}\n`);
}

await writeFile(cacheFile, `${JSON.stringify(nextCache, null, 2)}\n`);
console.log(`Saved ${projects.length} OG entries to ${cacheFile}`);
