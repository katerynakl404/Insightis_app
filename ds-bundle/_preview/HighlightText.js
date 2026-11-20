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

  // .design-sync/.cache/previews/HighlightText.tsx
  var HighlightText_exports = {};
  __export(HighlightText_exports, {
    Default: () => Default2,
    InATree: () => InATree2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/HighlightText/HighlightText.stories.tsx
  var HighlightText_stories_exports = {};
  __export(HighlightText_stories_exports, {
    Default: () => Default,
    InATree: () => InATree,
    default: () => HighlightText_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/search.js
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ];
  var Search = createLucideIcon("search", __iconNode);

  // src/components/HighlightText/HighlightText.stories.tsx
  var import_react3 = __toESM(require_react_shim());

  // ds-shim:ds:InputGroup
  var ds_InputGroup_exports = {};
  __export(ds_InputGroup_exports, {
    default: () => ds_InputGroup_default
  });
  init_define_import_meta_env();
  __reExport(ds_InputGroup_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_InputGroup_default = g["InputGroup"] !== void 0 ? g["InputGroup"] : g;

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Typography_default = g2["Typography"] !== void 0 ? g2["Typography"] : g2;

  // ds-shim:ds:HighlightText
  var ds_HighlightText_exports = {};
  __export(ds_HighlightText_exports, {
    default: () => ds_HighlightText_default
  });
  init_define_import_meta_env();
  __reExport(ds_HighlightText_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_HighlightText_default = g3["HighlightText"] !== void 0 ? g3["HighlightText"] : g3;

  // src/components/HighlightText/HighlightText.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/HighlightText",
    component: ds_HighlightText_exports.HighlightText,
    tags: ["autodocs"],
    args: { text: "invoice_items", query: "invo" },
    argTypes: {
      text: { control: "text" },
      query: { control: "text" }
    },
    parameters: {
      docs: {
        description: {
          component: "The part of a name a search matched, marked where the name is shown. For a tree, or text long enough to hide the match — not a flat list of short names filtered by name, where the filter already says why a row stayed. A highlighter: the `brand` badge’s fill (`--badge-brand-bg`) under the name’s own ink, one weight step up (`font-medium`) so it does not rest on colour alone; AA in both themes. Every occurrence, case-insensitive, plain substring — the same test that kept the row. An empty query renders the text as it is."
        }
      }
    }
  };
  var HighlightText_stories_default = meta;
  var Default = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "span", textStyle: "body14", textColor: "primary", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HighlightText_exports.HighlightText, { ...args }) })
  };
  var TREE = [
    [0, "billing"],
    [1, "invoices"],
    [2, "invoice_id"],
    [2, "issued_at"],
    [1, "payments"],
    [2, "payment_id"],
    [2, "invoice_ref"],
    [1, "refunds"],
    [2, "refund_id"]
  ];
  var InATree = {
    render: () => {
      const [query, setQuery] = (0, import_react3.useState)("invo");
      const q = query.trim().toLowerCase();
      const hits = TREE.map(([, name]) => name.toLowerCase().includes(q));
      const kept = TREE.map(([depth], i) => {
        if (!q || hits[i]) return true;
        for (let j = i + 1; j < TREE.length; j += 1) {
          const row = TREE[j];
          if (!row || row[0] <= depth) break;
          if (hits[j]) return true;
        }
        return false;
      });
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-80 flex-col gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_exports.InputGroup, { size: "sm", variant: "outline", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_exports.InputGroupAddon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_InputGroup_exports.InputGroupInput,
            {
              value: query,
              onChange: (e) => setQuery(e.target.value),
              "aria-label": "Search the schema"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "flex flex-col rounded-lg border border-stroke", children: TREE.map(
          ([depth, name], i) => kept[i] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "li",
            {
              className: "border-stroke border-b py-2.5 pe-4 last:border-b-0",
              style: { paddingInlineStart: 16 + depth * 20 },
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_Typography_exports.Typography,
                {
                  element: "span",
                  textStyle: "body14",
                  textColor: "primary",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HighlightText_exports.HighlightText, { text: name, query })
                }
              )
            },
            name
          ) : null
        ) })
      ] });
    }
  };

  // .design-sync/.cache/previews/HighlightText.tsx
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
    compose(HighlightText_stories_exports, "Default")
  );
  var InATree2 = (
    /* In A Tree */
    compose(HighlightText_stories_exports, "InATree")
  );
  return __toCommonJS(HighlightText_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
