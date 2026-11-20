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

  // .design-sync/.cache/previews/CtaBanner.tsx
  var CtaBanner_exports = {};
  __export(CtaBanner_exports, {
    Default: () => Default2,
    Gradient: () => Gradient2,
    Small: () => Small2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/CtaBanner/CtaBanner.stories.tsx
  var CtaBanner_stories_exports = {};
  __export(CtaBanner_stories_exports, {
    Default: () => Default,
    Gradient: () => Gradient,
    Small: () => Small,
    default: () => CtaBanner_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/link.js
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
    ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
  ];
  var Link = createLucideIcon("link", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/lock.js
  init_define_import_meta_env();
  var __iconNode2 = [
    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
  ];
  var Lock = createLucideIcon("lock", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/plug-2.js
  init_define_import_meta_env();
  var __iconNode3 = [
    ["path", { d: "M9 2v6", key: "17ngun" }],
    ["path", { d: "M15 2v6", key: "s7yy2p" }],
    ["path", { d: "M12 17v5", key: "bb1du9" }],
    ["path", { d: "M5 8h14", key: "pcz4l3" }],
    ["path", { d: "M6 11V8h12v3a6 6 0 1 1-12 0Z", key: "wtfw2c" }]
  ];
  var Plug2 = createLucideIcon("plug-2", __iconNode3);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/sun.js
  init_define_import_meta_env();
  var __iconNode4 = [
    ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
    ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
    ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
  ];
  var Sun = createLucideIcon("sun", __iconNode4);

  // src/components/CtaBanner/CtaBanner.stories.tsx
  var import_test = __toESM(require_test());

  // ds-shim:ds:CtaBanner
  var ds_CtaBanner_exports = {};
  __export(ds_CtaBanner_exports, {
    default: () => ds_CtaBanner_default
  });
  init_define_import_meta_env();
  __reExport(ds_CtaBanner_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_CtaBanner_default = g["CtaBanner"] !== void 0 ? g["CtaBanner"] : g;

  // src/components/CtaBanner/CtaBanner.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Compositions/CtaBanner",
    component: ds_CtaBanner_exports.CtaBanner,
    tags: ["autodocs"],
    args: {
      title: "Connect your first data source",
      description: "Link a warehouse or file to start building metrics.",
      ctaLabel: "Connect source",
      icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug2, {}),
      onClick: (0, import_test.fn)()
    },
    argTypes: {
      variant: {
        control: "select",
        options: [
          "default",
          "horizontalWide",
          "diagonalAiry",
          "diagonalFade",
          "horizontalSlab"
        ]
      },
      actionVariant: {
        control: "select",
        options: ["primary", "secondary", "outline", "transparent"]
      },
      size: {
        control: "select",
        options: ["default", "sm"]
      },
      icon: { control: false },
      description: { control: false },
      onClick: { control: false },
      ref: { control: false, table: { disable: true } }
    }
  };
  var CtaBanner_stories_default = meta;
  var resolveToken = (host, token) => {
    const probe = document.createElement("span");
    probe.style.color = `hsl(var(${token}))`;
    host.append(probe);
    const { color } = getComputedStyle(probe);
    probe.remove();
    return color;
  };
  var Default = {
    play: async ({ args, canvas, userEvent }) => {
      const button = canvas.getByRole("button", { name: "Connect source" });
      await userEvent.click(button);
      await (0, import_test.expect)(args.onClick).toHaveBeenCalledTimes(1);
    }
  };
  var Gradient = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-full flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CtaBanner_exports.CtaBanner, { ...args, variant: "horizontalWide", icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_CtaBanner_exports.CtaBanner,
        {
          ...args,
          variant: "diagonalAiry",
          title: "Upgrade to connect more sources",
          description: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            "Your plan includes ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "1" }),
            " connection. Upgrade to add more."
          ] }),
          ctaLabel: "Upgrade",
          icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {})
        }
      )
    ] }),
    play: async ({ canvas, canvasElement }) => {
      const background = resolveToken(canvasElement, "--banner-grad-text");
      const text = resolveToken(canvasElement, "--banner-grad-btn-text");
      for (const name of ["Connect source", "Upgrade"]) {
        const button = canvas.getByRole("button", { name });
        const style = getComputedStyle(button);
        await (0, import_test.expect)(style.backgroundColor).toBe(background);
        await (0, import_test.expect)(style.color).toBe(text);
      }
    }
  };
  var Small = {
    args: {
      size: "sm",
      title: "Add a new metric",
      description: "Connect another source to build more metrics.",
      ctaLabel: "Browse catalog",
      icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {})
    },
    play: async ({ args, canvas, userEvent }) => {
      await userEvent.click(
        canvas.getByRole("button", { name: "Browse catalog" })
      );
      await (0, import_test.expect)(args.onClick).toHaveBeenCalledTimes(1);
    }
  };

  // .design-sync/.cache/previews/CtaBanner.tsx
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
    compose(CtaBanner_stories_exports, "Default")
  );
  var Gradient2 = (
    /* Gradient */
    compose(CtaBanner_stories_exports, "Gradient")
  );
  var Small2 = (
    /* Small */
    compose(CtaBanner_stories_exports, "Small")
  );
  return __toCommonJS(CtaBanner_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/link.js:
lucide-react/dist/esm/icons/lock.js:
lucide-react/dist/esm/icons/plug-2.js:
lucide-react/dist/esm/icons/sun.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
