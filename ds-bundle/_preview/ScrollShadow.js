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

  // .design-sync/.cache/previews/ScrollShadow.tsx
  var ScrollShadow_exports = {};
  __export(ScrollShadow_exports, {
    Horizontal: () => Horizontal2,
    Vertical: () => Vertical2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/ScrollShadow/ScrollShadow.stories.tsx
  var ScrollShadow_stories_exports = {};
  __export(ScrollShadow_stories_exports, {
    Horizontal: () => Horizontal,
    Vertical: () => Vertical,
    default: () => ScrollShadow_stories_default
  });
  init_define_import_meta_env();
  var import_test = __toESM(require_test());

  // ds-shim:ds:ScrollShadow
  var ds_ScrollShadow_exports = {};
  __export(ds_ScrollShadow_exports, {
    default: () => ds_ScrollShadow_default
  });
  init_define_import_meta_env();
  __reExport(ds_ScrollShadow_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_ScrollShadow_default = g["ScrollShadow"] !== void 0 ? g["ScrollShadow"] : g;

  // src/components/ScrollShadow/ScrollShadow.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/ScrollShadow",
    component: ds_ScrollShadow_exports.ScrollShadow,
    tags: ["autodocs"],
    args: {
      size: 40,
      offset: 0,
      orientation: "vertical",
      visibility: "auto",
      isEnabled: true,
      onVisibilityChange: (0, import_test.fn)()
    },
    argTypes: {
      size: {
        control: { type: "range", min: 0, max: 120, step: 4 }
      },
      offset: {
        control: { type: "range", min: 0, max: 120, step: 4 }
      },
      orientation: {
        control: "select",
        options: ["vertical", "horizontal"]
      },
      visibility: {
        control: "select",
        options: ["auto", "both", "top", "bottom", "left", "right", "none"]
      },
      focusable: {
        control: "select",
        options: ["auto", true, false]
      },
      onVisibilityChange: { control: false },
      children: { control: false },
      ref: { control: false, table: { disable: true } }
    }
  };
  var ScrollShadow_stories_default = meta;
  var Vertical = {
    args: { orientation: "vertical" },
    /**
     * The fade is a CSS mask rebuilt from the scroll position, so which edge is
     * soft is the whole behaviour: only the far edge at the top, both in the
     * middle, only the near edge at the end. A mask stuck on one shape is the
     * bug this catches.
     */
    play: async ({ canvasElement }) => {
      const region = canvasElement.querySelector(
        ".overflow-y-auto"
      );
      await (0, import_test.expect)(region).toBeTruthy();
      await (0, import_test.waitFor)(() => (0, import_test.expect)(region.getAttribute("tabindex")).toBe("0"));
      await (0, import_test.expect)(region.getAttribute("role")).toBe("region");
      const nearEdgeSoft = () => region.style.maskImage.startsWith("linear-gradient(transparent");
      const farEdgeSoft = () => region.style.maskImage.endsWith("transparent)");
      await (0, import_test.waitFor)(() => (0, import_test.expect)(farEdgeSoft()).toBe(true));
      await (0, import_test.expect)(nearEdgeSoft()).toBe(false);
      region.scrollTop = 100;
      await (0, import_test.waitFor)(() => (0, import_test.expect)(nearEdgeSoft()).toBe(true));
      await (0, import_test.expect)(farEdgeSoft()).toBe(true);
      region.scrollTop = region.scrollHeight;
      await (0, import_test.waitFor)(() => (0, import_test.expect)(farEdgeSoft()).toBe(false));
      await (0, import_test.expect)(nearEdgeSoft()).toBe(true);
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_ScrollShadow_exports.ScrollShadow,
      {
        ...args,
        className: "h-48 w-64 rounded-md border border-stroke p-4",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-3", children: Array.from({ length: 20 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-ink-body", children: [
          "Scrollable row ",
          i + 1
        ] }, `row-${i + 1}`)) })
      }
    )
  };
  var Horizontal = {
    args: { orientation: "horizontal" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_ScrollShadow_exports.ScrollShadow,
      {
        ...args,
        className: "w-64 rounded-md border border-stroke p-4",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex gap-3", children: Array.from({ length: 20 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "flex size-16 shrink-0 items-center justify-center rounded-md bg-surface-chips text-ink-body",
            children: i + 1
          },
          `col-${i + 1}`
        )) })
      }
    )
  };

  // .design-sync/.cache/previews/ScrollShadow.tsx
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
  var Vertical2 = (
    /* Vertical */
    compose(ScrollShadow_stories_exports, "Vertical")
  );
  var Horizontal2 = (
    /* Horizontal */
    compose(ScrollShadow_stories_exports, "Horizontal")
  );
  return __toCommonJS(ScrollShadow_exports);
})();
