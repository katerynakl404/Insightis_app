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

  // .design-sync/.cache/previews/ChoiceCard.tsx
  var ChoiceCard_exports = {};
  __export(ChoiceCard_exports, {
    Columns: () => Columns2,
    DarkTheme: () => DarkTheme2,
    Disabled: () => Disabled2,
    Expandable: () => Expandable2,
    Multiple: () => Multiple2,
    PickMovesOn: () => PickMovesOn2,
    RadioIndicator: () => RadioIndicator2,
    Single: () => Single2,
    Standalone: () => Standalone2,
    WithIcons: () => WithIcons2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/ChoiceCard/ChoiceCard.stories.tsx
  var ChoiceCard_stories_exports = {};
  __export(ChoiceCard_stories_exports, {
    Columns: () => Columns,
    DarkTheme: () => DarkTheme,
    Disabled: () => Disabled,
    Expandable: () => Expandable,
    Multiple: () => Multiple,
    PickMovesOn: () => PickMovesOn,
    RadioIndicator: () => RadioIndicator,
    Single: () => Single,
    Standalone: () => Standalone,
    WithIcons: () => WithIcons,
    default: () => ChoiceCard_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/briefcase.js
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
    ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
  ];
  var Briefcase = createLucideIcon("briefcase", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/chart-column.js
  init_define_import_meta_env();
  var __iconNode2 = [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
    ["path", { d: "M18 17V9", key: "2bz60n" }],
    ["path", { d: "M13 17V5", key: "1frdt8" }],
    ["path", { d: "M8 17v-3", key: "17ska0" }]
  ];
  var ChartColumn = createLucideIcon("chart-column", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/code-xml.js
  init_define_import_meta_env();
  var __iconNode3 = [
    ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
    ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
    ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
  ];
  var CodeXml = createLucideIcon("code-xml", __iconNode3);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/megaphone.js
  init_define_import_meta_env();
  var __iconNode4 = [
    [
      "path",
      {
        d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
        key: "q8bfy3"
      }
    ],
    ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14", key: "1853fq" }],
    ["path", { d: "M8 6v8", key: "15ugcq" }]
  ];
  var Megaphone = createLucideIcon("megaphone", __iconNode4);

  // src/components/ChoiceCard/ChoiceCard.stories.tsx
  var import_react3 = __toESM(require_react_shim());
  var import_preview_api = __toESM(require_preview_api());
  var import_test = __toESM(require_test());

  // ds-shim:ds:TextArea
  var ds_TextArea_exports = {};
  __export(ds_TextArea_exports, {
    default: () => ds_TextArea_default
  });
  init_define_import_meta_env();
  __reExport(ds_TextArea_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_TextArea_default = g["TextArea"] !== void 0 ? g["TextArea"] : g;

  // ds-shim:ds:ChoiceCard
  var ds_ChoiceCard_exports = {};
  __export(ds_ChoiceCard_exports, {
    default: () => ds_ChoiceCard_default
  });
  init_define_import_meta_env();
  __reExport(ds_ChoiceCard_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_ChoiceCard_default = g2["ChoiceCard"] !== void 0 ? g2["ChoiceCard"] : g2;

  // src/components/ChoiceCard/ChoiceCard.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/ChoiceCard",
    component: ds_ChoiceCard_exports.ChoiceGroup,
    subcomponents: { ChoiceCard: ds_ChoiceCard_exports.ChoiceCard },
    tags: ["autodocs"],
    argTypes: {
      type: {
        control: false,
        description: "One answer (`single`, a radiogroup) or several (`multiple`, a group of checkbox cards).",
        table: {
          type: { summary: "'single' | 'multiple'" },
          defaultValue: { summary: "single" }
        }
      },
      value: {
        control: false,
        description: "The chosen value: a `string` in a single group, a `string[]` in a multiple one. Controlled.",
        table: { type: { summary: "string | string[]" } }
      },
      onValueChange: {
        control: false,
        description: "Every change of the choice, including an arrow key walking a single group. A multiple group receives the next `string[]`.",
        table: {
          type: {
            summary: "(value: string) => void | (value: string[]) => void"
          }
        }
      },
      onPick: {
        control: false,
        description: "Single only. A deliberate pick — a click, Enter or Space — and never an arrow key: the moment a one-answer question is answered and the flow can move on.",
        table: { type: { summary: "(value: string) => void" } }
      },
      disabled: {
        control: "boolean",
        description: "Disables every card in the group.",
        table: { defaultValue: { summary: "false" } }
      },
      name: {
        control: "text",
        description: "Form name. It reaches the checkboxes of a multiple group."
      },
      "aria-label": {
        control: "text",
        description: "The accessible name of the group. Give this or `aria-labelledby`."
      },
      "aria-labelledby": {
        control: "text",
        description: "The id of the element that names the group."
      },
      className: {
        control: "text",
        description: "Merged after the base `grid grid-cols-1 gap-2` with `cn()`, so a consumer class replaces it: `sm:grid-cols-3 sm:gap-3` for columns from 640px up, `grid-cols-2` for always two.",
        table: { defaultValue: { summary: "grid grid-cols-1 gap-2" } }
      },
      children: {
        control: false,
        description: "The `ChoiceCard`s of the group."
      },
      ref: { control: false, table: { disable: true } }
    },
    parameters: { layout: "padded" }
  };
  var ChoiceCard_stories_default = meta;
  var ROLES = [
    { value: "sales", title: "Sales", description: "Pipeline, deals, forecasts" },
    {
      value: "marketing",
      title: "Marketing",
      description: "Campaigns and leads"
    },
    { value: "finance", title: "Finance", description: "Revenue and costs" },
    { value: "eng", title: "Engineering", description: "Delivery and quality" }
  ];
  var ICONS = [Briefcase, Megaphone, ChartColumn, CodeXml];
  var groupProps = ({
    disabled,
    name,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy
  }) => ({
    disabled,
    name,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy
  });
  var firstCard = (root) => {
    const card = root.querySelector('[data-slot="choice-card"]');
    if (!card) throw new Error("ChoiceCard did not render");
    return card;
  };
  var Single = {
    args: { "aria-label": "Your role" },
    render: function Render(args) {
      const [value, setValue] = (0, import_react3.useState)("");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-96", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ChoiceCard_exports.ChoiceGroup,
        {
          ...groupProps(args),
          value,
          onValueChange: setValue,
          children: ROLES.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { ...role }, role.value))
        }
      ) });
    },
    play: async ({ canvas, userEvent }) => {
      const finance = canvas.getByRole("radio", { name: /Finance/ });
      await userEvent.click(finance);
      await (0, import_test.expect)(finance).toHaveAttribute("aria-checked", "true");
      await userEvent.keyboard("{ArrowDown}");
      await (0, import_test.expect)(
        canvas.getByRole("radio", { name: /Engineering/ })
      ).toHaveAttribute("aria-checked", "true");
    }
  };
  var Multiple = {
    args: { "aria-label": "Your goals" },
    render: function Render2(args) {
      const [value, setValue] = (0, import_react3.useState)(["revenue"]);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-96", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        ds_ChoiceCard_exports.ChoiceGroup,
        {
          ...groupProps(args),
          type: "multiple",
          value,
          onValueChange: setValue,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "revenue", title: "Track revenue" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "forecast", title: "Forecast the quarter" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "churn", title: "Find churn early", badge: "Popular" })
          ]
        }
      ) });
    }
  };
  var PickMovesOn = {
    args: { "aria-label": "Your role" },
    render: function Render3(args) {
      const [value, setValue] = (0, import_react3.useState)("");
      const [picked, setPicked] = (0, import_react3.useState)(null);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-96 flex-col gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_ChoiceCard_exports.ChoiceGroup,
          {
            ...groupProps(args),
            value,
            onValueChange: setValue,
            onPick: setPicked,
            children: ROLES.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { ...role }, role.value))
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-ink-secondary text-sm", children: picked ? `Picked ${picked} — on to the next question` : "Not picked yet" })
      ] });
    },
    play: async ({ canvas, userEvent }) => {
      await userEvent.click(canvas.getByRole("radio", { name: /Sales/ }));
      await (0, import_test.expect)(canvas.getByText(/Picked sales/)).toBeVisible();
      await userEvent.keyboard("{ArrowDown}");
      await (0, import_test.expect)(canvas.getByText(/Picked sales/)).toBeVisible();
    }
  };
  var Columns = {
    args: {
      "aria-label": "Your role",
      className: "sm:grid-cols-2 sm:gap-3"
    },
    render: function Render4(args) {
      const [value, setValue] = (0, import_react3.useState)("finance");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "max-w-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ChoiceCard_exports.ChoiceGroup,
        {
          ...groupProps(args),
          value,
          onValueChange: setValue,
          children: ROLES.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { ...role }, role.value))
        }
      ) });
    }
  };
  var WithIcons = {
    parameters: { controls: { disable: true } },
    render: function Render5() {
      const [value, setValue] = (0, import_react3.useState)(["sales"]);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-96 flex-col gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_ChoiceCard_exports.ChoiceGroup,
          {
            type: "multiple",
            "aria-label": "Teams",
            value,
            onValueChange: setValue,
            children: ROLES.map((role, i) => {
              const Icon2 = ICONS[i] ?? Briefcase;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { ...role, icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon2, {}) }, role.value);
            })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceGroup, { "aria-label": "Team", value: "marketing", children: ROLES.slice(0, 2).map((role, i) => {
          const Icon2 = ICONS[i] ?? Briefcase;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { ...role, icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon2, {}) }, role.value);
        }) })
      ] });
    }
  };
  var RadioIndicator = {
    args: { "aria-label": "Billing" },
    render: function Render6(args) {
      const [value, setValue] = (0, import_react3.useState)("monthly");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-96", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        ds_ChoiceCard_exports.ChoiceGroup,
        {
          ...groupProps(args),
          value,
          onValueChange: setValue,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "monthly", title: "Monthly", indicator: "radio" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_ChoiceCard_exports.ChoiceCard,
              {
                value: "yearly",
                title: "Yearly",
                badge: "Save 20%",
                description: "Billed once a year",
                indicator: "radio"
              }
            )
          ]
        }
      ) });
    }
  };
  var Disabled = {
    parameters: { controls: { disable: true } },
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-96 flex-col gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ChoiceCard_exports.ChoiceGroup, { "aria-label": "Role", value: "sales", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "sales", title: "Sales" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "ops", title: "Operations", disabled: true })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ChoiceCard_exports.ChoiceGroup, { type: "multiple", "aria-label": "Goals", value: ["a"], disabled: true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "a", title: "Track revenue" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "b", title: "Forecast" })
      ] })
    ] })
  };
  function StandaloneCard({
    onSelectedChange,
    ...args
  }) {
    const [selected, setSelected] = (0, import_react3.useState)(args.selected ?? false);
    (0, import_react3.useEffect)(() => setSelected(args.selected ?? false), [args.selected]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-96", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_ChoiceCard_exports.ChoiceCard,
      {
        ...args,
        selected,
        onSelect: (next) => {
          setSelected(next);
          onSelectedChange(next);
        }
      }
    ) });
  }
  var Standalone = {
    args: {
      title: "Yes, connect my CRM",
      description: "Pressing the card is the answer",
      badge: "",
      indicator: "none",
      disabled: false,
      selected: false
    },
    argTypes: {
      value: {
        control: false,
        description: "The answer's value. Required inside a `ChoiceGroup`; a standalone card has none.",
        table: { type: { summary: "string" } }
      },
      title: {
        control: "text",
        description: "The heading of the card.",
        table: { type: { summary: "ReactNode" } }
      },
      description: {
        control: "text",
        description: "A quieter line under the title.",
        table: { type: { summary: "ReactNode" } }
      },
      badge: {
        control: "text",
        description: 'A short tag after the title ("Recommended"), drawn as a small primary Badge.',
        table: { type: { summary: "ReactNode" } }
      },
      icon: {
        control: false,
        description: "A leading glyph on a 36px disc. It leads the row, top-aligned; the indicator stays on the title line.",
        table: { type: { summary: "ReactNode" } }
      },
      indicator: {
        control: "inline-radio",
        options: ["none", "radio", "checkbox"],
        description: "The mark on the right. `auto` is a checkbox in a multiple group and nothing elsewhere; `radio` and `checkbox` are explicit opt-ins. `checkbox` makes the card a label around a Checkbox.",
        table: {
          type: { summary: "'auto' | 'none' | 'radio' | 'checkbox'" },
          defaultValue: { summary: "auto" }
        }
      },
      disabled: {
        control: "boolean",
        description: "Disables the card.",
        table: { defaultValue: { summary: "false" } }
      },
      selected: {
        control: "boolean",
        description: "Standalone only: the chosen state.",
        table: { defaultValue: { summary: "false" } }
      },
      onSelect: {
        control: false,
        description: "Standalone only: called with the next chosen state.",
        table: { type: { summary: "(selected: boolean) => void" } }
      },
      name: {
        control: "text",
        description: "Standalone checkbox card: the checkbox's form name."
      },
      children: {
        control: false,
        description: "Content revealed inside the card while it is chosen (an \"Other\" answer's field). The card's head becomes the button, with `aria-expanded`.",
        table: { type: { summary: "ReactNode" } }
      },
      className: {
        control: "text",
        description: "Merged after the card classes with `cn()`."
      }
    },
    parameters: {
      controls: {
        include: [
          "value",
          "title",
          "description",
          "badge",
          "icon",
          "indicator",
          "disabled",
          "selected",
          "onSelect",
          "name",
          "children",
          "className"
        ]
      }
    },
    render: function Render7(args) {
      const [, updateArgs] = (0, import_preview_api.useArgs)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        StandaloneCard,
        {
          ...args,
          onSelectedChange: (selected) => updateArgs({ selected })
        }
      );
    },
    play: async ({ args, canvasElement, userEvent }) => {
      const card = firstCard(canvasElement);
      await (0, import_test.expect)(card).toHaveAttribute(
        "data-state",
        args.selected ? "checked" : "unchecked"
      );
      await userEvent.click(card);
      await (0, import_test.expect)(card).toHaveAttribute(
        "data-state",
        args.selected ? "unchecked" : "checked"
      );
    }
  };
  var Expandable = {
    args: { "aria-label": "Your role" },
    render: function Render8(args) {
      const [value, setValue] = (0, import_react3.useState)("other");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-96", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        ds_ChoiceCard_exports.ChoiceGroup,
        {
          ...groupProps(args),
          value,
          onValueChange: setValue,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "sales", title: "Sales" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "other", title: "Other", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_TextArea_exports.TextArea,
              {
                rows: 2,
                placeholder: "Write your answer…",
                "aria-label": "Your answer"
              }
            ) })
          ]
        }
      ) });
    },
    play: async ({ canvas, userEvent }) => {
      await (0, import_test.expect)(canvas.getByLabelText("Your answer")).toBeVisible();
      await userEvent.click(canvas.getByRole("radio", { name: /Sales/ }));
      await (0, import_test.expect)(canvas.queryByLabelText("Your answer")).toBeNull();
      await userEvent.click(canvas.getByRole("radio", { name: /Other/ }));
      await (0, import_test.expect)(canvas.getByLabelText("Your answer")).toBeVisible();
    }
  };
  var DarkTheme = {
    parameters: { controls: { disable: true } },
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dark flex w-96 flex-col gap-6 rounded-lg bg-surface-page p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ChoiceCard_exports.ChoiceGroup, { "aria-label": "Role", value: "finance", children: [
        ROLES.slice(1, 3).map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { ...role, icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {}) }, role.value)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "ops", title: "Operations", disabled: true })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ChoiceCard_exports.ChoiceGroup, { type: "multiple", "aria-label": "Goals", value: ["a"], children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "a", title: "Track revenue", badge: "Popular" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "b", title: "Forecast" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ChoiceCard_exports.ChoiceCard,
        {
          title: "Yes, connect my CRM",
          description: "Pressing the card is the answer",
          selected: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ChoiceCard_exports.ChoiceGroup, { "aria-label": "Reason", value: "other", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "sales", title: "Sales" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ChoiceCard_exports.ChoiceCard, { value: "other", title: "Other", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TextArea_exports.TextArea,
          {
            rows: 2,
            placeholder: "Write your answer…",
            "aria-label": "Your answer"
          }
        ) })
      ] })
    ] })
  };

  // .design-sync/.cache/previews/ChoiceCard.tsx
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
  var Single2 = (
    /* Single */
    compose(ChoiceCard_stories_exports, "Single")
  );
  var Multiple2 = (
    /* Multiple */
    compose(ChoiceCard_stories_exports, "Multiple")
  );
  var PickMovesOn2 = (
    /* Pick Moves On */
    compose(ChoiceCard_stories_exports, "PickMovesOn")
  );
  var Columns2 = (
    /* Columns */
    compose(ChoiceCard_stories_exports, "Columns")
  );
  var WithIcons2 = (
    /* With Icons */
    compose(ChoiceCard_stories_exports, "WithIcons")
  );
  var RadioIndicator2 = (
    /* Radio Indicator */
    compose(ChoiceCard_stories_exports, "RadioIndicator")
  );
  var Disabled2 = (
    /* Disabled */
    compose(ChoiceCard_stories_exports, "Disabled")
  );
  var Standalone2 = (
    /* Standalone */
    compose(ChoiceCard_stories_exports, "Standalone")
  );
  var Expandable2 = (
    /* Expandable */
    compose(ChoiceCard_stories_exports, "Expandable")
  );
  var DarkTheme2 = (
    /* Dark Theme */
    compose(ChoiceCard_stories_exports, "DarkTheme")
  );
  return __toCommonJS(ChoiceCard_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/briefcase.js:
lucide-react/dist/esm/icons/chart-column.js:
lucide-react/dist/esm/icons/code-xml.js:
lucide-react/dist/esm/icons/megaphone.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
