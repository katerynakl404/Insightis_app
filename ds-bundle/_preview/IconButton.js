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

  // .design-sync/.cache/previews/IconButton.tsx
  var IconButton_exports = {};
  __export(IconButton_exports, {
    Disabled: () => Disabled2,
    DisabledWithTooltip: () => DisabledWithTooltip2,
    Loading: () => Loading2,
    Primary: () => Primary2,
    Sizes: () => Sizes2,
    Variants: () => Variants2,
    WithTooltip: () => WithTooltip2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/IconButton/IconButton.stories.tsx
  var IconButton_stories_exports = {};
  __export(IconButton_stories_exports, {
    Disabled: () => Disabled,
    DisabledWithTooltip: () => DisabledWithTooltip,
    Loading: () => Loading,
    Primary: () => Primary,
    Sizes: () => Sizes,
    Variants: () => Variants,
    WithTooltip: () => WithTooltip,
    default: () => IconButton_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/pencil.js
  init_define_import_meta_env();
  var __iconNode = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ];
  var Pencil = createLucideIcon("pencil", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/plus.js
  init_define_import_meta_env();
  var __iconNode2 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  var Plus = createLucideIcon("plus", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/settings.js
  init_define_import_meta_env();
  var __iconNode3 = [
    [
      "path",
      {
        d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
        key: "1i5ecw"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
  ];
  var Settings = createLucideIcon("settings", __iconNode3);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/trash-2.js
  init_define_import_meta_env();
  var __iconNode4 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode4);

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Tooltip_default = g["Tooltip"] !== void 0 ? g["Tooltip"] : g;

  // ds-shim:ds:IconButton
  var ds_IconButton_exports = {};
  __export(ds_IconButton_exports, {
    default: () => ds_IconButton_default
  });
  init_define_import_meta_env();
  __reExport(ds_IconButton_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_IconButton_default = g2["IconButton"] !== void 0 ? g2["IconButton"] : g2;

  // src/components/IconButton/IconButton.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var import_react3 = __toESM(require_react_shim());
  var meta = {
    title: "Components/IconButton",
    component: ds_IconButton_exports.IconButton,
    // Tooltips need a provider and Storybook has no global one.
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ],
    tags: ["autodocs"],
    args: {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}),
      "aria-label": "Add",
      variant: "primary",
      size: "md",
      rounded: "md",
      isLoading: false,
      disabled: false
    },
    argTypes: {
      variant: {
        control: "select",
        options: [
          "primary",
          "secondary",
          "outline",
          "tertiary",
          "primaryTertiary",
          "destructive",
          "destructiveOutline",
          "destructiveTertiary",
          "transparent"
        ]
      },
      size: {
        control: "select",
        options: ["3xs", "2xs", "xs", "sm", "md", "lg", "xl"]
      },
      rounded: {
        control: "select",
        options: ["none", "sm", "rounded", "md", "lg", "xl", "full"]
      },
      children: { control: false },
      ref: { control: false, table: { disable: true } },
      asChild: { control: false, table: { disable: true } }
    }
  };
  var IconButton_stories_default = meta;
  var Primary = {};
  var VARIANTS = [
    ["primary", "Add"],
    ["secondary", "Edit"],
    ["outline", "Edit"],
    ["tertiary", "Edit"],
    ["primaryTertiary", "Edit"],
    ["destructive", "Delete"],
    ["destructiveOutline", "Delete"],
    ["destructiveTertiary", "Delete"]
  ];
  var variantGlyph = (label) => label === "Add" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}) : label === "Delete" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {});
  var Variants = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap items-center gap-3", children: VARIANTS.map(([variant, label]) => /* @__PURE__ */ (0, import_react3.createElement)(
      ds_IconButton_exports.IconButton,
      {
        ...args,
        "aria-label": label,
        key: variant,
        variant
      },
      variantGlyph(label)
    )) })
  };
  var Sizes = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap items-end gap-4", children: ["3xs", "2xs", "xs", "sm", "md", "lg", "xl"].map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid justify-items-center gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_IconButton_exports.IconButton, { ...args, size }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-ink-secondary text-xxs", children: size })
    ] }, size)) })
  };
  var Loading = {
    args: { isLoading: true },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap items-center gap-3", children: VARIANTS.map(([variant, label]) => /* @__PURE__ */ (0, import_react3.createElement)(
      ds_IconButton_exports.IconButton,
      {
        ...args,
        "aria-label": label,
        key: variant,
        variant
      },
      variantGlyph(label)
    )) })
  };
  var Disabled = {
    args: { disabled: true },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap items-center gap-3", children: VARIANTS.map(([variant, label]) => /* @__PURE__ */ (0, import_react3.createElement)(
      ds_IconButton_exports.IconButton,
      {
        ...args,
        "aria-label": label,
        key: variant,
        variant
      },
      variantGlyph(label)
    )) })
  };
  var WithTooltip = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_IconButton_exports.IconButton, { "aria-label": "Edit", variant: "tertiary", size: "sm", tooltip: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_IconButton_exports.IconButton,
        {
          "aria-label": "Set up Finance warehouse in Data Analyze",
          variant: "tertiary",
          size: "sm",
          tooltip: "Set Up",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {})
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_IconButton_exports.IconButton,
        {
          "aria-label": "Delete",
          variant: "destructiveTertiary",
          size: "sm",
          tooltip: true,
          tooltipSide: "bottom",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
        }
      )
    ] })
  };
  var DisabledWithTooltip = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_IconButton_exports.IconButton,
        {
          "aria-label": "Delete Finance warehouse",
          variant: "destructiveTertiary",
          size: "sm",
          disabled: true,
          tooltip: "Remove it from its workspaces first",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_IconButton_exports.IconButton,
        {
          "aria-label": "Add",
          variant: "primary",
          size: "sm",
          disabled: true,
          tooltip: "Activate the connection to add it",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
        }
      )
    ] }) })
  };

  // .design-sync/.cache/previews/IconButton.tsx
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
    compose(IconButton_stories_exports, "Primary")
  );
  var Variants2 = (
    /* Variants */
    compose(IconButton_stories_exports, "Variants")
  );
  var Sizes2 = (
    /* Sizes */
    compose(IconButton_stories_exports, "Sizes")
  );
  var Loading2 = (
    /* Loading */
    compose(IconButton_stories_exports, "Loading")
  );
  var Disabled2 = (
    /* Disabled */
    compose(IconButton_stories_exports, "Disabled")
  );
  var WithTooltip2 = (
    /* With Tooltip */
    compose(IconButton_stories_exports, "WithTooltip")
  );
  var DisabledWithTooltip2 = (
    /* Disabled With Tooltip */
    compose(IconButton_stories_exports, "DisabledWithTooltip")
  );
  return __toCommonJS(IconButton_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/pencil.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/icons/settings.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
