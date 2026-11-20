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

  // .design-sync/.cache/previews/AlertStack.tsx
  var AlertStack_exports = {};
  __export(AlertStack_exports, {
    CustomLabels: () => CustomLabels2,
    KeepsScroll: () => KeepsScroll2,
    Keyboard: () => Keyboard2,
    Open: () => Open2,
    Playground: () => Playground2,
    Single: () => Single2,
    Three: () => Three2,
    Two: () => Two2,
    WrappedNotices: () => WrappedNotices2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/AlertStack/AlertStack.stories.tsx
  var AlertStack_stories_exports = {};
  __export(AlertStack_stories_exports, {
    CustomLabels: () => CustomLabels,
    KeepsScroll: () => KeepsScroll,
    Keyboard: () => Keyboard,
    Open: () => Open,
    Playground: () => Playground,
    Single: () => Single,
    Three: () => Three,
    Two: () => Two,
    WrappedNotices: () => WrappedNotices,
    default: () => AlertStack_stories_default
  });
  init_define_import_meta_env();
  var import_preview_api = __toESM(require_preview_api());
  var import_test = __toESM(require_test());

  // ds-shim:ds:Alert
  var ds_Alert_exports = {};
  __export(ds_Alert_exports, {
    default: () => ds_Alert_default
  });
  init_define_import_meta_env();
  __reExport(ds_Alert_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Alert_default = g["Alert"] !== void 0 ? g["Alert"] : g;

  // ds-shim:ds:AlertStack
  var ds_AlertStack_exports = {};
  __export(ds_AlertStack_exports, {
    default: () => ds_AlertStack_default
  });
  init_define_import_meta_env();
  __reExport(ds_AlertStack_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_AlertStack_default = g2["AlertStack"] !== void 0 ? g2["AlertStack"] : g2;

  // src/components/AlertStack/AlertStack.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Compositions/AlertStack",
    component: ds_AlertStack_exports.AlertStack,
    tags: ["autodocs"],
    parameters: {
      layout: "padded",
      // "Show code" shows the JSX a story renders, not the story object: the
      // play functions are this package's tests, not usage to copy.
      docs: { source: { type: "dynamic" } }
    },
    args: { children: null },
    argTypes: { children: { control: false } }
  };
  var AlertStack_stories_default = meta;
  var BLOCKED = "Sales is unavailable to its members";
  var RESTORED = "Marketing is available again";
  var TRIAL = "Your trial ends in 3 days";
  var blocked = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_Alert_exports.Alert,
    {
      variant: "warning",
      size: "md",
      title: BLOCKED,
      description: "Your plan no longer includes Workspaces. Nothing was deleted."
    },
    "b"
  );
  var restored = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_Alert_exports.Alert,
    {
      variant: "success",
      size: "md",
      title: RESTORED,
      description: "Everything is where it was — its connections, metrics and files."
    },
    "r"
  );
  var trial = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_Alert_exports.Alert,
    {
      variant: "info",
      size: "md",
      title: TRIAL,
      description: "After that, Sales becomes unavailable to members until you choose Pro."
    },
    "t"
  );
  var error = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_Alert_exports.Alert,
    {
      variant: "error",
      size: "md",
      title: "Payment failed",
      description: "Update your card to keep Pro features in Sales."
    },
    "e"
  );
  var neutral = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_Alert_exports.Alert,
    {
      variant: "neutral",
      size: "md",
      title: "Scheduled maintenance",
      description: "Connections may be slow on Sunday from 02:00 to 03:00 UTC."
    },
    "n"
  );
  var NOTICES = [blocked, restored, trial, error, neutral];
  var Playground = {
    args: { count: 3, open: false, lessLabel: "Show Less" },
    argTypes: {
      count: { control: { type: "range", min: 1, max: NOTICES.length } },
      open: { control: "boolean" },
      lessLabel: { control: "text" },
      defaultOpen: { table: { disable: true } },
      moreLabel: { table: { disable: true } },
      onOpenChange: { table: { disable: true } }
    },
    render: function Render({ count, ...args }) {
      const [, updateArgs] = (0, import_preview_api.useArgs)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_AlertStack_exports.AlertStack, { ...args, onOpenChange: (open) => updateArgs({ open }), children: NOTICES.slice(0, count) });
    }
  };
  var ukPlural = new Intl.PluralRules("uk");
  var ukMoreLabel = (count) => `Показати ще ${count} ${ukPlural.select(count) === "many" ? "сповіщень" : "сповіщення"}`;
  var CustomLabels = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_AlertStack_exports.AlertStack, { moreLabel: ukMoreLabel, lessLabel: "Згорнути", children: [blocked, restored, trial] }),
    play: async ({ canvas, userEvent }) => {
      await userEvent.click(
        canvas.getByRole("button", { name: "Показати ще 2 сповіщення" })
      );
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Згорнути" })
      ).toHaveFocus();
    }
  };
  var Two = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_AlertStack_exports.AlertStack, { children: [blocked, restored] }),
    play: async ({ canvas }) => {
      const edge = canvas.getByRole("button", { name: "Show 1 more notice" });
      await (0, import_test.expect)(edge).toHaveAttribute("aria-expanded", "false");
      await (0, import_test.expect)(edge.className).toContain("bg-alert-bg-success");
      await (0, import_test.expect)(canvas.queryByText(RESTORED)).not.toBeInTheDocument();
    }
  };
  var Three = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_AlertStack_exports.AlertStack, { children: [blocked, restored, trial] }),
    play: async ({ canvas, userEvent }) => {
      const notice = canvas.getByText(BLOCKED).closest('[role="status"]');
      const edge = canvas.getByRole("button", { name: "Show 2 more notices" });
      await (0, import_test.expect)(edge.getBoundingClientRect().bottom).toBeGreaterThan(
        (notice?.getBoundingClientRect().bottom ?? 0) + 4
      );
      await (0, import_test.expect)(edge.className).toContain("bg-alert-bg-success");
      await (0, import_test.expect)(canvas.queryByText(TRIAL)).not.toBeInTheDocument();
      await userEvent.click(edge);
      await (0, import_test.expect)(canvas.getByText(RESTORED)).toBeVisible();
      await (0, import_test.expect)(canvas.getByText(TRIAL)).toBeVisible();
      const less = canvas.getByRole("button", { name: "Show Less" });
      await (0, import_test.expect)(less).toHaveFocus();
      await userEvent.click(less);
      await (0, import_test.expect)(canvas.queryByText(TRIAL)).not.toBeInTheDocument();
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Show 2 more notices" })
      ).toHaveFocus();
    }
  };
  var KeepsScroll = {
    tags: ["!autodocs"],
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: "calc(100vh - 140px)" } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_AlertStack_exports.AlertStack, { children: [blocked, restored, trial] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: "150vh" } })
    ] }),
    play: async ({ canvas, userEvent }) => {
      const page = document.scrollingElement;
      const before = page.scrollTop;
      await userEvent.click(
        canvas.getByRole("button", { name: "Show 2 more notices" })
      );
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Show Less" })
      ).toHaveFocus();
      await (0, import_test.expect)(page.scrollTop).toBe(before);
      await userEvent.keyboard("{Enter}");
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Show 2 more notices" })
      ).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Show Less" })
      ).toHaveFocus();
      await (0, import_test.expect)(page.scrollTop).toBe(before);
    }
  };
  var Keyboard = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_AlertStack_exports.AlertStack, { children: [blocked, restored, trial] }),
    play: async ({ canvas, userEvent }) => {
      await userEvent.tab();
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Show 2 more notices" })
      ).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Show Less" })
      ).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await (0, import_test.expect)(
        canvas.getByRole("button", { name: "Show 2 more notices" })
      ).toHaveFocus();
    }
  };
  var Open = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_AlertStack_exports.AlertStack, { defaultOpen: true, children: [blocked, restored, trial] }),
    play: async ({ canvas }) => {
      await (0, import_test.expect)(canvas.getAllByRole("status")).toHaveLength(3);
      const less = canvas.getByRole("button", { name: "Show Less" });
      await (0, import_test.expect)(less).toHaveAttribute("aria-expanded", "true");
      await (0, import_test.expect)(less).not.toHaveFocus();
    }
  };
  var Single = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_AlertStack_exports.AlertStack, { children: [blocked] }),
    play: async ({ canvas }) => {
      await (0, import_test.expect)(canvas.getByText(BLOCKED)).toBeVisible();
      await (0, import_test.expect)(canvas.queryByRole("button")).not.toBeInTheDocument();
    }
  };
  var WorkspaceTrialAlert = ({ variant }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_Alert_exports.Alert,
    {
      variant,
      size: "md",
      title: TRIAL,
      description: "After that, Sales becomes unavailable to members until you choose Pro."
    }
  );
  var WrappedNotices = {
    name: "Wrapped notices",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_AlertStack_exports.AlertStack, { children: [
      blocked,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceTrialAlert, { variant: "info" })
    ] }),
    play: async ({ canvas }) => {
      const edge = canvas.getByRole("button", { name: "Show 1 more notice" });
      await (0, import_test.expect)(edge.className).toContain("bg-alert-bg-info");
      await (0, import_test.expect)((0, import_test.within)(edge).queryByText(TRIAL)).not.toBeInTheDocument();
    }
  };

  // .design-sync/.cache/previews/AlertStack.tsx
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
  var Playground2 = (
    /* Playground */
    compose(AlertStack_stories_exports, "Playground")
  );
  var CustomLabels2 = (
    /* Custom Labels */
    compose(AlertStack_stories_exports, "CustomLabels")
  );
  var Two2 = (
    /* Two */
    compose(AlertStack_stories_exports, "Two")
  );
  var Three2 = (
    /* Three */
    compose(AlertStack_stories_exports, "Three")
  );
  var KeepsScroll2 = (
    /* Keeps Scroll */
    compose(AlertStack_stories_exports, "KeepsScroll")
  );
  var Keyboard2 = (
    /* Keyboard */
    compose(AlertStack_stories_exports, "Keyboard")
  );
  var Open2 = (
    /* Open */
    compose(AlertStack_stories_exports, "Open")
  );
  var Single2 = (
    /* Single */
    compose(AlertStack_stories_exports, "Single")
  );
  var WrappedNotices2 = (
    /* Wrapped notices */
    compose(AlertStack_stories_exports, "WrappedNotices")
  );
  return __toCommonJS(AlertStack_exports);
})();
