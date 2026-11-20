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
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx2)(t, p, k);
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

  // .design-sync/.cache/previews/FilterChips.tsx
  var FilterChips_exports = {};
  __export(FilterChips_exports, {
    Default: () => Default2,
    Interactive: () => Interactive2,
    Overflowing: () => Overflowing2,
    WithCounts: () => WithCounts2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/FilterChips/FilterChips.stories.tsx
  var FilterChips_stories_exports = {};
  __export(FilterChips_stories_exports, {
    Default: () => Default,
    Interactive: () => Interactive,
    Overflowing: () => Overflowing,
    WithCounts: () => WithCounts,
    default: () => FilterChips_stories_default
  });
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());
  var import_test = __toESM(require_test());

  // ds-shim:ds:FilterChips
  var ds_FilterChips_exports = {};
  __export(ds_FilterChips_exports, {
    default: () => ds_FilterChips_default
  });
  init_define_import_meta_env();
  __reExport(ds_FilterChips_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_FilterChips_default = g["FilterChips"] !== void 0 ? g["FilterChips"] : g;

  // src/components/FilterChips/FilterChips.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var TAGS = [
    { value: "all", label: "All" },
    { value: "artifacts", label: "Artifacts" },
    { value: "uploaded", label: "Uploaded" }
  ];
  var CATEGORIES = [
    { value: "all", label: "All", count: 207 },
    { value: "1", label: "Business Intelligence", count: 18 },
    { value: "2", label: "Commerce", count: 24 },
    { value: "3", label: "Communication", count: 11 },
    { value: "4", label: "IT & Operations", count: 31 },
    { value: "5", label: "Marketing", count: 42 },
    { value: "6", label: "Productivity", count: 16 },
    { value: "7", label: "Sales & CRM", count: 27 },
    { value: "8", label: "Storage & Files", count: 9 },
    { value: "9", label: "Support", count: 0 }
  ];
  var meta = {
    title: "Compositions/FilterChips",
    component: ds_FilterChips_exports.FilterChips,
    tags: ["autodocs"],
    args: {
      items: TAGS,
      value: "all",
      onValueChange: (0, import_test.fn)()
    },
    argTypes: {
      items: { control: false },
      onValueChange: { control: false }
    },
    parameters: { layout: "padded" }
  };
  var FilterChips_stories_default = meta;
  var Default = {
    play: async ({ args, canvas, userEvent }) => {
      await (0, import_test.expect)(canvas.getByRole("radio", { name: "All" })).toBeChecked();
      await (0, import_test.expect)(
        canvas.getByRole("radio", { name: "Uploaded" })
      ).not.toBeChecked();
      await userEvent.click(canvas.getByRole("radio", { name: "Uploaded" }));
      await (0, import_test.expect)(args.onValueChange).toHaveBeenCalledWith("uploaded");
      await userEvent.click(canvas.getByRole("radio", { name: "All" }));
      await (0, import_test.expect)(args.onValueChange).toHaveBeenCalledWith("");
      await (0, import_test.expect)(args.onValueChange).toHaveBeenCalledTimes(2);
    }
  };
  var WithCounts = {
    args: { items: CATEGORIES, value: "all" },
    play: async ({ canvas }) => {
      const support = canvas.getByRole("radio", { name: /^Support/ });
      await (0, import_test.expect)((0, import_test.within)(support).getByText("0")).toBeVisible();
    }
  };
  var Overflowing = {
    args: { items: CATEGORIES, value: "5" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-80 rounded-lg border border-stroke p-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_FilterChips_exports.FilterChips, { ...args }) })
  };
  var Interactive = {
    play: async ({ canvas, userEvent }) => {
      const all = canvas.getByRole("radio", { name: /^All/ });
      const marketing = canvas.getByRole("radio", { name: /^Marketing/ });
      await (0, import_test.expect)(all).toBeChecked();
      await userEvent.click(marketing);
      await (0, import_test.expect)(marketing).toBeChecked();
      await (0, import_test.expect)(all).not.toBeChecked();
      await userEvent.click(marketing);
      await (0, import_test.expect)(marketing).toBeChecked();
    },
    render: (args) => {
      const [value, setValue] = (0, import_react.useState)("all");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_FilterChips_exports.FilterChips,
        {
          ...args,
          items: CATEGORIES,
          value,
          onValueChange: (next) => next && setValue(next)
        }
      );
    }
  };

  // .design-sync/.cache/previews/FilterChips.tsx
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
    compose(FilterChips_stories_exports, "Default")
  );
  var WithCounts2 = (
    /* With Counts */
    compose(FilterChips_stories_exports, "WithCounts")
  );
  var Overflowing2 = (
    /* Overflowing */
    compose(FilterChips_stories_exports, "Overflowing")
  );
  var Interactive2 = (
    /* Interactive */
    compose(FilterChips_stories_exports, "Interactive")
  );
  return __toCommonJS(FilterChips_exports);
})();
