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

  // .design-sync/.cache/previews/StepSlider.tsx
  var StepSlider_exports = {};
  __export(StepSlider_exports, {
    Default: () => Default2,
    Disabled: () => Disabled2,
    FiveStops: () => FiveStops2,
    Highest: () => Highest2,
    InSettingsRow: () => InSettingsRow2,
    Interactive: () => Interactive2,
    Lowest: () => Lowest2,
    MatchesSwitchSizes: () => MatchesSwitchSizes2,
    Small: () => Small2,
    WithStepTooltips: () => WithStepTooltips2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/StepSlider/StepSlider.stories.tsx
  var StepSlider_stories_exports = {};
  __export(StepSlider_stories_exports, {
    Default: () => Default,
    Disabled: () => Disabled,
    FiveStops: () => FiveStops,
    Highest: () => Highest,
    InSettingsRow: () => InSettingsRow,
    Interactive: () => Interactive,
    Lowest: () => Lowest,
    MatchesSwitchSizes: () => MatchesSwitchSizes,
    Small: () => Small,
    WithStepTooltips: () => WithStepTooltips,
    default: () => StepSlider_stories_default
  });
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());

  // ds-shim:ds:Switch
  var ds_Switch_exports = {};
  __export(ds_Switch_exports, {
    default: () => ds_Switch_default
  });
  init_define_import_meta_env();
  __reExport(ds_Switch_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Switch_default = g["Switch"] !== void 0 ? g["Switch"] : g;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Tooltip_default = g2["Tooltip"] !== void 0 ? g2["Tooltip"] : g2;

  // ds-shim:ds:StepSlider
  var ds_StepSlider_exports = {};
  __export(ds_StepSlider_exports, {
    default: () => ds_StepSlider_default
  });
  init_define_import_meta_env();
  __reExport(ds_StepSlider_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_StepSlider_default = g3["StepSlider"] !== void 0 ? g3["StepSlider"] : g3;

  // src/components/StepSlider/StepSlider.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var EFFORT_STEPS = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" }
  ];
  var FIVE_STEPS = [
    { value: "minimal", label: "Minimal" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "max", label: "Max" }
  ];
  var meta = {
    title: "Components/StepSlider",
    component: ds_StepSlider_exports.StepSlider,
    tags: ["autodocs"],
    // `showStepTooltips` needs a provider; harmless for the stories that leave it off.
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ],
    args: {
      steps: EFFORT_STEPS,
      value: "Medium",
      size: "default",
      disabled: false,
      showStepTooltips: false,
      "aria-label": "Effort"
    },
    argTypes: {
      size: { control: "select", options: ["sm", "default"] },
      steps: { control: false },
      value: { control: "select", options: ["Low", "Medium", "High"] },
      ref: { control: false, table: { disable: true } }
    }
  };
  var StepSlider_stories_default = meta;
  var Default = {};
  var Interactive = {
    render: (args) => {
      const [value, setValue] = (0, import_react.useState)("Medium");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StepSlider_exports.StepSlider, { ...args, value, onValueChange: setValue }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-ink-secondary text-sm", children: value })
      ] });
    }
  };
  var Lowest = { args: { value: "Low" } };
  var Highest = { args: { value: "High" } };
  var Small = { args: { size: "sm" } };
  var Disabled = { args: { disabled: true } };
  var WithStepTooltips = {
    render: (args) => {
      const [value, setValue] = (0, import_react.useState)("Medium");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StepSlider_exports.StepSlider, { ...args, value, onValueChange: setValue });
    },
    args: { showStepTooltips: true }
  };
  var FiveStops = {
    args: { steps: FIVE_STEPS, value: "high" },
    argTypes: { value: { control: false } }
  };
  var InSettingsRow = {
    render: (args) => {
      const [value, setValue] = (0, import_react.useState)("High");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[16.75rem] rounded-md bg-surface-card p-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between gap-2 px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-medium text-ink-body text-sm", children: [
          "Effort",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "font-normal text-ink-secondary", children: [
            "(",
            value,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StepSlider_exports.StepSlider, { ...args, value, onValueChange: setValue })
      ] }) });
    }
  };
  var MatchesSwitchSizes = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-80 rounded-md bg-surface-card p-3", children: ["default", "sm"].map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "flex flex-col gap-2 border-stroke border-b py-3 last:border-b-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-ink-secondary text-xs", children: [
            'size="',
            size,
            '"'
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-ink-body text-sm", children: "Effort" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StepSlider_exports.StepSlider, { ...args, size, value: "Medium" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-ink-body text-sm", children: "Thinking" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Switch_exports.Switch, { size, defaultChecked: true })
          ] })
        ]
      },
      size
    )) })
  };

  // .design-sync/.cache/previews/StepSlider.tsx
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
    compose(StepSlider_stories_exports, "Default")
  );
  var Interactive2 = (
    /* Interactive */
    compose(StepSlider_stories_exports, "Interactive")
  );
  var Lowest2 = (
    /* Lowest */
    compose(StepSlider_stories_exports, "Lowest")
  );
  var Highest2 = (
    /* Highest */
    compose(StepSlider_stories_exports, "Highest")
  );
  var Small2 = (
    /* Small */
    compose(StepSlider_stories_exports, "Small")
  );
  var Disabled2 = (
    /* Disabled */
    compose(StepSlider_stories_exports, "Disabled")
  );
  var WithStepTooltips2 = (
    /* With Step Tooltips */
    compose(StepSlider_stories_exports, "WithStepTooltips")
  );
  var FiveStops2 = (
    /* Five Stops */
    compose(StepSlider_stories_exports, "FiveStops")
  );
  var InSettingsRow2 = (
    /* In Settings Row */
    compose(StepSlider_stories_exports, "InSettingsRow")
  );
  var MatchesSwitchSizes2 = (
    /* Matches Switch Sizes */
    compose(StepSlider_stories_exports, "MatchesSwitchSizes")
  );
  return __toCommonJS(StepSlider_exports);
})();
