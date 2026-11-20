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

  // .design-sync/.cache/previews/TruncatedTitleTooltip.tsx
  var TruncatedTitleTooltip_exports = {};
  __export(TruncatedTitleTooltip_exports, {
    NotTruncated: () => NotTruncated2,
    SideBySide: () => SideBySide2,
    Truncated: () => Truncated2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/TruncatedTitleTooltip/TruncatedTitleTooltip.stories.tsx
  var TruncatedTitleTooltip_stories_exports = {};
  __export(TruncatedTitleTooltip_stories_exports, {
    NotTruncated: () => NotTruncated,
    SideBySide: () => SideBySide,
    Truncated: () => Truncated,
    default: () => TruncatedTitleTooltip_stories_default
  });
  init_define_import_meta_env();

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Tooltip_default = g["Tooltip"] !== void 0 ? g["Tooltip"] : g;

  // ds-shim:ds:TruncatedTitleTooltip
  var ds_TruncatedTitleTooltip_exports = {};
  __export(ds_TruncatedTitleTooltip_exports, {
    default: () => ds_TruncatedTitleTooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_TruncatedTitleTooltip_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_TruncatedTitleTooltip_default = g2["TruncatedTitleTooltip"] !== void 0 ? g2["TruncatedTitleTooltip"] : g2;

  // src/components/TruncatedTitleTooltip/TruncatedTitleTooltip.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/TruncatedTitleTooltip",
    component: ds_TruncatedTitleTooltip_exports.TruncatedTitleTooltip,
    tags: ["autodocs"],
    args: {
      side: "right",
      // `title` + `children` are required; each story overrides them via render.
      title: "Placeholder title",
      children: null
    },
    argTypes: {
      side: {
        control: "select",
        options: ["top", "right", "bottom", "left"]
      },
      title: { control: "text" },
      children: { control: false },
      getTruncationTarget: { control: false, table: { disable: true } }
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { delayDuration: 200, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid min-h-32 place-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) }) })
    ],
    parameters: {
      layout: "centered"
    }
  };
  var TruncatedTitleTooltip_stories_default = meta;
  var longTitle = "Quarterly revenue forecast and go-to-market strategy for Q4 2026";
  var Truncated = {
    args: { title: longTitle },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TruncatedTitleTooltip_exports.TruncatedTitleTooltip, { ...args, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "a",
      {
        href: "#link",
        className: "flex w-[200px] min-w-0 items-center text-ink-body",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: longTitle })
      }
    ) })
  };
  var NotTruncated = {
    args: { title: "Short title" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TruncatedTitleTooltip_exports.TruncatedTitleTooltip, { ...args, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "a",
      {
        href: "#link",
        className: "flex w-[200px] min-w-0 items-center text-ink-body",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: "Short title" })
      }
    ) })
  };
  var SideBySide = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TruncatedTitleTooltip_exports.TruncatedTitleTooltip, { ...args, title: longTitle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "a",
        {
          href: "#truncated",
          className: "flex w-[200px] min-w-0 items-center text-ink-body",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: longTitle })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TruncatedTitleTooltip_exports.TruncatedTitleTooltip, { ...args, title: "Short title", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "a",
        {
          href: "#short",
          className: "flex w-[200px] min-w-0 items-center text-ink-body",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: "Short title" })
        }
      ) })
    ] })
  };

  // .design-sync/.cache/previews/TruncatedTitleTooltip.tsx
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
  var Truncated2 = (
    /* Truncated */
    compose(TruncatedTitleTooltip_stories_exports, "Truncated")
  );
  var NotTruncated2 = (
    /* Not Truncated */
    compose(TruncatedTitleTooltip_stories_exports, "NotTruncated")
  );
  var SideBySide2 = (
    /* Side By Side */
    compose(TruncatedTitleTooltip_stories_exports, "SideBySide")
  );
  return __toCommonJS(TruncatedTitleTooltip_exports);
})();
