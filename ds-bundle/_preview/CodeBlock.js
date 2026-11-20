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

  // .design-sync/.cache/previews/CodeBlock.tsx
  var CodeBlock_exports = {};
  __export(CodeBlock_exports, {
    CodeRun: () => CodeRun2,
    Default: () => Default2,
    ErrorOutput: () => ErrorOutput2,
    HighlightedPython: () => HighlightedPython2,
    Inline: () => Inline2,
    LineNumbers: () => LineNumbers2,
    MaxHeight: () => MaxHeight2,
    NotCopyable: () => NotCopyable2,
    WithHeader: () => WithHeader2,
    Wrap: () => Wrap2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/CodeBlock/CodeBlock.stories.tsx
  var CodeBlock_stories_exports = {};
  __export(CodeBlock_stories_exports, {
    CodeRun: () => CodeRun,
    Default: () => Default,
    ErrorOutput: () => ErrorOutput,
    HighlightedPython: () => HighlightedPython,
    Inline: () => Inline,
    LineNumbers: () => LineNumbers,
    MaxHeight: () => MaxHeight,
    NotCopyable: () => NotCopyable,
    WithHeader: () => WithHeader,
    Wrap: () => Wrap,
    default: () => CodeBlock_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/file-code.js
  init_define_import_meta_env();
  var __iconNode = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
    ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }]
  ];
  var FileCode = createLucideIcon("file-code", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/square-terminal.js
  init_define_import_meta_env();
  var __iconNode2 = [
    ["path", { d: "m7 11 2-2-2-2", key: "1lz0vl" }],
    ["path", { d: "M11 13h4", key: "1p7l4v" }],
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }]
  ];
  var SquareTerminal = createLucideIcon("square-terminal", __iconNode2);

  // ds-shim:ds:Badge
  var ds_Badge_exports = {};
  __export(ds_Badge_exports, {
    default: () => ds_Badge_default
  });
  init_define_import_meta_env();
  __reExport(ds_Badge_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Badge_default = g["Badge"] !== void 0 ? g["Badge"] : g;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Tooltip_default = g2["Tooltip"] !== void 0 ? g2["Tooltip"] : g2;

  // ds-shim:ds:CodeBlock
  var ds_CodeBlock_exports = {};
  __export(ds_CodeBlock_exports, {
    default: () => ds_CodeBlock_default
  });
  init_define_import_meta_env();
  __reExport(ds_CodeBlock_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_CodeBlock_default = g3["CodeBlock"] !== void 0 ? g3["CodeBlock"] : g3;

  // src/components/CodeBlock/CodeBlock.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var CONFIG = `{
  "mcpServers": {
    "Devart AI": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://127.0.0.1:5027/sse", "--allow-http"]
    }
  }
}`;
  var PYTHON_TOKENS = [
    ["keyword", "import"],
    [null, " pandas "],
    ["keyword", "as"],
    [null, " pd\n\n"],
    ["comment", "# Revenue by region, top three"],
    [null, "\ndf = pd.read_csv("],
    ["string", "'sales.csv'"],
    [null, ")\ntop = df.groupby("],
    ["string", "'region'"],
    [null, ")["],
    ["string", "'revenue'"],
    [null, "].sum().nlargest("],
    ["number", "3"],
    [null, ")\n"],
    ["keyword", "for"],
    [null, " region, total "],
    ["keyword", "in"],
    [null, " top.items():\n    "],
    ["keyword", "print"],
    [null, "(region, round(total / "],
    ["number", "1000"],
    [null, ", "],
    ["number", "1"],
    [null, "))"]
  ];
  var PYTHON = PYTHON_TOKENS.map(([, text]) => text).join("");
  var highlight = (tokens) => {
    const out = [];
    let at = 0;
    for (const [variant, text] of tokens) {
      out.push(
        variant ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: (0, ds_CodeBlock_exports.codeSyntaxVariants)({ variant }), children: text }, at) : text
      );
      at += text.length;
    }
    return out;
  };
  var PYTHON_OUTPUT = `North 412.6
West 287.3
South 154.9`;
  var LOG = `[09:14:02] Loaded 18,240 rows from sales.csv in 0.42s (columns: region, revenue, quarter, product, channel, discount, returned)
[09:14:02] Grouped by region: 4 groups, the largest North with 6,118 rows
[09:14:03] Done`;
  var TRACEBACK = `Traceback (most recent call last):
  File "<cell>", line 4, in <module>
    df = pd.read_csv('sales.csv')
FileNotFoundError: [Errno 2] No such file or directory: 'sales.csv' — the workspace has no file by that name; upload it, or choose one from Files.`;
  var LONG_SQL = Array.from(
    { length: 40 },
    (_, i) => `SELECT ${i + 1} AS step, 'stage ${i + 1}' AS label FROM pipeline_runs;`
  ).join("\n");
  var meta = {
    title: "Compositions/CodeBlock",
    component: ds_CodeBlock_exports.CodeBlock,
    tags: ["autodocs"],
    args: { code: CONFIG, size: "md", variant: "default", copyable: true },
    argTypes: {
      size: { control: "inline-radio", options: ["sm", "md"] },
      variant: { control: "inline-radio", options: ["default", "error"] }
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full max-w-lg", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) }) })
    ]
  };
  var CodeBlock_stories_default = meta;
  var Default = {};
  var Inline = {
    args: { code: "db2 get instance", size: "sm" }
  };
  var NotCopyable = {
    args: { copyable: false, code: "SELECT 1;", size: "sm" }
  };
  var WithHeader = {
    args: {
      header: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, {}),
        "claude_desktop_config.json"
      ] })
    }
  };
  var LineNumbers = {
    args: { code: PYTHON, lineNumbers: true }
  };
  var MaxHeight = {
    args: {
      code: LONG_SQL,
      lineNumbers: true,
      maxHeight: "14rem",
      header: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, {}),
        "pipeline.sql"
      ] })
    }
  };
  var Wrap = {
    args: {
      code: LOG,
      wrap: true,
      header: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        "Output",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Badge_exports.Badge, { variant: "green", size: "sm", children: "Done" })
      ] })
    }
  };
  var ErrorOutput = {
    name: "Error",
    args: {
      code: TRACEBACK,
      variant: "error",
      wrap: true,
      header: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        "Output",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Badge_exports.Badge, { variant: "error", size: "sm", children: "Error" })
      ] })
    }
  };
  var HighlightedPython = {
    args: {
      code: PYTHON,
      children: highlight(PYTHON_TOKENS),
      lineNumbers: true,
      header: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, {}),
        "Python"
      ] })
    }
  };
  var CodeRun = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_CodeBlock_exports.CodeBlock,
        {
          code: PYTHON,
          lineNumbers: true,
          maxHeight: "14rem",
          copyLabel: "Copy code",
          header: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, {}),
            "Python"
          ] }),
          children: highlight(PYTHON_TOKENS)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_CodeBlock_exports.CodeBlock,
        {
          code: PYTHON_OUTPUT,
          wrap: true,
          maxHeight: "12rem",
          copyLabel: "Copy output",
          header: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, {}),
            "Output",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Badge_exports.Badge, { variant: "green", size: "sm", children: "Done" })
          ] })
        }
      )
    ] })
  };

  // .design-sync/.cache/previews/CodeBlock.tsx
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
    compose(CodeBlock_stories_exports, "Default")
  );
  var Inline2 = (
    /* Inline */
    compose(CodeBlock_stories_exports, "Inline")
  );
  var NotCopyable2 = (
    /* Not Copyable */
    compose(CodeBlock_stories_exports, "NotCopyable")
  );
  var WithHeader2 = (
    /* With Header */
    compose(CodeBlock_stories_exports, "WithHeader")
  );
  var LineNumbers2 = (
    /* Line Numbers */
    compose(CodeBlock_stories_exports, "LineNumbers")
  );
  var MaxHeight2 = (
    /* Max Height */
    compose(CodeBlock_stories_exports, "MaxHeight")
  );
  var Wrap2 = (
    /* Wrap */
    compose(CodeBlock_stories_exports, "Wrap")
  );
  var ErrorOutput2 = (
    /* Error */
    compose(CodeBlock_stories_exports, "ErrorOutput")
  );
  var HighlightedPython2 = (
    /* Highlighted Python */
    compose(CodeBlock_stories_exports, "HighlightedPython")
  );
  var CodeRun2 = (
    /* Code Run */
    compose(CodeBlock_stories_exports, "CodeRun")
  );
  return __toCommonJS(CodeBlock_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/file-code.js:
lucide-react/dist/esm/icons/square-terminal.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
