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

  // .design-sync/.cache/previews/Counter.tsx
  var Counter_exports = {};
  __export(Counter_exports, {
    Active: () => Active2,
    Default: () => Default2,
    InAList: () => InAList2,
    Sizes: () => Sizes2,
    States: () => States2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Counter/Counter.stories.tsx
  var Counter_stories_exports = {};
  __export(Counter_stories_exports, {
    Active: () => Active,
    Default: () => Default,
    InAList: () => InAList,
    Sizes: () => Sizes,
    States: () => States,
    default: () => Counter_stories_default
  });
  init_define_import_meta_env();

  // ds-shim:ds:Counter
  var ds_Counter_exports = {};
  __export(ds_Counter_exports, {
    default: () => ds_Counter_default
  });
  init_define_import_meta_env();
  __reExport(ds_Counter_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Counter_default = g["Counter"] !== void 0 ? g["Counter"] : g;

  // src/components/Counter/Counter.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/Counter",
    component: ds_Counter_exports.Counter,
    tags: ["autodocs"],
    args: { children: "2", active: false },
    argTypes: {
      active: { control: "boolean" },
      size: { control: "inline-radio", options: ["md", "sm"] }
    },
    parameters: {
      docs: {
        description: {
          component: "A small round count. Not a Badge: a badge labels a thing and sizes itself to its label, so it is a pill; this holds a number and keeps a 1:1 box, because a column of counts has to read as a column. Default is quiet — a count is content, not a status. `active` means one thing only: this is moving on its own right now."
        }
      }
    }
  };
  var Counter_stories_default = meta;
  var Default = {};
  var Active = { args: { active: true } };
  var States = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { children: "1" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { children: "10" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { active: true, children: "1" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { active: true, children: "10" })
    ] }),
    parameters: {
      docs: {
        description: {
          story: "A second digit does not widen the box — the same rule every mark in the kit follows. If a count outgrows it, the box grows on BOTH axes or the count is abbreviated; it never becomes an oval."
        }
      }
    }
  };
  var Sizes = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { size: "md", children: "3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-ink-body text-sm", children: "md — beside 14px body text in a list row" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { size: "sm", children: "3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-ink-body text-sm", children: "sm — beside a 14px nav label, where md reads as a token dropped on the row" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-4 border-stroke border-t pt-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { size: "md", children: "3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { size: "sm", children: "3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { size: "md", active: true, children: "3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { size: "sm", active: true, children: "3" })
      ] })
    ] }),
    parameters: {
      docs: {
        description: {
          story: "Two steps and no more, because the same count sits beside two different line heights. The step is chosen by what the counter stands next to, not by how important the number is."
        }
      }
    }
  };
  var InAList = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex w-56 flex-col gap-1", children: [
      ["Q1 revenue commentary", 2, false],
      ["Churn deep-dive", 3, true],
      ["Onboarding cohort", 1, false]
    ].map(([label, n, active]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "flex items-center gap-2 rounded-md px-2 py-1.5 text-ink-body text-sm hover:bg-state-hover",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "min-w-0 flex-1 truncate", children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Counter_exports.Counter, { active, children: n })
        ]
      },
      label
    )) }),
    parameters: {
      docs: {
        description: {
          story: "Quiet where the queue is parked, filled where it is still sending. The colour carries the state of that queue — not which row is selected, which the row itself already shows."
        }
      }
    }
  };

  // .design-sync/.cache/previews/Counter.tsx
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
    compose(Counter_stories_exports, "Default")
  );
  var Active2 = (
    /* Active */
    compose(Counter_stories_exports, "Active")
  );
  var States2 = (
    /* States */
    compose(Counter_stories_exports, "States")
  );
  var Sizes2 = (
    /* Sizes */
    compose(Counter_stories_exports, "Sizes")
  );
  var InAList2 = (
    /* In A List */
    compose(Counter_stories_exports, "InAList")
  );
  return __toCommonJS(Counter_exports);
})();
