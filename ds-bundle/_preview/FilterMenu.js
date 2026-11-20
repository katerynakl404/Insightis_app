"use strict";
var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn2, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
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

  // .design-sync/.cache/previews/FilterMenu.tsx
  var FilterMenu_exports = {};
  __export(FilterMenu_exports, {
    Chosen: () => Chosen2,
    Default: () => Default2,
    Interactive: () => Interactive2,
    Tree: () => Tree2,
    TreeOpen: () => TreeOpen2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/FilterMenu/FilterMenu.stories.tsx
  var FilterMenu_stories_exports = {};
  __export(FilterMenu_stories_exports, {
    Chosen: () => Chosen,
    Default: () => Default,
    Interactive: () => Interactive,
    Tree: () => Tree,
    TreeOpen: () => TreeOpen,
    default: () => FilterMenu_stories_default
  });
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());
  var import_test = __toESM(require_test());

  // ds-shim:ds:ConnectorLogo
  var ds_ConnectorLogo_exports = {};
  __export(ds_ConnectorLogo_exports, {
    default: () => ds_ConnectorLogo_default
  });
  init_define_import_meta_env();
  __reExport(ds_ConnectorLogo_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_ConnectorLogo_default = g["ConnectorLogo"] !== void 0 ? g["ConnectorLogo"] : g;

  // ds-shim:ds:FilterMenu
  var ds_FilterMenu_exports = {};
  __export(ds_FilterMenu_exports, {
    default: () => ds_FilterMenu_default
  });
  init_define_import_meta_env();
  __reExport(ds_FilterMenu_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_FilterMenu_default = g2["FilterMenu"] !== void 0 ? g2["FilterMenu"] : g2;

  // src/components/FilterMenu/FilterMenu.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var TYPES = [
    { value: "all", label: "All", count: 45 },
    { value: "builtin", label: "Built-in", count: 38 },
    { value: "custom", label: "Custom", count: 7 }
  ];
  var PROVIDERS = [
    { value: "all", label: "All", count: 45 },
    {
      value: "g:jira",
      label: "Jira Software Cloud",
      count: 9,
      icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ConnectorLogo_exports.ConnectorLogo, { connector: "jira", size: "xs" }),
      children: [
        { value: "c:skyvia-jira", label: "Skyvia Jira", count: 1 },
        { value: "c:campaign-tasks", label: "Campaign tasks", count: 2 }
      ]
    },
    { value: "g:github", label: "GitHub", count: 5, icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ConnectorLogo_exports.ConnectorLogo, { connector: "github", size: "xs" }) },
    {
      value: "g:salesforce",
      label: "Salesforce",
      count: 12,
      icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ConnectorLogo_exports.ConnectorLogo, { connector: "salesforce", size: "xs" }),
      children: [{ value: "c:main-crm", label: "Main CRM", count: 12 }]
    }
  ];
  var meta = {
    title: "Compositions/FilterMenu",
    component: ds_FilterMenu_exports.FilterMenu,
    tags: ["autodocs"],
    args: { label: "Type", value: "all", options: TYPES, onValueChange: (0, import_test.fn)() },
    argTypes: { options: { control: false }, onValueChange: { control: false } },
    parameters: { layout: "padded" }
  };
  var FilterMenu_stories_default = meta;
  var Default = {};
  var Chosen = { args: { value: "custom" } };
  var Tree = { args: { label: "Provider", options: PROVIDERS } };
  var TreeOpen = { args: { label: "Provider", options: PROVIDERS, defaultOpen: true }, parameters: { layout: "padded" } };
  var Interactive = {
    render: () => {
      const [type, setType] = (0, import_react.useState)("all");
      const [prov, setProv] = (0, import_react.useState)("c:main-crm");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_FilterMenu_exports.FilterMenu, { label: "Type", value: type, options: TYPES, onValueChange: setType }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_FilterMenu_exports.FilterMenu, { label: "Provider", value: prov, options: PROVIDERS, onValueChange: setProv })
      ] });
    }
  };

  // .design-sync/.cache/previews/FilterMenu.tsx
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
    compose(FilterMenu_stories_exports, "Default")
  );
  var Chosen2 = (
    /* Chosen */
    compose(FilterMenu_stories_exports, "Chosen")
  );
  var Tree2 = (
    /* Tree */
    compose(FilterMenu_stories_exports, "Tree")
  );
  var TreeOpen2 = (
    /* Tree Open */
    compose(FilterMenu_stories_exports, "TreeOpen")
  );
  var Interactive2 = (
    /* Interactive */
    compose(FilterMenu_stories_exports, "Interactive")
  );
  return __toCommonJS(FilterMenu_exports);
})();
