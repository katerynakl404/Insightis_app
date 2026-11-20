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

  // .design-sync/.cache/previews/SidebarNavItem.tsx
  var SidebarNavItem_exports = {};
  __export(SidebarNavItem_exports, {
    Active: () => Active2,
    CollapsedRail: () => CollapsedRail2,
    Default: () => Default2,
    ElementIcon: () => ElementIcon2,
    Navigation: () => Navigation2,
    NotActivatable: () => NotActivatable2,
    WithBadge: () => WithBadge2,
    WithBadgeCollapsed: () => WithBadgeCollapsed2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Sidebar/SidebarNavItem.stories.tsx
  var SidebarNavItem_stories_exports = {};
  __export(SidebarNavItem_stories_exports, {
    Active: () => Active,
    CollapsedRail: () => CollapsedRail,
    Default: () => Default,
    ElementIcon: () => ElementIcon,
    Navigation: () => Navigation,
    NotActivatable: () => NotActivatable,
    WithBadge: () => WithBadge,
    WithBadgeCollapsed: () => WithBadgeCollapsed,
    default: () => SidebarNavItem_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/chart-pie.js
  init_define_import_meta_env();
  var __iconNode = [
    [
      "path",
      {
        d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
        key: "pzmjnu"
      }
    ],
    ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
  ];
  var ChartPie = createLucideIcon("chart-pie", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-plus.js
  init_define_import_meta_env();
  var __iconNode2 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M8 12h8", key: "1wcyev" }],
    ["path", { d: "M12 8v8", key: "napkw2" }]
  ];
  var CirclePlus = createLucideIcon("circle-plus", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/database.js
  init_define_import_meta_env();
  var __iconNode3 = [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
    ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
    ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
  ];
  var Database = createLucideIcon("database", __iconNode3);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/folder.js
  init_define_import_meta_env();
  var __iconNode4 = [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        key: "1kt360"
      }
    ]
  ];
  var Folder = createLucideIcon("folder", __iconNode4);

  // src/components/Sidebar/SidebarNavItem.stories.tsx
  var import_test = __toESM(require_test());

  // ds-shim:ds:Badge
  var ds_Badge_exports = {};
  __export(ds_Badge_exports, {
    default: () => ds_Badge_default
  });
  init_define_import_meta_env();
  __reExport(ds_Badge_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Badge_default = g["Badge"] !== void 0 ? g["Badge"] : g;

  // ds-shim:ds:Counter
  var ds_Counter_exports = {};
  __export(ds_Counter_exports, {
    default: () => ds_Counter_default
  });
  init_define_import_meta_env();
  __reExport(ds_Counter_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Counter_default = g2["Counter"] !== void 0 ? g2["Counter"] : g2;

  // ds-shim:ds:Sidebar
  var ds_Sidebar_exports = {};
  __export(ds_Sidebar_exports, {
    default: () => ds_Sidebar_default
  });
  init_define_import_meta_env();
  __reExport(ds_Sidebar_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_Sidebar_default = g3["Sidebar"] !== void 0 ? g3["Sidebar"] : g3;

  // src/components/Sidebar/SidebarNavItem.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Rail = ({
    defaultOpen,
    children
  }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarProvider, { defaultOpen, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.Sidebar, { collapsible: "icon", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarContent, { className: "pt-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { className: "flex shrink-0 flex-col gap-0.5 group-data-[collapsible=icon]:items-center", children }) }) }) });
  var meta = {
    title: "Compositions/Sidebar/SidebarNavItem",
    component: ds_Sidebar_exports.SidebarNavItem,
    tags: ["autodocs"],
    args: {
      icon: Database,
      label: "Data sources",
      activatable: true,
      withTooltip: false,
      href: "#",
      onClick: (0, import_test.fn)()
    },
    argTypes: {
      icon: { control: false },
      badge: { control: false },
      children: { control: false },
      asChild: { control: false },
      tooltipSide: {
        control: "select",
        options: ["top", "right", "bottom", "left"]
      }
    },
    parameters: { layout: "fullscreen" },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-svh min-h-[24rem] w-full", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ]
  };
  var SidebarNavItem_stories_default = meta;
  var Default = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { defaultOpen: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args }) })
  };
  var Navigation = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Rail, { defaultOpen: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Sidebar_exports.SidebarNavItem,
        {
          ...args,
          icon: CirclePlus,
          label: "New chat",
          activatable: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, icon: Database, label: "Data sources" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, icon: ChartPie, label: "Metrics" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, icon: Folder, label: "Files" })
    ] })
  };
  var CollapsedRail = {
    args: { withTooltip: true },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Rail, { defaultOpen: false, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Sidebar_exports.SidebarNavItem,
        {
          ...args,
          icon: CirclePlus,
          label: "New chat",
          activatable: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, icon: Database, label: "Data sources" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, icon: ChartPie, label: "Metrics" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, icon: Folder, label: "Files" })
    ] })
  };
  var Active = {
    render: ({ href: _href, ...args }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Rail, { defaultOpen: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#", "aria-current": "page" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, icon: ChartPie, label: "Metrics", href: "#" })
    ] })
  };
  var NotActivatable = {
    args: { activatable: false, icon: CirclePlus, label: "New chat" },
    render: ({ href: _href, ...args }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { defaultOpen: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#", "aria-current": "page" }) }) })
  };
  var BadgeRows = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Sidebar_exports.SidebarNavItem,
      {
        ...args,
        badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { size: "sm", children: "3" }),
        icon: Database,
        label: "Data sources"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Sidebar_exports.SidebarNavItem,
      {
        ...args,
        badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Badge_exports.Badge, { size: "sm", variant: "brand", children: "New" }),
        icon: ChartPie,
        label: "Metrics"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, icon: Folder, label: "Files" })
  ] });
  var WithBadge = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { defaultOpen: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeRows, { ...args }) })
  };
  var WithBadgeCollapsed = {
    args: { withTooltip: true },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { defaultOpen: false, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeRows, { ...args }) })
  };
  var ElementIcon = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Rail, { defaultOpen: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Sidebar_exports.SidebarNavItem,
        {
          ...args,
          icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Warehouse" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { fill: "currentColor", height: "16", rx: "4", width: "16" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "path",
              {
                d: "M4 11V6l4-2 4 2v5",
                fill: "none",
                stroke: "hsl(var(--surface-card))",
                strokeWidth: "1.5"
              }
            )
          ] }),
          label: "Warehouse"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Sidebar_exports.SidebarNavItem, { ...args, icon: Database, label: "Data sources" })
    ] })
  };

  // .design-sync/.cache/previews/SidebarNavItem.tsx
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
    compose(SidebarNavItem_stories_exports, "Default")
  );
  var Navigation2 = (
    /* Navigation */
    compose(SidebarNavItem_stories_exports, "Navigation")
  );
  var CollapsedRail2 = (
    /* Collapsed Rail */
    compose(SidebarNavItem_stories_exports, "CollapsedRail")
  );
  var Active2 = (
    /* Active */
    compose(SidebarNavItem_stories_exports, "Active")
  );
  var NotActivatable2 = (
    /* Not Activatable */
    compose(SidebarNavItem_stories_exports, "NotActivatable")
  );
  var WithBadge2 = (
    /* With Badge */
    compose(SidebarNavItem_stories_exports, "WithBadge")
  );
  var WithBadgeCollapsed2 = (
    /* With Badge Collapsed */
    compose(SidebarNavItem_stories_exports, "WithBadgeCollapsed")
  );
  var ElementIcon2 = (
    /* Element Icon */
    compose(SidebarNavItem_stories_exports, "ElementIcon")
  );
  return __toCommonJS(SidebarNavItem_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/chart-pie.js:
lucide-react/dist/esm/icons/circle-plus.js:
lucide-react/dist/esm/icons/database.js:
lucide-react/dist/esm/icons/folder.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
