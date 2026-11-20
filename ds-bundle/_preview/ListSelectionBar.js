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

  // .design-sync/.cache/previews/ListSelectionBar.tsx
  var ListSelectionBar_exports = {};
  __export(ListSelectionBar_exports, {
    AllSelected: () => AllSelected2,
    EmptyList: () => EmptyList2,
    Idle: () => Idle2,
    Interactive: () => Interactive2,
    Pending: () => Pending2,
    Selecting: () => Selecting2,
    Sticky: () => Sticky2,
    WithActions: () => WithActions2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/ListSelectionBar/ListSelectionBar.stories.tsx
  var ListSelectionBar_stories_exports = {};
  __export(ListSelectionBar_stories_exports, {
    AllSelected: () => AllSelected,
    EmptyList: () => EmptyList,
    Idle: () => Idle,
    Interactive: () => Interactive,
    Pending: () => Pending,
    Selecting: () => Selecting,
    Sticky: () => Sticky,
    WithActions: () => WithActions,
    default: () => ListSelectionBar_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/download.js
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ];
  var Download = createLucideIcon("download", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/share-2.js
  init_define_import_meta_env();
  var __iconNode2 = [
    ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
    ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
    ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
    ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
    ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
  ];
  var Share2 = createLucideIcon("share-2", __iconNode2);

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

  // src/components/ListSelectionBar/ListSelectionBar.stories.tsx
  var import_react3 = __toESM(require_react_shim());
  var import_test = __toESM(require_test());

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Button_default = g["Button"] !== void 0 ? g["Button"] : g;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Tooltip_default = g2["Tooltip"] !== void 0 ? g2["Tooltip"] : g2;

  // ds-shim:ds:ListSelectionBar
  var ds_ListSelectionBar_exports = {};
  __export(ds_ListSelectionBar_exports, {
    default: () => ds_ListSelectionBar_default
  });
  init_define_import_meta_env();
  __reExport(ds_ListSelectionBar_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_ListSelectionBar_default = g3["ListSelectionBar"] !== void 0 ? g3["ListSelectionBar"] : g3;

  // src/components/ListSelectionBar/ListSelectionBar.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Compositions/ListSelectionBar",
    component: ds_ListSelectionBar_exports.ListSelectionBar,
    tags: ["autodocs"],
    args: {
      title: "24 files",
      selectedText: "3 selected",
      isPending: false,
      selectedCount: 0,
      allSelected: false,
      isEmpty: false,
      sticky: false,
      onClearSelection: (0, import_test.fn)(),
      onSelectAll: (0, import_test.fn)()
    },
    argTypes: {
      selectedCount: { control: { type: "number", min: 0 } },
      rightSlot: { control: false },
      onClearSelection: { control: false },
      onSelectAll: { control: false }
    },
    parameters: { layout: "padded" },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full max-w-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) }) })
    ]
  };
  var ListSelectionBar_stories_default = meta;
  var Idle = {
    play: async ({ args, canvas, userEvent }) => {
      await (0, import_test.expect)(canvas.getByText("24 files")).toBeVisible();
      await (0, import_test.expect)(
        canvas.queryByRole("button", { name: "Exit Selection" })
      ).not.toBeInTheDocument();
      await userEvent.click(canvas.getByRole("button", { name: "Select All" }));
      await (0, import_test.expect)(args.onSelectAll).toHaveBeenCalledOnce();
      await (0, import_test.expect)(args.onClearSelection).not.toHaveBeenCalled();
    }
  };
  var Selecting = {
    args: { selectedCount: 3 },
    play: async ({ args, canvas, userEvent }) => {
      await (0, import_test.expect)(canvas.getByText("3 selected")).toBeVisible();
      await (0, import_test.expect)(canvas.queryByText("24 files")).not.toBeInTheDocument();
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Select All" })
      ).toBeEnabled();
      await userEvent.click(
        canvas.getByRole("button", { name: "Exit Selection" })
      );
      await (0, import_test.expect)(args.onClearSelection).toHaveBeenCalledOnce();
      await (0, import_test.expect)(args.onSelectAll).not.toHaveBeenCalled();
    }
  };
  var AllSelected = {
    args: { selectedCount: 24, selectedText: "24 selected", allSelected: true },
    play: async ({ args, canvas, userEvent }) => {
      await (0, import_test.expect)(canvas.getByText("24 selected")).toBeVisible();
      await (0, import_test.expect)(
        canvas.queryByRole("button", { name: "Select All" })
      ).not.toBeInTheDocument();
      await userEvent.click(canvas.getByRole("button", { name: "Deselect All" }));
      await (0, import_test.expect)(args.onClearSelection).toHaveBeenCalledOnce();
      await (0, import_test.expect)(args.onSelectAll).not.toHaveBeenCalled();
    }
  };
  var EmptyList = {
    args: { title: "0 files", isEmpty: true },
    play: async ({ canvas }) => {
      await (0, import_test.expect)(canvas.getByText("0 files")).toBeVisible();
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Select All" })
      ).toBeDisabled();
    }
  };
  var Pending = {
    args: { isPending: true },
    play: async ({ canvas }) => {
      await (0, import_test.expect)(canvas.getByText("24 files")).not.toBeVisible();
      await (0, import_test.expect)(
        canvas.queryAllByRole("button", { hidden: true })
      ).toHaveLength(0);
    }
  };
  var WithActions = {
    args: {
      selectedCount: 3,
      rightSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { variant: "transparent", size: "xs", leftSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}), children: "Share" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { variant: "transparent", size: "xs", leftSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), children: "Download" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { variant: "destructiveTertiary", size: "xs", leftSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), children: "Delete" })
      ] })
    }
  };
  var Sticky = {
    args: { selectedCount: 3, sticky: true, stickyOffset: "2.5rem" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "h-64 overflow-y-auto rounded-lg border border-stroke", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sticky top-0 z-20 flex h-10 items-center bg-surface-card px-3 text-ink-secondary text-sm", children: "Page header (2.5rem tall)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ListSelectionBar_exports.ListSelectionBar, { ...args }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-2 py-2", children: Array.from({ length: 12 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: "rounded-md border border-stroke px-3 py-2 text-ink-body text-sm",
            children: [
              "Row ",
              index + 1
            ]
          },
          `row-${index + 1}`
        )) })
      ] })
    ] })
  };
  var Interactive = {
    render: (args) => {
      const total = 5;
      const [selected, setSelected] = (0, import_react3.useState)(0);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ListSelectionBar_exports.ListSelectionBar,
        {
          ...args,
          title: `${total} files`,
          selectedText: `${selected} selected`,
          selectedCount: selected,
          allSelected: selected === total,
          onSelectAll: () => setSelected(total),
          onClearSelection: () => setSelected(0),
          rightSlot: selected === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { variant: "outline", size: "xs", onClick: () => setSelected(1), children: "Select one" })
        }
      );
    }
  };

  // .design-sync/.cache/previews/ListSelectionBar.tsx
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
  var Idle2 = (
    /* Idle */
    compose(ListSelectionBar_stories_exports, "Idle")
  );
  var Selecting2 = (
    /* Selecting */
    compose(ListSelectionBar_stories_exports, "Selecting")
  );
  var AllSelected2 = (
    /* All Selected */
    compose(ListSelectionBar_stories_exports, "AllSelected")
  );
  var EmptyList2 = (
    /* Empty List */
    compose(ListSelectionBar_stories_exports, "EmptyList")
  );
  var Pending2 = (
    /* Pending */
    compose(ListSelectionBar_stories_exports, "Pending")
  );
  var WithActions2 = (
    /* With Actions */
    compose(ListSelectionBar_stories_exports, "WithActions")
  );
  var Sticky2 = (
    /* Sticky */
    compose(ListSelectionBar_stories_exports, "Sticky")
  );
  var Interactive2 = (
    /* Interactive */
    compose(ListSelectionBar_stories_exports, "Interactive")
  );
  return __toCommonJS(ListSelectionBar_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/download.js:
lucide-react/dist/esm/icons/share-2.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
