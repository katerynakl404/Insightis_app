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

  // .design-sync/.cache/previews/Separator.tsx
  var Separator_exports = {};
  __export(Separator_exports, {
    Horizontal: () => Horizontal2,
    Variants: () => Variants2,
    Vertical: () => Vertical2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Separator/Separator.stories.tsx
  var Separator_stories_exports = {};
  __export(Separator_stories_exports, {
    Horizontal: () => Horizontal,
    Variants: () => Variants,
    Vertical: () => Vertical,
    default: () => Separator_stories_default
  });
  init_define_import_meta_env();

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Separator_default = g["Separator"] !== void 0 ? g["Separator"] : g;

  // src/components/Separator/Separator.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/Separator",
    component: ds_Separator_exports.Separator,
    tags: ["autodocs"],
    args: {
      variant: "border",
      orientation: "horizontal",
      decorative: true
    },
    argTypes: {
      variant: {
        control: "select",
        options: ["primary", "secondary", "border"]
      },
      orientation: {
        control: "select",
        options: ["horizontal", "vertical"]
      },
      ref: { control: false, table: { disable: true } }
    }
  };
  var Separator_stories_default = meta;
  var Horizontal = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-64", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_exports.Separator, { ...args, orientation: "horizontal" }) })
  };
  var Vertical = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex h-16 items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_exports.Separator, { ...args, orientation: "vertical" }) })
  };
  var Variants = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-64 flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_exports.Separator, { ...args, orientation: "horizontal", variant: "primary" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_exports.Separator, { ...args, orientation: "horizontal", variant: "secondary" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_exports.Separator, { ...args, orientation: "horizontal", variant: "border" })
    ] })
  };

  // .design-sync/.cache/previews/Separator.tsx
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
  var Horizontal2 = (
    /* Horizontal */
    compose(Separator_stories_exports, "Horizontal")
  );
  var Vertical2 = (
    /* Vertical */
    compose(Separator_stories_exports, "Vertical")
  );
  var Variants2 = (
    /* Variants */
    compose(Separator_stories_exports, "Variants")
  );
  return __toCommonJS(Separator_exports);
})();
