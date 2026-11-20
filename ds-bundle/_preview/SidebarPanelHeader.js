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

  // .design-sync/.cache/previews/SidebarPanelHeader.tsx
  var SidebarPanelHeader_exports = {};
  __export(SidebarPanelHeader_exports, {
    CollapsedRail: () => CollapsedRail2,
    Expanded: () => Expanded2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Sidebar/SidebarPanelHeader.stories.tsx
  var SidebarPanelHeader_stories_exports = {};
  __export(SidebarPanelHeader_stories_exports, {
    CollapsedRail: () => CollapsedRail,
    Expanded: () => Expanded,
    default: () => SidebarPanelHeader_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/layers.js
  init_define_import_meta_env();
  var __iconNode = [
    [
      "path",
      {
        d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
        key: "zw3jo"
      }
    ],
    [
      "path",
      {
        d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
        key: "1wduqc"
      }
    ],
    [
      "path",
      {
        d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
        key: "kqbvx6"
      }
    ]
  ];
  var Layers = createLucideIcon("layers", __iconNode);

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Typography_default = g["Typography"] !== void 0 ? g["Typography"] : g;

  // ds-shim:ds:Sidebar
  var ds_Sidebar_exports = {};
  __export(ds_Sidebar_exports, {
    default: () => ds_Sidebar_default
  });
  init_define_import_meta_env();
  __reExport(ds_Sidebar_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Sidebar_default = g2["Sidebar"] !== void 0 ? g2["Sidebar"] : g2;

  // src/components/Sidebar/SidebarPanelHeader.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Shell = ({
    defaultOpen,
    children
  }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarProvider, { defaultOpen, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Sidebar_exports.Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarHeader, { children }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarContent, {})
  ] }) });
  var Wordmark = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-5 shrink-0 text-brand-primary" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Typography_exports.Typography,
      {
        className: "truncate group-data-[collapsible=icon]:hidden",
        element: "span",
        textStyle: "title16",
        children: "Insightis"
      }
    )
  ] });
  var meta = {
    title: "Compositions/Sidebar/SidebarPanelHeader",
    component: ds_Sidebar_exports.SidebarPanelHeader,
    tags: ["autodocs"],
    argTypes: {
      logoIcon: { control: false },
      sidebarTrigger: { control: false }
    },
    parameters: { layout: "fullscreen" },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-svh min-h-[20rem] w-full", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ]
  };
  var SidebarPanelHeader_stories_default = meta;
  var Expanded = {
    args: {
      logoIcon: (
        // biome-ignore lint/a11y/useValidAnchor: story-only placeholder link
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#", "aria-label": "Home", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}) })
      )
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { defaultOpen: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarPanelHeader, { ...args }) })
  };
  var CollapsedRail = {
    args: {
      logoIcon: (
        // biome-ignore lint/a11y/useValidAnchor: story-only placeholder link
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#", "aria-label": "Home", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}) })
      ),
      sidebarTrigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Sidebar_exports.SidebarTrigger,
        {
          className: "shrink-0",
          label: "Expand sidebar",
          size: "xs",
          tooltip: true
        }
      )
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { defaultOpen: false, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarPanelHeader, { ...args }) })
  };

  // .design-sync/.cache/previews/SidebarPanelHeader.tsx
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
  var Expanded2 = (
    /* Expanded */
    compose(SidebarPanelHeader_stories_exports, "Expanded")
  );
  var CollapsedRail2 = (
    /* Collapsed Rail */
    compose(SidebarPanelHeader_stories_exports, "CollapsedRail")
  );
  return __toCommonJS(SidebarPanelHeader_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/layers.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
