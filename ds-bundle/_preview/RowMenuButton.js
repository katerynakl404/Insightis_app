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

  // .design-sync/.cache/previews/RowMenuButton.tsx
  var RowMenuButton_exports = {};
  __export(RowMenuButton_exports, {
    AlwaysShown: () => AlwaysShown2,
    Disabled: () => Disabled2,
    InARow: () => InARow2,
    Open: () => Open2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/RowMenuButton/RowMenuButton.stories.tsx
  var RowMenuButton_stories_exports = {};
  __export(RowMenuButton_stories_exports, {
    AlwaysShown: () => AlwaysShown,
    Disabled: () => Disabled,
    InARow: () => InARow,
    Open: () => Open,
    default: () => RowMenuButton_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/pin.js
  init_define_import_meta_env();
  var __iconNode2 = [
    ["path", { d: "M12 17v5", key: "bb1du9" }],
    [
      "path",
      {
        d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
        key: "1nkz8b"
      }
    ]
  ];
  var Pin = createLucideIcon("pin", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/trash-2.js
  init_define_import_meta_env();
  var __iconNode3 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode3);

  // src/components/RowMenuButton/RowMenuButton.stories.tsx
  var import_test = __toESM(require_test());

  // ds-shim:ds:Card
  var ds_Card_exports = {};
  __export(ds_Card_exports, {
    default: () => ds_Card_default
  });
  init_define_import_meta_env();
  __reExport(ds_Card_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Card_default = g["Card"] !== void 0 ? g["Card"] : g;

  // ds-shim:ds:DropdownMenu
  var ds_DropdownMenu_exports = {};
  __export(ds_DropdownMenu_exports, {
    default: () => ds_DropdownMenu_default
  });
  init_define_import_meta_env();
  __reExport(ds_DropdownMenu_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_DropdownMenu_default = g2["DropdownMenu"] !== void 0 ? g2["DropdownMenu"] : g2;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_Tooltip_default = g3["Tooltip"] !== void 0 ? g3["Tooltip"] : g3;

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g4 = window.DevartUI;
  var ds_Typography_default = g4["Typography"] !== void 0 ? g4["Typography"] : g4;

  // ds-shim:ds:RowMenuButton
  var ds_RowMenuButton_exports = {};
  __export(ds_RowMenuButton_exports, {
    default: () => ds_RowMenuButton_default
  });
  init_define_import_meta_env();
  __reExport(ds_RowMenuButton_exports, __toESM(require_ds_raw()));
  var g5 = window.DevartUI;
  var ds_RowMenuButton_default = g5["RowMenuButton"] !== void 0 ? g5["RowMenuButton"] : g5;

  // src/components/RowMenuButton/RowMenuButton.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var MENU = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_DropdownMenu_exports.DropdownMenuItem, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {}),
      "Pin"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_DropdownMenu_exports.DropdownMenuItem, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}),
      "Rename"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownMenu_exports.DropdownMenuSeparator, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_DropdownMenu_exports.DropdownMenuItem, { variant: "danger", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}),
      "Delete"
    ] })
  ] });
  var meta = {
    title: "Compositions/RowMenuButton",
    component: ds_RowMenuButton_exports.RowMenuButton,
    tags: ["autodocs"],
    args: { children: MENU, reveal: true, "aria-label": "More actions" },
    argTypes: {
      children: { control: false },
      ref: { control: false, table: { disable: true } }
    },
    parameters: { layout: "padded" },
    // The trigger names itself in a Tooltip, which needs a provider above it.
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ],
    // A one-line `Card variant="row"`: the `group/row` the trigger answers. The
    // trigger's negative block margin keeps its 24px inside the 20px text line,
    // so the row stays the 44px a one-line row is.
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_RowMenuButton_exports.RowMenuButton, { ...args, className: "-my-0.5" }) })
  };
  var RowMenuButton_stories_default = meta;
  function Row({ children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full max-w-xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Card_exports.Card, { variant: "row", fullWidth: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Typography_exports.Typography,
        {
          element: "span",
          textStyle: "body14",
          textColor: "body",
          className: "min-w-0 flex-1 truncate",
          children: "Q1 revenue commentary"
        }
      ),
      children
    ] }) });
  }
  var InARow = {};
  var Open = {
    play: async ({ canvas, userEvent }) => {
      const trigger = canvas.getByRole("button", { name: "More actions" });
      await userEvent.click(trigger);
      await (0, import_test.expect)(trigger).toHaveAttribute("aria-expanded", "true");
      await (0, import_test.expect)(
        await import_test.screen.findByRole("menuitem", { name: "Delete" })
      ).toBeVisible();
    }
  };
  var AlwaysShown = {
    args: { reveal: false }
  };
  var Disabled = {
    args: { reveal: false, disabled: true }
  };

  // .design-sync/.cache/previews/RowMenuButton.tsx
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
  var InARow2 = (
    /* In A Row */
    compose(RowMenuButton_stories_exports, "InARow")
  );
  var Open2 = (
    /* Open */
    compose(RowMenuButton_stories_exports, "Open")
  );
  var AlwaysShown2 = (
    /* Always Shown */
    compose(RowMenuButton_stories_exports, "AlwaysShown")
  );
  var Disabled2 = (
    /* Disabled */
    compose(RowMenuButton_stories_exports, "Disabled")
  );
  return __toCommonJS(RowMenuButton_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/pencil.js:
lucide-react/dist/esm/icons/pin.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
