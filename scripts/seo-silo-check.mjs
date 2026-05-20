import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appRoot = path.join(root, "apps", "web", "src", "app");

const agencyFiles = [
  "page.tsx",
  "services/page.tsx",
  "services/layout.tsx",
  "about/layout.tsx",
  "contact/layout.tsx",
  "web-app-development-services/page.tsx",
  "mobile-app-development-services/page.tsx",
  "saas-development-services/page.tsx",
  "mvp-development-company/page.tsx",
  "blog/web-app-development-cost-india/page.tsx",
  "blog/saas-development-company-india/page.tsx",
  "blog/mobile-app-development-kolkata/page.tsx",
];

const toolsFiles = [
  "tools/layout.tsx",
  "tools/page.tsx",
  "tools/gst-invoice/page.tsx",
  "passive-income-tools-for-business/page.tsx",
  "blog/how-to-create-gst-invoice-free/page.tsx",
  "blog/cgst-sgst-igst-difference/page.tsx",
  "blog/gst-invoice-format-india/page.tsx",
  "blog/gst-invoice-for-freelancers/page.tsx",
  "blog/free-gst-billing-software-small-business/page.tsx",
];

const canonicalRequired = [
  ...agencyFiles,
  ...toolsFiles.filter((rel) => rel !== "tools/page.tsx"),
  "pricing/layout.tsx",
  "blog/layout.tsx",
];

const errors = [];

function read(rel) {
  const full = path.join(appRoot, rel);
  if (!fs.existsSync(full)) {
    errors.push(`Missing file: ${rel}`);
    return "";
  }
  return fs.readFileSync(full, "utf8");
}

function hasAbsoluteCanonical(src) {
  return /canonical:\s*['"]https:\/\/yantrixlab\.com[/'"\w-]*['"]/.test(src);
}

for (const rel of canonicalRequired) {
  const src = read(rel);
  if (src && !hasAbsoluteCanonical(src)) {
    errors.push(`Missing absolute canonical in: ${rel}`);
  }
}

for (const rel of agencyFiles) {
  const src = read(rel);
  if (src.includes("/tools/gst-invoice")) {
    errors.push(`Agency file links to GST tool: ${rel}`);
  }
  if (src.includes("og-gst-tool.png")) {
    errors.push(`Agency file uses tools OG image: ${rel}`);
  }
}

for (const rel of toolsFiles) {
  const src = read(rel);
  if (src.includes('href="/services"') || src.includes("href='/services'")) {
    errors.push(`Tools file links to /services: ${rel}`);
  }
  if (src.includes("og-agency.png")) {
    errors.push(`Tools file uses agency OG image: ${rel}`);
  }
}

if (errors.length > 0) {
  console.error("SEO silo check failed:\n");
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

console.log("SEO silo check passed.");
