"use strict";
var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx3(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs2(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx3;
      module.exports.jsxs = jsxs2;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs2 : jsx3)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = window.DevartUI;
    }
  });

  // .design-sync/.cache/previews/Colors.tsx
  var Colors_exports = {};
  __export(Colors_exports, {
    Default: () => Default2,
    PrimitiveRamps: () => PrimitiveRamps2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Foundations/Colors.stories.tsx
  var Colors_stories_exports = {};
  __export(Colors_stories_exports, {
    Default: () => Default,
    PrimitiveRamps: () => PrimitiveRamps,
    default: () => Colors_stories_default
  });
  init_define_import_meta_env();

  // src/components/Foundations/index.tsx
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());

  // src/lib/constants.ts
  init_define_import_meta_env();
  var THEME_COLORS = {
    // Semantic + component tokens. Primitives intentionally NOT exposed here.
    // Spec: changes/colors.md.
    brand: {
      primary: "hsl(var(--brand-primary) / <alpha-value>)",
      secondary: "hsl(var(--brand-secondary) / <alpha-value>)",
      tertiary: "hsl(var(--brand-tertiary) / <alpha-value>)",
      hover: "hsl(var(--brand-hover) / <alpha-value>)",
      press: "hsl(var(--brand-press) / <alpha-value>)"
    },
    ink: {
      primary: "hsl(var(--ink-primary) / <alpha-value>)",
      body: "hsl(var(--ink-body) / <alpha-value>)",
      secondary: "hsl(var(--ink-secondary) / <alpha-value>)",
      inactive: "hsl(var(--ink-inactive) / <alpha-value>)",
      highlight: "hsl(var(--ink-highlight) / <alpha-value>)",
      icon: "hsl(var(--ink-icon) / <alpha-value>)",
      "icon-hover": "hsl(var(--ink-icon-hover) / <alpha-value>)"
    },
    surface: {
      page: "hsl(var(--surface-page) / <alpha-value>)",
      card: "hsl(var(--surface-card) / <alpha-value>)",
      card2: "hsl(var(--surface-card2) / <alpha-value>)",
      chips: "hsl(var(--surface-chips) / <alpha-value>)",
      accent: "hsl(var(--surface-accent) / <alpha-value>)"
    },
    stroke: {
      DEFAULT: "hsl(var(--stroke-border) / <alpha-value>)",
      hover: "hsl(var(--stroke-border-hover) / <alpha-value>)",
      "field-hover": "hsl(var(--field-border-hover) / <alpha-value>)"
    },
    table: {
      "header-bg": "hsl(var(--tbl-header-bg) / <alpha-value>)",
      // Overlays — bare var(), see the note on `state` above.
      "row-hover": "var(--tbl-row-hover)",
      "row-pressed": "var(--tbl-row-pressed)"
    },
    metrics: {
      "group-band": "hsl(var(--mx-group-band) / <alpha-value>)"
    },
    overlay: {
      scrim: "var(--overlay-scrim)"
    },
    // The Spotlight ring's washes — what `shadow-spotlight` is built of. Its
    // scrim is `overlay.scrim`. color-mix values: bare var(), no alpha modifier.
    spotlight: {
      halo: "var(--spotlight-halo)",
      glow: "var(--spotlight-glow)"
    },
    state: {
      // Relative overlays — color-mix() values that carry their own alpha, so
      // they are passed through bare. Wrapping one in hsl() emits invalid CSS
      // and the fill vanishes with no error. They also take no /alpha modifier.
      hover: "var(--state-hover)",
      pressed: "var(--state-pressed)",
      disabled: "hsl(var(--state-disabled) / <alpha-value>)",
      "focus-ring": "hsl(var(--state-focus-ring) / <alpha-value>)"
    },
    fb: {
      red: "hsl(var(--fb-red) / <alpha-value>)",
      "red-text": "hsl(var(--fb-red-text) / <alpha-value>)",
      "red-hover": "hsl(var(--fb-red-hover) / <alpha-value>)",
      "red-press": "hsl(var(--fb-red-press) / <alpha-value>)",
      "error-hover": "hsl(var(--fb-error-hover) / <alpha-value>)",
      "error-press": "hsl(var(--fb-error-press) / <alpha-value>)",
      attention: "hsl(var(--fb-attention) / <alpha-value>)",
      green: "hsl(var(--fb-green) / <alpha-value>)",
      "green-text": "hsl(var(--fb-green-text) / <alpha-value>)",
      info: "hsl(var(--fb-info) / <alpha-value>)"
    },
    // Syntax colours for highlighted code — CodeBlock's `codeSyntaxVariants`.
    code: {
      keyword: "hsl(var(--code-keyword) / <alpha-value>)",
      string: "hsl(var(--code-string) / <alpha-value>)",
      number: "hsl(var(--code-number) / <alpha-value>)",
      comment: "hsl(var(--code-comment) / <alpha-value>)"
    },
    logo: {
      ink: "hsl(var(--logo-ink) / <alpha-value>)",
      mark: "hsl(var(--logo-mark) / <alpha-value>)"
    },
    avatar: {
      bg: "hsl(var(--avatar-bg) / <alpha-value>)"
    },
    destructiveTertiary: {
      // color-mix values (bare var) — NOT wrapped in hsl(), and they take no
      // opacity modifier. The ratio differs per theme; see globals.css.
      "bg-hover": "var(--btn-destructive-tertiary-bg-hover)",
      "bg-press": "var(--btn-destructive-tertiary-bg-press)"
    },
    btn: {
      "primary-bg": "hsl(var(--btn-primary-bg) / <alpha-value>)",
      "primary-bg-hover": "hsl(var(--btn-primary-bg-hover) / <alpha-value>)",
      "primary-bg-press": "hsl(var(--btn-primary-bg-press) / <alpha-value>)",
      "primary-text": "hsl(var(--btn-primary-text) / <alpha-value>)",
      // color-mix value — no alpha channel substitution
      "secondary-bg-hover": "var(--btn-secondary-bg-hover)",
      "secondary-bg-press": "var(--btn-secondary-bg-press)",
      "secondary-border": "hsl(var(--btn-secondary-border) / <alpha-value>)",
      "secondary-bg": "hsl(var(--btn-secondary-bg) / <alpha-value>)",
      "secondary-border-hover": "hsl(var(--btn-secondary-border-hover) / <alpha-value>)",
      "primary-tertiary-text": "hsl(var(--btn-primary-tertiary-text) / <alpha-value>)",
      "primary-tertiary-text-hover": "hsl(var(--btn-primary-tertiary-text-hover) / <alpha-value>)",
      "primary-tertiary-text-press": "hsl(var(--btn-primary-tertiary-text-press) / <alpha-value>)",
      "outline-bg-hover": "var(--btn-outline-bg-hover)",
      "outline-bg-press": "var(--btn-outline-bg-press)"
    },
    outlineDestructive: {
      border: "hsl(var(--btn-outline-destructive-border) / <alpha-value>)",
      "border-hover": "hsl(var(--btn-outline-destructive-border-hover) / <alpha-value>)",
      // color-mix values (bare var) — NOT wrapped in hsl(); they are not HSL
      // triplets, so an hsl() wrapper would produce invalid CSS.
      "bg-hover": "var(--btn-outline-destructive-bg-hover)",
      "bg-press": "var(--btn-outline-destructive-bg-press)"
    },
    badge: {
      "primary-bg": "hsl(var(--badge-primary-bg) / <alpha-value>)",
      "primary-text": "hsl(var(--badge-primary-text) / <alpha-value>)",
      "secondary-bg": "hsl(var(--badge-secondary-bg) / <alpha-value>)",
      "secondary-text": "hsl(var(--badge-secondary-text) / <alpha-value>)",
      "chip-bg": "hsl(var(--badge-chip-bg) / <alpha-value>)",
      "chip-text": "hsl(var(--badge-chip-text) / <alpha-value>)",
      // The shared hairline — color-mix from currentColor, so no hsl() wrapper
      border: "var(--badge-border)",
      // color-mix values (opaque tints) — no alpha channel substitution
      "brand-bg": "var(--badge-brand-bg)",
      "brand-border": "var(--badge-brand-border)",
      "brand-text": "var(--badge-brand-text)",
      "green-bg": "var(--badge-green-bg)",
      "green-border": "var(--badge-green-border)",
      "green-text": "var(--badge-green-text)"
    },
    switch: {
      "off-bg": "hsl(var(--switch-off-bg) / <alpha-value>)",
      "off-bg-hover": "hsl(var(--switch-off-bg-hover) / <alpha-value>)"
    },
    // color-mix values (variant-tinted alert surfaces) — no alpha substitution
    alert: {
      "bg-success": "var(--alert-bg-success)",
      "bg-info": "var(--alert-bg-info)",
      "bg-warning": "var(--alert-bg-warning)",
      "bg-error": "var(--alert-bg-error)",
      "border-success": "var(--alert-border-success)",
      "border-info": "var(--alert-border-info)",
      "border-warning": "var(--alert-border-warning)",
      "border-error": "var(--alert-border-error)"
    },
    // color-mix values (variant-tinted toast surfaces) — no alpha substitution
    toast: {
      "bg-success": "var(--toast-bg-success)",
      "bg-info": "var(--toast-bg-info)",
      "bg-warning": "var(--toast-bg-warning)",
      "bg-error": "var(--toast-bg-error)",
      "border-success": "var(--toast-border-success)",
      "border-info": "var(--toast-border-info)",
      "border-warning": "var(--toast-border-warning)",
      "border-error": "var(--toast-border-error)"
    },
    // color-mix value — no alpha channel substitution
    segctrl: {
      "hover-bg": "var(--segctrl-btn-hover-bg)"
    },
    tbl: {
      // Overlays — bare var(), see the note on `state` above.
      "row-hover": "var(--tbl-row-hover)",
      "row-pressed": "var(--tbl-row-pressed)"
    },
    "content-on-solid": "hsl(var(--content-on-solid) / <alpha-value>)",
    "focus-ring-brand": "hsl(var(--focus-ring-brand) / <alpha-value>)",
    "input-focus": "hsl(var(--input-focus) / <alpha-value>)",
    "input-error": "hsl(var(--input-error) / <alpha-value>)",
    "icon-wrapper-bg": "var(--icon-wrapper-bg)",
    banner: {
      "grad-text": "hsl(var(--banner-grad-text) / <alpha-value>)",
      "grad-btn-text": "hsl(var(--banner-grad-btn-text) / <alpha-value>)",
      "grad-sub": "var(--banner-grad-sub)",
      "grad-ic-bg": "var(--banner-grad-ic-bg)",
      "grad-ic-border": "var(--banner-grad-ic-border)",
      "grad-ic-shadow": "var(--banner-grad-ic-shadow)"
    },
    // color-mix values — no alpha channel substitution
    "card-border-hover": "var(--card-border-hover)",
    "card-border-press": "var(--card-border-press)",
    "card-lift-border": "var(--card-lift-border)",
    link: {
      underline: "var(--link-underline)"
    },
    plan: {
      "card-featured-border": "var(--plan-card-featured-border)"
    },
    "ds-card": {
      scrim: "var(--ds-card-scrim)"
    },
    dropzone: {
      border: "hsl(var(--dropzone-border) / <alpha-value>)",
      "border-active": "var(--dropzone-border-active)",
      "bg-active": "var(--dropzone-bg-active)"
    }
  };

  // src/lib/cva.ts
  init_define_import_meta_env();

  // node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
  init_define_import_meta_env();

  // node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
  init_define_import_meta_env();
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
  var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
  var cx = clsx;
  var cva = (base, config) => (props) => {
    var _config_compoundVariants;
    if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    const { variants, defaultVariants } = config;
    const getVariantClassNames = Object.keys(variants).map((variant) => {
      const variantProp = props === null || props === void 0 ? void 0 : props[variant];
      const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
      if (variantProp === null) return null;
      const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
      return variants[variant][variantKey];
    });
    const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
      let [key, value] = param;
      if (value === void 0) {
        return acc;
      }
      acc[key] = value;
      return acc;
    }, {});
    const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
      let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
      return Object.entries(compoundVariantOptions).every((param2) => {
        let [key, value] = param2;
        return Array.isArray(value) ? value.includes({
          ...defaultVariants,
          ...propsWithoutUndefined
        }[key]) : {
          ...defaultVariants,
          ...propsWithoutUndefined
        }[key] === value;
      }) ? [
        ...acc,
        cvClass,
        cvClassName
      ] : acc;
    }, []);
    return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  };

  // src/lib/cva.ts
  var cva2 = (...args) => Object.assign(cva(...args), {
    config: args[1]
  });

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Typography_default = g["Typography"] !== void 0 ? g["Typography"] : g;

  // src/components/Foundations/tokens.ts
  init_define_import_meta_env();
  var TRIPLET = /^-?[\d.]+ [\d.]+% [\d.]+%$/;
  var ALIAS = /^var\(\s*(--[\w-]+)\s*\)$/;
  var ALPHA_ALIAS = /^hsl\(\s*var\(\s*(--[\w-]+)\s*\)\s*\/\s*([^)]+)\)$/;
  function declarationsFor(selector) {
    const out = {};
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try {
        rules = Array.from(sheet.cssRules);
      } catch {
        continue;
      }
      for (const rule of rules) {
        if (!(rule instanceof CSSStyleRule) || rule.selectorText !== selector) {
          continue;
        }
        for (const prop of Array.from(rule.style)) {
          if (prop.startsWith("--")) {
            out[prop] = rule.style.getPropertyValue(prop).trim();
          }
        }
      }
    }
    return out;
  }
  var lightDecls = () => declarationsFor(":root");
  var darkDecls = () => declarationsFor(".dark");
  var isPrimitive = (value) => TRIPLET.test(value);
  function aliasOf(value) {
    const plain = ALIAS.exec(value)?.[1];
    if (plain) return plain.replace(/^--/, "");
    const alpha = ALPHA_ALIAS.exec(value);
    if (alpha) return `${alpha[1]?.replace(/^--/, "")} / ${alpha[2]?.trim()}`;
    return null;
  }
  function ramps(decls) {
    const byRamp = /* @__PURE__ */ new Map();
    for (const [name, value] of Object.entries(decls)) {
      if (!isPrimitive(value)) continue;
      const step = /-(\d+)(-soft)?$/.exec(name);
      const ramp = step ? name.slice(0, step.index) : name;
      const list = byRamp.get(ramp);
      if (list) list.push(name);
      else byRamp.set(ramp, [name]);
    }
    return Array.from(byRamp, ([ramp, names]) => [
      ramp.replace(/^--/, ""),
      names
    ]);
  }
  function resolved(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function tripletToHex(triplet) {
    const [h = Number.NaN, s = Number.NaN, l = Number.NaN] = triplet.replace(/%/g, "").split(/\s+/).map((n) => Number.parseFloat(n));
    if ([h, s, l].some(Number.isNaN)) return "";
    const a = s / 100 * Math.min(l / 100, 1 - l / 100);
    const channel = (n) => {
      const k = (n + h / 30) % 12;
      const v = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
      return Math.round(255 * v).toString(16).padStart(2, "0");
    };
    return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
  }

  // src/components/Foundations/index.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var gridVariants = cva2("grid gap-x-3 gap-y-2", {
    variants: {
      wide: {
        true: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
        false: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
      }
    },
    defaultVariants: { wide: false }
  });
  function Grid({ children, wide }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: gridVariants({ wide }), children });
  }
  function Group({ title, children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "h3", textColor: "secondary", textStyle: "overline", children: title }),
      children
    ] });
  }
  function useTokenGraph() {
    const [graph, setGraph] = (0, import_react.useState)({ light: {}, dark: {}, hex: {} });
    (0, import_react.useEffect)(() => {
      const read = () => {
        const light = lightDecls();
        const hex = {};
        for (const [, names] of ramps(light)) {
          for (const name of names) hex[name] = tripletToHex(resolved(name));
        }
        setGraph({ light, dark: darkDecls(), hex });
      };
      read();
      const observer = new MutationObserver(read);
      observer.observe(document.documentElement, {
        attributeFilter: ["class", "data-palette"]
      });
      return () => observer.disconnect();
    }, []);
    return graph;
  }
  function PrimitiveSwatch({ name, hex }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "span",
        {
          "aria-hidden": true,
          className: "size-6 shrink-0 rounded border border-stroke",
          style: { background: `hsl(var(${name}))` }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex min-w-0 flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { className: "truncate", element: "span", textStyle: "body12", children: name.replace(/^--/, "") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Typography_exports.Typography,
          {
            className: "truncate tabular-nums",
            element: "span",
            textColor: "secondary",
            textStyle: "body12",
            children: hex
          }
        )
      ] })
    ] });
  }
  function Primitives() {
    const { light, hex } = useTokenGraph();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-4", children: ramps(light).map(([ramp, names]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { title: ramp, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: names.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimitiveSwatch, { hex: hex[name] ?? "", name }, name)) }) }, ramp)) });
  }
  function lineage(cssName, light, dark) {
    const describe = (value) => {
      if (!value) return "";
      const alias = aliasOf(value);
      if (alias) return alias;
      if (value.startsWith("color-mix")) return "color-mix";
      if (/^\d/.test(value)) return tripletToHex(value);
      return value;
    };
    const l = describe(light[cssName]);
    const d = describe(dark[cssName]);
    return { light: l, dark: d && d !== l ? d : "" };
  }
  function Swatch({
    name,
    value,
    light,
    dark
  }) {
    const css = value.replace("<alpha-value>", "1");
    const cssName = /--[\w-]+/.exec(value)?.[0] ?? "";
    const from = lineage(cssName, light, dark);
    const source = from.light ? `${from.light}${from.dark ? ` · dark ${from.dark}` : ""}` : `dark only: ${from.dark}`;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "span",
        {
          "aria-hidden": true,
          className: "size-6 shrink-0 rounded border border-stroke",
          style: { background: css }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex min-w-0 flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { className: "truncate", element: "span", textStyle: "body12", children: name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Typography_exports.Typography,
          {
            className: "truncate",
            element: "span",
            textColor: "secondary",
            textStyle: "body12",
            title: `${cssName}: ${source}`,
            children: source
          }
        )
      ] })
    ] });
  }
  function colorGroups() {
    const loose = [];
    const groups = [];
    for (const [key, value] of Object.entries(THEME_COLORS)) {
      if (typeof value === "string") {
        loose.push([key, value]);
        continue;
      }
      const entries = Object.entries(value).map(
        ([k, v]) => [k === "DEFAULT" ? key : `${key}-${k}`, v]
      );
      groups.push([key, entries]);
    }
    if (loose.length) groups.push(["standalone", loose]);
    return groups;
  }
  function Colors() {
    const { light, dark } = useTokenGraph();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-4", children: colorGroups().map(([group, entries]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { title: group, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { wide: true, children: entries.map(([name, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Swatch,
      {
        dark,
        light,
        name,
        value
      },
      name
    )) }) }, group)) });
  }

  // src/components/Foundations/Colors.stories.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var meta = {
    title: "Foundations/Colors",
    component: Colors,
    tags: ["autodocs"],
    parameters: { layout: "padded" }
  };
  var Colors_stories_default = meta;
  var Default = {};
  var PrimitiveRamps = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Primitives, {})
  };

  // .design-sync/.cache/previews/Colors.tsx
  function compose(S, key) {
    const meta2 = S.default ?? {};
    const st = S[key];
    const args = { ...meta2.args ?? {}, ...st && st.args ? st.args : {} };
    const at = { ...meta2.argTypes ?? {}, ...st && st.argTypes ? st.argTypes : {} };
    for (const k of Object.keys(args)) {
      const m = at[k] && at[k].mapping;
      if (m && typeof m === "object" && args[k] in m) args[k] = m[args[k]];
    }
    const title = typeof meta2.title === "string" ? meta2.title : "";
    const ctx = {
      args,
      name: key,
      title,
      kind: title,
      id: "",
      componentId: "",
      globals: {},
      viewMode: "story",
      parameters: (st && st.parameters) ?? meta2.parameters ?? {}
    };
    let render = null;
    if (st && typeof st.render === "function") render = () => st.render(args, ctx);
    else if (typeof st === "function") render = () => st(args, ctx);
    else if (typeof meta2.render === "function") render = () => meta2.render(args, ctx);
    else {
      const C = st && st.component || meta2.component;
      if (C) render = () => React.createElement(C, args);
    }
    if (!render) return () => null;
    const decorators = [].concat((st && st.decorators) ?? []).concat(meta2.decorators ?? []);
    return decorators.reduce((inner, dec) => () => {
      const out = dec(inner, ctx);
      return out === void 0 ? inner() : out;
    }, render);
  }
  var Default2 = (
    /* Default */
    compose(Colors_stories_exports, "Default")
  );
  var PrimitiveRamps2 = (
    /* Primitive Ramps */
    compose(Colors_stories_exports, "PrimitiveRamps")
  );
  return __toCommonJS(Colors_exports);
})();
