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

  // sb-stub:storybook/preview-api
  var require_preview_api = __commonJS({
    "sb-stub:storybook/preview-api"(exports, module) {
      init_define_import_meta_env();
      var noopChannel = { on() {
      }, off() {
      }, once() {
      }, emit() {
      }, removeListener() {
      } };
      var addons = { register() {
      }, add() {
      }, getChannel() {
        return noopChannel;
      }, setConfig() {
      }, getConfig() {
        return {};
      } };
      var R = function() {
        return window.React || {};
      };
      module.exports = { addons, types: {}, useGlobals() {
        return [{}, function() {
        }];
      }, useArgs() {
        return [{}, function() {
        }, function() {
        }];
      }, useParameter() {
      }, useStorybookApi() {
        return {};
      }, useState() {
        return R().useState.apply(null, arguments);
      }, useCallback() {
        return R().useCallback.apply(null, arguments);
      }, useRef() {
        return R().useRef.apply(null, arguments);
      }, useMemo() {
        return R().useMemo.apply(null, arguments);
      }, useEffect() {
        return R().useEffect.apply(null, arguments);
      }, useReducer() {
        return R().useReducer.apply(null, arguments);
      }, useChannel() {
        return function() {
        };
      } };
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

  // .design-sync/.cache/previews/Select.tsx
  var Select_exports = {};
  __export(Select_exports, {
    ClearOnClick: () => ClearOnClick2,
    Clearable: () => Clearable2,
    Default: () => Default2,
    Disabled: () => Disabled2,
    EmptyIdOption: () => EmptyIdOption2,
    ErrorState: () => ErrorState2,
    InAForm: () => InAForm2,
    LongList: () => LongList2,
    Required: () => Required2,
    Sizes: () => Sizes2,
    UnknownValue: () => UnknownValue2,
    WithValue: () => WithValue2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Select/Select.stories.tsx
  var Select_stories_exports = {};
  __export(Select_stories_exports, {
    ClearOnClick: () => ClearOnClick,
    Clearable: () => Clearable,
    Default: () => Default,
    Disabled: () => Disabled,
    EmptyIdOption: () => EmptyIdOption,
    ErrorState: () => ErrorState,
    InAForm: () => InAForm,
    LongList: () => LongList,
    Required: () => Required,
    Sizes: () => Sizes,
    UnknownValue: () => UnknownValue,
    WithValue: () => WithValue,
    default: () => Select_stories_default
  });
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());
  var import_preview_api = __toESM(require_preview_api());
  var import_test = __toESM(require_test());

  // ds-shim:ds:Select
  var ds_Select_exports = {};
  __export(ds_Select_exports, {
    default: () => ds_Select_default
  });
  init_define_import_meta_env();
  __reExport(ds_Select_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Select_default = g["Select"] !== void 0 ? g["Select"] : g;

  // src/components/Select/Select.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var AUTH = [
    { id: "password", label: "Password" },
    { id: "key", label: "Public key" },
    { id: "agent", label: "SSH agent" }
  ];
  var PROTOCOLS = [
    { id: "", label: "Automatic" },
    { id: "2", label: "Version 2.0" },
    { id: "3", label: "Version 3.0" }
  ];
  var REGIONS = [
    "US East (N. Virginia)",
    "US West (Oregon)",
    "Canada (Central)",
    "EU (Frankfurt)",
    "EU (Ireland)",
    "EU (London)",
    "EU (Paris)",
    "Asia Pacific (Tokyo)",
    "Asia Pacific (Singapore)",
    "Asia Pacific (Sydney)",
    "South America (São Paulo)"
  ].map((label, i) => ({ id: `r${i}`, label }));
  var meta = {
    title: "Compositions/Select",
    component: ds_Select_exports.Select,
    tags: ["autodocs"],
    parameters: { layout: "padded" },
    args: {
      label: "Authentication",
      placeholder: "Choose a method",
      options: AUTH,
      size: "md",
      disabled: false,
      isInvalid: false,
      clearable: false,
      required: false,
      value: null,
      onValueChange: (0, import_test.fn)()
    },
    argTypes: {
      size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
      value: { control: "text" },
      options: { control: false },
      onValueChange: { control: false },
      getOptionLabel: { control: false },
      getOptionDisabled: { control: false }
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-80", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ]
  };
  var Select_stories_default = meta;
  function ArgsSelect({ updateArgs, ...args }) {
    const [value, setValue] = (0, import_react.useState)(args.value ?? null);
    (0, import_react.useEffect)(() => {
      setValue(args.value ?? null);
    }, [args.value]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Select_exports.Select,
      {
        ...args,
        value,
        onValueChange: (next) => {
          setValue(next);
          args.onValueChange?.(next);
          updateArgs({ value: next });
        }
      }
    );
  }
  var renderSelect = function Render(args) {
    const [, updateArgs] = (0, import_preview_api.useArgs)();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsSelect, { ...args, updateArgs });
  };
  var Default = {
    render: renderSelect,
    play: async ({ canvas, userEvent }) => {
      const trigger = canvas.getByRole("combobox", { name: "Authentication" });
      await userEvent.click(trigger);
      const page = (0, import_test.within)(document.body);
      await userEvent.click(
        await page.findByRole("option", { name: "Public key" })
      );
      await (0, import_test.waitFor)(() => (0, import_test.expect)(trigger).toHaveTextContent("Public key"));
      await (0, import_test.waitFor)(
        () => (0, import_test.expect)(page.queryByRole("listbox")).not.toBeInTheDocument()
      );
    }
  };
  var WithValue = {
    args: { value: "key" },
    render: renderSelect,
    play: async ({ canvas, userEvent }) => {
      const page = (0, import_test.within)(document.body);
      await userEvent.click(
        canvas.getByRole("combobox", { name: "Authentication" })
      );
      await (0, import_test.expect)(
        await page.findByRole("option", { name: "Public key" })
      ).toHaveAttribute("aria-selected", "true");
      await userEvent.keyboard("{Escape}");
      await (0, import_test.waitFor)(
        () => (0, import_test.expect)(page.queryByRole("listbox")).not.toBeInTheDocument()
      );
    }
  };
  var Clearable = {
    args: { value: "key", clearable: true },
    render: renderSelect,
    play: async ({ canvas, userEvent }) => {
      const trigger = canvas.getByRole("combobox", { name: "Authentication" });
      await userEvent.click(
        canvas.getByRole("button", { name: "Clear selection" })
      );
      await (0, import_test.expect)(trigger).toHaveTextContent("Choose a method");
      await (0, import_test.expect)(trigger).toHaveAttribute("aria-expanded", "false");
      await (0, import_test.expect)(
        canvas.queryByRole("button", { name: "Clear selection" })
      ).not.toBeInTheDocument();
    }
  };
  var ClearOnClick = {
    args: { value: "key", clearable: true },
    render: renderSelect,
    play: async ({ canvas, userEvent }) => {
      const trigger = canvas.getByRole("combobox", { name: "Authentication" });
      const clear = canvas.getByRole("button", { name: "Clear selection" });
      await userEvent.pointer({ keys: "[MouseRight]", target: clear });
      await (0, import_test.expect)(trigger, "a right-click keeps the value").toHaveTextContent(
        "Public key"
      );
      clear.click();
      await (0, import_test.waitFor)(() => (0, import_test.expect)(trigger).toHaveTextContent("Choose a method"));
    }
  };
  var UnknownValue = {
    args: { value: "removed" },
    render: renderSelect,
    play: async ({ canvas }) => {
      const trigger = canvas.getByRole("combobox", { name: "Authentication" });
      await (0, import_test.expect)(trigger).toHaveTextContent("Choose a method");
      await (0, import_test.expect)(trigger).toHaveAttribute("data-placeholder");
    }
  };
  var Required = {
    args: { value: "key", clearable: true, required: true },
    render: renderSelect,
    play: async ({ canvas }) => {
      await (0, import_test.expect)(
        canvas.getByRole("combobox", { name: "Authentication" })
      ).toHaveAttribute("aria-required", "true");
      await (0, import_test.expect)(canvas.getByText("*")).toBeInTheDocument();
      await (0, import_test.expect)(
        canvas.queryByRole("button", { name: "Clear selection" })
      ).not.toBeInTheDocument();
    }
  };
  var InAForm = {
    args: { required: true, name: "auth" },
    render: function Render2(args) {
      const [, updateArgs] = (0, import_preview_api.useArgs)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", { "aria-label": "Connection", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArgsSelect, { ...args, updateArgs }) });
    },
    play: async ({ canvas, userEvent }) => {
      const form = canvas.getByRole("form", {
        name: "Connection"
      });
      await (0, import_test.expect)(form.checkValidity()).toBe(false);
      await userEvent.click(
        canvas.getByRole("combobox", { name: "Authentication" })
      );
      await userEvent.click(
        await (0, import_test.within)(document.body).findByRole("option", { name: "SSH agent" })
      );
      await (0, import_test.waitFor)(() => (0, import_test.expect)(form.checkValidity()).toBe(true));
      await (0, import_test.expect)(new FormData(form).get("auth")).toBe("agent");
      await (0, import_test.waitFor)(
        () => (0, import_test.expect)(
          (0, import_test.within)(document.body).queryByRole("listbox")
        ).not.toBeInTheDocument()
      );
    }
  };
  var EmptyIdOption = {
    args: { label: "Protocol", options: PROTOCOLS, value: "" },
    render: renderSelect,
    play: async ({ canvas, userEvent }) => {
      const page = (0, import_test.within)(document.body);
      const field = canvas.getByRole("combobox", { name: "Protocol" });
      await (0, import_test.expect)(field).toHaveTextContent("Automatic");
      await userEvent.click(field);
      await userEvent.click(
        await page.findByRole("option", { name: "Version 2.0" })
      );
      await (0, import_test.waitFor)(() => (0, import_test.expect)(field).toHaveTextContent("Version 2.0"));
      await (0, import_test.waitFor)(
        () => (0, import_test.expect)(page.queryByRole("listbox")).not.toBeInTheDocument()
      );
      await userEvent.click(field);
      await userEvent.click(
        await page.findByRole("option", { name: "Automatic" })
      );
      await (0, import_test.waitFor)(() => (0, import_test.expect)(field).toHaveTextContent("Automatic"));
      await (0, import_test.waitFor)(
        () => (0, import_test.expect)(page.queryByRole("listbox")).not.toBeInTheDocument()
      );
    }
  };
  var LongList = {
    args: { label: "Region", placeholder: "Choose a region", options: REGIONS },
    render: renderSelect
  };
  var Sizes = {
    render: function Render3(args) {
      const [, updateArgs] = (0, import_preview_api.useArgs)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-4", children: ["xs", "sm", "md", "lg", "xl"].map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ArgsSelect,
        {
          ...args,
          size,
          label: size,
          updateArgs
        },
        size
      )) });
    }
  };
  var ErrorState = {
    args: {
      required: true,
      isInvalid: true,
      errorText: "Choose an authentication method."
    },
    render: renderSelect,
    play: async ({ canvas, userEvent }) => {
      const trigger = canvas.getByRole("combobox", { name: "Authentication" });
      const group = trigger.closest("[data-slot=input-group]");
      const errorBorder = getComputedStyle(group).borderColor;
      trigger.focus();
      await userEvent.keyboard("{Enter}");
      await (0, import_test.within)(document.body).findByRole("listbox");
      await new Promise((resolve) => setTimeout(resolve, 300));
      await (0, import_test.expect)(
        getComputedStyle(group).borderColor,
        "the error border stays while the list is open"
      ).toBe(errorBorder);
      await userEvent.keyboard("{Escape}");
      await (0, import_test.waitFor)(
        () => (0, import_test.expect)(
          (0, import_test.within)(document.body).queryByRole("listbox")
        ).not.toBeInTheDocument()
      );
    }
  };
  var Disabled = {
    args: { disabled: true, value: "password" },
    render: renderSelect
  };

  // .design-sync/.cache/previews/Select.tsx
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
    compose(Select_stories_exports, "Default")
  );
  var WithValue2 = (
    /* With Value */
    compose(Select_stories_exports, "WithValue")
  );
  var Clearable2 = (
    /* Clearable */
    compose(Select_stories_exports, "Clearable")
  );
  var ClearOnClick2 = (
    /* Clear On Click */
    compose(Select_stories_exports, "ClearOnClick")
  );
  var UnknownValue2 = (
    /* Unknown Value */
    compose(Select_stories_exports, "UnknownValue")
  );
  var Required2 = (
    /* Required */
    compose(Select_stories_exports, "Required")
  );
  var InAForm2 = (
    /* In A Form */
    compose(Select_stories_exports, "InAForm")
  );
  var EmptyIdOption2 = (
    /* Empty Id Option */
    compose(Select_stories_exports, "EmptyIdOption")
  );
  var LongList2 = (
    /* Long List */
    compose(Select_stories_exports, "LongList")
  );
  var Sizes2 = (
    /* Sizes */
    compose(Select_stories_exports, "Sizes")
  );
  var ErrorState2 = (
    /* Error State */
    compose(Select_stories_exports, "ErrorState")
  );
  var Disabled2 = (
    /* Disabled */
    compose(Select_stories_exports, "Disabled")
  );
  return __toCommonJS(Select_exports);
})();
