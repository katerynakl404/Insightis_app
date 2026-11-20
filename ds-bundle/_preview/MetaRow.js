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

  // sb-stub:storybook/preview-api
  var require_preview_api = __commonJS({
    "sb-stub:storybook/preview-api"(exports, module) {
      init_define_import_meta_env();
      var noopChannel = { on() {
      }, off() {
      }, once() {
      }, emit() {
      }, removeListener() {
      } };
      var addons = { register() {
      }, add() {
      }, getChannel() {
        return noopChannel;
      }, setConfig() {
      }, getConfig() {
        return {};
      } };
      var R = function() {
        return window.React || {};
      };
      module.exports = { addons, types: {}, useGlobals() {
        return [{}, function() {
        }];
      }, useArgs() {
        return [{}, function() {
        }, function() {
        }];
      }, useParameter() {
      }, useStorybookApi() {
        return {};
      }, useState() {
        return R().useState.apply(null, arguments);
      }, useCallback() {
        return R().useCallback.apply(null, arguments);
      }, useRef() {
        return R().useRef.apply(null, arguments);
      }, useMemo() {
        return R().useMemo.apply(null, arguments);
      }, useEffect() {
        return R().useEffect.apply(null, arguments);
      }, useReducer() {
        return R().useReducer.apply(null, arguments);
      }, useChannel() {
        return function() {
        };
      } };
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

  // .design-sync/.cache/previews/MetaRow.tsx
  var MetaRow_exports = {};
  __export(MetaRow_exports, {
    AboveAList: () => AboveAList2,
    Between: () => Between2,
    Default: () => Default2,
    Playground: () => Playground2,
    StableHeight: () => StableHeight2,
    StableHeightCheck: () => StableHeightCheck2,
    Sticky: () => Sticky2,
    StickyUnderAHeader: () => StickyUnderAHeader2,
    WithSelection: () => WithSelection2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/MetaRow/MetaRow.stories.tsx
  var MetaRow_stories_exports = {};
  __export(MetaRow_stories_exports, {
    AboveAList: () => AboveAList,
    Between: () => Between,
    Default: () => Default,
    Playground: () => Playground,
    StableHeight: () => StableHeight,
    StableHeightCheck: () => StableHeightCheck,
    Sticky: () => Sticky,
    StickyUnderAHeader: () => StickyUnderAHeader,
    WithSelection: () => WithSelection,
    default: () => MetaRow_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/trash-2.js
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode);

  // src/components/MetaRow/MetaRow.stories.tsx
  var import_react3 = __toESM(require_react_shim());
  var import_preview_api = __toESM(require_preview_api());
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

  // ds-shim:ds:Card
  var ds_Card_exports = {};
  __export(ds_Card_exports, {
    default: () => ds_Card_default
  });
  init_define_import_meta_env();
  __reExport(ds_Card_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Card_default = g2["Card"] !== void 0 ? g2["Card"] : g2;

  // ds-shim:ds:LinkButton
  var ds_LinkButton_exports = {};
  __export(ds_LinkButton_exports, {
    default: () => ds_LinkButton_default
  });
  init_define_import_meta_env();
  __reExport(ds_LinkButton_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_LinkButton_default = g3["LinkButton"] !== void 0 ? g3["LinkButton"] : g3;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g4 = window.DevartUI;
  var ds_Tooltip_default = g4["Tooltip"] !== void 0 ? g4["Tooltip"] : g4;

  // ds-shim:ds:MetaRow
  var ds_MetaRow_exports = {};
  __export(ds_MetaRow_exports, {
    default: () => ds_MetaRow_default
  });
  init_define_import_meta_env();
  __reExport(ds_MetaRow_exports, __toESM(require_ds_raw()));
  var g5 = window.DevartUI;
  var ds_MetaRow_default = g5["MetaRow"] !== void 0 ? g5["MetaRow"] : g5;

  // src/components/MetaRow/MetaRow.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Compositions/MetaRow",
    component: ds_MetaRow_exports.MetaRow,
    tags: ["autodocs"],
    args: { align: "start", sticky: false },
    argTypes: {
      align: { control: "inline-radio", options: ["start", "between"] },
      sticky: { control: "boolean" },
      stickyOffset: { control: "text" }
    },
    // The ✕ that `onClear` renders sits in a Radix tooltip.
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ]
  };
  var MetaRow_stories_default = meta;
  var ROWS = Array.from({ length: 24 }, (_, i) => `Conversation ${i + 1}`);
  var CONNECTIONS = ["DB2", "MySQL", "PostgreSQL", "Salesforce", "Snowflake"];
  var Playground = {
    args: { selected: 0, clearable: true },
    argTypes: {
      selected: {
        control: { type: "range", min: 0, max: CONNECTIONS.length }
      },
      clearable: { control: "boolean" }
    },
    render: function Render({ selected, clearable, ...args }) {
      const [, updateArgs] = (0, import_preview_api.useArgs)();
      const all = selected === CONNECTIONS.length;
      const clear = () => updateArgs({ selected: 0 });
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-full max-w-2xl flex-col gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          ds_MetaRow_exports.MetaRow,
          {
            ...args,
            onClear: clearable && selected > 0 ? clear : void 0,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowCount, { children: selected > 0 ? `${selected} selected` : `${CONNECTIONS.length} connections` }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_LinkButton_exports.LinkButton,
                {
                  onClick: () => updateArgs({ selected: all ? 0 : CONNECTIONS.length }),
                  children: all ? "Deselect all" : "Select all"
                }
              ),
              selected > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_Button_exports.Button,
                {
                  size: "sm",
                  variant: "destructiveTertiary",
                  leftSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}),
                  children: "Delete"
                }
              ) }) : null
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { variant: "outline", className: "gap-0 bg-surface-card p-0", children: CONNECTIONS.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "border-stroke border-b p-4 text-sm last:border-b-0",
            children: name
          },
          name
        )) })
      ] });
    }
  };
  var Default = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_MetaRow_exports.MetaRow, { ...args, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowCount, { children: "5 connections" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { children: "Select all" })
    ] })
  };
  var WithSelection = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_MetaRow_exports.MetaRow, { ...args, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowCount, { children: "3 selected" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { children: "Deselect all" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { size: "sm", variant: "destructiveTertiary", leftSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), children: "Delete" }) })
    ] })
  };
  var AboveAList = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-full max-w-2xl flex-col gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_MetaRow_exports.MetaRow, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowCount, { children: "3 connections" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { children: "Select all" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { variant: "outline", className: "gap-0 bg-surface-card p-0", children: ["DB2", "PostgreSQL", "Salesforce"].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "border-stroke border-b p-4 text-sm last:border-b-0",
          children: n
        },
        n
      )) })
    ] })
  };
  var Between = {
    args: { align: "between" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_MetaRow_exports.MetaRow, { ...args, className: "w-full max-w-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowCount, { children: "12 conversations" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { children: "Deselect all" })
    ] })
  };
  var StableHeight = {
    render: () => {
      const [on, setOn] = (0, import_react3.useState)(false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-full max-w-2xl flex-col gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_MetaRow_exports.MetaRow, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowCount, { children: on ? "2 selected" : "5 connections" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { onClick: () => setOn((v) => !v), children: on ? "Deselect all" : "Select all" }),
          on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_exports.Button,
            {
              size: "sm",
              variant: "destructiveTertiary",
              leftSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}),
              children: "Delete"
            }
          ) }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { variant: "outline", className: "bg-surface-card p-4 text-sm", children: "The list starts here, 4px under the row, either way." })
      ] });
    }
  };
  var Sticky = {
    args: { sticky: true },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 w-full max-w-2xl overflow-y-auto bg-surface-page px-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_MetaRow_exports.MetaRow, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowCount, { children: "3 selected" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { children: "Select all" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Button_exports.Button,
          {
            size: "sm",
            variant: "destructiveTertiary",
            leftSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}),
            children: "Delete"
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-1.5 pb-4", children: ROWS.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { variant: "row", fullWidth: true, children: name }, name)) })
    ] }) })
  };
  var StickyUnderAHeader = {
    args: { sticky: true, stickyOffset: "3rem" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "h-72 w-full max-w-2xl overflow-y-auto bg-surface-page px-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sticky top-0 z-20 flex h-12 items-center bg-surface-page font-semibold text-base text-ink-primary", children: "Chats" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_MetaRow_exports.MetaRow, { ...args, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_MetaRow_exports.MetaRowCount, { children: "24 conversations" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_LinkButton_exports.LinkButton, { children: "Select all" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-1.5 pb-4", children: ROWS.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { variant: "row", fullWidth: true, children: name }, name)) })
      ] })
    ] })
  };
  var StableHeightCheck = {
    tags: ["!dev", "!autodocs"],
    render: StableHeight.render,
    play: async ({ canvas }) => {
      const list = canvas.getByText(/The list starts here/);
      const before = list.getBoundingClientRect().top;
      await import_test.userEvent.click(canvas.getByRole("button", { name: "Select all" }));
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Delete" })
      ).toBeInTheDocument();
      await (0, import_test.expect)(list.getBoundingClientRect().top).toBe(before);
    }
  };

  // .design-sync/.cache/previews/MetaRow.tsx
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
  var Playground2 = (
    /* Playground */
    compose(MetaRow_stories_exports, "Playground")
  );
  var Default2 = (
    /* Default */
    compose(MetaRow_stories_exports, "Default")
  );
  var WithSelection2 = (
    /* With Selection */
    compose(MetaRow_stories_exports, "WithSelection")
  );
  var AboveAList2 = (
    /* Above A List */
    compose(MetaRow_stories_exports, "AboveAList")
  );
  var Between2 = (
    /* Between */
    compose(MetaRow_stories_exports, "Between")
  );
  var StableHeight2 = (
    /* Stable Height */
    compose(MetaRow_stories_exports, "StableHeight")
  );
  var Sticky2 = (
    /* Sticky */
    compose(MetaRow_stories_exports, "Sticky")
  );
  var StickyUnderAHeader2 = (
    /* Sticky Under A Header */
    compose(MetaRow_stories_exports, "StickyUnderAHeader")
  );
  var StableHeightCheck2 = (
    /* Stable Height Check */
    compose(MetaRow_stories_exports, "StableHeightCheck")
  );
  return __toCommonJS(MetaRow_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
