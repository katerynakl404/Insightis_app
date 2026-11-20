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
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx2)(t, p, k);
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

  // .design-sync/.cache/previews/ResizableMainSideLayout.tsx
  var ResizableMainSideLayout_exports = {};
  __export(ResizableMainSideLayout_exports, {
    Collapsed: () => Collapsed2,
    CustomSizes: () => CustomSizes2,
    Interactive: () => Interactive2,
    Open: () => Open2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/ResizableMainSideLayout/ResizableMainSideLayout.stories.tsx
  var ResizableMainSideLayout_stories_exports = {};
  __export(ResizableMainSideLayout_stories_exports, {
    Collapsed: () => Collapsed,
    CustomSizes: () => CustomSizes,
    Interactive: () => Interactive,
    Open: () => Open,
    default: () => ResizableMainSideLayout_stories_default
  });
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());
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

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Typography_default = g2["Typography"] !== void 0 ? g2["Typography"] : g2;

  // ds-shim:ds:ResizableMainSideLayout
  var ds_ResizableMainSideLayout_exports = {};
  __export(ds_ResizableMainSideLayout_exports, {
    default: () => ds_ResizableMainSideLayout_default
  });
  init_define_import_meta_env();
  __reExport(ds_ResizableMainSideLayout_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_ResizableMainSideLayout_default = g3["ResizableMainSideLayout"] !== void 0 ? g3["ResizableMainSideLayout"] : g3;

  // src/components/ResizableMainSideLayout/ResizableMainSideLayout.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Pane = ({ label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex h-full items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { variant: "span", textColor: "secondary", children: label }) });
  var meta = {
    title: "Components/ResizableMainSideLayout",
    component: ds_ResizableMainSideLayout_exports.ResizableMainSideLayout,
    tags: ["autodocs"],
    args: {
      sideOpen: true,
      mainContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, { label: "Main" }),
      sidePanelContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, { label: "Side panel" })
    },
    argTypes: {
      mainContent: { control: false },
      sidePanelContent: { control: false }
    },
    parameters: { layout: "fullscreen" },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-96 border border-stroke", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ]
  };
  var ResizableMainSideLayout_stories_default = meta;
  var publishedSideWidth = () => document.documentElement.style.getPropertyValue(ds_ResizableMainSideLayout_exports.SIDE_PANEL_WIDTH_CSS_VAR);
  var POSITIVE_PX = /^[1-9]\d*px$/;
  var Open = {
    play: async ({ canvasElement }) => {
      const panel = canvasElement.querySelector("#resizable-side");
      await (0, import_test.expect)(panel).not.toHaveAttribute("inert");
      await (0, import_test.expect)(panel).not.toHaveAttribute("aria-hidden");
      await (0, import_test.expect)(
        canvasElement.querySelector('[role="separator"]')
      ).toBeVisible();
      await (0, import_test.waitFor)(() => (0, import_test.expect)(publishedSideWidth()).toMatch(POSITIVE_PX));
    }
  };
  var Collapsed = {
    args: { sideOpen: false },
    /**
     * Collapsed to 0% the pane still holds its content; `inert` and
     * `aria-hidden` keep it out of the tab order and the accessibility tree.
     */
    play: async ({ canvasElement }) => {
      const panel = canvasElement.querySelector("#resizable-side");
      await (0, import_test.expect)(panel).toHaveAttribute("inert");
      await (0, import_test.expect)(panel).toHaveAttribute("aria-hidden", "true");
      await (0, import_test.expect)(
        canvasElement.querySelector('[role="separator"]')
      ).not.toBeVisible();
      await (0, import_test.waitFor)(() => (0, import_test.expect)(publishedSideWidth()).toBe("0px"));
    }
  };
  var CustomSizes = {
    args: {
      mainDefaultSize: "50%",
      sideDefaultSize: "50%",
      sideMinSize: "30%",
      sideMaxSize: "70%"
    }
  };
  var Interactive = {
    play: async ({ canvas, canvasElement, userEvent }) => {
      const panel = canvasElement.querySelector("#resizable-side");
      await (0, import_test.expect)(panel).toHaveAttribute("inert");
      await (0, import_test.waitFor)(() => (0, import_test.expect)(publishedSideWidth()).toBe("0px"));
      await userEvent.click(canvas.getByRole("button", { name: "Open panel" }));
      await (0, import_test.waitFor)(() => (0, import_test.expect)(panel).not.toHaveAttribute("inert"));
      await (0, import_test.expect)(panel).not.toHaveAttribute("aria-hidden");
      await (0, import_test.waitFor)(() => (0, import_test.expect)(publishedSideWidth()).toMatch(POSITIVE_PX));
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Close panel" })
      ).toBeVisible();
      await userEvent.click(canvas.getByRole("button", { name: "Close panel" }));
      await (0, import_test.waitFor)(() => (0, import_test.expect)(panel).toHaveAttribute("inert"));
      await (0, import_test.expect)(panel).toHaveAttribute("aria-hidden", "true");
      await (0, import_test.waitFor)(() => (0, import_test.expect)(publishedSideWidth()).toBe("0px"));
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Open panel" })
      ).toBeVisible();
    },
    render: (args) => {
      const [open, setOpen] = (0, import_react.useState)(false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ResizableMainSideLayout_exports.ResizableMainSideLayout,
        {
          ...args,
          sideOpen: open,
          mainContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex h-full items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { size: "sm", onClick: () => setOpen((previous) => !previous), children: open ? "Close panel" : "Open panel" }) })
        }
      );
    }
  };

  // .design-sync/.cache/previews/ResizableMainSideLayout.tsx
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
  var Open2 = (
    /* Open */
    compose(ResizableMainSideLayout_stories_exports, "Open")
  );
  var Collapsed2 = (
    /* Collapsed */
    compose(ResizableMainSideLayout_stories_exports, "Collapsed")
  );
  var CustomSizes2 = (
    /* Custom Sizes */
    compose(ResizableMainSideLayout_stories_exports, "CustomSizes")
  );
  var Interactive2 = (
    /* Interactive */
    compose(ResizableMainSideLayout_stories_exports, "Interactive")
  );
  return __toCommonJS(ResizableMainSideLayout_exports);
})();
