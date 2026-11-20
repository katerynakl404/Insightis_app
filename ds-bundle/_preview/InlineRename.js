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

  // .design-sync/.cache/previews/InlineRename.tsx
  var InlineRename_exports = {};
  __export(InlineRename_exports, {
    Cancel: () => Cancel2,
    Commit: () => Commit2,
    Empty: () => Empty2,
    InARow: () => InARow2,
    Open: () => Open2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/InlineRename/InlineRename.stories.tsx
  var InlineRename_stories_exports = {};
  __export(InlineRename_stories_exports, {
    Cancel: () => Cancel,
    Commit: () => Commit,
    Empty: () => Empty,
    InARow: () => InARow,
    Open: () => Open,
    default: () => InlineRename_stories_default
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

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Typography_default = g2["Typography"] !== void 0 ? g2["Typography"] : g2;

  // ds-shim:ds:InlineRename
  var ds_InlineRename_exports = {};
  __export(ds_InlineRename_exports, {
    default: () => ds_InlineRename_default
  });
  init_define_import_meta_env();
  __reExport(ds_InlineRename_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_InlineRename_default = g3["InlineRename"] !== void 0 ? g3["InlineRename"] : g3;

  // src/components/InlineRename/InlineRename.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Compositions/InlineRename",
    component: ds_InlineRename_exports.InlineRename,
    tags: ["autodocs"],
    args: {
      "aria-label": "Chat name",
      defaultValue: "Q1 revenue commentary",
      onCommit: (0, import_test.fn)(),
      onCancel: (0, import_test.fn)()
    },
    argTypes: {
      onCommit: { control: false },
      onCancel: { control: false },
      ref: { control: false, table: { disable: true } }
    },
    parameters: { layout: "padded" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-80", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InlineRename_exports.InlineRename, { ...args }) })
  };
  var InlineRename_stories_default = meta;
  var Open = {
    play: async ({ canvas }) => {
      const field = canvas.getByRole("textbox", { name: "Chat name" });
      await (0, import_test.waitFor)(() => (0, import_test.expect)(field).toHaveFocus());
      await (0, import_test.expect)(field.selectionEnd).toBe(21);
    }
  };
  var Commit = {
    play: async ({ args, canvas, userEvent }) => {
      const field = canvas.getByRole("textbox", { name: "Chat name" });
      await (0, import_test.waitFor)(() => (0, import_test.expect)(field).toHaveFocus());
      await userEvent.keyboard("  Q2 revenue  {Enter}");
      await (0, import_test.expect)(args.onCommit).toHaveBeenCalledOnce();
      await (0, import_test.expect)(args.onCommit).toHaveBeenCalledWith("Q2 revenue");
      await (0, import_test.expect)(args.onCancel).not.toHaveBeenCalled();
    }
  };
  var Cancel = {
    play: async ({ args, canvas, userEvent }) => {
      const field = canvas.getByRole("textbox", { name: "Chat name" });
      await (0, import_test.waitFor)(() => (0, import_test.expect)(field).toHaveFocus());
      await userEvent.keyboard("Something else{Escape}");
      await (0, import_test.expect)(args.onCancel).toHaveBeenCalledOnce();
      await (0, import_test.expect)(args.onCommit).not.toHaveBeenCalled();
    }
  };
  var Empty = {
    play: async ({ args, canvas, userEvent }) => {
      const field = canvas.getByRole("textbox", { name: "Chat name" });
      await (0, import_test.waitFor)(() => (0, import_test.expect)(field).toHaveFocus());
      await userEvent.keyboard("{Backspace}{Enter}");
      await (0, import_test.expect)(args.onCancel).toHaveBeenCalledOnce();
      await (0, import_test.expect)(args.onCommit).not.toHaveBeenCalled();
    }
  };
  var InARow = {
    render: function Render(args) {
      const [title, setTitle] = (0, import_react.useState)("Q1 revenue commentary");
      const [renaming, setRenaming] = (0, import_react.useState)(true);
      const [opened, setOpened] = (0, import_react.useState)(0);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-full max-w-xl flex-col gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          ds_Card_exports.Card,
          {
            variant: "row",
            fullWidth: true,
            onClick: () => setOpened((count) => count + 1),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex min-w-0 flex-1 items-center", children: renaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_InlineRename_exports.InlineRename,
                {
                  ...args,
                  defaultValue: title,
                  onCommit: (next) => {
                    setTitle(next);
                    setRenaming(false);
                    args.onCommit(next);
                  },
                  onCancel: () => {
                    setRenaming(false);
                    args.onCancel();
                  }
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_Typography_exports.Typography,
                {
                  element: "span",
                  textStyle: "body14",
                  textColor: "body",
                  className: "min-w-0 truncate",
                  onDoubleClick: () => setRenaming(true),
                  children: title
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Typography_exports.Typography, { element: "span", textStyle: "body12", textColor: "secondary", children: "2h ago" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Typography_exports.Typography, { element: "span", textStyle: "body12", textColor: "secondary", children: [
          "Row opened ",
          opened,
          " times · double-click the title to rename"
        ] })
      ] });
    },
    play: async ({ args, canvas, userEvent }) => {
      const field = canvas.getByRole("textbox", { name: "Chat name" });
      await (0, import_test.waitFor)(() => (0, import_test.expect)(field).toHaveFocus());
      await userEvent.click(field);
      await (0, import_test.expect)(canvas.getByText(/Row opened 0 times/)).toBeVisible();
      await userEvent.clear(field);
      await userEvent.type(field, "Q2 revenue{Enter}");
      await (0, import_test.expect)(args.onCommit).toHaveBeenCalledWith("Q2 revenue");
      await (0, import_test.expect)(canvas.getByText("Q2 revenue")).toBeVisible();
    }
  };

  // .design-sync/.cache/previews/InlineRename.tsx
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
    compose(InlineRename_stories_exports, "Open")
  );
  var Commit2 = (
    /* Commit */
    compose(InlineRename_stories_exports, "Commit")
  );
  var Cancel2 = (
    /* Cancel */
    compose(InlineRename_stories_exports, "Cancel")
  );
  var Empty2 = (
    /* Empty */
    compose(InlineRename_stories_exports, "Empty")
  );
  var InARow2 = (
    /* In A Row */
    compose(InlineRename_stories_exports, "InARow")
  );
  return __toCommonJS(InlineRename_exports);
})();
