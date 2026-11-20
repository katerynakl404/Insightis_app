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

  // .design-sync/.cache/previews/PasswordInput.tsx
  var PasswordInput_exports = {};
  __export(PasswordInput_exports, {
    Default: () => Default2,
    Disabled: () => Disabled2,
    ErrorState: () => ErrorState2,
    Sizes: () => Sizes2,
    WithLabel: () => WithLabel2,
    WithValue: () => WithValue2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/PasswordInput/PasswordInput.stories.tsx
  var PasswordInput_stories_exports = {};
  __export(PasswordInput_stories_exports, {
    Default: () => Default,
    Disabled: () => Disabled,
    ErrorState: () => ErrorState,
    Sizes: () => Sizes,
    WithLabel: () => WithLabel,
    WithValue: () => WithValue,
    default: () => PasswordInput_stories_default
  });
  init_define_import_meta_env();
  var import_test = __toESM(require_test());

  // ds-shim:ds:PasswordInput
  var ds_PasswordInput_exports = {};
  __export(ds_PasswordInput_exports, {
    default: () => ds_PasswordInput_default
  });
  init_define_import_meta_env();
  __reExport(ds_PasswordInput_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_PasswordInput_default = g["PasswordInput"] !== void 0 ? g["PasswordInput"] : g;

  // src/components/PasswordInput/PasswordInput.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var import_react = __toESM(require_react_shim());
  var meta = {
    title: "Compositions/PasswordInput",
    component: ds_PasswordInput_exports.PasswordInput,
    tags: ["autodocs"],
    args: {
      placeholder: "Enter password",
      toggleShowLabel: "Show password",
      toggleHideLabel: "Hide password",
      disabled: false
    },
    argTypes: {
      inputGroupProps: { control: false },
      ref: { control: false, table: { disable: true } }
    }
  };
  var PasswordInput_stories_default = meta;
  var Default = {
    play: async ({ canvas, userEvent }) => {
      const field = canvas.getByPlaceholderText("Enter password");
      await (0, import_test.expect)(field).toHaveAttribute("type", "password");
      const toggle = canvas.getByRole("button", { name: "Show password" });
      await userEvent.click(toggle);
      await (0, import_test.expect)(field).toHaveAttribute("type", "text");
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Hide password" })
      ).toBeInTheDocument();
      await userEvent.click(
        canvas.getByRole("button", { name: "Hide password" })
      );
      await (0, import_test.expect)(field).toHaveAttribute("type", "password");
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_PasswordInput_exports.PasswordInput, { ...args }) })
  };
  var WithLabel = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_PasswordInput_exports.PasswordInput,
      {
        ...args,
        inputGroupProps: { label: "Password", inputId: "pw-with-label" }
      }
    ) })
  };
  var WithValue = {
    args: { defaultValue: "super-secret" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_PasswordInput_exports.PasswordInput,
      {
        ...args,
        inputGroupProps: { label: "Password", inputId: "pw-with-value" }
      }
    ) })
  };
  var ErrorState = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_PasswordInput_exports.PasswordInput,
      {
        ...args,
        inputGroupProps: {
          label: "Password",
          inputId: "pw-error",
          isInvalid: true,
          errorText: "Password is too short."
        }
      }
    ) })
  };
  var Disabled = {
    args: { disabled: true, defaultValue: "locked" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-72", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_PasswordInput_exports.PasswordInput,
      {
        ...args,
        inputGroupProps: { label: "Password", inputId: "pw-disabled" }
      }
    ) })
  };
  var Sizes = {
    render: (args) => {
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex w-72 flex-col gap-4", children: sizes.map((size) => /* @__PURE__ */ (0, import_react.createElement)(
        ds_PasswordInput_exports.PasswordInput,
        {
          ...args,
          key: size,
          inputGroupProps: { size, label: size, inputId: `pw-${size}` }
        }
      )) });
    }
  };

  // .design-sync/.cache/previews/PasswordInput.tsx
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
    compose(PasswordInput_stories_exports, "Default")
  );
  var WithLabel2 = (
    /* With Label */
    compose(PasswordInput_stories_exports, "WithLabel")
  );
  var WithValue2 = (
    /* With Value */
    compose(PasswordInput_stories_exports, "WithValue")
  );
  var ErrorState2 = (
    /* Error State */
    compose(PasswordInput_stories_exports, "ErrorState")
  );
  var Disabled2 = (
    /* Disabled */
    compose(PasswordInput_stories_exports, "Disabled")
  );
  var Sizes2 = (
    /* Sizes */
    compose(PasswordInput_stories_exports, "Sizes")
  );
  return __toCommonJS(PasswordInput_exports);
})();
