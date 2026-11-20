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
      function jsx3(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs2(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx3;
      module.exports.jsxs = jsxs2;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs2 : jsx3)(t, p, k);
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

  // .design-sync/.cache/previews/ResizablePanelGroup.tsx
  var ResizablePanelGroup_exports = {};
  __export(ResizablePanelGroup_exports, {
    Horizontal: () => Horizontal2,
    ThreePanels: () => ThreePanels2,
    Vertical: () => Vertical2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Resizable/Resizable.stories.tsx
  var Resizable_stories_exports = {};
  __export(Resizable_stories_exports, {
    Horizontal: () => Horizontal,
    ThreePanels: () => ThreePanels,
    Vertical: () => Vertical,
    default: () => Resizable_stories_default
  });
  init_define_import_meta_env();

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Typography_default = g["Typography"] !== void 0 ? g["Typography"] : g;

  // src/components/Resizable/index.tsx
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/grip-vertical.js
  init_define_import_meta_env();
  var __iconNode = [
    ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
    ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
    ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
    ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
    ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
    ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
  ];
  var GripVertical = createLucideIcon("grip-vertical", __iconNode);

  // node_modules/.pnpm/react-resizable-panels@4.12_b08b154533ad610ac48f3061ea37aed7/node_modules/react-resizable-panels/dist/react-resizable-panels.js
  init_define_import_meta_env();
  var import_jsx_runtime = __toESM(require_react_shim());
  var import_react3 = __toESM(require_react_shim());
  function St(e, t) {
    const n = getComputedStyle(e), o = parseFloat(n.fontSize);
    return t * o;
  }
  function vt(e, t) {
    const n = getComputedStyle(e.ownerDocument.documentElement), o = parseFloat(n.fontSize);
    return t * o;
  }
  function bt(e) {
    return e / 100 * window.innerHeight;
  }
  function zt(e) {
    return e / 100 * window.innerWidth;
  }
  function xt(e) {
    switch (typeof e) {
      case "number":
        return [e, "px"];
      case "string": {
        const t = parseFloat(e);
        return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
      }
    }
  }
  function oe({
    groupSize: e,
    panelElement: t,
    styleProp: n
  }) {
    let o;
    const [i, s] = xt(n);
    switch (s) {
      case "%": {
        o = i / 100 * e;
        break;
      }
      case "px": {
        o = i;
        break;
      }
      case "rem": {
        o = vt(t, i);
        break;
      }
      case "em": {
        o = St(t, i);
        break;
      }
      case "vh": {
        o = bt(i);
        break;
      }
      case "vw": {
        o = zt(i);
        break;
      }
    }
    return o;
  }
  function T(e) {
    return parseFloat(e.toFixed(3));
  }
  function ne({
    group: e
  }) {
    const { orientation: t, panels: n } = e;
    return n.reduce((o, i) => (o += t === "horizontal" ? i.element.offsetWidth : i.element.offsetHeight, o), 0);
  }
  function be(e) {
    const { panels: t } = e, n = ne({ group: e });
    return n === 0 ? t.map((o) => ({
      groupResizeBehavior: o.panelConstraints.groupResizeBehavior,
      collapsedSize: 0,
      collapsible: o.panelConstraints.collapsible === true,
      defaultSize: void 0,
      disabled: o.panelConstraints.disabled,
      minSize: 0,
      maxSize: 100,
      panelId: o.id
    })) : t.map((o) => {
      const { element: i, panelConstraints: s } = o;
      let u = 0;
      if (s.collapsedSize !== void 0) {
        const c = oe({
          groupSize: n,
          panelElement: i,
          styleProp: s.collapsedSize
        });
        u = T(c / n * 100);
      }
      let a;
      if (s.defaultSize !== void 0) {
        const c = oe({
          groupSize: n,
          panelElement: i,
          styleProp: s.defaultSize
        });
        a = T(c / n * 100);
      }
      let r2 = 0;
      if (s.minSize !== void 0) {
        const c = oe({
          groupSize: n,
          panelElement: i,
          styleProp: s.minSize
        });
        r2 = T(c / n * 100);
      }
      let l = 100;
      if (s.maxSize !== void 0) {
        const c = oe({
          groupSize: n,
          panelElement: i,
          styleProp: s.maxSize
        });
        l = T(c / n * 100);
      }
      return {
        groupResizeBehavior: s.groupResizeBehavior,
        collapsedSize: u,
        collapsible: s.collapsible === true,
        defaultSize: a,
        disabled: s.disabled,
        minSize: r2,
        maxSize: l,
        panelId: o.id
      };
    });
  }
  function C(e, t = "Assertion error") {
    if (!e)
      throw Error(t);
  }
  function ze(e, t) {
    return Array.from(t).sort(
      e === "horizontal" ? Pt : wt
    );
  }
  function Pt(e, t) {
    const n = e.element.offsetLeft - t.element.offsetLeft;
    return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
  }
  function wt(e, t) {
    const n = e.element.offsetTop - t.element.offsetTop;
    return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
  }
  function Ye(e) {
    return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
  }
  function Je(e, t) {
    return {
      x: e.x >= t.left && e.x <= t.right ? 0 : Math.min(
        Math.abs(e.x - t.left),
        Math.abs(e.x - t.right)
      ),
      y: e.y >= t.top && e.y <= t.bottom ? 0 : Math.min(
        Math.abs(e.y - t.top),
        Math.abs(e.y - t.bottom)
      )
    };
  }
  function Lt({
    orientation: e,
    rects: t,
    targetRect: n
  }) {
    const o = {
      x: n.x + n.width / 2,
      y: n.y + n.height / 2
    };
    let i, s = Number.MAX_VALUE;
    for (const u of t) {
      const { x: a, y: r2 } = Je(o, u), l = e === "horizontal" ? a : r2;
      l < s && (s = l, i = u);
    }
    return C(i, "No rect found"), i;
  }
  var de;
  function Ct() {
    return de === void 0 && (typeof matchMedia == "function" ? de = !!matchMedia("(pointer:coarse)").matches : de = false), de;
  }
  function Ze(e) {
    const { element: t, orientation: n, panels: o, separators: i } = e, s = ze(
      n,
      Array.from(t.children).filter(Ye).map((z) => ({ element: z }))
    ).map(({ element: z }) => z), u = [];
    let a = false, r2 = false, l = -1, c = -1, m = 0, p, S = [];
    {
      let z = -1;
      for (const f of s)
        f.hasAttribute("data-panel") && (z++, f.hasAttribute("data-disabled") || (m++, l === -1 && (l = z), c = z));
    }
    if (m > 1) {
      let z = -1;
      for (const f of s)
        if (f.hasAttribute("data-panel")) {
          z++;
          const d = o.find(
            (h) => h.element === f
          );
          if (d) {
            if (p) {
              const h = p.element.getBoundingClientRect(), y = f.getBoundingClientRect();
              let b;
              if (r2) {
                const v = n === "horizontal" ? new DOMRect(
                  h.right,
                  h.top,
                  0,
                  h.height
                ) : new DOMRect(
                  h.left,
                  h.bottom,
                  h.width,
                  0
                ), g2 = n === "horizontal" ? new DOMRect(y.left, y.top, 0, y.height) : new DOMRect(y.left, y.top, y.width, 0);
                switch (S.length) {
                  case 0: {
                    b = [
                      v,
                      g2
                    ];
                    break;
                  }
                  case 1: {
                    const w = S[0], E = Lt({
                      orientation: n,
                      rects: [h, y],
                      targetRect: w.element.getBoundingClientRect()
                    });
                    b = [
                      w,
                      E === h ? g2 : v
                    ];
                    break;
                  }
                  default: {
                    b = S;
                    break;
                  }
                }
              } else
                S.length ? b = S : b = [
                  n === "horizontal" ? new DOMRect(
                    h.right,
                    y.top,
                    y.left - h.right,
                    y.height
                  ) : new DOMRect(
                    y.left,
                    h.bottom,
                    y.width,
                    y.top - h.bottom
                  )
                ];
              for (const v of b) {
                let g2 = "width" in v ? v : v.element.getBoundingClientRect();
                const w = Ct() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
                if (g2.width < w) {
                  const L = w - g2.width;
                  g2 = new DOMRect(
                    g2.x - L / 2,
                    g2.y,
                    g2.width + L,
                    g2.height
                  );
                }
                if (g2.height < w) {
                  const L = w - g2.height;
                  g2 = new DOMRect(
                    g2.x,
                    g2.y - L / 2,
                    g2.width,
                    g2.height + L
                  );
                }
                const E = z <= l || z > c;
                !a && !E && u.push({
                  group: e,
                  groupSize: ne({ group: e }),
                  panels: [p, d],
                  separator: "width" in v ? void 0 : v,
                  rect: g2
                }), a = false;
              }
            }
            r2 = false, p = d, S = [];
          }
        } else if (f.hasAttribute("data-separator")) {
          f.ariaDisabled !== null && (a = true);
          const d = i.find(
            (h) => h.element === f
          );
          d ? S.push(d) : (p = void 0, S = []);
        } else
          r2 = true;
    }
    return u;
  }
  var Qe = class {
    #e = {};
    addListener(t, n) {
      const o = this.#e[t];
      return o === void 0 ? this.#e[t] = [n] : o.includes(n) || o.push(n), () => {
        this.removeListener(t, n);
      };
    }
    emit(t, n) {
      const o = this.#e[t];
      if (o !== void 0)
        if (o.length === 1)
          o[0].call(null, n);
        else {
          let i = false, s = null;
          const u = Array.from(o);
          for (let a = 0; a < u.length; a++) {
            const r2 = u[a];
            try {
              r2.call(null, n);
            } catch (l) {
              s === null && (i = true, s = l);
            }
          }
          if (i)
            throw s;
        }
    }
    removeAllListeners() {
      this.#e = {};
    }
    removeListener(t, n) {
      const o = this.#e[t];
      if (o !== void 0) {
        const i = o.indexOf(n);
        i >= 0 && o.splice(i, 1);
      }
    }
  };
  var ee = {
    cursorFlags: 0,
    state: "inactive"
  };
  var xe = new Qe();
  function W() {
    return ee;
  }
  function Rt(e) {
    return xe.addListener("change", e);
  }
  function Et(e) {
    const t = ee, n = { ...ee };
    n.cursorFlags = e, ee = n, xe.emit("change", {
      prev: t,
      next: n
    });
  }
  function te(e) {
    const t = ee;
    ee = e, xe.emit("change", {
      prev: t,
      next: e
    });
  }
  var Mt = (e) => e;
  var Se = () => {
  };
  var et = 1;
  var tt = 2;
  var nt = 4;
  var ot = 8;
  var Ie = 3;
  var ke = 12;
  var pe;
  function De() {
    return pe === void 0 && (pe = false, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (pe = true)), pe;
  }
  function It({
    cursorFlags: e,
    groups: t,
    state: n
  }) {
    let o = 0, i = 0;
    switch (n) {
      case "active":
      case "hover":
        t.forEach((s) => {
          if (!s.mutableState.disableCursor)
            switch (s.orientation) {
              case "horizontal": {
                o++;
                break;
              }
              case "vertical": {
                i++;
                break;
              }
            }
        });
    }
    if (!(o === 0 && i === 0)) {
      switch (n) {
        case "active": {
          if (e && De()) {
            const s = (e & et) !== 0, u = (e & tt) !== 0, a = (e & nt) !== 0, r2 = (e & ot) !== 0;
            if (s)
              return a ? "se-resize" : r2 ? "ne-resize" : "e-resize";
            if (u)
              return a ? "sw-resize" : r2 ? "nw-resize" : "w-resize";
            if (a)
              return "s-resize";
            if (r2)
              return "n-resize";
          }
          break;
        }
      }
      return De() ? o > 0 && i > 0 ? "move" : o > 0 ? "ew-resize" : "ns-resize" : o > 0 && i > 0 ? "grab" : o > 0 ? "col-resize" : "row-resize";
    }
  }
  var Te = /* @__PURE__ */ new WeakMap();
  function Pe(e) {
    if (!e.defaultView || !e.adoptedStyleSheets)
      return;
    let { prevStyle: t, styleSheet: n } = Te.get(e) ?? {};
    n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
      ...e.adoptedStyleSheets,
      n
    ]));
    const o = W();
    switch (o.state) {
      case "active":
      case "hover": {
        const i = It({
          cursorFlags: o.cursorFlags,
          groups: o.hitRegions.map((u) => u.group),
          state: o.state
        }), s = `*, *:hover {cursor: ${i} !important; }`;
        if (t === s)
          return;
        t = s, i ? n.cssRules.length === 0 ? n.insertRule(s) : n.replaceSync(s) : n.cssRules.length === 1 && n.deleteRule(0);
        break;
      }
      case "inactive": {
        t = void 0, n.cssRules.length === 1 && n.deleteRule(0);
        break;
      }
    }
    Te.set(e, {
      prevStyle: t,
      styleSheet: n
    });
  }
  var F = /* @__PURE__ */ new Map();
  var it = new Qe();
  function kt(e) {
    F = new Map(F), F.delete(e);
  }
  function Oe(e, t) {
    for (const [n] of F)
      if (n.id === e)
        return n;
  }
  function H(e, t) {
    for (const [n, o] of F)
      if (n.id === e)
        return o;
    if (t)
      throw Error(`Could not find data for Group with id ${e}`);
  }
  function V() {
    return F;
  }
  function we(e, t) {
    return it.addListener("groupChange", (n) => {
      n.group.id === e && t(n);
    });
  }
  function j(e, t, n) {
    const o = F.get(e);
    F = new Map(F), F.set(e, t), it.emit("groupChange", {
      group: e,
      isUserInteraction: n?.isUserInteraction === true,
      prev: o,
      next: t
    });
  }
  function rt(e) {
    const t = W(), n = V();
    let o = false;
    switch (t.state) {
      case "active":
        te({
          cursorFlags: 0,
          state: "inactive"
        }), t.hitRegions.length > 0 && (Pe(e), o = true, t.hitRegions.forEach((i) => {
          if (!n.has(i.group))
            return;
          const s = H(i.group.id, true);
          j(i.group, s, {
            isUserInteraction: true
          });
        }));
    }
    return o;
  }
  function Ge(e) {
    e.defaultPrevented || rt(e.currentTarget);
  }
  function Dt(e, t, n) {
    let o, i = {
      x: 1 / 0,
      y: 1 / 0
    };
    for (const s of t) {
      const u = Je(n, s.rect);
      switch (e) {
        case "horizontal": {
          u.x <= i.x && (o = s, i = u);
          break;
        }
        case "vertical": {
          u.y <= i.y && (o = s, i = u);
          break;
        }
      }
    }
    return o ? {
      distance: i,
      hitRegion: o
    } : void 0;
  }
  function Tt(e) {
    return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  function Ot(e, t) {
    if (e === t) throw new Error("Cannot compare node with itself");
    const n = {
      a: Ne(e),
      b: Ne(t)
    };
    let o;
    for (; n.a.at(-1) === n.b.at(-1); )
      o = n.a.pop(), n.b.pop();
    C(
      o,
      "Stacking order can only be calculated for elements with a common ancestor"
    );
    const i = {
      a: Fe(Ae(n.a)),
      b: Fe(Ae(n.b))
    };
    if (i.a === i.b) {
      const s = o.childNodes, u = {
        a: n.a.at(-1),
        b: n.b.at(-1)
      };
      let a = s.length;
      for (; a--; ) {
        const r2 = s[a];
        if (r2 === u.a) return 1;
        if (r2 === u.b) return -1;
      }
    }
    return Math.sign(i.a - i.b);
  }
  var Gt = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
  function At(e) {
    const t = getComputedStyle(st(e) ?? e).display;
    return t === "flex" || t === "inline-flex";
  }
  function Ft(e) {
    const t = getComputedStyle(e);
    return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || At(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || Gt.test(t.willChange) || t.webkitOverflowScrolling === "touch");
  }
  function Ae(e) {
    let t = e.length;
    for (; t--; ) {
      const n = e[t];
      if (C(n, "Missing node"), Ft(n)) return n;
    }
    return null;
  }
  function Fe(e) {
    return e && Number(getComputedStyle(e).zIndex) || 0;
  }
  function Ne(e) {
    const t = [];
    for (; e; )
      t.push(e), e = st(e);
    return t;
  }
  function st(e) {
    const { parentNode: t } = e;
    return Tt(t) ? t.host : t;
  }
  function Nt(e, t) {
    return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
  }
  function _t({
    groupElement: e,
    hitRegion: t,
    pointerEventTarget: n
  }) {
    if (!Ye(n) || n.contains(e) || e.contains(n))
      return true;
    if (Ot(n, e) > 0) {
      let o = n;
      for (; o; ) {
        if (o.contains(e))
          return true;
        if (Nt(o.getBoundingClientRect(), t))
          return false;
        o = o.parentElement;
      }
    }
    return true;
  }
  function Le(e, t) {
    const n = [];
    return t.forEach((o, i) => {
      if (i.disabled)
        return;
      const s = Ze(i), u = Dt(i.orientation, s, {
        x: e.clientX,
        y: e.clientY
      });
      u && u.distance.x <= 0 && u.distance.y <= 0 && _t({
        groupElement: i.element,
        hitRegion: u.hitRegion.rect,
        pointerEventTarget: e.target
      }) && n.push(u.hitRegion);
    }), n;
  }
  function $t(e, t) {
    if (e.length !== t.length)
      return false;
    for (let n = 0; n < e.length; n++)
      if (e[n] != t[n])
        return false;
    return true;
  }
  function D(e, t, n = 0) {
    return Math.abs(T(e) - T(t)) <= n;
  }
  function A(e, t) {
    return D(e, t) ? 0 : e > t ? 1 : -1;
  }
  function Z({
    overrideDisabledPanels: e,
    panelConstraints: t,
    prevSize: n,
    size: o
  }) {
    const {
      collapsedSize: i = 0,
      collapsible: s,
      disabled: u,
      maxSize: a = 100,
      minSize: r2 = 0
    } = t;
    if (u && !e)
      return n;
    if (A(o, r2) < 0)
      if (s) {
        const l = (i + r2) / 2;
        A(o, l) < 0 ? o = i : o = r2;
      } else
        o = r2;
    return o = Math.min(a, o), o = T(o), o;
  }
  function ae({
    delta: e,
    initialLayout: t,
    panelConstraints: n,
    pivotIndices: o,
    prevLayout: i,
    trigger: s
  }) {
    if (D(e, 0))
      return t;
    const u = s === "imperative-api", a = Object.values(t), r2 = Object.values(i), l = [...a], [c, m] = o;
    C(c != null, "Invalid first pivot index"), C(m != null, "Invalid second pivot index");
    let p = 0;
    switch (s) {
      case "keyboard": {
        {
          const f = e < 0 ? m : c, d = n[f];
          C(
            d,
            `Panel constraints not found for index ${f}`
          );
          const {
            collapsedSize: h = 0,
            collapsible: y,
            minSize: b = 0
          } = d;
          if (y) {
            const v = a[f];
            if (C(
              v != null,
              `Previous layout not found for panel index ${f}`
            ), D(v, h)) {
              const g2 = b - v;
              A(g2, Math.abs(e)) > 0 && (e = e < 0 ? 0 - g2 : g2);
            }
          }
        }
        {
          const f = e < 0 ? c : m, d = n[f];
          C(
            d,
            `No panel constraints found for index ${f}`
          );
          const {
            collapsedSize: h = 0,
            collapsible: y,
            minSize: b = 0
          } = d;
          if (y) {
            const v = a[f];
            if (C(
              v != null,
              `Previous layout not found for panel index ${f}`
            ), D(v, b)) {
              const g2 = v - h;
              A(g2, Math.abs(e)) > 0 && (e = e < 0 ? 0 - g2 : g2);
            }
          }
        }
        break;
      }
      default: {
        const f = e < 0 ? m : c, d = n[f];
        C(
          d,
          `Panel constraints not found for index ${f}`
        );
        const h = a[f], { collapsible: y, collapsedSize: b, minSize: v } = d;
        if (y && A(h, v) < 0)
          if (e > 0) {
            const g2 = v - b, w = g2 / 2, E = h + e;
            A(E, v) < 0 && (e = A(e, w) <= 0 ? 0 : g2);
          } else {
            const g2 = v - b, w = 100 - g2 / 2, E = h - e;
            A(E, v) < 0 && (e = A(100 + e, w) > 0 ? 0 : -g2);
          }
        break;
      }
    }
    {
      const f = e < 0 ? 1 : -1;
      let d = e < 0 ? m : c, h = 0;
      for (; ; ) {
        const b = a[d];
        C(
          b != null,
          `Previous layout not found for panel index ${d}`
        );
        const g2 = Z({
          overrideDisabledPanels: u,
          panelConstraints: n[d],
          prevSize: b,
          size: 100
        }) - b;
        if (h += g2, d += f, d < 0 || d >= n.length)
          break;
      }
      const y = Math.min(Math.abs(e), Math.abs(h));
      e = e < 0 ? 0 - y : y;
    }
    {
      let d = e < 0 ? c : m;
      for (; d >= 0 && d < n.length; ) {
        const h = Math.abs(e) - Math.abs(p), y = a[d];
        C(
          y != null,
          `Previous layout not found for panel index ${d}`
        );
        const b = y - h, v = Z({
          overrideDisabledPanels: u,
          panelConstraints: n[d],
          prevSize: y,
          size: b
        });
        if (!D(y, v) && (p += y - v, l[d] = v, p.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
          numeric: true
        }) >= 0))
          break;
        e < 0 ? d-- : d++;
      }
    }
    if ($t(r2, l))
      return i;
    {
      const f = e < 0 ? m : c, d = a[f];
      C(
        d != null,
        `Previous layout not found for panel index ${f}`
      );
      const h = d + p, y = Z({
        overrideDisabledPanels: u,
        panelConstraints: n[f],
        prevSize: d,
        size: h
      });
      if (l[f] = y, !D(y, h)) {
        let b = h - y, g2 = e < 0 ? m : c;
        for (; g2 >= 0 && g2 < n.length; ) {
          const w = l[g2];
          C(
            w != null,
            `Previous layout not found for panel index ${g2}`
          );
          const E = w + b, L = Z({
            overrideDisabledPanels: u,
            panelConstraints: n[g2],
            prevSize: w,
            size: E
          });
          if (D(w, L) || (b -= L - w, l[g2] = L), D(b, 0))
            break;
          e > 0 ? g2-- : g2++;
        }
      }
    }
    const S = Object.values(l).reduce(
      (f, d) => d + f,
      0
    );
    if (!D(S, 100, 0.1))
      return i;
    const z = Object.keys(i);
    return l.reduce((f, d, h) => (f[z[h]] = d, f), {});
  }
  function K(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
      return false;
    for (const n in e)
      if (t[n] === void 0 || A(e[n], t[n]) !== 0)
        return false;
    return true;
  }
  function X({
    layout: e,
    panelConstraints: t
  }) {
    const n = Object.values(e), o = [...n], i = o.reduce(
      (a, r2) => a + r2,
      0
    );
    if (o.length !== t.length)
      throw Error(
        `Invalid ${t.length} panel layout: ${o.map((a) => `${a}%`).join(", ")}`
      );
    if (!D(i, 100) && o.length > 0)
      for (let a = 0; a < t.length; a++) {
        const r2 = o[a];
        C(r2 != null, `No layout data found for index ${a}`);
        const l = 100 / i * r2;
        o[a] = l;
      }
    let s = 0;
    for (let a = 0; a < t.length; a++) {
      const r2 = n[a];
      C(r2 != null, `No layout data found for index ${a}`);
      const l = o[a];
      C(l != null, `No layout data found for index ${a}`);
      const c = Z({
        overrideDisabledPanels: true,
        panelConstraints: t[a],
        prevSize: r2,
        size: l
      });
      l != c && (s += l - c, o[a] = c);
    }
    if (!D(s, 0))
      for (let a = 0; a < t.length; a++) {
        const r2 = o[a];
        C(r2 != null, `No layout data found for index ${a}`);
        const l = r2 + s, c = Z({
          overrideDisabledPanels: true,
          panelConstraints: t[a],
          prevSize: r2,
          size: l
        });
        if (r2 !== c && (s -= c - r2, o[a] = c, D(s, 0)))
          break;
      }
    const u = Object.keys(e);
    return o.reduce((a, r2, l) => (a[u[l]] = r2, a), {});
  }
  function at({
    groupId: e,
    panelId: t
  }) {
    const n = () => {
      const r2 = V();
      for (const [
        l,
        {
          defaultLayoutDeferred: c,
          derivedPanelConstraints: m,
          layout: p,
          groupSize: S,
          separatorToPanels: z
        }
      ] of r2)
        if (l.id === e)
          return {
            defaultLayoutDeferred: c,
            derivedPanelConstraints: m,
            group: l,
            groupSize: S,
            layout: p,
            separatorToPanels: z
          };
      throw Error(`Group ${e} not found`);
    }, o = () => {
      const r2 = n().derivedPanelConstraints.find(
        (l) => l.panelId === t
      );
      if (r2 !== void 0)
        return r2;
      throw Error(`Panel constraints not found for Panel ${t}`);
    }, i = () => {
      const r2 = n().group.panels.find((l) => l.id === t);
      if (r2 !== void 0)
        return r2;
      throw Error(`Layout not found for Panel ${t}`);
    }, s = () => {
      const r2 = n().layout[t];
      if (r2 !== void 0)
        return r2;
      throw Error(`Layout not found for Panel ${t}`);
    }, u = ({
      nextSize: r2,
      panels: l,
      prevLayout: c,
      derivedPanelConstraints: m
    }) => {
      const p = s(), S = l.findIndex((h) => h.id === t), z = S === 0, f = S === l.length - 1;
      if (f && r2 < p && (z || l.slice(0, S).every((h, y) => {
        const b = m[y];
        return b?.collapsible && D(b.collapsedSize, c[b.panelId]);
      }))) {
        const h = l.slice(0, S).reduce((y, b) => y + c[b.id], 0);
        return {
          ...c,
          [t]: T(100 - h)
        };
      }
      return ae({
        delta: f ? p - r2 : r2 - p,
        initialLayout: c,
        panelConstraints: m,
        pivotIndices: f ? [S - 1, S] : [S, S + 1],
        prevLayout: c,
        trigger: "imperative-api"
      });
    }, a = (r2) => {
      const l = s();
      if (r2 === l)
        return;
      const {
        defaultLayoutDeferred: c,
        derivedPanelConstraints: m,
        group: p,
        groupSize: S,
        layout: z,
        separatorToPanels: f
      } = n(), d = u({
        nextSize: r2,
        panels: p.panels,
        prevLayout: z,
        derivedPanelConstraints: m
      }), h = X({
        layout: d,
        panelConstraints: m
      });
      K(z, h) || j(p, {
        defaultLayoutDeferred: c,
        derivedPanelConstraints: m,
        groupSize: S,
        layout: h,
        separatorToPanels: f
      });
    };
    return {
      collapse: () => {
        const { collapsible: r2, collapsedSize: l } = o(), { mutableValues: c } = i(), m = s();
        r2 && m !== l && (c.expandToSize = m, a(l));
      },
      expand: () => {
        const { collapsible: r2, collapsedSize: l, minSize: c } = o(), { mutableValues: m } = i(), p = s();
        if (r2 && p === l) {
          let S = m.expandToSize ?? c;
          S === 0 && (S = 1), a(S);
        }
      },
      getSize: () => {
        const { group: r2 } = n(), l = s(), { element: c } = i(), m = r2.orientation === "horizontal" ? c.offsetWidth : c.offsetHeight;
        return {
          asPercentage: l,
          inPixels: m
        };
      },
      isCollapsed: () => {
        const { collapsible: r2, collapsedSize: l } = o(), c = s();
        return r2 && D(l, c);
      },
      resize: (r2) => {
        const { group: l } = n(), { element: c } = i(), m = ne({ group: l }), p = oe({
          groupSize: m,
          panelElement: c,
          styleProp: r2
        }), S = T(p / m * 100);
        a(S);
      }
    };
  }
  function _e(e) {
    if (e.defaultPrevented)
      return;
    const t = V();
    Le(e, t).forEach((o) => {
      if (o.separator && !o.separator.disableDoubleClick) {
        const i = o.panels.find(
          (s) => s.panelConstraints.defaultSize !== void 0
        );
        if (i) {
          const s = i.panelConstraints.defaultSize, u = at({
            groupId: o.group.id,
            panelId: i.id
          });
          u && s !== void 0 && (u.resize(s), e.preventDefault());
        }
      }
    });
  }
  function he(e) {
    const t = V();
    for (const [n] of t)
      if (n.separators.some(
        (o) => o.element === e
      ))
        return n;
    throw Error("Could not find parent Group for separator element");
  }
  function lt({
    groupId: e
  }) {
    const t = () => {
      const n = V();
      for (const [o, i] of n)
        if (o.id === e)
          return { group: o, ...i };
      throw Error(`Could not find Group with id "${e}"`);
    };
    return {
      getLayout() {
        const { defaultLayoutDeferred: n, layout: o } = t();
        return n ? {} : o;
      },
      setLayout(n) {
        const {
          defaultLayoutDeferred: o,
          derivedPanelConstraints: i,
          group: s,
          groupSize: u,
          layout: a,
          separatorToPanels: r2
        } = t(), l = X({
          layout: n,
          panelConstraints: i
        });
        return o ? a : (K(a, l) || j(s, {
          defaultLayoutDeferred: o,
          derivedPanelConstraints: i,
          groupSize: u,
          layout: l,
          separatorToPanels: r2
        }), l);
      }
    };
  }
  function B(e, t) {
    const n = he(e), o = H(n.id, true), i = n.separators.find(
      (m) => m.element === e
    );
    C(i, "Matching separator not found");
    const s = o.separatorToPanels.get(i);
    C(s, "Matching panels not found");
    const u = s.map((m) => n.panels.indexOf(m)), r2 = lt({ groupId: n.id }).getLayout(), l = ae({
      delta: t,
      initialLayout: r2,
      panelConstraints: o.derivedPanelConstraints,
      pivotIndices: u,
      prevLayout: r2,
      trigger: "keyboard"
    }), c = X({
      layout: l,
      panelConstraints: o.derivedPanelConstraints
    });
    K(r2, c) || j(
      n,
      {
        defaultLayoutDeferred: o.defaultLayoutDeferred,
        derivedPanelConstraints: o.derivedPanelConstraints,
        groupSize: o.groupSize,
        layout: c,
        separatorToPanels: o.separatorToPanels
      },
      // Keyboard resizes (arrow keys, Home/End, Enter collapse/expand) originate
      // from a real DOM event on the separator, so they are user interactions
      // just like pointer drags. This function is only reached from
      // onDocumentKeyDown. See #716.
      { isUserInteraction: true }
    );
  }
  function $e(e) {
    if (e.defaultPrevented)
      return;
    const t = e.currentTarget, n = he(t);
    if (!n.disabled)
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault(), n.orientation === "vertical" && B(t, 5);
          break;
        }
        case "ArrowLeft": {
          e.preventDefault(), n.orientation === "horizontal" && B(t, -5);
          break;
        }
        case "ArrowRight": {
          e.preventDefault(), n.orientation === "horizontal" && B(t, 5);
          break;
        }
        case "ArrowUp": {
          e.preventDefault(), n.orientation === "vertical" && B(t, -5);
          break;
        }
        case "End": {
          e.preventDefault(), B(t, 100);
          break;
        }
        case "Enter": {
          e.preventDefault();
          const o = he(t), i = H(o.id, true), { derivedPanelConstraints: s, layout: u, separatorToPanels: a } = i, r2 = o.separators.find(
            (p) => p.element === t
          );
          C(r2, "Matching separator not found");
          const l = a.get(r2);
          C(l, "Matching panels not found");
          const c = l[0], m = s.find(
            (p) => p.panelId === c.id
          );
          if (C(m, "Panel metadata not found"), m.collapsible) {
            const p = u[c.id], S = m.collapsedSize === p ? o.mutableState.expandedPanelSizes[c.id] ?? m.minSize : m.collapsedSize;
            B(t, S - p);
          }
          break;
        }
        case "F6": {
          e.preventDefault();
          const i = he(t).separators.map(
            (r2) => r2.element
          ), s = Array.from(i).findIndex(
            (r2) => r2 === e.currentTarget
          );
          C(s !== null, "Index not found");
          const u = e.shiftKey ? s > 0 ? s - 1 : i.length - 1 : s + 1 < i.length ? s + 1 : 0;
          i[u].focus({
            preventScroll: true
          });
          break;
        }
        case "Home": {
          e.preventDefault(), B(t, -100);
          break;
        }
      }
  }
  function je(e) {
    if (e.defaultPrevented)
      return;
    if (e.pointerType === "mouse" && e.button > 0)
      return;
    const t = V(), n = Le(e, t), o = /* @__PURE__ */ new Map();
    let i = false;
    n.forEach((s) => {
      s.separator && (i || (i = true, s.separator.element.focus({
        // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
        focusVisible: false,
        preventScroll: true
      })));
      const u = t.get(s.group);
      u && o.set(s.group, u.layout);
    }), te({
      cursorFlags: 0,
      hitRegions: n,
      initialLayoutMap: o,
      pointerDownAtPoint: { x: e.clientX, y: e.clientY },
      state: "active"
    }), n.length && e.preventDefault();
  }
  function ut({
    document: e,
    event: t,
    hitRegions: n,
    initialLayoutMap: o,
    mountedGroups: i,
    pointerDownAtPoint: s,
    prevCursorFlags: u
  }) {
    let a = 0;
    n.forEach((l) => {
      const { group: c, groupSize: m } = l, { orientation: p, panels: S } = c, { disableCursor: z } = c.mutableState;
      let f = 0;
      s ? p === "horizontal" ? f = (t.clientX - s.x) / m * 100 : f = (t.clientY - s.y) / m * 100 : p === "horizontal" ? f = t.clientX < 0 ? -100 : 100 : f = t.clientY < 0 ? -100 : 100;
      const d = o.get(c), h = i.get(c);
      if (!d || !h)
        return;
      const {
        defaultLayoutDeferred: y,
        derivedPanelConstraints: b,
        groupSize: v,
        layout: g2,
        separatorToPanels: w
      } = h;
      if (b && g2 && w) {
        const E = ae({
          delta: f,
          initialLayout: d,
          panelConstraints: b,
          pivotIndices: l.panels.map((L) => S.indexOf(L)),
          prevLayout: g2,
          trigger: "mouse-or-touch"
        });
        if (K(E, g2)) {
          if (f !== 0 && !z)
            switch (p) {
              case "horizontal": {
                a |= f < 0 ? et : tt;
                break;
              }
              case "vertical": {
                a |= f < 0 ? nt : ot;
                break;
              }
            }
        } else
          j(l.group, {
            defaultLayoutDeferred: y,
            derivedPanelConstraints: b,
            groupSize: v,
            layout: E,
            separatorToPanels: w
          });
      }
    });
    let r2 = 0;
    t.movementX === 0 ? r2 |= u & Ie : r2 |= a & Ie, t.movementY === 0 ? r2 |= u & ke : r2 |= a & ke, Et(r2), Pe(e);
  }
  function He(e) {
    const t = V(), n = W();
    switch (n.state) {
      case "active":
        ut({
          document: e.currentTarget,
          event: e,
          hitRegions: n.hitRegions,
          initialLayoutMap: n.initialLayoutMap,
          mountedGroups: t,
          prevCursorFlags: n.cursorFlags
        });
    }
  }
  function Ve(e) {
    if (e.defaultPrevented)
      return;
    const t = W(), n = V();
    switch (t.state) {
      case "active": {
        if (
          // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
          e.buttons === 0
        ) {
          te({
            cursorFlags: 0,
            state: "inactive"
          }), t.hitRegions.forEach((o) => {
            if (!n.has(o.group))
              return;
            const i = H(o.group.id, true);
            j(o.group, i, {
              isUserInteraction: true
            });
          });
          return;
        }
        for (const o of t.hitRegions)
          if (o.separator) {
            const { element: i } = o.separator;
            i.isConnected && !i.hasPointerCapture?.(e.pointerId) && i.setPointerCapture?.(e.pointerId);
          }
        ut({
          document: e.currentTarget,
          event: e,
          hitRegions: t.hitRegions,
          initialLayoutMap: t.initialLayoutMap,
          mountedGroups: n,
          pointerDownAtPoint: t.pointerDownAtPoint,
          prevCursorFlags: t.cursorFlags
        });
        break;
      }
      default: {
        const o = Le(e, n);
        o.length === 0 ? t.state !== "inactive" && te({
          cursorFlags: 0,
          state: "inactive"
        }) : te({
          cursorFlags: 0,
          hitRegions: o,
          state: "hover"
        }), Pe(e.currentTarget);
        break;
      }
    }
  }
  function Ue(e) {
    if (e.relatedTarget instanceof HTMLIFrameElement)
      switch (W().state) {
        case "hover":
          te({
            cursorFlags: 0,
            state: "inactive"
          });
      }
  }
  function Be(e) {
    if (e.defaultPrevented)
      return;
    if (e.pointerType === "mouse" && e.button > 0)
      return;
    rt(e.currentTarget) && e.preventDefault();
  }
  function We(e) {
    let t = 0, n = 0;
    const o = {};
    for (const s of e)
      if (s.defaultSize !== void 0) {
        t++;
        const u = T(s.defaultSize);
        n += u, o[s.panelId] = u;
      } else
        o[s.panelId] = void 0;
    const i = e.length - t;
    if (i !== 0) {
      const s = T((100 - n) / i);
      for (const u of e)
        u.defaultSize === void 0 && (o[u.panelId] = s);
    }
    return o;
  }
  function jt(e, t, n) {
    if (!n[0])
      return;
    const i = e.panels.find((l) => l.element === t);
    if (!i || !i.onResize)
      return;
    const s = ne({ group: e }), u = e.orientation === "horizontal" ? i.element.offsetWidth : i.element.offsetHeight, a = i.mutableValues.prevSize, r2 = {
      asPercentage: T(u / s * 100),
      inPixels: u
    };
    i.mutableValues.prevSize = r2, i.onResize(r2, i.id, a);
  }
  function Ht(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
      return false;
    for (const o in e)
      if (e[o] !== t[o])
        return false;
    return true;
  }
  function Vt(e, t) {
    return e.length !== t.length ? false : e.every((n, o) => Ht(n, t[o]));
  }
  function Ut({
    group: e,
    nextGroupSize: t,
    prevGroupSize: n,
    prevLayout: o
  }) {
    if (n <= 0 || t <= 0 || n === t)
      return o;
    let i = 0, s = 0, u = false;
    const a = /* @__PURE__ */ new Map(), r2 = [];
    for (const m of e.panels) {
      const p = o[m.id] ?? 0;
      switch (m.panelConstraints.groupResizeBehavior) {
        case "preserve-pixel-size": {
          u = true;
          const S = p / 100 * n, z = T(
            S / t * 100
          );
          a.set(m.id, z), i += z;
          break;
        }
        case "preserve-relative-size":
        default: {
          r2.push(m.id), s += p;
          break;
        }
      }
    }
    if (!u || r2.length === 0)
      return o;
    const l = 100 - i, c = { ...o };
    if (a.forEach((m, p) => {
      c[p] = m;
    }), s > 0)
      for (const m of r2) {
        const p = o[m] ?? 0;
        c[m] = T(
          p / s * l
        );
      }
    else {
      const m = T(
        l / r2.length
      );
      for (const p of r2)
        c[p] = m;
    }
    return c;
  }
  function Bt(e, t) {
    const n = e.map((i) => i.id), o = Object.keys(t);
    if (n.length !== o.length)
      return false;
    for (const i of n)
      if (!o.includes(i))
        return false;
    return true;
  }
  var J = /* @__PURE__ */ new Map();
  function Wt(e) {
    let t = true;
    C(
      e.element.ownerDocument.defaultView,
      "Cannot register an unmounted Group"
    );
    const n = e.element.ownerDocument.defaultView.ResizeObserver, o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), s = new n((f) => {
      for (const d of f) {
        const { borderBoxSize: h, target: y } = d;
        if (y === e.element) {
          if (t) {
            const b = ne({ group: e });
            if (b === 0)
              return;
            const v = H(e.id);
            if (!v)
              return;
            const g2 = be(e), w = v.defaultLayoutDeferred ? We(g2) : v.layout, E = Ut({
              group: e,
              nextGroupSize: b,
              prevGroupSize: v.groupSize,
              prevLayout: w
            }), L = X({
              layout: E,
              panelConstraints: g2
            });
            if (!v.defaultLayoutDeferred && K(v.layout, L) && Vt(
              v.derivedPanelConstraints,
              g2
            ) && v.groupSize === b)
              continue;
            j(e, {
              defaultLayoutDeferred: false,
              derivedPanelConstraints: g2,
              groupSize: b,
              layout: L,
              separatorToPanels: v.separatorToPanels
            });
          }
        } else
          jt(e, y, h);
      }
    });
    s.observe(e.element), e.panels.forEach((f) => {
      C(
        !o.has(f.id),
        `Panel ids must be unique; id "${f.id}" was used more than once`
      ), o.add(f.id), f.onResize && s.observe(f.element);
    });
    const u = ne({ group: e }), a = be(e), r2 = e.panels.map(({ id: f }) => f).join(",");
    let l = e.mutableState.defaultLayout;
    l && (Bt(e.panels, l) || (l = void 0));
    const c = e.mutableState.layouts[r2] ?? l ?? We(a), m = X({
      layout: c,
      panelConstraints: a
    }), p = e.element.ownerDocument;
    J.set(
      p,
      (J.get(p) ?? 0) + 1
    );
    const S = /* @__PURE__ */ new Map();
    return Ze(e).forEach((f) => {
      f.separator && S.set(f.separator, f.panels);
    }), j(e, {
      defaultLayoutDeferred: u === 0,
      derivedPanelConstraints: a,
      groupSize: u,
      layout: m,
      separatorToPanels: S
    }), e.separators.forEach((f) => {
      C(
        !i.has(f.id),
        `Separator ids must be unique; id "${f.id}" was used more than once`
      ), i.add(f.id), f.element.addEventListener("keydown", $e);
    }), J.get(p) === 1 && (p.addEventListener("contextmenu", Ge, true), p.addEventListener("dblclick", _e, true), p.addEventListener("pointerdown", je, true), p.addEventListener("pointerleave", He), p.addEventListener("pointermove", Ve), p.addEventListener("pointerout", Ue), p.addEventListener("pointerup", Be, true)), function() {
      t = false, J.set(
        p,
        Math.max(0, (J.get(p) ?? 0) - 1)
      ), kt(e), e.separators.forEach((d) => {
        d.element.removeEventListener("keydown", $e);
      }), J.get(p) || (p.removeEventListener(
        "contextmenu",
        Ge,
        true
      ), p.removeEventListener(
        "dblclick",
        _e,
        true
      ), p.removeEventListener(
        "pointerdown",
        je,
        true
      ), p.removeEventListener("pointerleave", He), p.removeEventListener("pointermove", Ve), p.removeEventListener("pointerout", Ue), p.removeEventListener("pointerup", Be, true)), s.disconnect();
    };
  }
  function Kt() {
    const [e, t] = (0, import_react3.useState)({}), n = (0, import_react3.useCallback)(() => t({}), []);
    return [e, n];
  }
  function Ce(e) {
    const t = (0, import_react3.useId)();
    return `${e ?? t}`;
  }
  var q = typeof window < "u" ? import_react3.useLayoutEffect : import_react3.useEffect;
  function re(e) {
    const t = (0, import_react3.useRef)(e);
    return q(() => {
      t.current = e;
    }, [e]), (0, import_react3.useCallback)(
      (...n) => t.current?.(...n),
      [t]
    );
  }
  function Re(...e) {
    return re((t) => {
      e.forEach((n) => {
        if (n)
          switch (typeof n) {
            case "function": {
              n(t);
              break;
            }
            case "object": {
              n.current = t;
              break;
            }
          }
      });
    });
  }
  function Ee(e) {
    const t = (0, import_react3.useRef)({ ...e });
    return q(() => {
      for (const n in e)
        t.current[n] = e[n];
    }, [e]), t.current;
  }
  var ct = (0, import_react3.createContext)(null);
  function Xt(e, t) {
    const n = (0, import_react3.useRef)({
      getLayout: () => ({}),
      setLayout: Mt
    });
    (0, import_react3.useImperativeHandle)(t, () => n.current, []), q(() => {
      Object.assign(
        n.current,
        lt({ groupId: e })
      );
    });
  }
  function qt({
    children: e,
    className: t,
    defaultLayout: n,
    disableCursor: o,
    disabled: i,
    elementRef: s,
    groupRef: u,
    id: a,
    onLayoutChange: r2,
    onLayoutChanged: l,
    orientation: c = "horizontal",
    resizeTargetMinimumSize: m = {
      coarse: 20,
      fine: 10
    },
    style: p,
    ...S
  }) {
    const z = (0, import_react3.useRef)({
      onLayoutChange: {},
      onLayoutChanged: {}
    }), f = re((x) => {
      K(z.current.onLayoutChange, x) || (z.current.onLayoutChange = x, r2?.(x));
    }), d = re(
      (x, P) => {
        K(z.current.onLayoutChanged, x) || (z.current.onLayoutChanged = x, l?.(x, { isUserInteraction: P }));
      }
    ), h = Ce(a), y = (0, import_react3.useRef)(null), [b, v] = Kt(), g2 = (0, import_react3.useRef)({
      lastExpandedPanelSizes: {},
      layouts: {},
      panels: [],
      resizeTargetMinimumSize: m,
      separators: []
    }), w = Re(y, s);
    Xt(h, u);
    const E = re(
      (x, P) => {
        const I = W(), R = Oe(x), M = H(x);
        if (M) {
          let k = false;
          switch (I.state) {
            case "active": {
              k = I.hitRegions.some(
                (U) => U.group === R
              );
              break;
            }
          }
          return {
            flexGrow: M.layout[P] ?? 1,
            pointerEvents: k ? "none" : void 0
          };
        }
        if (n?.[P])
          return {
            flexGrow: n?.[P]
          };
      }
    ), L = Ee({
      defaultLayout: n,
      disableCursor: o
    }), G = (0, import_react3.useMemo)(
      () => ({
        get disableCursor() {
          return !!L.disableCursor;
        },
        getPanelStyles: E,
        id: h,
        orientation: c,
        registerPanel: (x) => {
          const P = g2.current;
          return P.panels = ze(c, [
            ...P.panels,
            x
          ]), v(), () => {
            P.panels = P.panels.filter(
              (I) => I !== x
            ), v();
          };
        },
        registerSeparator: (x) => {
          const P = g2.current;
          return P.separators = ze(c, [
            ...P.separators,
            x
          ]), v(), () => {
            P.separators = P.separators.filter(
              (I) => I !== x
            ), v();
          };
        },
        updatePanelProps: (x, { disabled: P }) => {
          const R = g2.current.panels.find(
            (U) => U.id === x
          );
          R && (R.panelConstraints.disabled = P);
          const M = Oe(h), k = H(h);
          M && k && j(M, {
            ...k,
            derivedPanelConstraints: be(M)
          });
        },
        updateSeparatorProps: (x, {
          disabled: P,
          disableDoubleClick: I
        }) => {
          const M = g2.current.separators.find(
            (k) => k.id === x
          );
          M && (M.disabled = P, M.disableDoubleClick = I);
        }
      }),
      [E, h, v, c, L]
    ), N = (0, import_react3.useRef)(null);
    return q(() => {
      const x = y.current;
      if (x === null)
        return;
      const P = g2.current;
      let I;
      if (L.defaultLayout !== void 0 && Object.keys(L.defaultLayout).length === P.panels.length) {
        I = {};
        for (const _ of P.panels) {
          const Y = L.defaultLayout[_.id];
          Y !== void 0 && (I[_.id] = Y);
        }
      }
      const R = {
        disabled: !!i,
        element: x,
        id: h,
        mutableState: {
          defaultLayout: I,
          disableCursor: !!L.disableCursor,
          expandedPanelSizes: g2.current.lastExpandedPanelSizes,
          layouts: g2.current.layouts
        },
        orientation: c,
        panels: P.panels,
        resizeTargetMinimumSize: P.resizeTargetMinimumSize,
        separators: P.separators
      };
      N.current = R;
      const M = Wt(R), { defaultLayoutDeferred: k, derivedPanelConstraints: U, layout: le } = H(R.id, true);
      !k && U.length > 0 && (f(le), d(le, false));
      const ue = we(h, (_) => {
        const { defaultLayoutDeferred: Y, derivedPanelConstraints: ce, layout: fe } = _.next;
        if (Y || ce.length === 0)
          return;
        const ft = R.panels.map(({ id: $ }) => $).join(",");
        R.mutableState.layouts[ft] = fe, ce.forEach(($) => {
          if ($.collapsible) {
            const { layout: ye } = _.prev ?? {};
            if (ye) {
              const pt = D(
                $.collapsedSize,
                fe[$.panelId]
              ), ht = D(
                $.collapsedSize,
                ye[$.panelId]
              );
              pt && !ht && (R.mutableState.expandedPanelSizes[$.panelId] = ye[$.panelId]);
            }
          }
        });
        const dt = W().state !== "active";
        f(fe), dt && d(fe, _.isUserInteraction);
      });
      return () => {
        N.current = null, M(), ue();
      };
    }, [
      i,
      h,
      d,
      f,
      c,
      b,
      L
    ]), (0, import_react3.useEffect)(() => {
      const x = N.current;
      x && (x.mutableState.defaultLayout = n, x.mutableState.disableCursor = !!o);
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ct.Provider, { value: G, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ...S,
        className: t,
        "data-group": true,
        "data-testid": h,
        id: h,
        ref: w,
        style: {
          height: "100%",
          width: "100%",
          overflow: "hidden",
          ...p,
          display: "flex",
          flexDirection: c === "horizontal" ? "row" : "column",
          flexWrap: "nowrap",
          // Inform the browser that the library is handling touch events for this element
          // but still allow users to scroll content within panels in the non-resizing direction
          // NOTE This is not an inherited style
          // See github.com/bvaughn/react-resizable-panels/issues/662
          touchAction: c === "horizontal" ? "pan-y" : "pan-x"
        },
        children: e
      }
    ) });
  }
  qt.displayName = "Group";
  function Me() {
    const e = (0, import_react3.useContext)(ct);
    return C(
      e,
      "Group Context not found; did you render a Panel or Separator outside of a Group?"
    ), e;
  }
  function Zt(e, t) {
    const { id: n } = Me(), o = (0, import_react3.useRef)({
      collapse: Se,
      expand: Se,
      getSize: () => ({
        asPercentage: 0,
        inPixels: 0
      }),
      isCollapsed: () => false,
      resize: Se
    });
    (0, import_react3.useImperativeHandle)(t, () => o.current, []), q(() => {
      Object.assign(
        o.current,
        at({ groupId: n, panelId: e })
      );
    });
  }
  function Qt({
    children: e,
    className: t,
    collapsedSize: n = "0%",
    collapsible: o = false,
    defaultSize: i,
    disabled: s,
    elementRef: u,
    groupResizeBehavior: a = "preserve-relative-size",
    id: r2,
    maxSize: l = "100%",
    minSize: c = "0%",
    onResize: m,
    panelRef: p,
    style: S,
    ...z
  }) {
    const f = !!r2, d = Ce(r2), h = Ee({
      disabled: s
    }), y = (0, import_react3.useRef)(null), b = Re(y, u), {
      getPanelStyles: v,
      id: g2,
      orientation: w,
      registerPanel: E,
      updatePanelProps: L
    } = Me(), G = m !== null, N = re(
      (R, M, k) => {
        m?.(R, r2, k);
      }
    );
    q(() => {
      const R = y.current;
      if (R !== null) {
        const M = {
          element: R,
          id: d,
          idIsStable: f,
          mutableValues: {
            expandToSize: void 0,
            prevSize: void 0
          },
          onResize: G ? N : void 0,
          panelConstraints: {
            groupResizeBehavior: a,
            collapsedSize: n,
            collapsible: o,
            defaultSize: i,
            disabled: h.disabled,
            maxSize: l,
            minSize: c
          }
        };
        return E(M);
      }
    }, [
      a,
      n,
      o,
      i,
      G,
      d,
      f,
      l,
      c,
      N,
      E,
      h
    ]), (0, import_react3.useEffect)(() => {
      L(d, { disabled: s });
    }, [s, d, L]), Zt(d, p);
    const x = () => {
      const R = v(g2, d);
      if (R)
        return JSON.stringify(R);
    }, P = (0, import_react3.useSyncExternalStore)(
      (R) => we(g2, R),
      x,
      x
    );
    let I;
    return P ? I = JSON.parse(P) : i !== void 0 ? I = {
      flexGrow: void 0,
      flexShrink: void 0,
      flexBasis: i
    } : I = { flexGrow: 1 }, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ...z,
        "data-disabled": s || void 0,
        "data-panel": true,
        "data-testid": d,
        id: d,
        ref: b,
        style: {
          ...en,
          display: "flex",
          flexBasis: 0,
          flexShrink: 1,
          overflow: "visible",
          ...I
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: t,
            style: {
              maxHeight: "100%",
              maxWidth: "100%",
              flexGrow: 1,
              overflow: "auto",
              ...S,
              // Inform the browser that the library is handling touch events for this element
              // but still allow users to scroll content within panels in the non-resizing direction
              // NOTE This is not an inherited style
              // See github.com/bvaughn/react-resizable-panels/issues/662
              touchAction: w === "horizontal" ? "pan-y" : "pan-x"
            },
            children: e
          }
        )
      }
    );
  }
  Qt.displayName = "Panel";
  var en = {
    minHeight: 0,
    maxHeight: "100%",
    height: "auto",
    minWidth: 0,
    maxWidth: "100%",
    width: "auto",
    border: "none",
    borderWidth: 0,
    padding: 0,
    margin: 0
  };
  function tn({
    layout: e,
    panelConstraints: t,
    panelId: n,
    panelIndex: o
  }) {
    let i, s;
    const u = e[n], a = t.find(
      (r2) => r2.panelId === n
    );
    if (a) {
      const r2 = a.maxSize, l = a.collapsible ? a.collapsedSize : a.minSize, c = [o, o + 1];
      s = X({
        layout: ae({
          delta: l - u,
          initialLayout: e,
          panelConstraints: t,
          pivotIndices: c,
          prevLayout: e
        }),
        panelConstraints: t
      })[n], i = X({
        layout: ae({
          delta: r2 - u,
          initialLayout: e,
          panelConstraints: t,
          pivotIndices: c,
          prevLayout: e
        }),
        panelConstraints: t
      })[n];
    }
    return {
      valueControls: n,
      valueMax: i,
      valueMin: s,
      valueNow: u
    };
  }
  function nn({
    children: e,
    className: t,
    disabled: n,
    disableDoubleClick: o,
    elementRef: i,
    id: s,
    style: u,
    ...a
  }) {
    const r2 = Ce(s), l = Ee({
      disabled: n,
      disableDoubleClick: o
    }), [c, m] = (0, import_react3.useState)({}), [p, S] = (0, import_react3.useState)("inactive"), [z, f] = (0, import_react3.useState)(false), d = (0, import_react3.useRef)(null), h = Re(d, i), {
      disableCursor: y,
      id: b,
      orientation: v,
      registerSeparator: g2,
      updateSeparatorProps: w
    } = Me(), E = v === "horizontal" ? "vertical" : "horizontal";
    q(() => {
      const N = d.current;
      if (N !== null) {
        const x = {
          disabled: l.disabled,
          disableDoubleClick: l.disableDoubleClick,
          element: N,
          id: r2
        }, P = g2(x), I = Rt(
          (M) => {
            S(
              M.next.state !== "inactive" && M.next.hitRegions.some(
                (k) => k.separator === x
              ) ? M.next.state : "inactive"
            );
          }
        ), R = we(
          b,
          (M) => {
            const { derivedPanelConstraints: k, layout: U, separatorToPanels: le } = M.next, ue = le.get(x);
            if (ue) {
              const _ = ue[0], Y = k.findIndex(
                (ce) => ce.panelId === _.id
              );
              m(
                tn({
                  layout: U,
                  panelConstraints: k,
                  panelId: _.id,
                  panelIndex: Y
                })
              );
            }
          }
        );
        return () => {
          I(), R(), P();
        };
      }
    }, [b, r2, g2, l]), (0, import_react3.useEffect)(() => {
      w(r2, { disabled: n, disableDoubleClick: o });
    }, [n, o, r2, w]);
    let L;
    n && !y && (L = "not-allowed");
    let G;
    if (n)
      G = "disabled";
    else
      switch (p) {
        case "active": {
          G = "active";
          break;
        }
        default:
          z ? G = "focus" : G = p;
      }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ...a,
        "aria-controls": c.valueControls,
        "aria-disabled": n || void 0,
        "aria-orientation": E,
        "aria-valuemax": c.valueMax,
        "aria-valuemin": c.valueMin,
        "aria-valuenow": c.valueNow,
        children: e,
        className: t,
        "data-separator": G,
        "data-testid": r2,
        id: r2,
        onBlur: () => f(false),
        onFocus: () => f(true),
        ref: h,
        role: "separator",
        style: {
          flexBasis: "auto",
          cursor: L,
          ...u,
          flexGrow: 0,
          flexShrink: 0,
          // Inform the browser that the library is handling touch events for this element
          // See github.com/bvaughn/react-resizable-panels/issues/662
          touchAction: "none"
        },
        tabIndex: n ? void 0 : 0
      }
    );
  }
  nn.displayName = "Separator";

  // src/lib/utils.ts
  init_define_import_meta_env();

  // node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
  init_define_import_meta_env();
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // node_modules/.pnpm/tailwind-merge@3.6.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs
  init_define_import_meta_env();
  var concatArrays = (array1, array2) => {
    const combinedArray = new Array(array1.length + array2.length);
    for (let i = 0; i < array1.length; i++) {
      combinedArray[i] = array1[i];
    }
    for (let i = 0; i < array2.length; i++) {
      combinedArray[array1.length + i] = array2[i];
    }
    return combinedArray;
  };
  var createClassValidatorObject = (classGroupId, validator) => ({
    classGroupId,
    validator
  });
  var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
    nextPart,
    validators,
    classGroupId
  });
  var CLASS_PART_SEPARATOR = "-";
  var EMPTY_CONFLICTS = [];
  var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
  var createClassGroupUtils = (config) => {
    const classMap = createClassMap(config);
    const {
      conflictingClassGroups,
      conflictingClassGroupModifiers
    } = config;
    const getClassGroupId = (className) => {
      if (className.startsWith("[") && className.endsWith("]")) {
        return getGroupIdForArbitraryProperty(className);
      }
      const classParts = className.split(CLASS_PART_SEPARATOR);
      const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
      return getGroupRecursive(classParts, startIndex, classMap);
    };
    const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
      if (hasPostfixModifier) {
        const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
        const baseConflicts = conflictingClassGroups[classGroupId];
        if (modifierConflicts) {
          if (baseConflicts) {
            return concatArrays(baseConflicts, modifierConflicts);
          }
          return modifierConflicts;
        }
        return baseConflicts || EMPTY_CONFLICTS;
      }
      return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
    };
    return {
      getClassGroupId,
      getConflictingClassGroupIds
    };
  };
  var getGroupRecursive = (classParts, startIndex, classPartObject) => {
    const classPathsLength = classParts.length - startIndex;
    if (classPathsLength === 0) {
      return classPartObject.classGroupId;
    }
    const currentClassPart = classParts[startIndex];
    const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    if (nextClassPartObject) {
      const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
      if (result) return result;
    }
    const validators = classPartObject.validators;
    if (validators === null) {
      return void 0;
    }
    const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
    const validatorsLength = validators.length;
    for (let i = 0; i < validatorsLength; i++) {
      const validatorObj = validators[i];
      if (validatorObj.validator(classRest)) {
        return validatorObj.classGroupId;
      }
    }
    return void 0;
  };
  var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
    const content = className.slice(1, -1);
    const colonIndex = content.indexOf(":");
    const property = content.slice(0, colonIndex);
    return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
  })();
  var createClassMap = (config) => {
    const {
      theme,
      classGroups
    } = config;
    return processClassGroups(classGroups, theme);
  };
  var processClassGroups = (classGroups, theme) => {
    const classMap = createClassPartObject();
    for (const classGroupId in classGroups) {
      const group = classGroups[classGroupId];
      processClassesRecursively(group, classMap, classGroupId, theme);
    }
    return classMap;
  };
  var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
    const len = classGroup.length;
    for (let i = 0; i < len; i++) {
      const classDefinition = classGroup[i];
      processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
    }
  };
  var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
    if (typeof classDefinition === "string") {
      processStringDefinition(classDefinition, classPartObject, classGroupId);
      return;
    }
    if (typeof classDefinition === "function") {
      processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
      return;
    }
    processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
  };
  var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
    const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
    classPartObjectToEdit.classGroupId = classGroupId;
  };
  var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
    if (isThemeGetter(classDefinition)) {
      processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
      return;
    }
    if (classPartObject.validators === null) {
      classPartObject.validators = [];
    }
    classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
  };
  var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
    const entries = Object.entries(classDefinition);
    const len = entries.length;
    for (let i = 0; i < len; i++) {
      const [key, value] = entries[i];
      processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
    }
  };
  var getPart = (classPartObject, path) => {
    let current = classPartObject;
    const parts = path.split(CLASS_PART_SEPARATOR);
    const len = parts.length;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      let next = current.nextPart.get(part);
      if (!next) {
        next = createClassPartObject();
        current.nextPart.set(part, next);
      }
      current = next;
    }
    return current;
  };
  var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
  var createLruCache = (maxCacheSize) => {
    if (maxCacheSize < 1) {
      return {
        get: () => void 0,
        set: () => {
        }
      };
    }
    let cacheSize = 0;
    let cache = /* @__PURE__ */ Object.create(null);
    let previousCache = /* @__PURE__ */ Object.create(null);
    const update = (key, value) => {
      cache[key] = value;
      cacheSize++;
      if (cacheSize > maxCacheSize) {
        cacheSize = 0;
        previousCache = cache;
        cache = /* @__PURE__ */ Object.create(null);
      }
    };
    return {
      get(key) {
        let value = cache[key];
        if (value !== void 0) {
          return value;
        }
        if ((value = previousCache[key]) !== void 0) {
          update(key, value);
          return value;
        }
      },
      set(key, value) {
        if (key in cache) {
          cache[key] = value;
        } else {
          update(key, value);
        }
      }
    };
  };
  var IMPORTANT_MODIFIER = "!";
  var MODIFIER_SEPARATOR = ":";
  var EMPTY_MODIFIERS = [];
  var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
    modifiers,
    hasImportantModifier,
    baseClassName,
    maybePostfixModifierPosition,
    isExternal
  });
  var createParseClassName = (config) => {
    const {
      prefix,
      experimentalParseClassName
    } = config;
    let parseClassName = (className) => {
      const modifiers = [];
      let bracketDepth = 0;
      let parenDepth = 0;
      let modifierStart = 0;
      let postfixModifierPosition;
      const len = className.length;
      for (let index = 0; index < len; index++) {
        const currentCharacter = className[index];
        if (bracketDepth === 0 && parenDepth === 0) {
          if (currentCharacter === MODIFIER_SEPARATOR) {
            modifiers.push(className.slice(modifierStart, index));
            modifierStart = index + 1;
            continue;
          }
          if (currentCharacter === "/") {
            postfixModifierPosition = index;
            continue;
          }
        }
        if (currentCharacter === "[") bracketDepth++;
        else if (currentCharacter === "]") bracketDepth--;
        else if (currentCharacter === "(") parenDepth++;
        else if (currentCharacter === ")") parenDepth--;
      }
      const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
      let baseClassName = baseClassNameWithImportantModifier;
      let hasImportantModifier = false;
      if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
        baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
        hasImportantModifier = true;
      } else if (
        /**
         * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
         * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
         */
        baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
      ) {
        baseClassName = baseClassNameWithImportantModifier.slice(1);
        hasImportantModifier = true;
      }
      const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
      return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
    };
    if (prefix) {
      const fullPrefix = prefix + MODIFIER_SEPARATOR;
      const parseClassNameOriginal = parseClassName;
      parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
    }
    if (experimentalParseClassName) {
      const parseClassNameOriginal = parseClassName;
      parseClassName = (className) => experimentalParseClassName({
        className,
        parseClassName: parseClassNameOriginal
      });
    }
    return parseClassName;
  };
  var createSortModifiers = (config) => {
    const modifierWeights = /* @__PURE__ */ new Map();
    config.orderSensitiveModifiers.forEach((mod, index) => {
      modifierWeights.set(mod, 1e6 + index);
    });
    return (modifiers) => {
      const result = [];
      let currentSegment = [];
      for (let i = 0; i < modifiers.length; i++) {
        const modifier = modifiers[i];
        const isArbitrary = modifier[0] === "[";
        const isOrderSensitive = modifierWeights.has(modifier);
        if (isArbitrary || isOrderSensitive) {
          if (currentSegment.length > 0) {
            currentSegment.sort();
            result.push(...currentSegment);
            currentSegment = [];
          }
          result.push(modifier);
        } else {
          currentSegment.push(modifier);
        }
      }
      if (currentSegment.length > 0) {
        currentSegment.sort();
        result.push(...currentSegment);
      }
      return result;
    };
  };
  var createConfigUtils = (config) => ({
    cache: createLruCache(config.cacheSize),
    parseClassName: createParseClassName(config),
    sortModifiers: createSortModifiers(config),
    postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config),
    ...createClassGroupUtils(config)
  });
  var createPostfixLookupClassGroupIds = (config) => {
    const lookup = /* @__PURE__ */ Object.create(null);
    const classGroupIds = config.postfixLookupClassGroups;
    if (classGroupIds) {
      for (let i = 0; i < classGroupIds.length; i++) {
        lookup[classGroupIds[i]] = true;
      }
    }
    return lookup;
  };
  var SPLIT_CLASSES_REGEX = /\s+/;
  var mergeClassList = (classList, configUtils) => {
    const {
      parseClassName,
      getClassGroupId,
      getConflictingClassGroupIds,
      sortModifiers,
      postfixLookupClassGroupIds
    } = configUtils;
    const classGroupsInConflict = [];
    const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
    let result = "";
    for (let index = classNames.length - 1; index >= 0; index -= 1) {
      const originalClassName = classNames[index];
      const {
        isExternal,
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition
      } = parseClassName(originalClassName);
      if (isExternal) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      let hasPostfixModifier = !!maybePostfixModifierPosition;
      let classGroupId;
      if (hasPostfixModifier) {
        const baseClassNameWithoutPostfix = baseClassName.substring(0, maybePostfixModifierPosition);
        classGroupId = getClassGroupId(baseClassNameWithoutPostfix);
        const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
        if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
          classGroupId = classGroupIdWithPostfix;
          hasPostfixModifier = false;
        }
      } else {
        classGroupId = getClassGroupId(baseClassName);
      }
      if (!classGroupId) {
        if (!hasPostfixModifier) {
          result = originalClassName + (result.length > 0 ? " " + result : result);
          continue;
        }
        classGroupId = getClassGroupId(baseClassName);
        if (!classGroupId) {
          result = originalClassName + (result.length > 0 ? " " + result : result);
          continue;
        }
        hasPostfixModifier = false;
      }
      const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
      const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
      const classId = modifierId + classGroupId;
      if (classGroupsInConflict.indexOf(classId) > -1) {
        continue;
      }
      classGroupsInConflict.push(classId);
      const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
      for (let i = 0; i < conflictGroups.length; ++i) {
        const group = conflictGroups[i];
        classGroupsInConflict.push(modifierId + group);
      }
      result = originalClassName + (result.length > 0 ? " " + result : result);
    }
    return result;
  };
  var twJoin = (...classLists) => {
    let index = 0;
    let argument;
    let resolvedValue;
    let string = "";
    while (index < classLists.length) {
      if (argument = classLists[index++]) {
        if (resolvedValue = toValue(argument)) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  };
  var toValue = (mix) => {
    if (typeof mix === "string") {
      return mix;
    }
    let resolvedValue;
    let string = "";
    for (let k = 0; k < mix.length; k++) {
      if (mix[k]) {
        if (resolvedValue = toValue(mix[k])) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  };
  var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall;
    const initTailwindMerge = (classList) => {
      const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
      configUtils = createConfigUtils(config);
      cacheGet = configUtils.cache.get;
      cacheSet = configUtils.cache.set;
      functionToCall = tailwindMerge;
      return tailwindMerge(classList);
    };
    const tailwindMerge = (classList) => {
      const cachedResult = cacheGet(classList);
      if (cachedResult) {
        return cachedResult;
      }
      const result = mergeClassList(classList, configUtils);
      cacheSet(classList, result);
      return result;
    };
    functionToCall = initTailwindMerge;
    return (...args) => functionToCall(twJoin(...args));
  };
  var fallbackThemeArr = [];
  var fromTheme = (key) => {
    const themeGetter = (theme) => theme[key] || fallbackThemeArr;
    themeGetter.isThemeGetter = true;
    return themeGetter;
  };
  var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
  var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
  var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
  var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
  var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
  var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
  var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
  var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
  var isFraction = (value) => fractionRegex.test(value);
  var isNumber = (value) => !!value && !Number.isNaN(Number(value));
  var isInteger = (value) => !!value && Number.isInteger(Number(value));
  var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
  var isTshirtSize = (value) => tshirtUnitRegex.test(value);
  var isAny = () => true;
  var isLengthOnly = (value) => (
    // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
    // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
    // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
    lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
  );
  var isNever = () => false;
  var isShadow = (value) => shadowRegex.test(value);
  var isImage = (value) => imageRegex.test(value);
  var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
  var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
  var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
  var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
  var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
  var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
  var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
  var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
  var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
  var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
  var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
  var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
  var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
  var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
  var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
  var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
  var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
  var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
  var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
  var getIsArbitraryValue = (value, testLabel, testValue) => {
    const result = arbitraryValueRegex.exec(value);
    if (result) {
      if (result[1]) {
        return testLabel(result[1]);
      }
      return testValue(result[2]);
    }
    return false;
  };
  var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
    const result = arbitraryVariableRegex.exec(value);
    if (result) {
      if (result[1]) {
        return testLabel(result[1]);
      }
      return shouldMatchNoLabel;
    }
    return false;
  };
  var isLabelPosition = (label) => label === "position" || label === "percentage";
  var isLabelImage = (label) => label === "image" || label === "url";
  var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
  var isLabelLength = (label) => label === "length";
  var isLabelNumber = (label) => label === "number";
  var isLabelFamilyName = (label) => label === "family-name";
  var isLabelWeight = (label) => label === "number" || label === "weight";
  var isLabelShadow = (label) => label === "shadow";
  var getDefaultConfig = () => {
    const themeColor = fromTheme("color");
    const themeFont = fromTheme("font");
    const themeText = fromTheme("text");
    const themeFontWeight = fromTheme("font-weight");
    const themeTracking = fromTheme("tracking");
    const themeLeading = fromTheme("leading");
    const themeBreakpoint = fromTheme("breakpoint");
    const themeContainer = fromTheme("container");
    const themeSpacing = fromTheme("spacing");
    const themeRadius = fromTheme("radius");
    const themeShadow = fromTheme("shadow");
    const themeInsetShadow = fromTheme("inset-shadow");
    const themeTextShadow = fromTheme("text-shadow");
    const themeDropShadow = fromTheme("drop-shadow");
    const themeBlur = fromTheme("blur");
    const themePerspective = fromTheme("perspective");
    const themeAspect = fromTheme("aspect");
    const themeEase = fromTheme("ease");
    const themeAnimate = fromTheme("animate");
    const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
    const scalePosition = () => [
      "center",
      "top",
      "bottom",
      "left",
      "right",
      "top-left",
      // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
      "left-top",
      "top-right",
      // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
      "right-top",
      "bottom-right",
      // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
      "right-bottom",
      "bottom-left",
      // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
      "left-bottom"
    ];
    const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
    const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
    const scaleOverscroll = () => ["auto", "contain", "none"];
    const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
    const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
    const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
    const scaleGridColRowStartAndEnd = () => ["auto", {
      span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
    }, isInteger, isArbitraryVariable, isArbitraryValue];
    const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
    const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
    const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
    const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
    const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
    const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
    const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
    const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
    const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
    const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
      position: [isArbitraryVariable, isArbitraryValue]
    }];
    const scaleBgRepeat = () => ["no-repeat", {
      repeat: ["", "x", "y", "space", "round"]
    }];
    const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
      size: [isArbitraryVariable, isArbitraryValue]
    }];
    const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
    const scaleRadius = () => [
      // Deprecated since Tailwind CSS v4.0.0
      "",
      "none",
      "full",
      themeRadius,
      isArbitraryVariable,
      isArbitraryValue
    ];
    const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
    const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
    const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
    const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
    const scaleBlur = () => [
      // Deprecated since Tailwind CSS v4.0.0
      "",
      "none",
      themeBlur,
      isArbitraryVariable,
      isArbitraryValue
    ];
    const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
    const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
    const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
    const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [isTshirtSize],
        breakpoint: [isTshirtSize],
        color: [isAny],
        container: [isTshirtSize],
        "drop-shadow": [isTshirtSize],
        ease: ["in", "out", "in-out"],
        font: [isAnyNonArbitrary],
        "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
        "inset-shadow": [isTshirtSize],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
        radius: [isTshirtSize],
        shadow: [isTshirtSize],
        spacing: ["px", isNumber],
        text: [isTshirtSize],
        "text-shadow": [isTshirtSize],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
      },
      classGroups: {
        // --------------
        // --- Layout ---
        // --------------
        /**
         * Aspect Ratio
         * @see https://tailwindcss.com/docs/aspect-ratio
         */
        aspect: [{
          aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
        }],
        /**
         * Container
         * @see https://tailwindcss.com/docs/container
         * @deprecated since Tailwind CSS v4.0.0
         */
        container: ["container"],
        /**
         * Container Type
         * @see https://tailwindcss.com/docs/responsive-design#container-queries
         */
        "container-type": [{
          "@container": ["", "normal", "size", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Container Name
         * @see https://tailwindcss.com/docs/responsive-design#named-containers
         */
        "container-named": [isNamedContainerQuery],
        /**
         * Columns
         * @see https://tailwindcss.com/docs/columns
         */
        columns: [{
          columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
        }],
        /**
         * Break After
         * @see https://tailwindcss.com/docs/break-after
         */
        "break-after": [{
          "break-after": scaleBreak()
        }],
        /**
         * Break Before
         * @see https://tailwindcss.com/docs/break-before
         */
        "break-before": [{
          "break-before": scaleBreak()
        }],
        /**
         * Break Inside
         * @see https://tailwindcss.com/docs/break-inside
         */
        "break-inside": [{
          "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
        }],
        /**
         * Box Decoration Break
         * @see https://tailwindcss.com/docs/box-decoration-break
         */
        "box-decoration": [{
          "box-decoration": ["slice", "clone"]
        }],
        /**
         * Box Sizing
         * @see https://tailwindcss.com/docs/box-sizing
         */
        box: [{
          box: ["border", "content"]
        }],
        /**
         * Display
         * @see https://tailwindcss.com/docs/display
         */
        display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
        /**
         * Screen Reader Only
         * @see https://tailwindcss.com/docs/display#screen-reader-only
         */
        sr: ["sr-only", "not-sr-only"],
        /**
         * Floats
         * @see https://tailwindcss.com/docs/float
         */
        float: [{
          float: ["right", "left", "none", "start", "end"]
        }],
        /**
         * Clear
         * @see https://tailwindcss.com/docs/clear
         */
        clear: [{
          clear: ["left", "right", "both", "none", "start", "end"]
        }],
        /**
         * Isolation
         * @see https://tailwindcss.com/docs/isolation
         */
        isolation: ["isolate", "isolation-auto"],
        /**
         * Object Fit
         * @see https://tailwindcss.com/docs/object-fit
         */
        "object-fit": [{
          object: ["contain", "cover", "fill", "none", "scale-down"]
        }],
        /**
         * Object Position
         * @see https://tailwindcss.com/docs/object-position
         */
        "object-position": [{
          object: scalePositionWithArbitrary()
        }],
        /**
         * Overflow
         * @see https://tailwindcss.com/docs/overflow
         */
        overflow: [{
          overflow: scaleOverflow()
        }],
        /**
         * Overflow X
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-x": [{
          "overflow-x": scaleOverflow()
        }],
        /**
         * Overflow Y
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-y": [{
          "overflow-y": scaleOverflow()
        }],
        /**
         * Overscroll Behavior
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        overscroll: [{
          overscroll: scaleOverscroll()
        }],
        /**
         * Overscroll Behavior X
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-x": [{
          "overscroll-x": scaleOverscroll()
        }],
        /**
         * Overscroll Behavior Y
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-y": [{
          "overscroll-y": scaleOverscroll()
        }],
        /**
         * Position
         * @see https://tailwindcss.com/docs/position
         */
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        /**
         * Inset
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        inset: [{
          inset: scaleInset()
        }],
        /**
         * Inset Inline
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-x": [{
          "inset-x": scaleInset()
        }],
        /**
         * Inset Block
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-y": [{
          "inset-y": scaleInset()
        }],
        /**
         * Inset Inline Start
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         * @todo class group will be renamed to `inset-s` in next major release
         */
        start: [{
          "inset-s": scaleInset(),
          /**
           * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
           * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
           */
          start: scaleInset()
        }],
        /**
         * Inset Inline End
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         * @todo class group will be renamed to `inset-e` in next major release
         */
        end: [{
          "inset-e": scaleInset(),
          /**
           * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
           * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
           */
          end: scaleInset()
        }],
        /**
         * Inset Block Start
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-bs": [{
          "inset-bs": scaleInset()
        }],
        /**
         * Inset Block End
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-be": [{
          "inset-be": scaleInset()
        }],
        /**
         * Top
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        top: [{
          top: scaleInset()
        }],
        /**
         * Right
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        right: [{
          right: scaleInset()
        }],
        /**
         * Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        bottom: [{
          bottom: scaleInset()
        }],
        /**
         * Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        left: [{
          left: scaleInset()
        }],
        /**
         * Visibility
         * @see https://tailwindcss.com/docs/visibility
         */
        visibility: ["visible", "invisible", "collapse"],
        /**
         * Z-Index
         * @see https://tailwindcss.com/docs/z-index
         */
        z: [{
          z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
        }],
        // ------------------------
        // --- Flexbox and Grid ---
        // ------------------------
        /**
         * Flex Basis
         * @see https://tailwindcss.com/docs/flex-basis
         */
        basis: [{
          basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
        }],
        /**
         * Flex Direction
         * @see https://tailwindcss.com/docs/flex-direction
         */
        "flex-direction": [{
          flex: ["row", "row-reverse", "col", "col-reverse"]
        }],
        /**
         * Flex Wrap
         * @see https://tailwindcss.com/docs/flex-wrap
         */
        "flex-wrap": [{
          flex: ["nowrap", "wrap", "wrap-reverse"]
        }],
        /**
         * Flex
         * @see https://tailwindcss.com/docs/flex
         */
        flex: [{
          flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
        }],
        /**
         * Flex Grow
         * @see https://tailwindcss.com/docs/flex-grow
         */
        grow: [{
          grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Flex Shrink
         * @see https://tailwindcss.com/docs/flex-shrink
         */
        shrink: [{
          shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Order
         * @see https://tailwindcss.com/docs/order
         */
        order: [{
          order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Grid Template Columns
         * @see https://tailwindcss.com/docs/grid-template-columns
         */
        "grid-cols": [{
          "grid-cols": scaleGridTemplateColsRows()
        }],
        /**
         * Grid Column Start / End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start-end": [{
          col: scaleGridColRowStartAndEnd()
        }],
        /**
         * Grid Column Start
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start": [{
          "col-start": scaleGridColRowStartOrEnd()
        }],
        /**
         * Grid Column End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-end": [{
          "col-end": scaleGridColRowStartOrEnd()
        }],
        /**
         * Grid Template Rows
         * @see https://tailwindcss.com/docs/grid-template-rows
         */
        "grid-rows": [{
          "grid-rows": scaleGridTemplateColsRows()
        }],
        /**
         * Grid Row Start / End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start-end": [{
          row: scaleGridColRowStartAndEnd()
        }],
        /**
         * Grid Row Start
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start": [{
          "row-start": scaleGridColRowStartOrEnd()
        }],
        /**
         * Grid Row End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-end": [{
          "row-end": scaleGridColRowStartOrEnd()
        }],
        /**
         * Grid Auto Flow
         * @see https://tailwindcss.com/docs/grid-auto-flow
         */
        "grid-flow": [{
          "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
        }],
        /**
         * Grid Auto Columns
         * @see https://tailwindcss.com/docs/grid-auto-columns
         */
        "auto-cols": [{
          "auto-cols": scaleGridAutoColsRows()
        }],
        /**
         * Grid Auto Rows
         * @see https://tailwindcss.com/docs/grid-auto-rows
         */
        "auto-rows": [{
          "auto-rows": scaleGridAutoColsRows()
        }],
        /**
         * Gap
         * @see https://tailwindcss.com/docs/gap
         */
        gap: [{
          gap: scaleUnambiguousSpacing()
        }],
        /**
         * Gap X
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-x": [{
          "gap-x": scaleUnambiguousSpacing()
        }],
        /**
         * Gap Y
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-y": [{
          "gap-y": scaleUnambiguousSpacing()
        }],
        /**
         * Justify Content
         * @see https://tailwindcss.com/docs/justify-content
         */
        "justify-content": [{
          justify: [...scaleAlignPrimaryAxis(), "normal"]
        }],
        /**
         * Justify Items
         * @see https://tailwindcss.com/docs/justify-items
         */
        "justify-items": [{
          "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
        }],
        /**
         * Justify Self
         * @see https://tailwindcss.com/docs/justify-self
         */
        "justify-self": [{
          "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
        }],
        /**
         * Align Content
         * @see https://tailwindcss.com/docs/align-content
         */
        "align-content": [{
          content: ["normal", ...scaleAlignPrimaryAxis()]
        }],
        /**
         * Align Items
         * @see https://tailwindcss.com/docs/align-items
         */
        "align-items": [{
          items: [...scaleAlignSecondaryAxis(), {
            baseline: ["", "last"]
          }]
        }],
        /**
         * Align Self
         * @see https://tailwindcss.com/docs/align-self
         */
        "align-self": [{
          self: ["auto", ...scaleAlignSecondaryAxis(), {
            baseline: ["", "last"]
          }]
        }],
        /**
         * Place Content
         * @see https://tailwindcss.com/docs/place-content
         */
        "place-content": [{
          "place-content": scaleAlignPrimaryAxis()
        }],
        /**
         * Place Items
         * @see https://tailwindcss.com/docs/place-items
         */
        "place-items": [{
          "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
        }],
        /**
         * Place Self
         * @see https://tailwindcss.com/docs/place-self
         */
        "place-self": [{
          "place-self": ["auto", ...scaleAlignSecondaryAxis()]
        }],
        // Spacing
        /**
         * Padding
         * @see https://tailwindcss.com/docs/padding
         */
        p: [{
          p: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Inline
         * @see https://tailwindcss.com/docs/padding
         */
        px: [{
          px: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Block
         * @see https://tailwindcss.com/docs/padding
         */
        py: [{
          py: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Inline Start
         * @see https://tailwindcss.com/docs/padding
         */
        ps: [{
          ps: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Inline End
         * @see https://tailwindcss.com/docs/padding
         */
        pe: [{
          pe: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Block Start
         * @see https://tailwindcss.com/docs/padding
         */
        pbs: [{
          pbs: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Block End
         * @see https://tailwindcss.com/docs/padding
         */
        pbe: [{
          pbe: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Top
         * @see https://tailwindcss.com/docs/padding
         */
        pt: [{
          pt: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Right
         * @see https://tailwindcss.com/docs/padding
         */
        pr: [{
          pr: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Bottom
         * @see https://tailwindcss.com/docs/padding
         */
        pb: [{
          pb: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Left
         * @see https://tailwindcss.com/docs/padding
         */
        pl: [{
          pl: scaleUnambiguousSpacing()
        }],
        /**
         * Margin
         * @see https://tailwindcss.com/docs/margin
         */
        m: [{
          m: scaleMargin()
        }],
        /**
         * Margin Inline
         * @see https://tailwindcss.com/docs/margin
         */
        mx: [{
          mx: scaleMargin()
        }],
        /**
         * Margin Block
         * @see https://tailwindcss.com/docs/margin
         */
        my: [{
          my: scaleMargin()
        }],
        /**
         * Margin Inline Start
         * @see https://tailwindcss.com/docs/margin
         */
        ms: [{
          ms: scaleMargin()
        }],
        /**
         * Margin Inline End
         * @see https://tailwindcss.com/docs/margin
         */
        me: [{
          me: scaleMargin()
        }],
        /**
         * Margin Block Start
         * @see https://tailwindcss.com/docs/margin
         */
        mbs: [{
          mbs: scaleMargin()
        }],
        /**
         * Margin Block End
         * @see https://tailwindcss.com/docs/margin
         */
        mbe: [{
          mbe: scaleMargin()
        }],
        /**
         * Margin Top
         * @see https://tailwindcss.com/docs/margin
         */
        mt: [{
          mt: scaleMargin()
        }],
        /**
         * Margin Right
         * @see https://tailwindcss.com/docs/margin
         */
        mr: [{
          mr: scaleMargin()
        }],
        /**
         * Margin Bottom
         * @see https://tailwindcss.com/docs/margin
         */
        mb: [{
          mb: scaleMargin()
        }],
        /**
         * Margin Left
         * @see https://tailwindcss.com/docs/margin
         */
        ml: [{
          ml: scaleMargin()
        }],
        /**
         * Space Between X
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        "space-x": [{
          "space-x": scaleUnambiguousSpacing()
        }],
        /**
         * Space Between X Reverse
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        "space-x-reverse": ["space-x-reverse"],
        /**
         * Space Between Y
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        "space-y": [{
          "space-y": scaleUnambiguousSpacing()
        }],
        /**
         * Space Between Y Reverse
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        "space-y-reverse": ["space-y-reverse"],
        // --------------
        // --- Sizing ---
        // --------------
        /**
         * Size
         * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
         */
        size: [{
          size: scaleSizing()
        }],
        /**
         * Inline Size
         * @see https://tailwindcss.com/docs/width
         */
        "inline-size": [{
          inline: ["auto", ...scaleSizingInline()]
        }],
        /**
         * Min-Inline Size
         * @see https://tailwindcss.com/docs/min-width
         */
        "min-inline-size": [{
          "min-inline": ["auto", ...scaleSizingInline()]
        }],
        /**
         * Max-Inline Size
         * @see https://tailwindcss.com/docs/max-width
         */
        "max-inline-size": [{
          "max-inline": ["none", ...scaleSizingInline()]
        }],
        /**
         * Block Size
         * @see https://tailwindcss.com/docs/height
         */
        "block-size": [{
          block: ["auto", ...scaleSizingBlock()]
        }],
        /**
         * Min-Block Size
         * @see https://tailwindcss.com/docs/min-height
         */
        "min-block-size": [{
          "min-block": ["auto", ...scaleSizingBlock()]
        }],
        /**
         * Max-Block Size
         * @see https://tailwindcss.com/docs/max-height
         */
        "max-block-size": [{
          "max-block": ["none", ...scaleSizingBlock()]
        }],
        /**
         * Width
         * @see https://tailwindcss.com/docs/width
         */
        w: [{
          w: [themeContainer, "screen", ...scaleSizing()]
        }],
        /**
         * Min-Width
         * @see https://tailwindcss.com/docs/min-width
         */
        "min-w": [{
          "min-w": [
            themeContainer,
            "screen",
            /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
            "none",
            ...scaleSizing()
          ]
        }],
        /**
         * Max-Width
         * @see https://tailwindcss.com/docs/max-width
         */
        "max-w": [{
          "max-w": [
            themeContainer,
            "screen",
            "none",
            /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
            "prose",
            /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
            {
              screen: [themeBreakpoint]
            },
            ...scaleSizing()
          ]
        }],
        /**
         * Height
         * @see https://tailwindcss.com/docs/height
         */
        h: [{
          h: ["screen", "lh", ...scaleSizing()]
        }],
        /**
         * Min-Height
         * @see https://tailwindcss.com/docs/min-height
         */
        "min-h": [{
          "min-h": ["screen", "lh", "none", ...scaleSizing()]
        }],
        /**
         * Max-Height
         * @see https://tailwindcss.com/docs/max-height
         */
        "max-h": [{
          "max-h": ["screen", "lh", ...scaleSizing()]
        }],
        // ------------------
        // --- Typography ---
        // ------------------
        /**
         * Font Size
         * @see https://tailwindcss.com/docs/font-size
         */
        "font-size": [{
          text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
        }],
        /**
         * Font Smoothing
         * @see https://tailwindcss.com/docs/font-smoothing
         */
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        /**
         * Font Style
         * @see https://tailwindcss.com/docs/font-style
         */
        "font-style": ["italic", "not-italic"],
        /**
         * Font Weight
         * @see https://tailwindcss.com/docs/font-weight
         */
        "font-weight": [{
          font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
        }],
        /**
         * Font Stretch
         * @see https://tailwindcss.com/docs/font-stretch
         */
        "font-stretch": [{
          "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
        }],
        /**
         * Font Family
         * @see https://tailwindcss.com/docs/font-family
         */
        "font-family": [{
          font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
        }],
        /**
         * Font Feature Settings
         * @see https://tailwindcss.com/docs/font-feature-settings
         */
        "font-features": [{
          "font-features": [isArbitraryValue]
        }],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-normal": ["normal-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-ordinal": ["ordinal"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-slashed-zero": ["slashed-zero"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        /**
         * Letter Spacing
         * @see https://tailwindcss.com/docs/letter-spacing
         */
        tracking: [{
          tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Line Clamp
         * @see https://tailwindcss.com/docs/line-clamp
         */
        "line-clamp": [{
          "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
        }],
        /**
         * Line Height
         * @see https://tailwindcss.com/docs/line-height
         */
        leading: [{
          leading: [
            /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
            themeLeading,
            ...scaleUnambiguousSpacing()
          ]
        }],
        /**
         * List Style Image
         * @see https://tailwindcss.com/docs/list-style-image
         */
        "list-image": [{
          "list-image": ["none", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * List Style Position
         * @see https://tailwindcss.com/docs/list-style-position
         */
        "list-style-position": [{
          list: ["inside", "outside"]
        }],
        /**
         * List Style Type
         * @see https://tailwindcss.com/docs/list-style-type
         */
        "list-style-type": [{
          list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Text Alignment
         * @see https://tailwindcss.com/docs/text-align
         */
        "text-alignment": [{
          text: ["left", "center", "right", "justify", "start", "end"]
        }],
        /**
         * Placeholder Color
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://v3.tailwindcss.com/docs/placeholder-color
         */
        "placeholder-color": [{
          placeholder: scaleColor()
        }],
        /**
         * Text Color
         * @see https://tailwindcss.com/docs/text-color
         */
        "text-color": [{
          text: scaleColor()
        }],
        /**
         * Text Decoration
         * @see https://tailwindcss.com/docs/text-decoration
         */
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        /**
         * Text Decoration Style
         * @see https://tailwindcss.com/docs/text-decoration-style
         */
        "text-decoration-style": [{
          decoration: [...scaleLineStyle(), "wavy"]
        }],
        /**
         * Text Decoration Thickness
         * @see https://tailwindcss.com/docs/text-decoration-thickness
         */
        "text-decoration-thickness": [{
          decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
        }],
        /**
         * Text Decoration Color
         * @see https://tailwindcss.com/docs/text-decoration-color
         */
        "text-decoration-color": [{
          decoration: scaleColor()
        }],
        /**
         * Text Underline Offset
         * @see https://tailwindcss.com/docs/text-underline-offset
         */
        "underline-offset": [{
          "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Text Transform
         * @see https://tailwindcss.com/docs/text-transform
         */
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        /**
         * Text Overflow
         * @see https://tailwindcss.com/docs/text-overflow
         */
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        /**
         * Text Wrap
         * @see https://tailwindcss.com/docs/text-wrap
         */
        "text-wrap": [{
          text: ["wrap", "nowrap", "balance", "pretty"]
        }],
        /**
         * Text Indent
         * @see https://tailwindcss.com/docs/text-indent
         */
        indent: [{
          indent: scaleUnambiguousSpacing()
        }],
        /**
         * Tab Size
         * @see https://tailwindcss.com/docs/tab-size
         */
        "tab-size": [{
          tab: [isInteger, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Vertical Alignment
         * @see https://tailwindcss.com/docs/vertical-align
         */
        "vertical-align": [{
          align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Whitespace
         * @see https://tailwindcss.com/docs/whitespace
         */
        whitespace: [{
          whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
        }],
        /**
         * Word Break
         * @see https://tailwindcss.com/docs/word-break
         */
        break: [{
          break: ["normal", "words", "all", "keep"]
        }],
        /**
         * Overflow Wrap
         * @see https://tailwindcss.com/docs/overflow-wrap
         */
        wrap: [{
          wrap: ["break-word", "anywhere", "normal"]
        }],
        /**
         * Hyphens
         * @see https://tailwindcss.com/docs/hyphens
         */
        hyphens: [{
          hyphens: ["none", "manual", "auto"]
        }],
        /**
         * Content
         * @see https://tailwindcss.com/docs/content
         */
        content: [{
          content: ["none", isArbitraryVariable, isArbitraryValue]
        }],
        // -------------------
        // --- Backgrounds ---
        // -------------------
        /**
         * Background Attachment
         * @see https://tailwindcss.com/docs/background-attachment
         */
        "bg-attachment": [{
          bg: ["fixed", "local", "scroll"]
        }],
        /**
         * Background Clip
         * @see https://tailwindcss.com/docs/background-clip
         */
        "bg-clip": [{
          "bg-clip": ["border", "padding", "content", "text"]
        }],
        /**
         * Background Origin
         * @see https://tailwindcss.com/docs/background-origin
         */
        "bg-origin": [{
          "bg-origin": ["border", "padding", "content"]
        }],
        /**
         * Background Position
         * @see https://tailwindcss.com/docs/background-position
         */
        "bg-position": [{
          bg: scaleBgPosition()
        }],
        /**
         * Background Repeat
         * @see https://tailwindcss.com/docs/background-repeat
         */
        "bg-repeat": [{
          bg: scaleBgRepeat()
        }],
        /**
         * Background Size
         * @see https://tailwindcss.com/docs/background-size
         */
        "bg-size": [{
          bg: scaleBgSize()
        }],
        /**
         * Background Image
         * @see https://tailwindcss.com/docs/background-image
         */
        "bg-image": [{
          bg: ["none", {
            linear: [{
              to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
            }, isInteger, isArbitraryVariable, isArbitraryValue],
            radial: ["", isArbitraryVariable, isArbitraryValue],
            conic: [isInteger, isArbitraryVariable, isArbitraryValue]
          }, isArbitraryVariableImage, isArbitraryImage]
        }],
        /**
         * Background Color
         * @see https://tailwindcss.com/docs/background-color
         */
        "bg-color": [{
          bg: scaleColor()
        }],
        /**
         * Gradient Color Stops From Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from-pos": [{
          from: scaleGradientStopPosition()
        }],
        /**
         * Gradient Color Stops Via Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via-pos": [{
          via: scaleGradientStopPosition()
        }],
        /**
         * Gradient Color Stops To Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to-pos": [{
          to: scaleGradientStopPosition()
        }],
        /**
         * Gradient Color Stops From
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from": [{
          from: scaleColor()
        }],
        /**
         * Gradient Color Stops Via
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via": [{
          via: scaleColor()
        }],
        /**
         * Gradient Color Stops To
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to": [{
          to: scaleColor()
        }],
        // ---------------
        // --- Borders ---
        // ---------------
        /**
         * Border Radius
         * @see https://tailwindcss.com/docs/border-radius
         */
        rounded: [{
          rounded: scaleRadius()
        }],
        /**
         * Border Radius Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-s": [{
          "rounded-s": scaleRadius()
        }],
        /**
         * Border Radius End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-e": [{
          "rounded-e": scaleRadius()
        }],
        /**
         * Border Radius Top
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-t": [{
          "rounded-t": scaleRadius()
        }],
        /**
         * Border Radius Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-r": [{
          "rounded-r": scaleRadius()
        }],
        /**
         * Border Radius Bottom
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-b": [{
          "rounded-b": scaleRadius()
        }],
        /**
         * Border Radius Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-l": [{
          "rounded-l": scaleRadius()
        }],
        /**
         * Border Radius Start Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ss": [{
          "rounded-ss": scaleRadius()
        }],
        /**
         * Border Radius Start End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-se": [{
          "rounded-se": scaleRadius()
        }],
        /**
         * Border Radius End End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ee": [{
          "rounded-ee": scaleRadius()
        }],
        /**
         * Border Radius End Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-es": [{
          "rounded-es": scaleRadius()
        }],
        /**
         * Border Radius Top Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tl": [{
          "rounded-tl": scaleRadius()
        }],
        /**
         * Border Radius Top Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tr": [{
          "rounded-tr": scaleRadius()
        }],
        /**
         * Border Radius Bottom Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-br": [{
          "rounded-br": scaleRadius()
        }],
        /**
         * Border Radius Bottom Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-bl": [{
          "rounded-bl": scaleRadius()
        }],
        /**
         * Border Width
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w": [{
          border: scaleBorderWidth()
        }],
        /**
         * Border Width Inline
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-x": [{
          "border-x": scaleBorderWidth()
        }],
        /**
         * Border Width Block
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-y": [{
          "border-y": scaleBorderWidth()
        }],
        /**
         * Border Width Inline Start
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-s": [{
          "border-s": scaleBorderWidth()
        }],
        /**
         * Border Width Inline End
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-e": [{
          "border-e": scaleBorderWidth()
        }],
        /**
         * Border Width Block Start
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-bs": [{
          "border-bs": scaleBorderWidth()
        }],
        /**
         * Border Width Block End
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-be": [{
          "border-be": scaleBorderWidth()
        }],
        /**
         * Border Width Top
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-t": [{
          "border-t": scaleBorderWidth()
        }],
        /**
         * Border Width Right
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-r": [{
          "border-r": scaleBorderWidth()
        }],
        /**
         * Border Width Bottom
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-b": [{
          "border-b": scaleBorderWidth()
        }],
        /**
         * Border Width Left
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-l": [{
          "border-l": scaleBorderWidth()
        }],
        /**
         * Divide Width X
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        "divide-x": [{
          "divide-x": scaleBorderWidth()
        }],
        /**
         * Divide Width X Reverse
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        "divide-x-reverse": ["divide-x-reverse"],
        /**
         * Divide Width Y
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        "divide-y": [{
          "divide-y": scaleBorderWidth()
        }],
        /**
         * Divide Width Y Reverse
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        "divide-y-reverse": ["divide-y-reverse"],
        /**
         * Border Style
         * @see https://tailwindcss.com/docs/border-style
         */
        "border-style": [{
          border: [...scaleLineStyle(), "hidden", "none"]
        }],
        /**
         * Divide Style
         * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
         */
        "divide-style": [{
          divide: [...scaleLineStyle(), "hidden", "none"]
        }],
        /**
         * Border Color
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color": [{
          border: scaleColor()
        }],
        /**
         * Border Color Inline
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-x": [{
          "border-x": scaleColor()
        }],
        /**
         * Border Color Block
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-y": [{
          "border-y": scaleColor()
        }],
        /**
         * Border Color Inline Start
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-s": [{
          "border-s": scaleColor()
        }],
        /**
         * Border Color Inline End
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-e": [{
          "border-e": scaleColor()
        }],
        /**
         * Border Color Block Start
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-bs": [{
          "border-bs": scaleColor()
        }],
        /**
         * Border Color Block End
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-be": [{
          "border-be": scaleColor()
        }],
        /**
         * Border Color Top
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-t": [{
          "border-t": scaleColor()
        }],
        /**
         * Border Color Right
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-r": [{
          "border-r": scaleColor()
        }],
        /**
         * Border Color Bottom
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-b": [{
          "border-b": scaleColor()
        }],
        /**
         * Border Color Left
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-l": [{
          "border-l": scaleColor()
        }],
        /**
         * Divide Color
         * @see https://tailwindcss.com/docs/divide-color
         */
        "divide-color": [{
          divide: scaleColor()
        }],
        /**
         * Outline Style
         * @see https://tailwindcss.com/docs/outline-style
         */
        "outline-style": [{
          outline: [...scaleLineStyle(), "none", "hidden"]
        }],
        /**
         * Outline Offset
         * @see https://tailwindcss.com/docs/outline-offset
         */
        "outline-offset": [{
          "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Outline Width
         * @see https://tailwindcss.com/docs/outline-width
         */
        "outline-w": [{
          outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
        }],
        /**
         * Outline Color
         * @see https://tailwindcss.com/docs/outline-color
         */
        "outline-color": [{
          outline: scaleColor()
        }],
        // ---------------
        // --- Effects ---
        // ---------------
        /**
         * Box Shadow
         * @see https://tailwindcss.com/docs/box-shadow
         */
        shadow: [{
          shadow: [
            // Deprecated since Tailwind CSS v4.0.0
            "",
            "none",
            themeShadow,
            isArbitraryVariableShadow,
            isArbitraryShadow
          ]
        }],
        /**
         * Box Shadow Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
         */
        "shadow-color": [{
          shadow: scaleColor()
        }],
        /**
         * Inset Box Shadow
         * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
         */
        "inset-shadow": [{
          "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
        }],
        /**
         * Inset Box Shadow Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
         */
        "inset-shadow-color": [{
          "inset-shadow": scaleColor()
        }],
        /**
         * Ring Width
         * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
         */
        "ring-w": [{
          ring: scaleBorderWidth()
        }],
        /**
         * Ring Width Inset
         * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
         * @deprecated since Tailwind CSS v4.0.0
         * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
         */
        "ring-w-inset": ["ring-inset"],
        /**
         * Ring Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
         */
        "ring-color": [{
          ring: scaleColor()
        }],
        /**
         * Ring Offset Width
         * @see https://v3.tailwindcss.com/docs/ring-offset-width
         * @deprecated since Tailwind CSS v4.0.0
         * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
         */
        "ring-offset-w": [{
          "ring-offset": [isNumber, isArbitraryLength]
        }],
        /**
         * Ring Offset Color
         * @see https://v3.tailwindcss.com/docs/ring-offset-color
         * @deprecated since Tailwind CSS v4.0.0
         * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
         */
        "ring-offset-color": [{
          "ring-offset": scaleColor()
        }],
        /**
         * Inset Ring Width
         * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
         */
        "inset-ring-w": [{
          "inset-ring": scaleBorderWidth()
        }],
        /**
         * Inset Ring Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
         */
        "inset-ring-color": [{
          "inset-ring": scaleColor()
        }],
        /**
         * Text Shadow
         * @see https://tailwindcss.com/docs/text-shadow
         */
        "text-shadow": [{
          "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
        }],
        /**
         * Text Shadow Color
         * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
         */
        "text-shadow-color": [{
          "text-shadow": scaleColor()
        }],
        /**
         * Opacity
         * @see https://tailwindcss.com/docs/opacity
         */
        opacity: [{
          opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Mix Blend Mode
         * @see https://tailwindcss.com/docs/mix-blend-mode
         */
        "mix-blend": [{
          "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
        }],
        /**
         * Background Blend Mode
         * @see https://tailwindcss.com/docs/background-blend-mode
         */
        "bg-blend": [{
          "bg-blend": scaleBlendMode()
        }],
        /**
         * Mask Clip
         * @see https://tailwindcss.com/docs/mask-clip
         */
        "mask-clip": [{
          "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
        }, "mask-no-clip"],
        /**
         * Mask Composite
         * @see https://tailwindcss.com/docs/mask-composite
         */
        "mask-composite": [{
          mask: ["add", "subtract", "intersect", "exclude"]
        }],
        /**
         * Mask Image
         * @see https://tailwindcss.com/docs/mask-image
         */
        "mask-image-linear-pos": [{
          "mask-linear": [isNumber]
        }],
        "mask-image-linear-from-pos": [{
          "mask-linear-from": scaleMaskImagePosition()
        }],
        "mask-image-linear-to-pos": [{
          "mask-linear-to": scaleMaskImagePosition()
        }],
        "mask-image-linear-from-color": [{
          "mask-linear-from": scaleColor()
        }],
        "mask-image-linear-to-color": [{
          "mask-linear-to": scaleColor()
        }],
        "mask-image-t-from-pos": [{
          "mask-t-from": scaleMaskImagePosition()
        }],
        "mask-image-t-to-pos": [{
          "mask-t-to": scaleMaskImagePosition()
        }],
        "mask-image-t-from-color": [{
          "mask-t-from": scaleColor()
        }],
        "mask-image-t-to-color": [{
          "mask-t-to": scaleColor()
        }],
        "mask-image-r-from-pos": [{
          "mask-r-from": scaleMaskImagePosition()
        }],
        "mask-image-r-to-pos": [{
          "mask-r-to": scaleMaskImagePosition()
        }],
        "mask-image-r-from-color": [{
          "mask-r-from": scaleColor()
        }],
        "mask-image-r-to-color": [{
          "mask-r-to": scaleColor()
        }],
        "mask-image-b-from-pos": [{
          "mask-b-from": scaleMaskImagePosition()
        }],
        "mask-image-b-to-pos": [{
          "mask-b-to": scaleMaskImagePosition()
        }],
        "mask-image-b-from-color": [{
          "mask-b-from": scaleColor()
        }],
        "mask-image-b-to-color": [{
          "mask-b-to": scaleColor()
        }],
        "mask-image-l-from-pos": [{
          "mask-l-from": scaleMaskImagePosition()
        }],
        "mask-image-l-to-pos": [{
          "mask-l-to": scaleMaskImagePosition()
        }],
        "mask-image-l-from-color": [{
          "mask-l-from": scaleColor()
        }],
        "mask-image-l-to-color": [{
          "mask-l-to": scaleColor()
        }],
        "mask-image-x-from-pos": [{
          "mask-x-from": scaleMaskImagePosition()
        }],
        "mask-image-x-to-pos": [{
          "mask-x-to": scaleMaskImagePosition()
        }],
        "mask-image-x-from-color": [{
          "mask-x-from": scaleColor()
        }],
        "mask-image-x-to-color": [{
          "mask-x-to": scaleColor()
        }],
        "mask-image-y-from-pos": [{
          "mask-y-from": scaleMaskImagePosition()
        }],
        "mask-image-y-to-pos": [{
          "mask-y-to": scaleMaskImagePosition()
        }],
        "mask-image-y-from-color": [{
          "mask-y-from": scaleColor()
        }],
        "mask-image-y-to-color": [{
          "mask-y-to": scaleColor()
        }],
        "mask-image-radial": [{
          "mask-radial": [isArbitraryVariable, isArbitraryValue]
        }],
        "mask-image-radial-from-pos": [{
          "mask-radial-from": scaleMaskImagePosition()
        }],
        "mask-image-radial-to-pos": [{
          "mask-radial-to": scaleMaskImagePosition()
        }],
        "mask-image-radial-from-color": [{
          "mask-radial-from": scaleColor()
        }],
        "mask-image-radial-to-color": [{
          "mask-radial-to": scaleColor()
        }],
        "mask-image-radial-shape": [{
          "mask-radial": ["circle", "ellipse"]
        }],
        "mask-image-radial-size": [{
          "mask-radial": [{
            closest: ["side", "corner"],
            farthest: ["side", "corner"]
          }]
        }],
        "mask-image-radial-pos": [{
          "mask-radial-at": scalePosition()
        }],
        "mask-image-conic-pos": [{
          "mask-conic": [isNumber]
        }],
        "mask-image-conic-from-pos": [{
          "mask-conic-from": scaleMaskImagePosition()
        }],
        "mask-image-conic-to-pos": [{
          "mask-conic-to": scaleMaskImagePosition()
        }],
        "mask-image-conic-from-color": [{
          "mask-conic-from": scaleColor()
        }],
        "mask-image-conic-to-color": [{
          "mask-conic-to": scaleColor()
        }],
        /**
         * Mask Mode
         * @see https://tailwindcss.com/docs/mask-mode
         */
        "mask-mode": [{
          mask: ["alpha", "luminance", "match"]
        }],
        /**
         * Mask Origin
         * @see https://tailwindcss.com/docs/mask-origin
         */
        "mask-origin": [{
          "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
        }],
        /**
         * Mask Position
         * @see https://tailwindcss.com/docs/mask-position
         */
        "mask-position": [{
          mask: scaleBgPosition()
        }],
        /**
         * Mask Repeat
         * @see https://tailwindcss.com/docs/mask-repeat
         */
        "mask-repeat": [{
          mask: scaleBgRepeat()
        }],
        /**
         * Mask Size
         * @see https://tailwindcss.com/docs/mask-size
         */
        "mask-size": [{
          mask: scaleBgSize()
        }],
        /**
         * Mask Type
         * @see https://tailwindcss.com/docs/mask-type
         */
        "mask-type": [{
          "mask-type": ["alpha", "luminance"]
        }],
        /**
         * Mask Image
         * @see https://tailwindcss.com/docs/mask-image
         */
        "mask-image": [{
          mask: ["none", isArbitraryVariable, isArbitraryValue]
        }],
        // ---------------
        // --- Filters ---
        // ---------------
        /**
         * Filter
         * @see https://tailwindcss.com/docs/filter
         */
        filter: [{
          filter: [
            // Deprecated since Tailwind CSS v3.0.0
            "",
            "none",
            isArbitraryVariable,
            isArbitraryValue
          ]
        }],
        /**
         * Blur
         * @see https://tailwindcss.com/docs/blur
         */
        blur: [{
          blur: scaleBlur()
        }],
        /**
         * Brightness
         * @see https://tailwindcss.com/docs/brightness
         */
        brightness: [{
          brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Contrast
         * @see https://tailwindcss.com/docs/contrast
         */
        contrast: [{
          contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Drop Shadow
         * @see https://tailwindcss.com/docs/drop-shadow
         */
        "drop-shadow": [{
          "drop-shadow": [
            // Deprecated since Tailwind CSS v4.0.0
            "",
            "none",
            themeDropShadow,
            isArbitraryVariableShadow,
            isArbitraryShadow
          ]
        }],
        /**
         * Drop Shadow Color
         * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
         */
        "drop-shadow-color": [{
          "drop-shadow": scaleColor()
        }],
        /**
         * Grayscale
         * @see https://tailwindcss.com/docs/grayscale
         */
        grayscale: [{
          grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Hue Rotate
         * @see https://tailwindcss.com/docs/hue-rotate
         */
        "hue-rotate": [{
          "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Invert
         * @see https://tailwindcss.com/docs/invert
         */
        invert: [{
          invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Saturate
         * @see https://tailwindcss.com/docs/saturate
         */
        saturate: [{
          saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Sepia
         * @see https://tailwindcss.com/docs/sepia
         */
        sepia: [{
          sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Filter
         * @see https://tailwindcss.com/docs/backdrop-filter
         */
        "backdrop-filter": [{
          "backdrop-filter": [
            // Deprecated since Tailwind CSS v3.0.0
            "",
            "none",
            isArbitraryVariable,
            isArbitraryValue
          ]
        }],
        /**
         * Backdrop Blur
         * @see https://tailwindcss.com/docs/backdrop-blur
         */
        "backdrop-blur": [{
          "backdrop-blur": scaleBlur()
        }],
        /**
         * Backdrop Brightness
         * @see https://tailwindcss.com/docs/backdrop-brightness
         */
        "backdrop-brightness": [{
          "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Contrast
         * @see https://tailwindcss.com/docs/backdrop-contrast
         */
        "backdrop-contrast": [{
          "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Grayscale
         * @see https://tailwindcss.com/docs/backdrop-grayscale
         */
        "backdrop-grayscale": [{
          "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Hue Rotate
         * @see https://tailwindcss.com/docs/backdrop-hue-rotate
         */
        "backdrop-hue-rotate": [{
          "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Invert
         * @see https://tailwindcss.com/docs/backdrop-invert
         */
        "backdrop-invert": [{
          "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Opacity
         * @see https://tailwindcss.com/docs/backdrop-opacity
         */
        "backdrop-opacity": [{
          "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Saturate
         * @see https://tailwindcss.com/docs/backdrop-saturate
         */
        "backdrop-saturate": [{
          "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Sepia
         * @see https://tailwindcss.com/docs/backdrop-sepia
         */
        "backdrop-sepia": [{
          "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        // --------------
        // --- Tables ---
        // --------------
        /**
         * Border Collapse
         * @see https://tailwindcss.com/docs/border-collapse
         */
        "border-collapse": [{
          border: ["collapse", "separate"]
        }],
        /**
         * Border Spacing
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing": [{
          "border-spacing": scaleUnambiguousSpacing()
        }],
        /**
         * Border Spacing X
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-x": [{
          "border-spacing-x": scaleUnambiguousSpacing()
        }],
        /**
         * Border Spacing Y
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-y": [{
          "border-spacing-y": scaleUnambiguousSpacing()
        }],
        /**
         * Table Layout
         * @see https://tailwindcss.com/docs/table-layout
         */
        "table-layout": [{
          table: ["auto", "fixed"]
        }],
        /**
         * Caption Side
         * @see https://tailwindcss.com/docs/caption-side
         */
        caption: [{
          caption: ["top", "bottom"]
        }],
        // ---------------------------------
        // --- Transitions and Animation ---
        // ---------------------------------
        /**
         * Transition Property
         * @see https://tailwindcss.com/docs/transition-property
         */
        transition: [{
          transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Transition Behavior
         * @see https://tailwindcss.com/docs/transition-behavior
         */
        "transition-behavior": [{
          transition: ["normal", "discrete"]
        }],
        /**
         * Transition Duration
         * @see https://tailwindcss.com/docs/transition-duration
         */
        duration: [{
          duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Transition Timing Function
         * @see https://tailwindcss.com/docs/transition-timing-function
         */
        ease: [{
          ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Transition Delay
         * @see https://tailwindcss.com/docs/transition-delay
         */
        delay: [{
          delay: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Animation
         * @see https://tailwindcss.com/docs/animation
         */
        animate: [{
          animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
        }],
        // ------------------
        // --- Transforms ---
        // ------------------
        /**
         * Backface Visibility
         * @see https://tailwindcss.com/docs/backface-visibility
         */
        backface: [{
          backface: ["hidden", "visible"]
        }],
        /**
         * Perspective
         * @see https://tailwindcss.com/docs/perspective
         */
        perspective: [{
          perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Perspective Origin
         * @see https://tailwindcss.com/docs/perspective-origin
         */
        "perspective-origin": [{
          "perspective-origin": scalePositionWithArbitrary()
        }],
        /**
         * Rotate
         * @see https://tailwindcss.com/docs/rotate
         */
        rotate: [{
          rotate: scaleRotate()
        }],
        /**
         * Rotate X
         * @see https://tailwindcss.com/docs/rotate
         */
        "rotate-x": [{
          "rotate-x": scaleRotate()
        }],
        /**
         * Rotate Y
         * @see https://tailwindcss.com/docs/rotate
         */
        "rotate-y": [{
          "rotate-y": scaleRotate()
        }],
        /**
         * Rotate Z
         * @see https://tailwindcss.com/docs/rotate
         */
        "rotate-z": [{
          "rotate-z": scaleRotate()
        }],
        /**
         * Scale
         * @see https://tailwindcss.com/docs/scale
         */
        scale: [{
          scale: scaleScale()
        }],
        /**
         * Scale X
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-x": [{
          "scale-x": scaleScale()
        }],
        /**
         * Scale Y
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-y": [{
          "scale-y": scaleScale()
        }],
        /**
         * Scale Z
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-z": [{
          "scale-z": scaleScale()
        }],
        /**
         * Scale 3D
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-3d": ["scale-3d"],
        /**
         * Skew
         * @see https://tailwindcss.com/docs/skew
         */
        skew: [{
          skew: scaleSkew()
        }],
        /**
         * Skew X
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-x": [{
          "skew-x": scaleSkew()
        }],
        /**
         * Skew Y
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-y": [{
          "skew-y": scaleSkew()
        }],
        /**
         * Transform
         * @see https://tailwindcss.com/docs/transform
         */
        transform: [{
          transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
        }],
        /**
         * Transform Origin
         * @see https://tailwindcss.com/docs/transform-origin
         */
        "transform-origin": [{
          origin: scalePositionWithArbitrary()
        }],
        /**
         * Transform Style
         * @see https://tailwindcss.com/docs/transform-style
         */
        "transform-style": [{
          transform: ["3d", "flat"]
        }],
        /**
         * Translate
         * @see https://tailwindcss.com/docs/translate
         */
        translate: [{
          translate: scaleTranslate()
        }],
        /**
         * Translate X
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-x": [{
          "translate-x": scaleTranslate()
        }],
        /**
         * Translate Y
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-y": [{
          "translate-y": scaleTranslate()
        }],
        /**
         * Translate Z
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-z": [{
          "translate-z": scaleTranslate()
        }],
        /**
         * Translate None
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-none": ["translate-none"],
        /**
         * Zoom
         * @see https://tailwindcss.com/docs/zoom
         */
        zoom: [{
          zoom: [isInteger, isArbitraryVariable, isArbitraryValue]
        }],
        // ---------------------
        // --- Interactivity ---
        // ---------------------
        /**
         * Accent Color
         * @see https://tailwindcss.com/docs/accent-color
         */
        accent: [{
          accent: scaleColor()
        }],
        /**
         * Appearance
         * @see https://tailwindcss.com/docs/appearance
         */
        appearance: [{
          appearance: ["none", "auto"]
        }],
        /**
         * Caret Color
         * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
         */
        "caret-color": [{
          caret: scaleColor()
        }],
        /**
         * Color Scheme
         * @see https://tailwindcss.com/docs/color-scheme
         */
        "color-scheme": [{
          scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
        }],
        /**
         * Cursor
         * @see https://tailwindcss.com/docs/cursor
         */
        cursor: [{
          cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Field Sizing
         * @see https://tailwindcss.com/docs/field-sizing
         */
        "field-sizing": [{
          "field-sizing": ["fixed", "content"]
        }],
        /**
         * Pointer Events
         * @see https://tailwindcss.com/docs/pointer-events
         */
        "pointer-events": [{
          "pointer-events": ["auto", "none"]
        }],
        /**
         * Resize
         * @see https://tailwindcss.com/docs/resize
         */
        resize: [{
          resize: ["none", "", "y", "x"]
        }],
        /**
         * Scroll Behavior
         * @see https://tailwindcss.com/docs/scroll-behavior
         */
        "scroll-behavior": [{
          scroll: ["auto", "smooth"]
        }],
        /**
         * Scrollbar Thumb Color
         * @see https://tailwindcss.com/docs/scrollbar-color
         */
        "scrollbar-thumb-color": [{
          "scrollbar-thumb": scaleColor()
        }],
        /**
         * Scrollbar Track Color
         * @see https://tailwindcss.com/docs/scrollbar-color
         */
        "scrollbar-track-color": [{
          "scrollbar-track": scaleColor()
        }],
        /**
         * Scrollbar Gutter
         * @see https://tailwindcss.com/docs/scrollbar-gutter
         */
        "scrollbar-gutter": [{
          "scrollbar-gutter": ["auto", "stable", "both"]
        }],
        /**
         * Scrollbar Width
         * @see https://tailwindcss.com/docs/scrollbar-width
         */
        "scrollbar-w": [{
          scrollbar: ["auto", "thin", "none"]
        }],
        /**
         * Scroll Margin
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-m": [{
          "scroll-m": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Inline
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mx": [{
          "scroll-mx": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Block
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-my": [{
          "scroll-my": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Inline Start
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ms": [{
          "scroll-ms": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Inline End
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-me": [{
          "scroll-me": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Block Start
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mbs": [{
          "scroll-mbs": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Block End
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mbe": [{
          "scroll-mbe": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Top
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mt": [{
          "scroll-mt": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Right
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mr": [{
          "scroll-mr": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Bottom
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mb": [{
          "scroll-mb": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Left
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ml": [{
          "scroll-ml": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-p": [{
          "scroll-p": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Inline
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-px": [{
          "scroll-px": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Block
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-py": [{
          "scroll-py": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Inline Start
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-ps": [{
          "scroll-ps": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Inline End
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pe": [{
          "scroll-pe": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Block Start
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pbs": [{
          "scroll-pbs": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Block End
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pbe": [{
          "scroll-pbe": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Top
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pt": [{
          "scroll-pt": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Right
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pr": [{
          "scroll-pr": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Bottom
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pb": [{
          "scroll-pb": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Left
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pl": [{
          "scroll-pl": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Snap Align
         * @see https://tailwindcss.com/docs/scroll-snap-align
         */
        "snap-align": [{
          snap: ["start", "end", "center", "align-none"]
        }],
        /**
         * Scroll Snap Stop
         * @see https://tailwindcss.com/docs/scroll-snap-stop
         */
        "snap-stop": [{
          snap: ["normal", "always"]
        }],
        /**
         * Scroll Snap Type
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-type": [{
          snap: ["none", "x", "y", "both"]
        }],
        /**
         * Scroll Snap Type Strictness
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-strictness": [{
          snap: ["mandatory", "proximity"]
        }],
        /**
         * Touch Action
         * @see https://tailwindcss.com/docs/touch-action
         */
        touch: [{
          touch: ["auto", "none", "manipulation"]
        }],
        /**
         * Touch Action X
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-x": [{
          "touch-pan": ["x", "left", "right"]
        }],
        /**
         * Touch Action Y
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-y": [{
          "touch-pan": ["y", "up", "down"]
        }],
        /**
         * Touch Action Pinch Zoom
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-pz": ["touch-pinch-zoom"],
        /**
         * User Select
         * @see https://tailwindcss.com/docs/user-select
         */
        select: [{
          select: ["none", "text", "all", "auto"]
        }],
        /**
         * Will Change
         * @see https://tailwindcss.com/docs/will-change
         */
        "will-change": [{
          "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
        }],
        // -----------
        // --- SVG ---
        // -----------
        /**
         * Fill
         * @see https://tailwindcss.com/docs/fill
         */
        fill: [{
          fill: ["none", ...scaleColor()]
        }],
        /**
         * Stroke Width
         * @see https://tailwindcss.com/docs/stroke-width
         */
        "stroke-w": [{
          stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
        }],
        /**
         * Stroke
         * @see https://tailwindcss.com/docs/stroke
         */
        stroke: [{
          stroke: ["none", ...scaleColor()]
        }],
        // ---------------------
        // --- Accessibility ---
        // ---------------------
        /**
         * Forced Color Adjust
         * @see https://tailwindcss.com/docs/forced-color-adjust
         */
        "forced-color-adjust": [{
          "forced-color-adjust": ["auto", "none"]
        }]
      },
      conflictingClassGroups: {
        "container-named": ["container-type"],
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"]
      },
      conflictingClassGroupModifiers: {
        "font-size": ["leading"]
      },
      postfixLookupClassGroups: ["container-type"],
      orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
    };
  };
  var mergeConfigs = (baseConfig, {
    cacheSize,
    prefix,
    experimentalParseClassName,
    extend = {},
    override = {}
  }) => {
    overrideProperty(baseConfig, "cacheSize", cacheSize);
    overrideProperty(baseConfig, "prefix", prefix);
    overrideProperty(baseConfig, "experimentalParseClassName", experimentalParseClassName);
    overrideConfigProperties(baseConfig.theme, override.theme);
    overrideConfigProperties(baseConfig.classGroups, override.classGroups);
    overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups);
    overrideConfigProperties(baseConfig.conflictingClassGroupModifiers, override.conflictingClassGroupModifiers);
    overrideProperty(baseConfig, "postfixLookupClassGroups", override.postfixLookupClassGroups);
    overrideProperty(baseConfig, "orderSensitiveModifiers", override.orderSensitiveModifiers);
    mergeConfigProperties(baseConfig.theme, extend.theme);
    mergeConfigProperties(baseConfig.classGroups, extend.classGroups);
    mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups);
    mergeConfigProperties(baseConfig.conflictingClassGroupModifiers, extend.conflictingClassGroupModifiers);
    mergeArrayProperties(baseConfig, extend, "postfixLookupClassGroups");
    mergeArrayProperties(baseConfig, extend, "orderSensitiveModifiers");
    return baseConfig;
  };
  var overrideProperty = (baseObject, overrideKey, overrideValue) => {
    if (overrideValue !== void 0) {
      baseObject[overrideKey] = overrideValue;
    }
  };
  var overrideConfigProperties = (baseObject, overrideObject) => {
    if (overrideObject) {
      for (const key in overrideObject) {
        overrideProperty(baseObject, key, overrideObject[key]);
      }
    }
  };
  var mergeConfigProperties = (baseObject, mergeObject) => {
    if (mergeObject) {
      for (const key in mergeObject) {
        mergeArrayProperties(baseObject, mergeObject, key);
      }
    }
  };
  var mergeArrayProperties = (baseObject, mergeObject, key) => {
    const mergeValue = mergeObject[key];
    if (mergeValue !== void 0) {
      baseObject[key] = baseObject[key] ? baseObject[key].concat(mergeValue) : mergeValue;
    }
  };
  var extendTailwindMerge = (configExtension, ...createConfig) => typeof configExtension === "function" ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(() => mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);

  // src/lib/utils.ts
  var twMerge = extendTailwindMerge({
    extend: {
      classGroups: {
        "font-size": [{ text: ["xxs", "compact"] }],
        tracking: [{ tracking: ["caps"] }]
      }
    }
  });
  function cn(...inputs) {
    return twMerge(clsx(inputs));
  }
  var focusRing = cn(
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-offset-surface-card",
    "focus-visible:ring-focus-ring-brand"
  );
  var secondaryDisabled = cn(
    "disabled:border-btn-secondary-border disabled:bg-transparent disabled:text-ink-body disabled:opacity-disabled",
    "disabled:hover:border-btn-secondary-border disabled:hover:bg-transparent",
    "aria-disabled:border-btn-secondary-border aria-disabled:bg-transparent aria-disabled:text-ink-body aria-disabled:opacity-disabled",
    "aria-disabled:hover:border-btn-secondary-border aria-disabled:hover:bg-transparent",
    "aria-disabled:pressed:border-btn-secondary-border aria-disabled:pressed:bg-transparent"
  );
  var ghostDisabled = cn(
    "disabled:bg-transparent disabled:text-ink-body disabled:opacity-disabled",
    "disabled:hover:bg-transparent disabled:hover:text-ink-body",
    "aria-disabled:bg-transparent aria-disabled:text-ink-body aria-disabled:opacity-disabled",
    "aria-disabled:hover:bg-transparent aria-disabled:hover:text-ink-body",
    "aria-disabled:pressed:bg-transparent aria-disabled:pressed:text-ink-body"
  );

  // src/components/Resizable/index.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var ResizablePanelGroup = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(qt, { className: cn("flex h-full w-full", className), ...props });
  var ResizablePanel = Qt;
  var ResizableHandle = ({
    withHandle,
    className,
    ...props
  }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    nn,
    {
      className: cn(
        "relative flex w-px items-center justify-center bg-stroke",
        "after:absolute after:inset-y-0 after:-right-1 after:-left-1",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring-brand focus-visible:ring-offset-1",
        "[&[data-resize-handle-state=drag]]:bg-brand-secondary/50",
        "[&[data-resize-handle-state=hover]]:bg-brand-secondary/30",
        className
      ),
      ...props,
      children: withHandle && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-stroke bg-stroke", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GripVertical, { className: "size-2.5" }) })
    }
  );

  // src/components/Resizable/Resizable.stories.tsx
  var import_jsx_runtime3 = __toESM(require_react_shim());
  var meta = {
    title: "Components/Resizable",
    component: ResizablePanelGroup,
    tags: ["autodocs"],
    parameters: { layout: "padded" },
    args: {
      orientation: "horizontal"
    },
    argTypes: {
      orientation: {
        control: "select",
        options: ["horizontal", "vertical"]
      },
      children: { control: false },
      className: { control: false }
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "h-80 w-full rounded-md border border-stroke", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Story, {}) })
    ]
  };
  var Resizable_stories_default = meta;
  var PanelBody = ({ label }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex h-full items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Typography_exports.Typography, { variant: "span", textColor: "secondary", children: label }) });
  var Horizontal = {
    args: { orientation: "horizontal" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ResizablePanelGroup, { ...args, orientation: "horizontal", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizablePanel, { defaultSize: 40, minSize: 20, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PanelBody, { label: "Left" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizableHandle, { withHandle: true }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizablePanel, { defaultSize: 60, minSize: 20, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PanelBody, { label: "Right" }) })
    ] })
  };
  var Vertical = {
    args: { orientation: "vertical" },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ResizablePanelGroup, { ...args, orientation: "vertical", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizablePanel, { defaultSize: 50, minSize: 15, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PanelBody, { label: "Top" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizableHandle, { withHandle: true }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizablePanel, { defaultSize: 50, minSize: 15, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PanelBody, { label: "Bottom" }) })
    ] })
  };
  var ThreePanels = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ResizablePanelGroup, { ...args, orientation: "horizontal", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizablePanel, { defaultSize: 25, minSize: 15, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PanelBody, { label: "Sidebar" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizableHandle, { withHandle: true }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizablePanel, { defaultSize: 50, minSize: 20, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PanelBody, { label: "Editor" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizableHandle, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ResizablePanel, { defaultSize: 25, minSize: 15, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PanelBody, { label: "Preview" }) })
    ] })
  };

  // .design-sync/.cache/previews/ResizablePanelGroup.tsx
  function compose(S, key) {
    const meta2 = S.default ?? {};
    const st2 = S[key];
    const args = { ...meta2.args ?? {}, ...st2 && st2.args ? st2.args : {} };
    const at2 = { ...meta2.argTypes ?? {}, ...st2 && st2.argTypes ? st2.argTypes : {} };
    for (const k of Object.keys(args)) {
      const m = at2[k] && at2[k].mapping;
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
      parameters: (st2 && st2.parameters) ?? meta2.parameters ?? {}
    };
    let render = null;
    if (st2 && typeof st2.render === "function") render = () => st2.render(args, ctx);
    else if (typeof st2 === "function") render = () => st2(args, ctx);
    else if (typeof meta2.render === "function") render = () => meta2.render(args, ctx);
    else {
      const C2 = st2 && st2.component || meta2.component;
      if (C2) render = () => React.createElement(C2, args);
    }
    if (!render) return () => null;
    const decorators = [].concat((st2 && st2.decorators) ?? []).concat(meta2.decorators ?? []);
    return decorators.reduce((inner, dec) => () => {
      const out = dec(inner, ctx);
      return out === void 0 ? inner() : out;
    }, render);
  }
  var Horizontal2 = (
    /* Horizontal */
    compose(Resizable_stories_exports, "Horizontal")
  );
  var Vertical2 = (
    /* Vertical */
    compose(Resizable_stories_exports, "Vertical")
  );
  var ThreePanels2 = (
    /* Three Panels */
    compose(Resizable_stories_exports, "ThreePanels")
  );
  return __toCommonJS(ResizablePanelGroup_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/grip-vertical.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
