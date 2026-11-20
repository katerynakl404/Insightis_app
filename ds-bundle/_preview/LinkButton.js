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

  // sb-stub:storybook/test
  var require_test = __commonJS({
    "sb-stub:storybook/test"(exports, module) {
      init_define_import_meta_env();
      var inert = new Proxy(function() {
      }, { get: function(t, k) {
        if (k === "then") return void 0;
        if (k === "prototype") return t.prototype;
        if (k === "valueOf" || k === "toString" || k === Symbol.toPrimitive) return function() {
          return "";
        };
        return inert;
      }, apply: function() {
        return inert;
      }, construct: function() {
        return {};
      } });
      var m = {};
      "fn action actions expect userEvent within waitFor screen fireEvent spyOn mocked jest vi configureActions decorateAction setupWorker http HttpResponse graphql rest".split(" ").forEach(function(k) {
        m[k] = inert;
      });
      var def = function(p) {
        return p && p.children !== void 0 ? p.children : null;
      };
      Object.assign(def, m);
      module.exports = new Proxy(def, { get: function(t, k) {
        if (k === "then") return void 0;
        if (k === "prototype") return t.prototype;
        return k in m ? m[k] : k === "__esModule" ? void 0 : inert;
      } });
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = window.DevartUI;
    }
  });

  // .design-sync/.cache/previews/LinkButton.tsx
  var LinkButton_exports = {};
  __export(LinkButton_exports, {
    AsButton: () => AsButton2,
    Disabled: () => Disabled2,
    InText: () => InText2,
    Inline: () => Inline2,
    Primary: () => Primary2,
    Variants: () => Variants2,
    WithTrailingGlyph: () => WithTrailingGlyph2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/LinkButton/LinkButton.stories.tsx
  var LinkButton_stories_exports = {};
  __export(LinkButton_stories_exports, {
    AsButton: () => AsButton,
    Disabled: () => Disabled,
    InText: () => InText,
    Inline: () => Inline,
    Primary: () => Primary,
    Variants: () => Variants,
    WithTrailingGlyph: () => WithTrailingGlyph,
    default: () => LinkButton_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/arrow-right.js
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
  ];
  var ArrowRight = createLucideIcon("arrow-right", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js
  init_define_import_meta_env();
  var __iconNode2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
  var ChevronDown = createLucideIcon("chevron-down", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/chevron-up.js
  init_define_import_meta_env();
  var __iconNode3 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
  var ChevronUp = createLucideIcon("chevron-up", __iconNode3);

  // src/components/LinkButton/LinkButton.stories.tsx
  var import_react3 = __toESM(require_react_shim());
  var import_test = __toESM(require_test());

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Typography_default = g["Typography"] !== void 0 ? g["Typography"] : g;

  // ds-shim:ds:LinkButton
  var ds_LinkButton_exports = {};
  __export(ds_LinkButton_exports, {
    default: () => ds_LinkButton_default
  });
  init_define_import_meta_env();
  __reExport(ds_LinkButton_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_LinkButton_default = g2["LinkButton"] !== void 0 ? g2["LinkButton"] : g2;

  // src/components/LinkButton/LinkButton.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/LinkButton",
    component: ds_LinkButton_exports.LinkButton,
    tags: ["autodocs"],
    args: { children: "Permissions", href: "#", variant: "primary" },
    argTypes: {
      variant: { control: "select", options: ["primary", "secondary", "white"] },
      inline: { control: "boolean" },
      asChild: { table: { disable: true } }
    }
  };
  var LinkButton_stories_default = meta;
  var Primary = {};
  var InText = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Typography_exports.Typography, { element: "p", textColor: "secondary", className: "max-w-md", children: [
      "A connection has to be added to a workspace and then given a scope in it — see ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { href: "#", children: "how scopes work" }),
      " for the difference."
    ] })
  };
  var Variants = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { href: "#", children: "Primary — the default" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { href: "#", variant: "secondary", children: "Secondary — inside copy it must not outshout the sentence" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-md bg-brand-primary p-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { href: "#", variant: "white", children: "White — on a solid fill" }) })
    ] })
  };
  var WithTrailingGlyph = {
    args: { rightSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {}) }
  };
  var Disabled = {
    args: { disabled: true, children: "Permissions" }
  };
  var Inline = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Typography_exports.Typography, { children: [
      "Connections are shared across the workspace. See",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { href: "#", inline: true, children: "how permissions work" }),
      " ",
      "before you invite anyone, or",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { href: "#", inline: true, variant: "secondary", children: "read the overview" }),
      " ",
      "first."
    ] })
  };
  var AsButton = {
    render: () => {
      const [all, setAll] = (0, import_react3.useState)(false);
      const [open, setOpen] = (0, import_react3.useState)(false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-start gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Typography_exports.Typography, { textColor: "secondary", children: [
          all ? "5 selected" : "5 connections",
          " ·",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { onClick: () => setAll((v) => !v), children: all ? "Deselect all" : "Select all" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_LinkButton_exports.LinkButton,
          {
            className: "text-sm",
            rightSlot: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {}),
            "aria-expanded": open,
            onClick: () => setOpen((v) => !v),
            children: open ? "View less" : "View more"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { href: "#", className: "text-sm", rightSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {}), children: "Permissions — with an href, a link" })
      ] });
    },
    play: async ({ canvas }) => {
      const selectAll = canvas.getByRole("button", { name: "Select all" });
      await (0, import_test.expect)(selectAll).toHaveAttribute("type", "button");
      selectAll.focus();
      await import_test.userEvent.keyboard("{Enter}");
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Deselect all" })
      ).toBeInTheDocument();
      await (0, import_test.expect)(
        canvas.getByRole("link", { name: /Permissions/ })
      ).toHaveAttribute("href", "#");
    }
  };

  // .design-sync/.cache/previews/LinkButton.tsx
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
    compose(LinkButton_stories_exports, "Primary")
  );
  var InText2 = (
    /* In Text */
    compose(LinkButton_stories_exports, "InText")
  );
  var Variants2 = (
    /* Variants */
    compose(LinkButton_stories_exports, "Variants")
  );
  var WithTrailingGlyph2 = (
    /* With Trailing Glyph */
    compose(LinkButton_stories_exports, "WithTrailingGlyph")
  );
  var Disabled2 = (
    /* Disabled */
    compose(LinkButton_stories_exports, "Disabled")
  );
  var Inline2 = (
    /* Inline */
    compose(LinkButton_stories_exports, "Inline")
  );
  var AsButton2 = (
    /* As Button */
    compose(LinkButton_stories_exports, "AsButton")
  );
  return __toCommonJS(LinkButton_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/arrow-right.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/chevron-up.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
