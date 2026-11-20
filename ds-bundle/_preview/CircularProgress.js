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

  // .design-sync/.cache/previews/CircularProgress.tsx
  var CircularProgress_exports = {};
  __export(CircularProgress_exports, {
    Default: () => Default2,
    Empty: () => Empty2,
    Full: () => Full2,
    Half: () => Half2,
    Sizes: () => Sizes2,
    Variants: () => Variants2,
    WithLabel: () => WithLabel2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/CircularProgress/CircularProgress.stories.tsx
  var CircularProgress_stories_exports = {};
  __export(CircularProgress_stories_exports, {
    Default: () => Default,
    Empty: () => Empty,
    Full: () => Full,
    Half: () => Half,
    Sizes: () => Sizes,
    Variants: () => Variants,
    WithLabel: () => WithLabel,
    default: () => CircularProgress_stories_default
  });
  init_define_import_meta_env();

  // ds-shim:ds:CircularProgress
  var ds_CircularProgress_exports = {};
  __export(ds_CircularProgress_exports, {
    default: () => ds_CircularProgress_default
  });
  init_define_import_meta_env();
  __reExport(ds_CircularProgress_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_CircularProgress_default = g["CircularProgress"] !== void 0 ? g["CircularProgress"] : g;

  // src/components/CircularProgress/CircularProgress.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var import_react = __toESM(require_react_shim());
  var meta = {
    title: "Components/CircularProgress",
    component: ds_CircularProgress_exports.CircularProgress,
    tags: ["autodocs"],
    args: {
      value: 50,
      max: 100,
      variant: "primary",
      size: 40,
      strokeWidth: 2.5
    },
    argTypes: {
      value: {
        control: { type: "range", min: 0, max: 100, step: 1 }
      },
      max: {
        control: { type: "number", min: 1 }
      },
      variant: {
        control: "select",
        options: ["primary", "secondary"]
      },
      size: {
        control: { type: "range", min: 16, max: 160, step: 2 }
      },
      strokeWidth: {
        control: { type: "range", min: 1, max: 12, step: 0.5 }
      },
      children: { control: false },
      ref: { control: false, table: { disable: true } }
    }
  };
  var CircularProgress_stories_default = meta;
  var Default = {};
  var Empty = {
    args: { value: 0 }
  };
  var Half = {
    args: { value: 50 }
  };
  var Full = {
    args: { value: 100 }
  };
  var Variants = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CircularProgress_exports.CircularProgress, { ...args, variant: "primary" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CircularProgress_exports.CircularProgress, { ...args, variant: "secondary" })
    ] })
  };
  var Sizes = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-5", children: [
      { size: 40, strokeWidth: 2.5, value: 25 },
      { size: 48, strokeWidth: 3, value: 65 },
      { size: 56, strokeWidth: 3, value: 100, variant: "secondary" }
    ].map((step) => /* @__PURE__ */ (0, import_react.createElement)(ds_CircularProgress_exports.CircularProgress, { ...args, ...step, key: step.size }, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-ink-body text-xxs", children: [
      step.value,
      "%"
    ] }))) })
  };
  var WithLabel = {
    args: {
      size: 64,
      value: 75,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-ink-body text-xs", children: "75%" })
    }
  };

  // .design-sync/.cache/previews/CircularProgress.tsx
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
    compose(CircularProgress_stories_exports, "Default")
  );
  var Empty2 = (
    /* Empty */
    compose(CircularProgress_stories_exports, "Empty")
  );
  var Half2 = (
    /* Half */
    compose(CircularProgress_stories_exports, "Half")
  );
  var Full2 = (
    /* Full */
    compose(CircularProgress_stories_exports, "Full")
  );
  var Variants2 = (
    /* Variants */
    compose(CircularProgress_stories_exports, "Variants")
  );
  var Sizes2 = (
    /* Sizes */
    compose(CircularProgress_stories_exports, "Sizes")
  );
  var WithLabel2 = (
    /* With Label */
    compose(CircularProgress_stories_exports, "WithLabel")
  );
  return __toCommonJS(CircularProgress_exports);
})();
