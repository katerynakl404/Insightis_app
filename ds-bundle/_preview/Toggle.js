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

  // .design-sync/.cache/previews/Toggle.tsx
  var Toggle_exports = {};
  __export(Toggle_exports, {
    Controlled: () => Controlled2,
    Disabled: () => Disabled2,
    Primary: () => Primary2,
    Rounded: () => Rounded2,
    Sizes: () => Sizes2,
    Variants: () => Variants2,
    WithIcon: () => WithIcon2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Toggle/Toggle.stories.tsx
  var Toggle_stories_exports = {};
  __export(Toggle_stories_exports, {
    Controlled: () => Controlled,
    Disabled: () => Disabled,
    Primary: () => Primary,
    Rounded: () => Rounded,
    Sizes: () => Sizes,
    Variants: () => Variants,
    WithIcon: () => WithIcon,
    default: () => Toggle_stories_default
  });
  init_define_import_meta_env();

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/lucide-react.js
  init_define_import_meta_env();

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/createLucideIcon.js
  init_define_import_meta_env();
  var import_react2 = __toESM(require_react_shim());

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/shared/src/utils.js
  init_define_import_meta_env();
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
  };

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/Icon.js
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/defaultAttributes.js
  init_define_import_meta_env();
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react.forwardRef)(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react2.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/check.js
  init_define_import_meta_env();
  var __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  var Check = createLucideIcon("check", __iconNode);

  // src/components/Toggle/Toggle.stories.tsx
  var import_react3 = __toESM(require_react_shim());

  // ds-shim:ds:Toggle
  var ds_Toggle_exports = {};
  __export(ds_Toggle_exports, {
    default: () => ds_Toggle_default
  });
  init_define_import_meta_env();
  __reExport(ds_Toggle_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Toggle_default = g["Toggle"] !== void 0 ? g["Toggle"] : g;

  // src/components/Toggle/Toggle.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/Toggle",
    component: ds_Toggle_exports.Toggle,
    tags: ["autodocs"],
    args: {
      children: "Auto-refresh",
      variant: "outline",
      size: "sm",
      rounded: "md",
      disabled: false
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
      pressed: { control: false },
      onPressedChange: { control: false },
      asChild: { control: false, table: { disable: true } },
      ref: { control: false, table: { disable: true } }
    }
  };
  var Toggle_stories_default = meta;
  var Primary = {};
  var Variants = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-ink-secondary text-xs", children: "Off" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, variant: "outline", children: "Outline" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, variant: "stroke", children: "Stroke" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, variant: "ghost", children: "Ghost" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, variant: "badge", children: "Badge" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-ink-secondary text-xs", children: "On" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, variant: "outline", defaultPressed: true, children: "Outline" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, variant: "stroke", defaultPressed: true, children: "Stroke" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, variant: "ghost", defaultPressed: true, children: "Ghost" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, variant: "badge", defaultPressed: true, children: "Badge" })
      ] })
    ] })
  };
  var Sizes = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, size: "xs", children: "Extra small" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, size: "sm", children: "Small" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, size: "md", children: "Medium" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, size: "lg", children: "Large" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, size: "xl", children: "Extra large" })
    ] })
  };
  var Rounded = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, rounded: "none", children: "None" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, rounded: "sm", children: "Sm" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, rounded: "rounded", children: "Rounded" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, rounded: "md", children: "Md" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, rounded: "lg", children: "Lg" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, rounded: "xl", children: "Xl" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, rounded: "full", children: "Full" })
    ] })
  };
  var WithIcon = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Toggle_exports.Toggle, { ...args, defaultPressed: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}),
      "Reviewed"
    ] })
  };
  var Disabled = {
    args: { disabled: true }
  };
  var Controlled = {
    render: (args) => {
      const [pressed, setPressed] = (0, import_react3.useState)(false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { ...args, pressed, onPressedChange: setPressed, children: pressed ? "Auto-refresh on" : "Auto-refresh off" });
    }
  };

  // .design-sync/.cache/previews/Toggle.tsx
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
  var Primary2 = (
    /* Primary */
    compose(Toggle_stories_exports, "Primary")
  );
  var Variants2 = (
    /* Variants */
    compose(Toggle_stories_exports, "Variants")
  );
  var Sizes2 = (
    /* Sizes */
    compose(Toggle_stories_exports, "Sizes")
  );
  var Rounded2 = (
    /* Rounded */
    compose(Toggle_stories_exports, "Rounded")
  );
  var WithIcon2 = (
    /* With Icon */
    compose(Toggle_stories_exports, "WithIcon")
  );
  var Disabled2 = (
    /* Disabled */
    compose(Toggle_stories_exports, "Disabled")
  );
  var Controlled2 = (
    /* Controlled */
    compose(Toggle_stories_exports, "Controlled")
  );
  return __toCommonJS(Toggle_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
