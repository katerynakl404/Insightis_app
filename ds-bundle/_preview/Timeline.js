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

  // .design-sync/.cache/previews/Timeline.tsx
  var Timeline_exports = {};
  __export(Timeline_exports, {
    Controlled: () => Controlled2,
    Default: () => Default2,
    StandaloneStep: () => StandaloneStep2,
    StepStatuses: () => StepStatuses2,
    WithStepIcons: () => WithStepIcons2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Timeline/Timeline.stories.tsx
  var Timeline_stories_exports = {};
  __export(Timeline_stories_exports, {
    Controlled: () => Controlled,
    Default: () => Default,
    StandaloneStep: () => StandaloneStep,
    StepStatuses: () => StepStatuses,
    WithStepIcons: () => WithStepIcons,
    default: () => Timeline_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/database.js
  init_define_import_meta_env();
  var __iconNode = [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
    ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
    ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
  ];
  var Database = createLucideIcon("database", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/file-text.js
  init_define_import_meta_env();
  var __iconNode2 = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }]
  ];
  var FileText = createLucideIcon("file-text", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/search.js
  init_define_import_meta_env();
  var __iconNode3 = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ];
  var Search = createLucideIcon("search", __iconNode3);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/wrench.js
  init_define_import_meta_env();
  var __iconNode4 = [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
        key: "1ngwbx"
      }
    ]
  ];
  var Wrench = createLucideIcon("wrench", __iconNode4);

  // src/components/Timeline/Timeline.stories.tsx
  var import_react3 = __toESM(require_react_shim());

  // ds-shim:ds:Timeline
  var ds_Timeline_exports = {};
  __export(ds_Timeline_exports, {
    default: () => ds_Timeline_default
  });
  init_define_import_meta_env();
  __reExport(ds_Timeline_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Timeline_default = g["Timeline"] !== void 0 ? g["Timeline"] : g;

  // src/components/Timeline/Timeline.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/Timeline",
    component: ds_Timeline_exports.Timeline,
    tags: ["autodocs"],
    args: {
      defaultOpen: true
    },
    argTypes: {
      open: { control: false },
      defaultOpen: { control: "boolean" },
      onOpenChange: { control: false },
      children: { control: false }
    }
  };
  var Timeline_stories_default = meta;
  var Default = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Timeline_exports.Timeline, { ...args, className: "w-96", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineHeader, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {}), children: "Tool calls" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Timeline_exports.TimelineContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "success", title: "postgres-mcp · list_tables", children: "Found 12 tables in schema public." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "success", title: "postgres-mcp · run_query", children: "Returned 248 rows in 312ms." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "error", title: "files-mcp · read_file", children: "File not found: q3-report.xlsx." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "pending", title: "semantics-mcp · define_metric" })
      ] })
    ] })
  };
  var StepStatuses = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Timeline_exports.Timeline, { ...args, className: "w-96", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineHeader, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {}), children: "Step statuses" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Timeline_exports.TimelineContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "pending", title: "Waiting for connection" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "active", title: "Fetching metric definitions" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "success", title: "Validated 34 metrics", defaultOpen: true, children: "All metrics passed schema validation." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "error", title: "Failed to publish catalog", children: "Connection to the semantics service timed out." })
      ] })
    ] })
  };
  var Controlled = {
    render: (args) => {
      const [open, setOpen] = (0, import_react3.useState)(false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Timeline_exports.Timeline, { ...args, open, onOpenChange: setOpen, className: "w-96", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineHeader, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {}), children: open ? "Hide tool calls" : "Show tool calls" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Timeline_exports.TimelineContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "success", title: "chat-mcp · search_docs", children: "Matched 6 relevant documents." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "success", title: "chat-mcp · summarize", children: "Summary generated from 6 documents." })
        ] })
      ] });
    }
  };
  var WithStepIcons = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Timeline_exports.Timeline, { ...args, className: "w-96", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineHeader, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {}), children: "Data lookup" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Timeline_exports.TimelineContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Timeline_exports.TimelineStep,
          {
            status: "success",
            title: "Query warehouse",
            icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
            children: "Pulled revenue by region for Q3."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Timeline_exports.TimelineStep, { status: "success", title: "Read file", icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}), children: "Parsed budget-2026.csv, 1,204 rows." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Timeline_exports.TimelineStep,
          {
            status: "active",
            title: "Search knowledge base",
            icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {})
          }
        )
      ] })
    ] })
  };
  var StandaloneStep = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Timeline_exports.TimelineStep,
      {
        status: "success",
        title: "mcp-server · get_schema",
        toggleLabel: "Toggle step details",
        defaultOpen: true,
        className: "w-96",
        children: "Retrieved schema for 5 tables."
      }
    )
  };

  // .design-sync/.cache/previews/Timeline.tsx
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
    compose(Timeline_stories_exports, "Default")
  );
  var StepStatuses2 = (
    /* Step Statuses */
    compose(Timeline_stories_exports, "StepStatuses")
  );
  var Controlled2 = (
    /* Controlled */
    compose(Timeline_stories_exports, "Controlled")
  );
  var WithStepIcons2 = (
    /* With Step Icons */
    compose(Timeline_stories_exports, "WithStepIcons")
  );
  var StandaloneStep2 = (
    /* Standalone Step */
    compose(Timeline_stories_exports, "StandaloneStep")
  );
  return __toCommonJS(Timeline_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/database.js:
lucide-react/dist/esm/icons/file-text.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/wrench.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
