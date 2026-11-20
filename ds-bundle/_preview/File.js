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

  // .design-sync/.cache/previews/File.tsx
  var File_exports = {};
  __export(File_exports, {
    Clickable: () => Clickable2,
    CustomIcon: () => CustomIcon2,
    Default: () => Default2,
    ErrorState: () => ErrorState2,
    InteractiveStates: () => InteractiveStates2,
    Loading: () => Loading2,
    NameOnly: () => NameOnly2,
    Uploading: () => Uploading2,
    Variants: () => Variants2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/File/File.stories.tsx
  var File_stories_exports = {};
  __export(File_stories_exports, {
    Clickable: () => Clickable,
    CustomIcon: () => CustomIcon,
    Default: () => Default,
    ErrorState: () => ErrorState,
    InteractiveStates: () => InteractiveStates,
    Loading: () => Loading,
    NameOnly: () => NameOnly,
    Uploading: () => Uploading,
    Variants: () => Variants,
    default: () => File_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/file-image.js
  init_define_import_meta_env();
  var __iconNode = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
    ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
  ];
  var FileImage = createLucideIcon("file-image", __iconNode);

  // src/components/File/File.stories.tsx
  var import_test = __toESM(require_test());

  // ds-shim:ds:File
  var ds_File_exports = {};
  __export(ds_File_exports, {
    default: () => ds_File_default
  });
  init_define_import_meta_env();
  __reExport(ds_File_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_File_default = g["File"] !== void 0 ? g["File"] : g;

  // src/components/File/File.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Compositions/File",
    component: ds_File_exports.File,
    tags: ["autodocs"],
    args: {
      name: "report.pdf",
      fileSize: "1.2 MB",
      isLoading: false,
      isError: false,
      onDismiss: (0, import_test.fn)()
    },
    argTypes: {
      name: { control: "text" },
      fileSize: { control: "text" },
      progress: { control: { type: "range", min: 0, max: 100, step: 1 } },
      icon: { control: false },
      rightSlot: { control: false },
      onClick: { control: false },
      onDismiss: { control: false },
      onRetry: { control: false }
    }
  };
  var File_stories_default = meta;
  var Default = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args }) })
  };
  var NameOnly = {
    args: { fileSize: void 0, onDismiss: void 0 },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args }) })
  };
  var Loading = {
    args: { isLoading: true },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args }) })
  };
  var Uploading = {
    args: { progress: 43 },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args }) })
  };
  var ErrorState = {
    args: { isError: true, onRetry: (0, import_test.fn)(), onDismiss: (0, import_test.fn)() },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args }) })
  };
  var Clickable = {
    /**
     * The row's action sits on the content area, not on the wrapper, so it stays
     * a sibling of the dismiss control rather than containing it. Both must be
     * reachable, and the row must answer the keyboard as a button does.
     */
    play: async ({ args, canvas, userEvent }) => {
      const row = canvas.getByRole("button", { name: /report\.pdf/i });
      const dismiss = canvas.getByRole("button", { name: "Remove file" });
      await (0, import_test.expect)(row).not.toContainElement(dismiss);
      await userEvent.click(row);
      await (0, import_test.expect)(args.onClick).toHaveBeenCalledOnce();
      row.focus();
      await userEvent.keyboard("{Enter}");
      await (0, import_test.expect)(args.onClick).toHaveBeenCalledTimes(2);
      await userEvent.keyboard(" ");
      await (0, import_test.expect)(args.onClick).toHaveBeenCalledTimes(3);
      await userEvent.click(dismiss);
      await (0, import_test.expect)(args.onDismiss).toHaveBeenCalledOnce();
    },
    args: { onClick: (0, import_test.fn)() },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args }) })
  };
  var CustomIcon = {
    args: {
      name: "photo.png",
      fileSize: "820 KB",
      icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "size-6 text-brand-tertiary" })
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args }) })
  };
  var InteractiveStates = {
    args: { onClick: (0, import_test.fn)() },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-72 flex-col gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args, className: "bg-state-hover" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args, className: "bg-state-pressed" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_File_exports.File,
        {
          ...args,
          className: "ring-2 ring-focus-ring-brand ring-offset-2",
          name: "focus-visible.pdf"
        }
      )
    ] })
  };
  var Variants = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-72 flex-col gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args, size: "xs", name: "xs.pdf" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args, size: "sm", name: "sm.pdf" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args, size: "md", name: "md.pdf" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args, size: "lg", name: "lg.pdf" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args, size: "xl", name: "xl.pdf" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_File_exports.File, { ...args, variant: "tertiary", name: "tertiary.pdf", onClick: (0, import_test.fn)() })
    ] })
  };

  // .design-sync/.cache/previews/File.tsx
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
    compose(File_stories_exports, "Default")
  );
  var NameOnly2 = (
    /* Name Only */
    compose(File_stories_exports, "NameOnly")
  );
  var Loading2 = (
    /* Loading */
    compose(File_stories_exports, "Loading")
  );
  var Uploading2 = (
    /* Uploading */
    compose(File_stories_exports, "Uploading")
  );
  var ErrorState2 = (
    /* Error State */
    compose(File_stories_exports, "ErrorState")
  );
  var Clickable2 = (
    /* Clickable */
    compose(File_stories_exports, "Clickable")
  );
  var CustomIcon2 = (
    /* Custom Icon */
    compose(File_stories_exports, "CustomIcon")
  );
  var InteractiveStates2 = (
    /* Interactive States */
    compose(File_stories_exports, "InteractiveStates")
  );
  var Variants2 = (
    /* Variants */
    compose(File_stories_exports, "Variants")
  );
  return __toCommonJS(File_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/file-image.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
