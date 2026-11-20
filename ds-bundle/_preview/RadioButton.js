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

  // .design-sync/.cache/previews/RadioButton.tsx
  var RadioButton_exports = {};
  __export(RadioButton_exports, {
    Default: () => Default2,
    Disabled: () => Disabled2,
    ErrorState: () => ErrorState2,
    Group: () => Group2,
    LabelPositions: () => LabelPositions2,
    Selected: () => Selected2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/RadioButton/RadioButton.stories.tsx
  var RadioButton_stories_exports = {};
  __export(RadioButton_stories_exports, {
    Default: () => Default,
    Disabled: () => Disabled,
    ErrorState: () => ErrorState,
    Group: () => Group,
    LabelPositions: () => LabelPositions,
    Selected: () => Selected,
    default: () => RadioButton_stories_default
  });
  init_define_import_meta_env();

  // ds-shim:ds:RadioButton
  var ds_RadioButton_exports = {};
  __export(ds_RadioButton_exports, {
    default: () => ds_RadioButton_default
  });
  init_define_import_meta_env();
  __reExport(ds_RadioButton_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_RadioButton_default = g["RadioButton"] !== void 0 ? g["RadioButton"] : g;

  // src/components/RadioButton/RadioButton.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var import_react = __toESM(require_react_shim());
  var meta = {
    title: "Components/RadioButton",
    component: ds_RadioButton_exports.RadioButton,
    tags: ["autodocs"],
    args: {
      label: "Option",
      value: "option",
      variant: "primary",
      size: "md",
      labelPosition: "right",
      gap: "md",
      disabled: false
    },
    argTypes: {
      variant: {
        control: "select",
        options: ["primary"]
      },
      size: {
        control: "select",
        options: ["md"]
      },
      labelPosition: {
        control: "select",
        options: ["left", "right", "top", "bottom"]
      },
      gap: {
        control: "select",
        options: ["sm", "md", "lg"]
      },
      label: { control: "text" },
      ref: { control: false, table: { disable: true } }
    }
  };
  var RadioButton_stories_default = meta;
  var Default = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioGroup, { defaultValue: "option", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioButton, { ...args }) })
  };
  var Group = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_RadioButton_exports.RadioGroup, { defaultValue: "banana", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioButton, { ...args, label: "Apple", value: "apple" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioButton, { ...args, label: "Banana", value: "banana" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioButton, { ...args, label: "Cherry", value: "cherry" })
    ] })
  };
  var Selected = {
    args: { label: "Selected", value: "selected" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioGroup, { value: "selected", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioButton, { ...args }) })
  };
  var Disabled = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_RadioButton_exports.RadioGroup, { defaultValue: "on", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioButton, { ...args, label: "Disabled unchecked", value: "off", disabled: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioButton, { ...args, label: "Disabled checked", value: "on", disabled: true })
    ] })
  };
  var ErrorState = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_RadioButton_exports.RadioGroup, { defaultValue: "on", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_RadioButton_exports.RadioButton,
        {
          ...args,
          "aria-invalid": true,
          label: "Invalid unchecked",
          value: "off"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioButton, { ...args, "aria-invalid": true, label: "Invalid checked", value: "on" })
    ] })
  };
  var LabelPositions = {
    render: (args) => {
      const positions = ["right", "left", "top", "bottom"];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RadioButton_exports.RadioGroup, { className: "flex gap-6", defaultValue: "right", children: positions.map((labelPosition) => /* @__PURE__ */ (0, import_react.createElement)(
        ds_RadioButton_exports.RadioButton,
        {
          ...args,
          key: labelPosition,
          label: labelPosition,
          value: labelPosition,
          labelPosition
        }
      )) });
    }
  };

  // .design-sync/.cache/previews/RadioButton.tsx
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
    compose(RadioButton_stories_exports, "Default")
  );
  var Group2 = (
    /* Group */
    compose(RadioButton_stories_exports, "Group")
  );
  var Selected2 = (
    /* Selected */
    compose(RadioButton_stories_exports, "Selected")
  );
  var Disabled2 = (
    /* Disabled */
    compose(RadioButton_stories_exports, "Disabled")
  );
  var ErrorState2 = (
    /* Error State */
    compose(RadioButton_stories_exports, "ErrorState")
  );
  var LabelPositions2 = (
    /* Label Positions */
    compose(RadioButton_stories_exports, "LabelPositions")
  );
  return __toCommonJS(RadioButton_exports);
})();
