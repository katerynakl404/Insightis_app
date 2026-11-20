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

  // sb-stub:storybook/test
  var require_test = __commonJS({
    "sb-stub:storybook/test"(exports, module) {
      init_define_import_meta_env();
      var inert = new Proxy(function() {
      }, { get: function(t, k) {
        if (k === "then") return void 0;
        if (k === "prototype") return t.prototype;
        if (k === "valueOf" || k === "toString" || k === Symbol.toPrimitive) return function() {
          return "";
        };
        return inert;
      }, apply: function() {
        return inert;
      }, construct: function() {
        return {};
      } });
      var m = {};
      "fn action actions expect userEvent within waitFor screen fireEvent spyOn mocked jest vi configureActions decorateAction setupWorker http HttpResponse graphql rest".split(" ").forEach(function(k) {
        m[k] = inert;
      });
      var def = function(p) {
        return p && p.children !== void 0 ? p.children : null;
      };
      Object.assign(def, m);
      module.exports = new Proxy(def, { get: function(t, k) {
        if (k === "then") return void 0;
        if (k === "prototype") return t.prototype;
        return k in m ? m[k] : k === "__esModule" ? void 0 : inert;
      } });
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = window.DevartUI;
    }
  });

  // .design-sync/.cache/previews/IconHint.tsx
  var IconHint_exports = {};
  __export(IconHint_exports, {
    Default: () => Default2,
    OpensOnKeyboard: () => OpensOnKeyboard2,
    Tones: () => Tones2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/IconHint/IconHint.stories.tsx
  var IconHint_stories_exports = {};
  __export(IconHint_stories_exports, {
    Default: () => Default,
    OpensOnKeyboard: () => OpensOnKeyboard,
    Tones: () => Tones,
    default: () => IconHint_stories_default
  });
  init_define_import_meta_env();
  var import_test = __toESM(require_test());

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Tooltip_default = g["Tooltip"] !== void 0 ? g["Tooltip"] : g;

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Typography_default = g2["Typography"] !== void 0 ? g2["Typography"] : g2;

  // ds-shim:ds:IconHint
  var ds_IconHint_exports = {};
  __export(ds_IconHint_exports, {
    default: () => ds_IconHint_default
  });
  init_define_import_meta_env();
  __reExport(ds_IconHint_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_IconHint_default = g3["IconHint"] !== void 0 ? g3["IconHint"] : g3;

  // src/components/IconHint/IconHint.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/IconHint",
    component: ds_IconHint_exports.IconHint,
    tags: ["autodocs"],
    // Tooltips need a provider and Storybook has no global one.
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ],
    args: {
      variant: "neutral",
      tooltip: "Ad-hoc analytics and reporting for the data team.",
      label: "About Data Analyze"
    },
    argTypes: {
      variant: {
        control: "inline-radio",
        options: ["neutral", "warning", "error"]
      },
      size: { control: "inline-radio", options: ["sm", "md"] },
      tooltipSide: {
        control: "inline-radio",
        options: ["top", "right", "bottom", "left"]
      }
    },
    parameters: {
      docs: {
        description: {
          component: "The glyph beside a name that explains itself: on hover, on keyboard focus, and on a tap where there is no hover. Not a button — on a desktop nothing here is clickable and it must not look it. Carbon and Spectrum make this glyph a control because they dropped hover and the words come on click; we keep hover, and keeping it is what makes the behaviour differ by device. The tones are `StatusMark`, which is the whole component where there is nothing to explain."
        }
      }
    }
  };
  var IconHint_stories_default = meta;
  var Row = ({ name, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "span", textColor: "primary", textStyle: "body14", children: name }),
    children
  ] });
  var Default = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { name: "Data Analyze", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_IconHint_exports.IconHint, { ...args }) })
  };
  var Tones = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { name: "Finance warehouse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_IconHint_exports.IconHint,
        {
          label: "About Finance warehouse",
          tooltip: "The warehouse the finance team reports from."
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { name: "Sales, EMEA", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_IconHint_exports.IconHint,
        {
          label: "What is wrong with Sales, EMEA",
          tooltip: "Nothing included yet.",
          variant: "warning"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { name: "Oracle ERP (staging)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_IconHint_exports.IconHint,
        {
          label: "What is wrong with Oracle ERP (staging)",
          tooltip: "Connection to host failed. The host is not reachable.",
          variant: "error"
        }
      ) })
    ] })
  };
  var OpensOnKeyboard = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { name: "Finance warehouse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_IconHint_exports.IconHint, { ...args, label: "About Finance warehouse" }) }),
    play: async ({ canvas, userEvent }) => {
      const hint = canvas.getByRole("img", { name: "About Finance warehouse" });
      await userEvent.tab();
      await (0, import_test.expect)(hint).toHaveFocus();
      await (0, import_test.waitFor)(
        () => (0, import_test.expect)((0, import_test.within)(document.body).getByRole("tooltip")).toBeVisible()
      );
    }
  };

  // .design-sync/.cache/previews/IconHint.tsx
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
    compose(IconHint_stories_exports, "Default")
  );
  var Tones2 = (
    /* Tones */
    compose(IconHint_stories_exports, "Tones")
  );
  var OpensOnKeyboard2 = (
    /* Opens On Keyboard */
    compose(IconHint_stories_exports, "OpensOnKeyboard")
  );
  return __toCommonJS(IconHint_exports);
})();
