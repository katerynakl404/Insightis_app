// Build for the design-sync converter: ESM bundle + the kit stylesheet.
// kit-theme.css stays the single source of truth — copied verbatim at build
// time with the DM Sans @import prepended (same Google Fonts URL the kit uses).
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [join(root, 'src/index.ts')],
  bundle: true,
  format: 'esm',
  outfile: join(root, 'dist/index.js'),
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  jsx: 'automatic',
  logLevel: 'info',
});

mkdirSync(join(root, 'dist'), { recursive: true });
const kitCss = readFileSync(join(root, '../pages/kit-theme.css'), 'utf8');
const fontImport =
  '@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..900;1,9..40,300..900&display=swap");\n';
writeFileSync(join(root, 'dist/kit.css'), fontImport + kitCss);
console.log('dist/kit.css written (fonts + kit-theme.css)');
