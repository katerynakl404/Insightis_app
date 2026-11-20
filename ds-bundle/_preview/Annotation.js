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

  // .design-sync/.cache/previews/Annotation.tsx
  var Annotation_exports = {};
  __export(Annotation_exports, {
    DarkTheme: () => DarkTheme2,
    Default: () => Default2,
    Leaving: () => Leaving2,
    NeighbouringTargets: () => NeighbouringTargets2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Annotation/Annotation.stories.tsx
  var Annotation_stories_exports = {};
  __export(Annotation_stories_exports, {
    DarkTheme: () => DarkTheme,
    Default: () => Default,
    Leaving: () => Leaving,
    NeighbouringTargets: () => NeighbouringTargets,
    default: () => Annotation_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/paperclip.js
  init_define_import_meta_env();
  var __iconNode = [
    [
      "path",
      {
        d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
        key: "1miecu"
      }
    ]
  ];
  var Paperclip = createLucideIcon("paperclip", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/plug.js
  init_define_import_meta_env();
  var __iconNode2 = [
    ["path", { d: "M12 22v-5", key: "1ega77" }],
    ["path", { d: "M15 8V2", key: "18g5xt" }],
    [
      "path",
      { d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z", key: "1xoxul" }
    ],
    ["path", { d: "M9 8V2", key: "14iosj" }]
  ];
  var Plug = createLucideIcon("plug", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/send.js
  init_define_import_meta_env();
  var __iconNode3 = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ];
  var Send = createLucideIcon("send", __iconNode3);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/sparkles.js
  init_define_import_meta_env();
  var __iconNode4 = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr"
      }
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
  ];
  var Sparkles = createLucideIcon("sparkles", __iconNode4);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/workflow.js
  init_define_import_meta_env();
  var __iconNode5 = [
    ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }],
    ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }],
    ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]
  ];
  var Workflow = createLucideIcon("workflow", __iconNode5);

  // ds-shim:ds:IconButton
  var ds_IconButton_exports = {};
  __export(ds_IconButton_exports, {
    default: () => ds_IconButton_default
  });
  init_define_import_meta_env();
  __reExport(ds_IconButton_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_IconButton_default = g["IconButton"] !== void 0 ? g["IconButton"] : g;

  // ds-shim:ds:Spotlight
  var ds_Spotlight_exports = {};
  __export(ds_Spotlight_exports, {
    default: () => ds_Spotlight_default
  });
  init_define_import_meta_env();
  __reExport(ds_Spotlight_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Spotlight_default = g2["Spotlight"] !== void 0 ? g2["Spotlight"] : g2;

  // ds-shim:ds:Annotation
  var ds_Annotation_exports = {};
  __export(ds_Annotation_exports, {
    default: () => ds_Annotation_default
  });
  init_define_import_meta_env();
  __reExport(ds_Annotation_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_Annotation_default = g3["Annotation"] !== void 0 ? g3["Annotation"] : g3;

  // src/components/Annotation/Annotation.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  function Composer() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex h-72 items-start justify-center pt-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        "data-demo": "composer",
        className: "flex w-[34rem] items-center gap-1 rounded-xl border border-stroke bg-surface-card p-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_IconButton_exports.IconButton,
            {
              "data-demo": "attach",
              variant: "tertiary",
              size: "sm",
              "aria-label": "Attach",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, {})
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_IconButton_exports.IconButton,
            {
              "data-demo": "connect",
              variant: "tertiary",
              size: "sm",
              "aria-label": "Connections",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, {})
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 px-2 text-ink-inactive text-sm", children: "Ask a question…" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_IconButton_exports.IconButton,
            {
              "data-demo": "model",
              variant: "tertiary",
              size: "sm",
              "aria-label": "Model",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {})
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_IconButton_exports.IconButton, { "data-demo": "send", size: "sm", "aria-label": "Send", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}) })
        ]
      }
    ) });
  }
  var LINE = 64 + 49 + 8 + 34;
  var meta = {
    title: "Compositions/Annotation",
    component: ds_Annotation_exports.AnnotationGroup,
    tags: ["autodocs"],
    args: { top: LINE },
    argTypes: {
      children: { control: false },
      ref: { control: false, table: { disable: true } }
    },
    parameters: {
      layout: "fullscreen",
      docs: { story: { inline: false, iframeHeight: 320 } }
    }
  };
  var Annotation_stories_default = meta;
  var Default = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spotlight_exports.Spotlight, { target: '[data-demo="composer"]' }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Annotation_exports.AnnotationGroup, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Annotation_exports.Annotation, { target: '[data-demo="attach"]', icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, {}), children: [
          "Choose a connector or ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "attach a file" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Annotation_exports.Annotation, { target: '[data-demo="model"]', icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), children: "Pick a model and how deeply it thinks" })
      ] })
    ] })
  };
  var NeighbouringTargets = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Annotation_exports.AnnotationGroup, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Annotation_exports.Annotation, { target: '[data-demo="attach"]', children: "Attach a file" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Annotation_exports.Annotation, { target: '[data-demo="connect"]', children: "Choose a connector" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Annotation_exports.Annotation, { target: ['[data-demo="model"]', '[data-demo="send"]'], children: "Pick a model, then send" })
      ] })
    ] })
  };
  var Leaving = {
    args: { leaving: true },
    render: Default.render
  };
  var DarkTheme = {
    globals: { theme: "dark" },
    render: Default.render
  };

  // .design-sync/.cache/previews/Annotation.tsx
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
    compose(Annotation_stories_exports, "Default")
  );
  var NeighbouringTargets2 = (
    /* Neighbouring Targets */
    compose(Annotation_stories_exports, "NeighbouringTargets")
  );
  var Leaving2 = (
    /* Leaving */
    compose(Annotation_stories_exports, "Leaving")
  );
  var DarkTheme2 = (
    /* Dark Theme */
    compose(Annotation_stories_exports, "DarkTheme")
  );
  return __toCommonJS(Annotation_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/paperclip.js:
lucide-react/dist/esm/icons/plug.js:
lucide-react/dist/esm/icons/send.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/workflow.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
