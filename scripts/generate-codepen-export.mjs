#!/usr/bin/env node
// Regenerate codepen-export/index.html: a dynamic picker for pushing any demo
// to CodePen via the POST-to-Prefill form (https://blog.codepen.io/docs/api/).
// Run with: node scripts/generate-codepen-export.mjs

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const labs = ["css-lab", "css-lab2", "css-lab3", "css-lab4", "chrome-only-lab", "timeline-grid-lab"];

function extractTag(html, tag) {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? match[1] : "";
}

function collectDemos(lab) {
  const labDir = join(rootDir, lab);
  const sharedPath = join(labDir, "_shared.css");
  const sharedCss = existsSync(sharedPath) ? readFileSync(sharedPath, "utf8").trim() : "";

  return readdirSync(labDir)
    .filter((name) => /^\d+-/.test(name) && statSync(join(labDir, name)).isDirectory())
    .sort()
    .map((folder) => {
      const demoDir = join(labDir, folder);
      const indexPath = join(demoDir, "index.html");
      const stylePath = join(demoDir, "style.css");
      if (!existsSync(indexPath) || !existsSync(stylePath)) return null;

      const html = readFileSync(indexPath, "utf8");
      const title = extractTag(html, "title").trim() || folder;
      const scriptPath = join(demoDir, "script.js");
      const hasScript = existsSync(scriptPath);
      const js = hasScript ? readFileSync(scriptPath, "utf8").trim() : "";
      // Demos with their own script.js load it via <script src="script.js">,
      // which won't resolve once the markup is lifted out onto CodePen or
      // into this page's srcdoc preview; drop that reference here since its
      // content is carried separately in the js field instead.
      const body = extractTag(html, "body")
        .replace(/<script\s+src=["']script\.js["']><\/script>/, "")
        .trim();
      const styleCss = readFileSync(stylePath, "utf8").trim();
      const css = [sharedCss, styleCss].filter(Boolean).join("\n\n");

      return { id: `${lab}/${folder}`, lab, folder, title, html: body, css, js };
    })
    .filter(Boolean);
}

const manifest = labs.flatMap(collectDemos);

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CodePen export</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: system-ui, sans-serif; margin: 2rem auto; max-width: 60rem; padding: 0 1rem; }
  h1 { font-size: 1.25rem; }
  .controls { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-block: 1rem; }
  select { font-size: 1rem; padding: 0.4rem 0.6rem; }
  button { font-size: 1rem; padding: 0.5rem 1rem; cursor: pointer; }
  iframe { width: 100%; height: 60vh; border: 1px solid light-dark(#ccc, #444); border-radius: 0.5rem; margin-top: 1rem; }
  p.meta { color: light-dark(#555, #aaa); font-size: 0.9rem; }
</style>
</head>
<body>
<h1>Push a demo to CodePen</h1>
<p class="meta">Regenerate this page after adding demos: <code>node scripts/generate-codepen-export.mjs</code></p>
<div class="controls">
  <select id="demo-select"></select>
  <button id="open-codepen">Open in CodePen</button>
</div>
<iframe id="preview" title="Demo preview"></iframe>

<script id="manifest" type="application/json">${JSON.stringify(manifest)}</script>
<script>
  const manifest = JSON.parse(document.getElementById("manifest").textContent);
  const select = document.getElementById("demo-select");
  const preview = document.getElementById("preview");

  for (const demo of manifest) {
    const option = document.createElement("option");
    option.value = demo.id;
    option.textContent = \`\${demo.lab} / \${demo.title}\`;
    select.appendChild(option);
  }

  function currentDemo() {
    return manifest.find((d) => d.id === select.value);
  }

  function renderPreview() {
    const demo = currentDemo();
    if (!demo) return;
    // The embedded closing script tag below must stay backslash-escaped:
    // unescaped, even inside a JS string, it's still what the HTML
    // tokenizer scans for to end this element's own closing tag, and
    // would truncate this whole inline script right there.
    const scriptTag = demo.js ? \`<script>\${demo.js}<\\/script>\` : "";
    preview.srcdoc = \`<!doctype html><html><head><style>\${demo.css}</style></head><body>\${demo.html}\${scriptTag}</body></html>\`;
  }

  select.addEventListener("change", renderPreview);
  renderPreview();

  document.getElementById("open-codepen").addEventListener("click", () => {
    const demo = currentDemo();
    if (!demo) return;
    const data = { title: demo.title, html: demo.html, css: demo.css, js: demo.js };

    const form = document.createElement("form");
    form.action = "https://codepen.io/pen/define";
    form.method = "POST";
    form.target = "_blank";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "data";
    input.value = JSON.stringify(data);
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    form.remove();
  });
</script>
</body>
</html>
`;

const outDir = join(rootDir, "codepen-export");
if (!existsSync(outDir)) {
  mkdirSync(outDir);
}
writeFileSync(join(outDir, "index.html"), page);
console.log(`Wrote codepen-export/index.html with ${manifest.length} demos.`);
