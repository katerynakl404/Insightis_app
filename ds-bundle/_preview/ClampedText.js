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

  // .design-sync/.cache/previews/ClampedText.tsx
  var ClampedText_exports = {};
  __export(ClampedText_exports, {
    Default: () => Default2,
    FitsWhole: () => FitsWhole2,
    HandedOver: () => HandedOver2,
    LongWord: () => LongWord2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/ClampedText/ClampedText.stories.tsx
  var ClampedText_stories_exports = {};
  __export(ClampedText_stories_exports, {
    Default: () => Default,
    FitsWhole: () => FitsWhole,
    HandedOver: () => HandedOver,
    LongWord: () => LongWord,
    default: () => ClampedText_stories_default
  });
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());

  // ds-shim:ds:ClampedText
  var ds_ClampedText_exports = {};
  __export(ds_ClampedText_exports, {
    default: () => ds_ClampedText_default
  });
  init_define_import_meta_env();
  __reExport(ds_ClampedText_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_ClampedText_default = g["ClampedText"] !== void 0 ? g["ClampedText"] : g;

  // src/components/ClampedText/ClampedText.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var LONG = "The warehouse the finance team reports from: the general ledger, accounts payable and receivable, and the monthly close. Read nightly from the ERP; the reporting views are rebuilt at 02:00 UTC. Ask the data platform team before adding a schema — the AI client reads only what is included here, and every inclusion is reviewed against the data policy.";
  var meta = {
    title: "Components/ClampedText",
    component: ds_ClampedText_exports.ClampedText,
    tags: ["autodocs"],
    args: { text: LONG, lines: 3 },
    argTypes: {
      lines: { control: "inline-radio", options: [1, 2, 3, 4, 5, 6] }
    },
    parameters: {
      docs: {
        description: {
          component: "A text cut to a number of lines, with See more when there is more, and only then — measured on every resize, not guessed from the length. In place, See more opens the text and See less folds it; with `onMore` it hands the whole text to the caller to show elsewhere (a dialog from a hover panel). A press on See more stops there."
        }
      }
    }
  };
  var ClampedText_stories_default = meta;
  var Default = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-80", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ClampedText_exports.ClampedText, { ...args }) })
  };
  var FitsWhole = {
    args: { text: "Ad-hoc analytics and reporting for the data team." },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-80", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ClampedText_exports.ClampedText, { ...args }) })
  };
  var LongWord = {
    args: {
      text: `${"412".repeat(80)} https://reports.example.com/finance/warehouse/views/monthly-close/2026/11/general-ledger-reconciliation`
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-80", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ClampedText_exports.ClampedText, { ...args }) })
  };
  var HandedOver = {
    render: (args) => {
      const [asked, setAsked] = (0, import_react.useState)(0);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-80 flex-col gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_ClampedText_exports.ClampedText,
          {
            ...args,
            lines: 5,
            onMore: () => setAsked((n) => n + 1)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-ink-secondary text-xs", children: [
          "onMore called ",
          asked,
          "×"
        ] })
      ] });
    }
  };

  // .design-sync/.cache/previews/ClampedText.tsx
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
    compose(ClampedText_stories_exports, "Default")
  );
  var FitsWhole2 = (
    /* Fits Whole */
    compose(ClampedText_stories_exports, "FitsWhole")
  );
  var LongWord2 = (
    /* Long Word */
    compose(ClampedText_stories_exports, "LongWord")
  );
  var HandedOver2 = (
    /* Handed Over */
    compose(ClampedText_stories_exports, "HandedOver")
  );
  return __toCommonJS(ClampedText_exports);
})();
