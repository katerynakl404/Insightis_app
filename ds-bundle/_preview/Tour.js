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

  // .design-sync/.cache/previews/Tour.tsx
  var Tour_exports = {};
  __export(Tour_exports, {
    DarkTheme: () => DarkTheme2,
    Default: () => Default2,
    PartOfAFlow: () => PartOfAFlow2,
    Phone: () => Phone2,
    WithAnnotations: () => WithAnnotations2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Tour/Tour.stories.tsx
  var Tour_stories_exports = {};
  __export(Tour_stories_exports, {
    DarkTheme: () => DarkTheme,
    Default: () => Default,
    PartOfAFlow: () => PartOfAFlow,
    Phone: () => Phone,
    WithAnnotations: () => WithAnnotations,
    default: () => Tour_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/chart-column.js
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
    ["path", { d: "M18 17V9", key: "2bz60n" }],
    ["path", { d: "M13 17V5", key: "1frdt8" }],
    ["path", { d: "M8 17v-3", key: "17ska0" }]
  ];
  var ChartColumn = createLucideIcon("chart-column", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/message-square.js
  init_define_import_meta_env();
  var __iconNode2 = [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ]
  ];
  var MessageSquare = createLucideIcon("message-square", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/paperclip.js
  init_define_import_meta_env();
  var __iconNode3 = [
    [
      "path",
      {
        d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
        key: "1miecu"
      }
    ]
  ];
  var Paperclip = createLucideIcon("paperclip", __iconNode3);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/send.js
  init_define_import_meta_env();
  var __iconNode4 = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ];
  var Send = createLucideIcon("send", __iconNode4);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/sparkles.js
  init_define_import_meta_env();
  var __iconNode5 = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr"
      }
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
  ];
  var Sparkles = createLucideIcon("sparkles", __iconNode5);

  // src/components/Tour/Tour.stories.tsx
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

  // ds-shim:ds:Card
  var ds_Card_exports = {};
  __export(ds_Card_exports, {
    default: () => ds_Card_default
  });
  init_define_import_meta_env();
  __reExport(ds_Card_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Card_default = g2["Card"] !== void 0 ? g2["Card"] : g2;

  // ds-shim:ds:IconButton
  var ds_IconButton_exports = {};
  __export(ds_IconButton_exports, {
    default: () => ds_IconButton_default
  });
  init_define_import_meta_env();
  __reExport(ds_IconButton_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_IconButton_default = g3["IconButton"] !== void 0 ? g3["IconButton"] : g3;

  // ds-shim:ds:Tour
  var ds_Tour_exports = {};
  __export(ds_Tour_exports, {
    default: () => ds_Tour_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tour_exports, __toESM(require_ds_raw()));
  var g4 = window.DevartUI;
  var ds_Tour_default = g4["Tour"] !== void 0 ? g4["Tour"] : g4;

  // src/components/Tour/Tour.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  function DemoApp() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { "data-demo": "app", className: "flex flex-col items-center gap-10 p-10", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Card_exports.Card, { "data-demo": "metrics", className: "w-[30rem]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardTitle, { children: "Metrics" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardContent, { children: "Revenue · Win rate · Pipeline coverage" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          "data-demo": "composer",
          className: "flex w-[30rem] items-center gap-1 rounded-xl border border-stroke bg-surface-card p-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_IconButton_exports.IconButton,
              {
                "data-demo": "attach",
                variant: "tertiary",
                size: "sm",
                "aria-label": "Attach",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, {})
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 px-2 text-ink-inactive text-sm", children: "Ask a question…" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_IconButton_exports.IconButton,
              {
                "data-demo": "model",
                variant: "tertiary",
                size: "sm",
                "aria-label": "Model",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {})
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_IconButton_exports.IconButton, { "data-demo": "send", size: "sm", "aria-label": "Send", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}) })
          ]
        }
      )
    ] });
  }
  var STEPS = [
    {
      id: "metrics",
      label: "Metrics",
      target: '[data-demo="metrics"]',
      icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {}),
      title: "Metrics make answers exact",
      content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "They tell the AI how each number is calculated, so it answers the same way every time. ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "12 built-in metrics" }),
        " are ready."
      ] })
    },
    {
      id: "chat",
      label: "Chat",
      target: '[data-demo="composer"]',
      side: ["top", "bottom", "right", "left"],
      icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {}),
      title: "Start here: ask your first question",
      content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "Type a question in plain language and press ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Enter" }),
        "."
      ] }),
      annotations: [
        { target: '[data-demo="attach"]', text: "Attach a file" },
        {
          target: '[data-demo="model"]',
          icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}),
          text: "Pick a model and how deeply it thinks"
        }
      ]
    }
  ];
  var meta = {
    title: "Compositions/Tour",
    component: ds_Tour_exports.Tour,
    tags: ["autodocs"],
    args: {
      open: true,
      steps: STEPS,
      step: 0,
      onStepChange: (0, import_test.fn)(),
      onClose: (0, import_test.fn)()
    },
    argTypes: {
      steps: { control: false },
      progress: { control: false },
      boundary: { control: false }
    },
    parameters: {
      layout: "fullscreen",
      docs: { story: { inline: false, iframeHeight: 560 } }
    },
    render: function Render(args) {
      const [step, setStep] = (0, import_react3.useState)(args.step ?? 0);
      const [open, setOpen] = (0, import_react3.useState)(args.open ?? true);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Button_exports.Button,
          {
            size: "sm",
            variant: "secondary",
            onClick: () => {
              setStep(0);
              setOpen(true);
            },
            children: "Restart tour"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoApp, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Tour_exports.Tour,
          {
            ...args,
            open,
            step,
            onStepChange: (n) => {
              args.onStepChange?.(n);
              setStep(n);
            },
            onClose: (reason) => {
              args.onClose?.(reason);
              setOpen(false);
            }
          }
        )
      ] });
    }
  };
  var Tour_stories_default = meta;
  var Default = {};
  var WithAnnotations = {
    args: { step: 1 }
  };
  var PartOfAFlow = {
    args: {
      onBeforeFirst: (0, import_test.fn)(),
      labels: { finish: "Start chatting" },
      progress: {
        steps: [
          { title: "Role" },
          { title: "Goal" },
          { title: "Data" },
          { title: "Metrics" },
          { title: "Chat" }
        ],
        offset: 3
      }
    }
  };
  var Phone = {
    args: { step: 1 },
    globals: { viewport: { value: "mobile1", isRotated: false } }
  };
  var DarkTheme = {
    args: { step: 1 },
    globals: { theme: "dark" }
  };

  // .design-sync/.cache/previews/Tour.tsx
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
    compose(Tour_stories_exports, "Default")
  );
  var WithAnnotations2 = (
    /* With Annotations */
    compose(Tour_stories_exports, "WithAnnotations")
  );
  var PartOfAFlow2 = (
    /* Part Of A Flow */
    compose(Tour_stories_exports, "PartOfAFlow")
  );
  var Phone2 = (
    /* Phone */
    compose(Tour_stories_exports, "Phone")
  );
  var DarkTheme2 = (
    /* Dark Theme */
    compose(Tour_stories_exports, "DarkTheme")
  );
  return __toCommonJS(Tour_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/chart-column.js:
lucide-react/dist/esm/icons/message-square.js:
lucide-react/dist/esm/icons/paperclip.js:
lucide-react/dist/esm/icons/send.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
