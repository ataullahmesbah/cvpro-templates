// Generates the illustrated demo images in public/demo (SVG, no external assets).
// Run: npm run assets:generate
// The website shows photos in black & white (colour on hover), like a classic CV theme.
// Replace them from the admin dashboard with real photos before going live.
import { mkdirSync, writeFileSync } from "node:fs";

const out = new URL("../public/demo/", import.meta.url);
mkdirSync(out, { recursive: true });
const save = (name, svg) => writeFileSync(new URL(name, out), svg.trim() + "\n");

const FONT = "Arial, Helvetica, sans-serif";
const P = "#f2b35b"; // accent (gold)

const svg = (w, h, body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs>${body}</svg>`;
const lin = (id, a, b, x2 = 1, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const rad = (id, a, b, cx = 0.5, cy = 0.5, r = 0.7) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;

// ---------------------------------------------------------------------
// People (flat illustration). Drawn in a 400 × 470 box, bust from the chest up.
// ---------------------------------------------------------------------
function person({
  skin = "#efb893",
  skinShade = "#d99a72",
  hair = "#3a2a22",
  style = "short", // short | long | bun | curly
  jacket = "#1f2447",
  lapel = "#2d3468",
  shirt = "#ffffff",
  tie = P,
  glasses = false,
  beard = false,
  smile = true,
} = {}) {
  const back =
    style === "long"
      ? `<path d="M118 150C108 250 120 330 132 360L268 360C280 330 292 250 282 150Z" fill="${hair}"/>`
      : style === "curly"
        ? `<g fill="${hair}"><circle cx="140" cy="130" r="40"/><circle cx="260" cy="130" r="40"/><circle cx="150" cy="190" r="36"/><circle cx="250" cy="190" r="36"/><circle cx="200" cy="92" r="50"/></g>`
        : "";
  const top =
    style === "bun"
      ? `<circle cx="200" cy="60" r="30" fill="${hair}"/><path d="M136 146C130 90 166 72 202 72C240 72 272 92 266 146C256 116 236 104 204 104C172 104 148 116 136 146Z" fill="${hair}"/>`
      : style === "long"
        ? `<path d="M132 160C124 92 164 66 202 66C244 66 280 94 270 160C262 124 244 106 204 106C168 106 146 122 132 160Z" fill="${hair}"/>`
        : style === "curly"
          ? `<path d="M138 140C136 96 166 80 202 80C240 80 266 98 264 140C250 118 232 110 202 110C174 110 152 118 138 140Z" fill="${hair}"/>`
          : `<path d="M136 146C128 84 168 60 204 60C246 60 274 88 266 146C260 118 240 104 206 104C176 104 150 114 136 146Z" fill="${hair}"/>`;
  const collar = tie
    ? `<path d="M168 266L200 332L232 266Z" fill="${shirt}"/><path d="M194 330L206 330L213 420L200 436L187 420Z" fill="${tie}"/>`
    : `<path d="M168 266L200 318L232 266Z" fill="${shirt}"/><path d="M178 266L200 300L222 266Z" fill="${skinShade}"/>`;
  return `
  ${back}
  <rect x="172" y="196" width="56" height="74" rx="22" fill="${skinShade}"/>
  <path d="M34 470C44 336 108 272 200 264C292 272 356 336 366 470Z" fill="${jacket}"/>
  ${collar}
  <path d="M162 268L200 344L184 364L136 298Z" fill="${lapel}"/>
  <path d="M238 268L200 344L216 364L264 298Z" fill="${lapel}"/>
  <ellipse cx="138" cy="160" rx="11" ry="16" fill="${skinShade}"/>
  <ellipse cx="262" cy="160" rx="11" ry="16" fill="${skinShade}"/>
  <ellipse cx="200" cy="152" rx="62" ry="74" fill="${skin}"/>
  <ellipse cx="170" cy="182" rx="12" ry="7" fill="#f28b82" opacity="0.25"/>
  <ellipse cx="230" cy="182" rx="12" ry="7" fill="#f28b82" opacity="0.25"/>
  ${top}
  ${beard ? `<path d="M146 168C152 216 178 232 200 232C222 232 248 216 254 168C244 196 226 208 200 208C174 208 156 196 146 168Z" fill="${hair}" opacity="0.92"/>` : ""}
  <circle cx="178" cy="156" r="5" fill="#2a1d17"/>
  <circle cx="222" cy="156" r="5" fill="#2a1d17"/>
  <circle cx="180" cy="154" r="1.6" fill="#fff"/>
  <circle cx="224" cy="154" r="1.6" fill="#fff"/>
  ${glasses ? `<circle cx="178" cy="156" r="17" fill="none" stroke="#1c1c28" stroke-width="3"/><circle cx="222" cy="156" r="17" fill="none" stroke="#1c1c28" stroke-width="3"/><path d="M195 156h10M161 152l-22-4M239 152l22-4" stroke="#1c1c28" stroke-width="3"/>` : ""}
  <path d="M164 130q14-8 28 0M208 130q14-8 28 0" stroke="${hair}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M198 162q-6 14 4 16" stroke="${skinShade}" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${smile ? `<path d="M184 192q16 12 32 0" stroke="${beard ? "#fff" : "#b5584a"}" stroke-width="4" fill="none" stroke-linecap="round"/>` : `<path d="M188 194h24" stroke="#b5584a" stroke-width="4" stroke-linecap="round"/>`}`;
}

const owner = { skin: "#eab48e", skinShade: "#d29a70", hair: "#4a3325", style: "curly", jacket: "#3b3f46", lapel: "#3b3f46", shirt: "#3b3f46", tie: null };
const people = {
  sofia: { skin: "#f3c5a4", skinShade: "#e0a47f", hair: "#6b3f22", style: "long", jacket: "#c9c3b8", lapel: "#b8b1a4", shirt: "#ffffff", tie: null },
  marcus: { skin: "#a9714b", skinShade: "#8e5b39", hair: "#1a1210", style: "short", jacket: "#2d4a63", lapel: "#355674", tie: null, beard: true },
  emma: { skin: "#f6d0b1", skinShade: "#e2ae8a", hair: "#2a2a35", style: "bun", jacket: "#7a2e3b", lapel: "#6a2733", tie: null, glasses: true },
};

// Leaves behind the portrait (the reference theme uses a plant backdrop)
function leaves(w, h, n = 26, seed = 3) {
  let r = seed;
  const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  let g = "";
  for (let i = 0; i < n; i++) {
    const x = rnd() * w, y = rnd() * h * 0.85, s = 40 + rnd() * 90, a = rnd() * 360;
    const tone = ["#2f4a35", "#3d5f44", "#26392b", "#4d7255"][i % 4];
    g += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${a.toFixed(0)}) scale(${(s / 100).toFixed(2)})"><path d="M0 0C30 -40 90 -40 120 0C90 40 30 40 0 0Z" fill="${tone}" opacity="0.9"/><path d="M4 0H116" stroke="#1c2a20" stroke-width="3" opacity="0.5"/></g>`;
  }
  return g;
}

function portrait(name, w, h, who, { scale = 1, dy = 0, bg = ["#1f2a22", "#0f1511"], deco = "" } = {}) {
  const s = (w / 400) * scale;
  const x = (w - 400 * s) / 2;
  const y = h - 470 * s + dy;
  save(name, svg(w, h, `<rect width="${w}" height="${h}" fill="url(#bg)"/>${deco}<g transform="translate(${x} ${y}) scale(${s})">${person(who)}</g>`, lin("bg", bg[0], bg[1], 0.3, 1)));
}

// Home photo (square, shown inside the animated blob) and small avatar
portrait("portrait.svg", 900, 900, owner, { scale: 0.92, dy: 10, deco: leaves(900, 900, 34, 7) });
portrait("avatar-owner.svg", 400, 400, owner, { scale: 1.25, dy: 150, deco: leaves(400, 400, 14, 11) });
portrait("avatar-1.svg", 400, 400, people.sofia, { scale: 1.25, dy: 150, bg: ["#e9e2d6", "#cfc5b5"] });
portrait("avatar-2.svg", 400, 400, people.marcus, { scale: 1.25, dy: 150, bg: ["#d8e0e8", "#b9c6d3"] });
portrait("avatar-3.svg", 400, 400, people.emma, { scale: 1.25, dy: 150, bg: ["#efe0e2", "#d9c2c6"] });

// About: wide photo (16:9) — person at a desk with a laptop and plants
{
  const w = 1600, h = 900;
  const body = `<rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${leaves(w, h * 0.9, 40, 21)}
  <rect x="0" y="640" width="${w}" height="260" fill="#2b2522"/>
  <rect x="0" y="630" width="${w}" height="20" fill="#3a322d"/>
  <g transform="translate(480 10) scale(1.6)">${person(owner)}</g>
  <path d="M470 640L520 470H1030L1080 640Z" fill="#1b1d21"/>
  <rect x="520" y="470" width="510" height="8" fill="#2c2f35"/>
  <circle cx="775" cy="560" r="20" fill="#f2f2f2" opacity="0.85"/>
  <path d="M1210 640V560C1210 540 1270 540 1270 560V640Z" fill="#d6d0c7"/><path d="M1270 575C1300 575 1300 615 1270 615" stroke="#d6d0c7" stroke-width="10" fill="none"/>
  <path d="M1240 540C1230 520 1250 510 1240 490M1255 540C1245 520 1265 510 1255 490" stroke="#ddd" stroke-width="4" fill="none" opacity="0.5"/>
  <rect x="200" y="560" width="120" height="80" rx="10" fill="#6e5a48"/><path d="M260 560C230 470 180 440 150 430M260 560C270 470 320 430 360 420M260 560C250 500 260 460 270 420" stroke="#4d7255" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  save("about-wide.svg", svg(w, h, body, lin("bg", "#2a3a2e", "#121814", 0.2, 1)));
}

// Portfolio (square scenes)
const pf = {
  "pf-mountains.svg": (s) => `<rect width="${s}" height="${s}" fill="url(#sky)"/><circle cx="${s * 0.72}" cy="${s * 0.28}" r="${s * 0.09}" fill="#ffe7b8"/>
    <path d="M0 ${s * 0.7}L${s * 0.25} ${s * 0.38}L${s * 0.42} ${s * 0.58}L${s * 0.62} ${s * 0.3}L${s} ${s * 0.72}V${s}H0Z" fill="#46536a"/>
    <path d="M${s * 0.62} ${s * 0.3}L${s * 0.7} ${s * 0.4}L${s * 0.64} ${s * 0.38}L${s * 0.58} ${s * 0.42}Z" fill="#fff" opacity="0.85"/>
    <path d="M0 ${s * 0.82}C${s * 0.3} ${s * 0.7} ${s * 0.6} ${s * 0.9} ${s} ${s * 0.78}V${s}H0Z" fill="#26303f"/>`,
  "pf-camera.svg": (s) => `<rect width="${s}" height="${s}" fill="#e9e4dc"/><rect x="${s * 0.18}" y="${s * 0.34}" width="${s * 0.64}" height="${s * 0.4}" rx="30" fill="#1d1d1f"/>
    <rect x="${s * 0.26}" y="${s * 0.27}" width="${s * 0.16}" height="${s * 0.09}" rx="10" fill="#1d1d1f"/><circle cx="${s * 0.5}" cy="${s * 0.54}" r="${s * 0.15}" fill="#2e2e32"/>
    <circle cx="${s * 0.5}" cy="${s * 0.54}" r="${s * 0.11}" fill="url(#lens)"/><circle cx="${s * 0.46}" cy="${s * 0.5}" r="${s * 0.025}" fill="#fff" opacity="0.7"/>
    <circle cx="${s * 0.74}" cy="${s * 0.4}" r="${s * 0.02}" fill="#c0392b"/><rect x="${s * 0.62}" y="${s * 0.3}" width="${s * 0.1}" height="${s * 0.04}" rx="6" fill="#3a3a3e"/>`,
  "pf-architecture.svg": (s) => `<rect width="${s}" height="${s}" fill="url(#sky)"/>` +
    Array.from({ length: 9 }, (_, i) => `<path d="M${i * s * 0.12 - 20} ${s}L${i * s * 0.12 + s * 0.08} ${s * 0.12 + (i % 3) * 30}L${i * s * 0.12 + s * 0.14} ${s * 0.14 + (i % 3) * 30}L${i * s * 0.12 + 40} ${s}Z" fill="${i % 2 ? "#e8e8e8" : "#c7ccd4"}"/>`).join("") +
    `<rect y="${s * 0.86}" width="${s}" height="${s * 0.14}" fill="#8b94a3"/>`,
  "pf-workspace.svg": (s) => `<rect width="${s}" height="${s}" fill="#d9d4cc"/><rect y="${s * 0.62}" width="${s}" height="${s * 0.38}" fill="#8a6f58"/>
    <rect x="${s * 0.22}" y="${s * 0.24}" width="${s * 0.56}" height="${s * 0.34}" rx="14" fill="#1f2226"/><rect x="${s * 0.25}" y="${s * 0.27}" width="${s * 0.5}" height="${s * 0.28}" rx="6" fill="url(#screen)"/>
    <rect x="${s * 0.14}" y="${s * 0.6}" width="${s * 0.72}" height="${s * 0.04}" rx="10" fill="#bfc3c9"/>
    <rect x="${s * 0.3}" y="${s * 0.33}" width="${s * 0.22}" height="12" rx="6" fill="#fff" opacity="0.8"/><rect x="${s * 0.3}" y="${s * 0.37}" width="${s * 0.32}" height="10" rx="5" fill="#fff" opacity="0.4"/>
    <rect x="${s * 0.3}" y="${s * 0.43}" width="${s * 0.12}" height="${s * 0.07}" rx="6" fill="${P}"/>
    <path d="M${s * 0.84} ${s * 0.62}V${s * 0.52}C${s * 0.84} ${s * 0.49} ${s * 0.92} ${s * 0.49} ${s * 0.92} ${s * 0.52}V${s * 0.62}Z" fill="#f4f1ea"/>`,
  "pf-brand.svg": (s) => `<rect width="${s}" height="${s}" fill="#1a1a1c"/><rect x="${s * 0.16}" y="${s * 0.22}" width="${s * 0.42}" height="${s * 0.56}" rx="8" fill="#f1ede6" transform="rotate(-8 ${s * 0.37} ${s * 0.5})"/>
    <rect x="${s * 0.44}" y="${s * 0.26}" width="${s * 0.4}" height="${s * 0.26}" rx="8" fill="${P}" transform="rotate(6 ${s * 0.64} ${s * 0.39})"/>
    <circle cx="${s * 0.35}" cy="${s * 0.42}" r="${s * 0.08}" fill="#1a1a1c" transform="rotate(-8 ${s * 0.37} ${s * 0.5})"/>
    <text x="${s * 0.64}" y="${s * 0.42}" font-family="${FONT}" font-weight="700" font-size="${s * 0.06}" fill="#1a1a1c" text-anchor="middle" transform="rotate(6 ${s * 0.64} ${s * 0.39})">NORD</text>
    <rect x="${s * 0.5}" y="${s * 0.6}" width="${s * 0.3}" height="${s * 0.2}" rx="8" fill="#e6e1d8" transform="rotate(-4 ${s * 0.65} ${s * 0.7})"/>`,
  "pf-mobile.svg": (s) => `<rect width="${s}" height="${s}" fill="url(#warm)"/>
    <g transform="rotate(-10 ${s * 0.4} ${s * 0.5})"><rect x="${s * 0.26}" y="${s * 0.16}" width="${s * 0.26}" height="${s * 0.56}" rx="30" fill="#111"/><rect x="${s * 0.28}" y="${s * 0.19}" width="${s * 0.22}" height="${s * 0.5}" rx="20" fill="#f5f5f5"/>
    <rect x="${s * 0.3}" y="${s * 0.24}" width="${s * 0.18}" height="${s * 0.12}" rx="10" fill="${P}"/><rect x="${s * 0.3}" y="${s * 0.39}" width="${s * 0.14}" height="10" rx="5" fill="#bbb"/><rect x="${s * 0.3}" y="${s * 0.43}" width="${s * 0.18}" height="10" rx="5" fill="#ddd"/></g>
    <g transform="rotate(8 ${s * 0.62} ${s * 0.52})"><rect x="${s * 0.5}" y="${s * 0.24}" width="${s * 0.26}" height="${s * 0.56}" rx="30" fill="#111"/><rect x="${s * 0.52}" y="${s * 0.27}" width="${s * 0.22}" height="${s * 0.5}" rx="20" fill="#20232a"/>
    <circle cx="${s * 0.63}" cy="${s * 0.42}" r="${s * 0.06}" fill="none" stroke="${P}" stroke-width="10"/><rect x="${s * 0.55}" y="${s * 0.54}" width="${s * 0.16}" height="10" rx="5" fill="#555"/></g>`,
};
const pfDefs = lin("sky", "#9fb3c8", "#e9eef3", 0, 1) + rad("lens", "#4b6cb7", "#0b0b10", 0.4, 0.4, 0.6) + lin("screen", "#2c3e50", "#4ca1af") + lin("warm", "#f3d9b1", "#e8b28a");
for (const [file, draw] of Object.entries(pf)) save(file, svg(1000, 1000, draw(1000), pfDefs));

// News covers (3:2)
const news = {
  "news-sneakers.svg": (w, h) => `<rect width="${w}" height="${h}" fill="#a9a39a"/><path d="M0 ${h * 0.55}L${w} ${h * 0.25}V${h}H0Z" fill="#8f8a82"/>
    <path d="M${w * 0.1} ${h * 0.95}L${w * 0.45} ${h * 0.5}L${w * 0.58} ${h * 0.58}L${w * 0.25} ${h}Z" fill="#35506e"/>
    <path d="M${w * 0.5} ${h * 0.52}C${w * 0.56} ${h * 0.4} ${w * 0.66} ${h * 0.36} ${w * 0.74} ${h * 0.4}L${w * 0.82} ${h * 0.5}C${w * 0.78} ${h * 0.6} ${w * 0.64} ${h * 0.64} ${w * 0.56} ${h * 0.62}Z" fill="#1d1d1f"/>
    <path d="M${w * 0.54} ${h * 0.6}C${w * 0.64} ${h * 0.64} ${w * 0.78} ${h * 0.6} ${w * 0.83} ${h * 0.51}L${w * 0.85} ${h * 0.55}C${w * 0.79} ${h * 0.66} ${w * 0.63} ${h * 0.69} ${w * 0.53} ${h * 0.64}Z" fill="#f2f2f2"/>`,
  "news-compass.svg": (w, h) => `<rect width="${w}" height="${h}" fill="url(#dark)"/><circle cx="${w * 0.5}" cy="${h * 0.48}" r="${h * 0.26}" fill="#caa46a"/><circle cx="${w * 0.5}" cy="${h * 0.48}" r="${h * 0.22}" fill="#f4efe6"/>
    <path d="M${w * 0.5} ${h * 0.3}L${w * 0.52} ${h * 0.48}L${w * 0.5} ${h * 0.66}L${w * 0.48} ${h * 0.48}Z" fill="#c0392b"/><circle cx="${w * 0.5}" cy="${h * 0.48}" r="8" fill="#333"/>
    <path d="M${w * 0.3} ${h}C${w * 0.3} ${h * 0.75} ${w * 0.36} ${h * 0.66} ${w * 0.42} ${h * 0.7}L${w * 0.62} ${h * 0.7}C${w * 0.7} ${h * 0.72} ${w * 0.72} ${h * 0.85} ${w * 0.7} ${h}Z" fill="#d7a37f"/>`,
  "news-cat.svg": (w, h) => `<rect width="${w}" height="${h}" fill="#9c958c"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${i * w * 0.15 - w * 0.2} ${h}L${i * w * 0.15 + w * 0.1} 0H${i * w * 0.15 + w * 0.16}L${i * w * 0.15 - w * 0.14} ${h}Z" fill="#8a847b"/>`).join("") +
    `<path d="M${w * 0.38} ${h * 0.35}L${w * 0.42} ${h * 0.18}L${w * 0.48} ${h * 0.3}H${w * 0.56}L${w * 0.62} ${h * 0.18}L${w * 0.64} ${h * 0.35}C${w * 0.68} ${h * 0.45} ${w * 0.66} ${h * 0.6} ${w * 0.51} ${h * 0.62}C${w * 0.36} ${h * 0.6} ${w * 0.34} ${h * 0.45} ${w * 0.38} ${h * 0.35}Z" fill="#e3c9a8"/>
    <circle cx="${w * 0.46}" cy="${h * 0.42}" r="10" fill="#2f4f2f"/><circle cx="${w * 0.57}" cy="${h * 0.42}" r="10" fill="#2f4f2f"/><path d="M${w * 0.5} ${h * 0.5}l12 0-6 8z" fill="#c77"/>
    <path d="M${w * 0.34} ${h}C${w * 0.34} ${h * 0.7} ${w * 0.68} ${h * 0.7} ${w * 0.68} ${h}Z" fill="#e3c9a8"/>`,
  "news-studio.svg": (w, h) => `<rect width="${w}" height="${h}" fill="url(#dark)"/><path d="M${w * 0.2} 0L${w * 0.35} ${h * 0.3}H${w * 0.05}Z" fill="#ffe7b8" opacity="0.18"/>
    <path d="M${w * 0.2} 0V${h * 0.14}" stroke="#777" stroke-width="4"/><path d="M${w * 0.14} ${h * 0.14}H${w * 0.26}L${w * 0.23} ${h * 0.2}H${w * 0.17}Z" fill="#ddd"/>
    <rect x="${w * 0.45}" y="${h * 0.3}" width="${w * 0.4}" height="${h * 0.3}" rx="12" fill="#2a2d33"/><rect x="${w * 0.47}" y="${h * 0.33}" width="${w * 0.36}" height="${h * 0.24}" rx="6" fill="url(#screen)"/>
    <rect x="${w * 0.62}" y="${h * 0.6}" width="${w * 0.06}" height="${h * 0.1}" fill="#444"/><rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="#3a2f29"/>
    <path d="M${w * 0.14} ${h * 0.78}C${w * 0.14} ${h * 0.68} ${w * 0.3} ${h * 0.68} ${w * 0.3} ${h * 0.78}" stroke="#bbb" stroke-width="16" fill="none"/>`,
};
const newsDefs = lin("dark", "#2b2b2f", "#0e0e10") + lin("screen", "#2c3e50", "#4ca1af");
for (const [file, draw] of Object.entries(news)) save(file, svg(1200, 800, draw(1200, 800), newsDefs));

// Client logos (wordmarks)
const logos = [
  ["logo-nord.svg", "NORD", "circle"],
  ["logo-atlas.svg", "ATLAS", "tri"],
  ["logo-lumen.svg", "lumen", "dot"],
  ["logo-kite.svg", "KITE", "diamond"],
  ["logo-orbit.svg", "orbit", "ring"],
  ["logo-vela.svg", "VELA", "bar"],
];
const mark = {
  circle: `<circle cx="34" cy="40" r="18" fill="currentColor"/>`,
  tri: `<path d="M16 56L34 22L52 56Z" fill="currentColor"/>`,
  dot: `<circle cx="26" cy="40" r="10" fill="currentColor"/><circle cx="46" cy="40" r="10" fill="currentColor" opacity="0.5"/>`,
  diamond: `<path d="M34 20L52 40L34 60L16 40Z" fill="currentColor"/>`,
  ring: `<circle cx="34" cy="40" r="16" fill="none" stroke="currentColor" stroke-width="7"/>`,
  bar: `<rect x="16" y="24" width="10" height="32" rx="3" fill="currentColor"/><rect x="30" y="30" width="10" height="26" rx="3" fill="currentColor"/><rect x="44" y="18" width="10" height="38" rx="3" fill="currentColor"/>`,
};
for (const [file, word, m] of logos) {
  save(file, `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80" viewBox="0 0 240 80" color="#7a7a7a">${mark[m]}<text x="66" y="52" font-family="${FONT}" font-size="32" font-weight="700" letter-spacing="2" fill="currentColor">${word}</text></svg>`);
}

// Awards (16:10)
const awards = [
  ["award-1.svg", "SITE OF THE DAY", "#f2b35b"],
  ["award-2.svg", "TOP RATED", "#d9d9d9"],
  ["award-3.svg", "CERTIFIED", "#b08d57"],
];
for (const [file, label, c] of awards) {
  save(file, svg(800, 500, `<rect width="800" height="500" fill="url(#bg)"/><circle cx="400" cy="210" r="110" fill="none" stroke="${c}" stroke-width="10"/><circle cx="400" cy="210" r="80" fill="${c}"/>
  <path d="M400 160L414 196H452L421 218L433 254L400 232L367 254L379 218L348 196H386Z" fill="#1a1a1c"/>
  <path d="M340 300L310 390L350 370L370 410L400 320M460 300L490 390L450 370L430 410L400 320" fill="${c}" opacity="0.8"/>
  <text x="400" y="460" font-family="${FONT}" font-size="30" font-weight="700" letter-spacing="6" fill="#eaeaea" text-anchor="middle">${label}</text>`, lin("bg", "#222226", "#101012")));
}

console.log("demo assets written to public/demo");
