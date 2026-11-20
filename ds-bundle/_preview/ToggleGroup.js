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

  // .design-sync/.cache/previews/ToggleGroup.tsx
  var ToggleGroup_exports = {};
  __export(ToggleGroup_exports, {
    Default: () => Default2,
    ItemOverride: () => ItemOverride2,
    Multiple: () => Multiple2,
    Sizes: () => Sizes2,
    Variants: () => Variants2,
    WithCounts: () => WithCounts2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/ToggleGroup/ToggleGroup.stories.tsx
  var ToggleGroup_stories_exports = {};
  __export(ToggleGroup_stories_exports, {
    Default: () => Default,
    ItemOverride: () => ItemOverride,
    Multiple: () => Multiple,
    Sizes: () => Sizes,
    Variants: () => Variants,
    WithCounts: () => WithCounts,
    default: () => ToggleGroup_stories_default
  });
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Typography_default = g["Typography"] !== void 0 ? g["Typography"] : g;

  // ds-shim:ds:ToggleGroup
  var ds_ToggleGroup_exports = {};
  __export(ds_ToggleGroup_exports, {
    default: () => ds_ToggleGroup_default
  });
  init_define_import_meta_env();
  __reExport(ds_ToggleGroup_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_ToggleGroup_default = g2["ToggleGroup"] !== void 0 ? g2["ToggleGroup"] : g2;

  // src/components/ToggleGroup/ToggleGroup.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/ToggleGroup",
    component: ds_ToggleGroup_exports.ToggleGroup,
    tags: ["autodocs"],
    args: {
      type: "single",
      variant: "outline",
      size: "sm",
      rounded: "md",
      scrollIntoGroup: true
    },
    argTypes: {
      variant: {
        control: "select",
        options: ["outline", "stroke", "ghost", "badge"]
      },
      size: {
        control: "select",
        options: ["xs", "sm", "md", "lg", "xl"]
      },
      rounded: {
        control: "select",
        options: ["none", "sm", "rounded", "md", "lg", "xl", "full"]
      },
      type: { control: false },
      value: { control: false },
      defaultValue: { control: false },
      onValueChange: { control: false },
      children: { control: false }
    }
  };
  var ToggleGroup_stories_default = meta;
  var pickGroupArgs = (args) => ({
    variant: args.variant,
    size: args.size,
    rounded: args.rounded,
    scrollIntoGroup: args.scrollIntoGroup
  });
  var metricTypeOptions = [
    { value: "all", label: "All" },
    { value: "measures", label: "Measures" },
    { value: "dimensions", label: "Dimensions" },
    { value: "calculated", label: "Calculated" }
  ];
  var connectionTypeOptions = [
    { value: "database", label: "Database" },
    { value: "warehouse", label: "Warehouse" },
    { value: "api", label: "API" },
    { value: "file", label: "File" }
  ];
  var Default = {
    render: (args) => {
      const [value, setValue] = (0, import_react.useState)("all");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          variant: "stroke",
          size: "xs",
          rounded: "full",
          value,
          onValueChange: setValue,
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      );
    }
  };
  var Multiple = {
    args: { type: "multiple" },
    render: (args) => {
      const [value, setValue] = (0, import_react.useState)(["database"]);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "multiple",
          value,
          onValueChange: setValue,
          children: connectionTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      );
    }
  };
  var Variants = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-start gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          variant: "outline",
          defaultValue: "measures",
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          variant: "stroke",
          defaultValue: "measures",
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          variant: "ghost",
          defaultValue: "measures",
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          variant: "badge",
          defaultValue: "measures",
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      )
    ] })
  };
  var Sizes = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-start gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          size: "xs",
          defaultValue: "measures",
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          size: "sm",
          defaultValue: "measures",
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          size: "md",
          defaultValue: "measures",
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          size: "lg",
          defaultValue: "measures",
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          size: "xl",
          defaultValue: "measures",
          children: metricTypeOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value))
        }
      )
    ] })
  };
  var metricTypeCounts = [
    { value: "all", label: "All", count: 128 },
    { value: "measures", label: "Measures", count: 64 },
    { value: "dimensions", label: "Dimensions", count: 52 },
    { value: "calculated", label: "Calculated", count: 12 }
  ];
  var WithCounts = {
    render: (args) => {
      const [value, setValue] = (0, import_react.useState)("all");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ToggleGroup_exports.ToggleGroup,
        {
          ...pickGroupArgs(args),
          type: "single",
          variant: "stroke",
          size: "xs",
          rounded: "full",
          value,
          onValueChange: setValue,
          children: metricTypeCounts.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            ds_ToggleGroup_exports.ToggleGroupItem,
            {
              value: option.value,
              className: "group px-3",
              children: [
                option.label,
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  ds_Typography_exports.Typography,
                  {
                    variant: "p",
                    textColor: "light",
                    className: "text-xs group-data-[state=on]:text-ink-highlight",
                    children: option.count
                  }
                )
              ]
            },
            option.value
          ))
        }
      );
    }
  };
  var ItemOverride = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ToggleGroup_exports.ToggleGroup, { ...pickGroupArgs(args), type: "single", defaultValue: "measures", children: [
      metricTypeOptions.filter((option) => option.value !== "calculated").map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: option.value, children: option.label }, option.value)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ToggleGroup_exports.ToggleGroupItem, { value: "calculated", variant: "badge", children: "Calculated" })
    ] })
  };

  // .design-sync/.cache/previews/ToggleGroup.tsx
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
    compose(ToggleGroup_stories_exports, "Default")
  );
  var Multiple2 = (
    /* Multiple */
    compose(ToggleGroup_stories_exports, "Multiple")
  );
  var Variants2 = (
    /* Variants */
    compose(ToggleGroup_stories_exports, "Variants")
  );
  var Sizes2 = (
    /* Sizes */
    compose(ToggleGroup_stories_exports, "Sizes")
  );
  var WithCounts2 = (
    /* With Counts */
    compose(ToggleGroup_stories_exports, "WithCounts")
  );
  var ItemOverride2 = (
    /* Item Override */
    compose(ToggleGroup_stories_exports, "ItemOverride")
  );
  return __toCommonJS(ToggleGroup_exports);
})();
