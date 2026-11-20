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

  // .design-sync/.cache/previews/PinToggle.tsx
  var PinToggle_exports = {};
  __export(PinToggle_exports, {
    Disabled: () => Disabled2,
    InARow: () => InARow2,
    Pinned: () => Pinned2,
    Toggling: () => Toggling2,
    Unpinned: () => Unpinned2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/PinToggle/PinToggle.stories.tsx
  var PinToggle_stories_exports = {};
  __export(PinToggle_stories_exports, {
    Disabled: () => Disabled,
    InARow: () => InARow,
    Pinned: () => Pinned,
    Toggling: () => Toggling,
    Unpinned: () => Unpinned,
    default: () => PinToggle_stories_default
  });
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());
  var import_test = __toESM(require_test());

  // ds-shim:ds:Card
  var ds_Card_exports = {};
  __export(ds_Card_exports, {
    default: () => ds_Card_default
  });
  init_define_import_meta_env();
  __reExport(ds_Card_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Card_default = g["Card"] !== void 0 ? g["Card"] : g;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Tooltip_default = g2["Tooltip"] !== void 0 ? g2["Tooltip"] : g2;

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_Typography_default = g3["Typography"] !== void 0 ? g3["Typography"] : g3;

  // ds-shim:ds:PinToggle
  var ds_PinToggle_exports = {};
  __export(ds_PinToggle_exports, {
    default: () => ds_PinToggle_default
  });
  init_define_import_meta_env();
  __reExport(ds_PinToggle_exports, __toESM(require_ds_raw()));
  var g4 = window.DevartUI;
  var ds_PinToggle_default = g4["PinToggle"] !== void 0 ? g4["PinToggle"] : g4;

  // src/components/PinToggle/PinToggle.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Compositions/PinToggle",
    component: ds_PinToggle_exports.PinToggle,
    tags: ["autodocs"],
    args: { onPressedChange: (0, import_test.fn)(), disabled: false },
    argTypes: {
      size: { control: "inline-radio", options: ["3xs", "2xs", "xs", "sm"] },
      onPressedChange: { control: false },
      ref: { control: false, table: { disable: true } }
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ],
    parameters: { layout: "padded" }
  };
  var PinToggle_stories_default = meta;
  var Unpinned = {};
  var Pinned = {
    args: { defaultPressed: true }
  };
  var Toggling = {
    play: async ({ args, canvas, userEvent }) => {
      const pin = canvas.getByRole("button", { name: "Pin" });
      await (0, import_test.expect)(pin).toHaveAttribute("aria-pressed", "false");
      await userEvent.click(pin);
      await (0, import_test.expect)(pin).toHaveAttribute("aria-pressed", "true");
      await (0, import_test.expect)(args.onPressedChange).toHaveBeenLastCalledWith(true);
      await userEvent.click(pin);
      await (0, import_test.expect)(pin).toHaveAttribute("aria-pressed", "false");
      await (0, import_test.expect)(args.onPressedChange).toHaveBeenLastCalledWith(false);
    }
  };
  var Disabled = {
    args: { disabled: true },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_PinToggle_exports.PinToggle, { ...args }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_PinToggle_exports.PinToggle, { ...args, defaultPressed: true })
    ] })
  };
  var InARow = {
    render: function Render(args) {
      const [pinned, setPinned] = (0, import_react.useState)(true);
      const [opened, setOpened] = (0, import_react.useState)(0);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-full max-w-xl flex-col gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          ds_Card_exports.Card,
          {
            variant: "row",
            fullWidth: true,
            onClick: () => setOpened((count) => count + 1),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  ds_Typography_exports.Typography,
                  {
                    element: "span",
                    textStyle: "body14",
                    textColor: "body",
                    className: "min-w-0 truncate",
                    children: "Q1 revenue commentary"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  ds_PinToggle_exports.PinToggle,
                  {
                    ...args,
                    className: "-my-0.5",
                    pressed: pinned,
                    onPressedChange: (next) => {
                      setPinned(next);
                      args.onPressedChange?.(next);
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "span", textStyle: "body12", textColor: "secondary", children: "2h ago" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Typography_exports.Typography, { element: "span", textStyle: "body12", textColor: "secondary", children: [
          "Row opened ",
          opened,
          " times"
        ] })
      ] });
    },
    play: async ({ canvas, userEvent }) => {
      await userEvent.click(canvas.getByRole("button", { name: "Pin" }));
      await (0, import_test.expect)(canvas.getByText("Row opened 0 times")).toBeVisible();
    }
  };

  // .design-sync/.cache/previews/PinToggle.tsx
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
  var Unpinned2 = (
    /* Unpinned */
    compose(PinToggle_stories_exports, "Unpinned")
  );
  var Pinned2 = (
    /* Pinned */
    compose(PinToggle_stories_exports, "Pinned")
  );
  var Toggling2 = (
    /* Toggling */
    compose(PinToggle_stories_exports, "Toggling")
  );
  var Disabled2 = (
    /* Disabled */
    compose(PinToggle_stories_exports, "Disabled")
  );
  var InARow2 = (
    /* In A Row */
    compose(PinToggle_stories_exports, "InARow")
  );
  return __toCommonJS(PinToggle_exports);
})();
