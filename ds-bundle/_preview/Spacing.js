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
      function jsx2(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs2(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs2;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs2 : jsx2)(t, p, k);
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

  // .design-sync/.cache/previews/Spacing.tsx
  var Spacing_exports = {};
  __export(Spacing_exports, {
    Default: () => Default2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Foundations/Spacing.stories.tsx
  var Spacing_stories_exports = {};
  __export(Spacing_stories_exports, {
    Default: () => Default,
    default: () => Spacing_stories_default
  });
  init_define_import_meta_env();

  // src/components/Foundations/index.tsx
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());

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
  function Group({ title, children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "h3", textColor: "secondary", textStyle: "overline", children: title }),
      children
    ] });
  }
  var SPACING = [
    ["1", 4, ""],
    ["2", 8, "tight cluster"],
    ["3", 12, ""],
    ["4", 16, "related elements"],
    ["5", 20, ""],
    ["6", 24, "page padding, and the gap between sections"],
    ["8", 32, ""],
    ["10", 40, ""],
    ["12", 48, ""],
    ["16", 64, ""],
    ["20", 80, ""],
    ["24", 96, ""]
  ];
  var HALF_STEPS = [
    ["px", 1, "Card — the lift on hover"],
    ["0.5", 2, "SidebarMenu — between nav rows"],
    ["1.5", 6, "Button sm — glyph to label"],
    ["2.5", 10, "SidebarFooter — the row own inset"],
    ["3.5", 14, ""]
  ];
  function Step({
    step,
    px,
    use,
    max
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Typography_exports.Typography,
        {
          className: "w-10 shrink-0 text-end tabular-nums",
          element: "span",
          textStyle: "body12",
          children: step
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        ds_Typography_exports.Typography,
        {
          className: "w-10 shrink-0 tabular-nums",
          element: "span",
          textColor: "secondary",
          textStyle: "body12",
          children: [
            px,
            "px"
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "span",
        {
          className: "hidden shrink-0 sm:block",
          style: { width: `${max}px` },
          "aria-hidden": true,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: "block h-3 rounded-sm bg-brand-primary",
              style: { width: `${px}px` }
            }
          )
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Typography_exports.Typography,
        {
          className: "min-w-0 truncate",
          element: "span",
          textColor: use ? "secondary" : "light",
          textStyle: "body12",
          children: use || "—"
        }
      )
    ] });
  }
  function Rhythm({
    label,
    cls,
    children
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Typography_exports.Typography, { element: "span", textStyle: "body12", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { className: "rounded bg-surface-chips px-1 py-0.5 font-mono text-xxs", children: cls }),
        " ",
        label
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-md border border-stroke bg-surface-card", children })
    ] });
  }
  function Fill({ h = "h-6" }) {
    return (
      // A tint rather than `--surface-chips`: the block sits on a card and has
      // to read as content at a glance, or the gap it is there to show reads as
      // the whole box being empty.
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": true, className: `block rounded-sm bg-brand-primary/15 ${h}` })
    );
  }
  function Spacing() {
    const max = SPACING.at(-1)?.[1] ?? 96;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { title: "The scale — the number in p-*, m-*, gap-*, size-*", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-1.5", children: SPACING.map(([step, px, use]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, { max, px, step, use }, step)) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { title: "Half-steps — control internals only · one call site each", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-1.5", children: HALF_STEPS.map(([step, px, use]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, { max, px, step, use }, step)) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { title: "Page rhythm — the four states Spacing.md names", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rhythm, { cls: "gap-2", label: "a tight cluster", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-2 p-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fill, { h: "h-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fill, { h: "h-4" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rhythm, { cls: "gap-4", label: "related elements", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-4 p-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fill, { h: "h-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fill, { h: "h-4" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rhythm, { cls: "gap-6", label: "between sections", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-6 p-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fill, { h: "h-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fill, { h: "h-4" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rhythm, { cls: "p-6", label: "the page’s own padding", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fill, {}) }) })
      ] }) })
    ] });
  }

  // src/components/Foundations/Spacing.stories.tsx
  var meta = {
    title: "Foundations/Spacing",
    component: Spacing,
    tags: ["autodocs"],
    parameters: { layout: "padded" }
  };
  var Spacing_stories_default = meta;
  var Default = {};

  // .design-sync/.cache/previews/Spacing.tsx
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
    compose(Spacing_stories_exports, "Default")
  );
  return __toCommonJS(Spacing_exports);
})();
