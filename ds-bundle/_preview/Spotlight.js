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

  // .design-sync/.cache/previews/Spotlight.tsx
  var Spotlight_exports = {};
  __export(Spotlight_exports, {
    Boundary: () => Boundary2,
    DarkTheme: () => DarkTheme2,
    Default: () => Default2,
    Leaving: () => Leaving2,
    MeasuredRect: () => MeasuredRect2,
    NoPulse: () => NoPulse2,
    NothingLit: () => NothingLit2,
    PaddingAndRadius: () => PaddingAndRadius2,
    SeveralTargets: () => SeveralTargets2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Spotlight/Spotlight.stories.tsx
  var Spotlight_stories_exports = {};
  __export(Spotlight_stories_exports, {
    Boundary: () => Boundary,
    DarkTheme: () => DarkTheme,
    Default: () => Default,
    Leaving: () => Leaving,
    MeasuredRect: () => MeasuredRect,
    NoPulse: () => NoPulse,
    NothingLit: () => NothingLit,
    PaddingAndRadius: () => PaddingAndRadius,
    SeveralTargets: () => SeveralTargets,
    default: () => Spotlight_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/paperclip.js
  init_define_import_meta_env();
  var __iconNode = [
    [
      "path",
      {
        d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
        key: "1miecu"
      }
    ]
  ];
  var Paperclip = createLucideIcon("paperclip", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/send.js
  init_define_import_meta_env();
  var __iconNode2 = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ];
  var Send = createLucideIcon("send", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/sparkles.js
  init_define_import_meta_env();
  var __iconNode3 = [
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
  var Sparkles = createLucideIcon("sparkles", __iconNode3);

  // src/components/Spotlight/Spotlight.stories.tsx
  var import_react3 = __toESM(require_react_shim());

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

  // ds-shim:ds:SegmentedControl
  var ds_SegmentedControl_exports = {};
  __export(ds_SegmentedControl_exports, {
    default: () => ds_SegmentedControl_default
  });
  init_define_import_meta_env();
  __reExport(ds_SegmentedControl_exports, __toESM(require_ds_raw()));
  var g4 = window.DevartUI;
  var ds_SegmentedControl_default = g4["SegmentedControl"] !== void 0 ? g4["SegmentedControl"] : g4;

  // ds-shim:ds:Spotlight
  var ds_Spotlight_exports = {};
  __export(ds_Spotlight_exports, {
    default: () => ds_Spotlight_default
  });
  init_define_import_meta_env();
  __reExport(ds_Spotlight_exports, __toESM(require_ds_raw()));
  var g5 = window.DevartUI;
  var ds_Spotlight_default = g5["Spotlight"] !== void 0 ? g5["Spotlight"] : g5;

  // src/components/Spotlight/Spotlight.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  function DemoScreen() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { "data-demo": "screen", className: "flex flex-col gap-6 p-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Card_exports.Card, { "data-demo": "stats", className: "w-[28rem]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardTitle, { children: "Revenue this quarter" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardContent, { children: "$1.2M · up 12% on the last one" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          "data-demo": "composer",
          className: "flex w-[28rem] items-center gap-2 rounded-xl border border-stroke bg-surface-card p-2",
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 text-ink-inactive text-sm", children: "Ask a question…" }),
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
  var meta = {
    title: "Compositions/Spotlight",
    component: ds_Spotlight_exports.Spotlight,
    tags: ["autodocs"],
    args: { target: '[data-demo="composer"]' },
    argTypes: {
      target: { control: false },
      rect: { control: false },
      bounds: { control: false },
      boundary: { control: false },
      ref: { control: false, table: { disable: true } }
    },
    parameters: {
      layout: "fullscreen",
      docs: { story: { inline: false, iframeHeight: 420 } }
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoScreen, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spotlight_exports.Spotlight, { ...args })
    ] })
  };
  var Spotlight_stories_default = meta;
  var Default = {};
  var SeveralTargets = {
    args: { target: ['[data-demo="attach"]', '[data-demo="model"]'] }
  };
  var NothingLit = {
    args: { target: null, rect: null }
  };
  var NoPulse = {
    args: { pulse: false }
  };
  var PaddingAndRadius = {
    args: { target: '[data-demo="stats"]', padding: 16, radius: 24 }
  };
  var Boundary = {
    render: function Render(args) {
      const [target, setTarget] = (0, import_react3.useState)("composer");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-stroke border-b bg-surface-card p-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_SegmentedControl_exports.SegmentedControl, { value: target, onValueChange: setTarget, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_SegmentedControl_exports.SegmentedControlList, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_SegmentedControl_exports.SegmentedControlTrigger, { value: "stats", children: "Stats" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_SegmentedControl_exports.SegmentedControlTrigger, { value: "composer", children: "Composer" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_SegmentedControl_exports.SegmentedControlTrigger, { value: "send", children: "Send" })
        ] }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoScreen, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Spotlight_exports.Spotlight,
          {
            ...args,
            boundary: '[data-demo="screen"]',
            target: `[data-demo="${target}"]`
          }
        )
      ] });
    }
  };
  var MeasuredRect = {
    render: function Render2(args) {
      const { rect, bounds, radius } = (0, ds_Spotlight_exports.useTargetRect)('[data-demo="send"]', {
        padding: 6
      });
      const [clicks, setClicks] = (0, import_react3.useState)(0);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoScreen, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "px-8 text-ink-secondary text-sm", children: [
          "Scrim clicks: ",
          clicks
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Spotlight_exports.Spotlight,
          {
            ...args,
            rect,
            bounds,
            radius,
            onScrimClick: () => setClicks((n) => n + 1)
          }
        )
      ] });
    }
  };
  var Leaving = {
    render: function Render3(args) {
      const [leaving, setLeaving] = (0, import_react3.useState)(false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-stroke border-b bg-surface-card p-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Button_exports.Button,
          {
            size: "sm",
            variant: "secondary",
            onClick: () => setLeaving((v) => !v),
            children: leaving ? "Show again" : "Close"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoScreen, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Spotlight_exports.Spotlight,
          {
            ...args,
            boundary: '[data-demo="screen"]',
            leaving
          },
          String(leaving)
        )
      ] });
    }
  };
  var DarkTheme = {
    globals: { theme: "dark" }
  };

  // .design-sync/.cache/previews/Spotlight.tsx
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
    compose(Spotlight_stories_exports, "Default")
  );
  var SeveralTargets2 = (
    /* Several Targets */
    compose(Spotlight_stories_exports, "SeveralTargets")
  );
  var NothingLit2 = (
    /* Nothing Lit */
    compose(Spotlight_stories_exports, "NothingLit")
  );
  var NoPulse2 = (
    /* No Pulse */
    compose(Spotlight_stories_exports, "NoPulse")
  );
  var PaddingAndRadius2 = (
    /* Padding And Radius */
    compose(Spotlight_stories_exports, "PaddingAndRadius")
  );
  var Boundary2 = (
    /* Boundary */
    compose(Spotlight_stories_exports, "Boundary")
  );
  var MeasuredRect2 = (
    /* Measured Rect */
    compose(Spotlight_stories_exports, "MeasuredRect")
  );
  var Leaving2 = (
    /* Leaving */
    compose(Spotlight_stories_exports, "Leaving")
  );
  var DarkTheme2 = (
    /* Dark Theme */
    compose(Spotlight_stories_exports, "DarkTheme")
  );
  return __toCommonJS(Spotlight_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
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
