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

  // .design-sync/.cache/previews/StatusMark.tsx
  var StatusMark_exports = {};
  __export(StatusMark_exports, {
    Default: () => Default2,
    Sizes: () => Sizes2,
    StatusLine: () => StatusLine2,
    Tones: () => Tones2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/StatusMark/StatusMark.stories.tsx
  var StatusMark_stories_exports = {};
  __export(StatusMark_stories_exports, {
    Default: () => Default,
    Sizes: () => Sizes,
    StatusLine: () => StatusLine,
    Tones: () => Tones,
    default: () => StatusMark_stories_default
  });
  init_define_import_meta_env();

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Typography_default = g["Typography"] !== void 0 ? g["Typography"] : g;

  // ds-shim:ds:StatusMark
  var ds_StatusMark_exports = {};
  __export(ds_StatusMark_exports, {
    default: () => ds_StatusMark_default
  });
  init_define_import_meta_env();
  __reExport(ds_StatusMark_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_StatusMark_default = g2["StatusMark"] !== void 0 ? g2["StatusMark"] : g2;

  // src/components/StatusMark/StatusMark.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/StatusMark",
    component: ds_StatusMark_exports.StatusMark,
    tags: ["autodocs"],
    args: { variant: "warning", size: "sm" },
    argTypes: {
      variant: {
        control: "inline-radio",
        options: ["neutral", "warning", "error"]
      },
      size: { control: "inline-radio", options: ["sm", "md"] },
      interactive: { control: false }
    },
    parameters: {
      docs: {
        description: {
          component: "The glyph that says a state and nothing else: the triangle for a warning, the cross in a circle for an error, the tick for success, the ⓘ for a note. Always decoration — `aria-hidden`, no focus, no words of its own, because the words beside it carry the meaning. A mark that has to explain itself is `IconHint`, which is a button and renders this inside it."
        }
      }
    }
  };
  var StatusMark_stories_default = meta;
  var Default = {};
  var Tones = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusMark_exports.StatusMark, { variant: "neutral" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusMark_exports.StatusMark, { variant: "warning" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusMark_exports.StatusMark, { variant: "error" })
    ] })
  };
  var Sizes = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusMark_exports.StatusMark, { size: "sm", variant: "error" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "span", textColor: "primary", textStyle: "body14", children: "14px, in a row" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusMark_exports.StatusMark, { size: "md", variant: "error" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "span", textColor: "primary", textStyle: "body16", children: "16px, beside a title" })
      ] })
    ] })
  };
  var StatusLine = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-5 items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusMark_exports.StatusMark, { variant: "warning" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "span", textColor: "primary", textStyle: "body14", children: "1 connection has nothing included yet." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-5 items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusMark_exports.StatusMark, { variant: "error" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "span", textColor: "primary", textStyle: "body14", children: "Connection to host failed. The host is not reachable." })
      ] })
    ] })
  };

  // .design-sync/.cache/previews/StatusMark.tsx
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
    compose(StatusMark_stories_exports, "Default")
  );
  var Tones2 = (
    /* Tones */
    compose(StatusMark_stories_exports, "Tones")
  );
  var Sizes2 = (
    /* Sizes */
    compose(StatusMark_stories_exports, "Sizes")
  );
  var StatusLine2 = (
    /* Status Line */
    compose(StatusMark_stories_exports, "StatusLine")
  );
  return __toCommonJS(StatusMark_exports);
})();
