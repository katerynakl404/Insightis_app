"use strict";
var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn2, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
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

  // .design-sync/.cache/previews/IconCard.tsx
  var IconCard_exports = {};
  __export(IconCard_exports, {
    CatalogGrid: () => CatalogGrid2,
    Default: () => Default2,
    Disabled: () => Disabled2,
    DisabledIsInert: () => DisabledIsInert2,
    HoverReveal: () => HoverReveal2,
    Keyboard: () => Keyboard2,
    Loading: () => Loading2,
    LongName: () => LongName2,
    UnknownConnector: () => UnknownConnector2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/IconCard/IconCard.stories.tsx
  var IconCard_stories_exports = {};
  __export(IconCard_stories_exports, {
    CatalogGrid: () => CatalogGrid,
    Default: () => Default,
    Disabled: () => Disabled,
    DisabledIsInert: () => DisabledIsInert,
    HoverReveal: () => HoverReveal,
    Keyboard: () => Keyboard,
    Loading: () => Loading,
    LongName: () => LongName,
    UnknownConnector: () => UnknownConnector,
    default: () => IconCard_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/plus.js
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  var Plus = createLucideIcon("plus", __iconNode);

  // src/components/IconCard/IconCard.stories.tsx
  var import_test = __toESM(require_test());

  // ds-shim:ds:ConnectorLogo
  var ds_ConnectorLogo_exports = {};
  __export(ds_ConnectorLogo_exports, {
    default: () => ds_ConnectorLogo_default
  });
  init_define_import_meta_env();
  __reExport(ds_ConnectorLogo_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_ConnectorLogo_default = g["ConnectorLogo"] !== void 0 ? g["ConnectorLogo"] : g;

  // ds-shim:ds:IconCard
  var ds_IconCard_exports = {};
  __export(ds_IconCard_exports, {
    default: () => ds_IconCard_default
  });
  init_define_import_meta_env();
  __reExport(ds_IconCard_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_IconCard_default = g2["IconCard"] !== void 0 ? g2["IconCard"] : g2;

  // src/components/IconCard/IconCard.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var import_react3 = __toESM(require_react_shim());
  var connectorArgs = (connector, name = connector) => ({
    label: name,
    "aria-label": `Connect ${name}`,
    icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ConnectorLogo_exports.ConnectorLogo, { connector, size: "md" })
  });
  var meta = {
    title: "Compositions/IconCard",
    component: ds_IconCard_exports.IconCard,
    tags: ["autodocs"],
    args: {
      ...connectorArgs("PostgreSQL"),
      actionLabel: "Connect",
      actionIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}),
      disabled: false,
      onActivate: (0, import_test.fn)()
    },
    argTypes: {
      label: { control: "text" },
      actionLabel: { control: "text" },
      disabled: { control: "boolean" },
      icon: { control: false },
      badge: { control: false },
      actionIcon: { control: false },
      onActivate: { control: false },
      onClick: { control: false },
      onKeyDown: { control: false },
      ref: { control: false, table: { disable: true } }
    },
    parameters: {
      layout: "centered"
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-32", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_IconCard_exports.IconCard, { ...args }) })
  };
  var IconCard_stories_default = meta;
  var Default = {};
  var HoverReveal = {
    args: connectorArgs("Snowflake")
  };
  var UnknownConnector = {
    args: connectorArgs("Fabrikam", "Fabrikam DB")
  };
  var LongName = {
    args: connectorArgs("Salesforce", "Salesforce Marketing Cloud Intelligence")
  };
  var Disabled = {
    args: { ...connectorArgs("Oracle"), disabled: true }
  };
  var Loading = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-32", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_IconCard_exports.IconCardSkeleton, {}) })
  };
  var CATALOG_COLUMNS = "repeat(auto-fill, minmax(max(7rem, (100% - 7 * .75rem) / 8), 1fr))";
  var CatalogGrid = {
    parameters: { layout: "padded" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "grid w-[640px] gap-3",
        style: { gridTemplateColumns: CATALOG_COLUMNS },
        children: [
          [
            "PostgreSQL",
            "MySQL",
            "Snowflake",
            "BigQuery",
            "Oracle",
            "Redshift",
            "MongoDB"
          ].map((connector) => /* @__PURE__ */ (0, import_react3.createElement)(ds_IconCard_exports.IconCard, { ...args, ...connectorArgs(connector), key: connector })),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_IconCard_exports.IconCardSkeleton, {})
        ]
      }
    )
  };
  var Keyboard = {
    play: async ({ args, canvas, userEvent }) => {
      const card = canvas.getByRole("button", { name: "Connect PostgreSQL" });
      await userEvent.click(card);
      await (0, import_test.expect)(args.onActivate).toHaveBeenCalledOnce();
      card.focus();
      await userEvent.keyboard("{Enter}");
      await (0, import_test.expect)(args.onActivate).toHaveBeenCalledTimes(2);
      await userEvent.keyboard(" ");
      await (0, import_test.expect)(args.onActivate).toHaveBeenCalledTimes(3);
    }
  };
  var DisabledIsInert = {
    args: { disabled: true },
    play: async ({ args, canvas, userEvent }) => {
      const card = canvas.getByRole("button", { name: "Connect PostgreSQL" });
      await (0, import_test.expect)(card).toHaveAttribute("aria-disabled", "true");
      await (0, import_test.expect)(card).toHaveAttribute("tabindex", "0");
      await userEvent.click(card);
      card.focus();
      await userEvent.keyboard("{Enter}");
      await userEvent.keyboard(" ");
      await (0, import_test.expect)(args.onActivate).not.toHaveBeenCalled();
      await (0, import_test.expect)(canvas.queryByText("Connect")).not.toBeInTheDocument();
    }
  };

  // .design-sync/.cache/previews/IconCard.tsx
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
    compose(IconCard_stories_exports, "Default")
  );
  var HoverReveal2 = (
    /* Hover Reveal */
    compose(IconCard_stories_exports, "HoverReveal")
  );
  var UnknownConnector2 = (
    /* Unknown Connector */
    compose(IconCard_stories_exports, "UnknownConnector")
  );
  var LongName2 = (
    /* Long Name */
    compose(IconCard_stories_exports, "LongName")
  );
  var Disabled2 = (
    /* Disabled */
    compose(IconCard_stories_exports, "Disabled")
  );
  var Loading2 = (
    /* Loading */
    compose(IconCard_stories_exports, "Loading")
  );
  var CatalogGrid2 = (
    /* Catalog Grid */
    compose(IconCard_stories_exports, "CatalogGrid")
  );
  var Keyboard2 = (
    /* Keyboard */
    compose(IconCard_stories_exports, "Keyboard")
  );
  var DisabledIsInert2 = (
    /* Disabled Is Inert */
    compose(IconCard_stories_exports, "DisabledIsInert")
  );
  return __toCommonJS(IconCard_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
