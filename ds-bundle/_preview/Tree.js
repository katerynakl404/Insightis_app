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

  // .design-sync/.cache/previews/Tree.tsx
  var Tree_exports = {};
  __export(Tree_exports, {
    Default: () => Default2,
    Loading: () => Loading2,
    Searched: () => Searched2,
    WithActions: () => WithActions2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // src/components/Tree/Tree.stories.tsx
  var Tree_stories_exports = {};
  __export(Tree_stories_exports, {
    Default: () => Default,
    Loading: () => Loading,
    Searched: () => Searched,
    WithActions: () => WithActions,
    default: () => Tree_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/columns-3.js
  init_define_import_meta_env();
  var __iconNode = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ];
  var Columns3 = createLucideIcon("columns-3", __iconNode);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/database.js
  init_define_import_meta_env();
  var __iconNode2 = [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
    ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
    ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
  ];
  var Database = createLucideIcon("database", __iconNode2);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/folder.js
  init_define_import_meta_env();
  var __iconNode3 = [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        key: "1kt360"
      }
    ]
  ];
  var Folder = createLucideIcon("folder", __iconNode3);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/search.js
  init_define_import_meta_env();
  var __iconNode4 = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ];
  var Search = createLucideIcon("search", __iconNode4);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/table-2.js
  init_define_import_meta_env();
  var __iconNode5 = [
    [
      "path",
      {
        d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
        key: "gugj83"
      }
    ]
  ];
  var Table2 = createLucideIcon("table-2", __iconNode5);

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/triangle-alert.js
  init_define_import_meta_env();
  var __iconNode6 = [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq"
      }
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ];
  var TriangleAlert = createLucideIcon("triangle-alert", __iconNode6);

  // src/components/Tree/Tree.stories.tsx
  var import_react3 = __toESM(require_react_shim());

  // ds-shim:ds:Badge
  var ds_Badge_exports = {};
  __export(ds_Badge_exports, {
    default: () => ds_Badge_default
  });
  init_define_import_meta_env();
  __reExport(ds_Badge_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Badge_default = g["Badge"] !== void 0 ? g["Badge"] : g;

  // ds-shim:ds:Card
  var ds_Card_exports = {};
  __export(ds_Card_exports, {
    default: () => ds_Card_default
  });
  init_define_import_meta_env();
  __reExport(ds_Card_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_Card_default = g2["Card"] !== void 0 ? g2["Card"] : g2;

  // ds-shim:ds:InputGroup
  var ds_InputGroup_exports = {};
  __export(ds_InputGroup_exports, {
    default: () => ds_InputGroup_default
  });
  init_define_import_meta_env();
  __reExport(ds_InputGroup_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_InputGroup_default = g3["InputGroup"] !== void 0 ? g3["InputGroup"] : g3;

  // ds-shim:ds:Switch
  var ds_Switch_exports = {};
  __export(ds_Switch_exports, {
    default: () => ds_Switch_default
  });
  init_define_import_meta_env();
  __reExport(ds_Switch_exports, __toESM(require_ds_raw()));
  var g4 = window.DevartUI;
  var ds_Switch_default = g4["Switch"] !== void 0 ? g4["Switch"] : g4;

  // ds-shim:ds:Tree
  var ds_Tree_exports = {};
  __export(ds_Tree_exports, {
    default: () => ds_Tree_default
  });
  init_define_import_meta_env();
  __reExport(ds_Tree_exports, __toESM(require_ds_raw()));
  var g5 = window.DevartUI;
  var ds_Tree_default = g5["Tree"] !== void 0 ? g5["Tree"] : g5;

  // src/components/Tree/Tree.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Components/Tree",
    component: ds_Tree_exports.TreeItem,
    tags: ["autodocs"],
    args: { name: "sakila" },
    parameters: {
      docs: {
        description: {
          component: "A hierarchy read row by row — a data source’s catalogs, schemas, tables and columns. Every row has the same height, the same toggle column and the same right edge at every level; depth changes the indent only, one toggle and its gap (`TREE_INDENT`, 28px) a level, so a level’s +/− starts under the icon above it. Every level carries its icon, and every row keeps the toggle’s slot — empty where it cannot open, a column — so each level’s icon stands one full step in from its parent’s. The whole row opens; `actions` at the right edge never fold it. `query` marks what a search matched (`HighlightText`), `struck` is a node gone from the source, `loading` a name being read again. The tree holds no data: which rows exist and which are open is the caller’s."
        }
      }
    }
  };
  var Tree_stories_default = meta;
  var ICON = {
    catalog: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
    schema: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, {}),
    table: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table2, {}),
    column: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns3, {})
  };
  var LABEL = {
    catalog: "Catalog",
    schema: "Schema"
  };
  var DATA = [
    {
      id: "sakila",
      kind: "catalog",
      name: "sakila",
      children: [
        {
          id: "public",
          kind: "schema",
          name: "public",
          children: [
            {
              id: "actor",
              kind: "table",
              name: "actor",
              rows: 200,
              children: [
                "actor_id",
                "first_name",
                "last_name",
                "last_update"
              ].map((c) => ({
                id: `actor.${c}`,
                kind: "column",
                name: c
              }))
            },
            { id: "film", kind: "table", name: "film", rows: 1e3, children: [] },
            {
              id: "legacy_payments",
              kind: "table",
              name: "legacy_payments",
              deleted: true
            }
          ]
        },
        {
          id: "billing",
          kind: "schema",
          name: "billing",
          children: [
            {
              id: "invoices",
              kind: "table",
              name: "invoices",
              rows: 12840,
              children: ["invoice_id", "issued_at", "total", "status"].map(
                (c) => ({
                  id: `invoices.${c}`,
                  kind: "column",
                  name: c
                })
              )
            }
          ]
        }
      ]
    }
  ];
  var useOpen = (initial) => {
    const [open, setOpen] = (0, import_react3.useState)(() => new Set(initial));
    const set = (id, next) => setOpen((s) => {
      const out = new Set(s);
      if (next) out.add(id);
      else out.delete(id);
      return out;
    });
    return { open, set };
  };
  var Rows = ({
    nodes,
    level,
    open,
    set,
    query = "",
    actions
  }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: nodes.map((n) => {
    const isOpen = open.has(n.id);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "contents", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Tree_exports.TreeItem,
        {
          name: n.name,
          level,
          icon: ICON[n.kind],
          label: LABEL[n.kind],
          expandable: Boolean(n.children),
          open: isOpen,
          onOpenChange: (next) => set(n.id, next),
          query,
          struck: n.deleted,
          after: n.deleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex text-fb-attention [&_svg]:size-3.5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}) }) : null,
          actions: actions?.(n)
        }
      ),
      isOpen && n.children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Rows,
        {
          nodes: n.children,
          level: level + 1,
          open,
          set,
          query,
          actions
        }
      ) : null
    ] }, n.id);
  }) });
  var Default = {
    render: () => {
      const { open, set } = useOpen(["sakila", "public", "actor", "billing"]);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { variant: "outline", className: "w-[36rem] overflow-clip p-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tree_exports.Tree, { inset: 24, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rows, { nodes: DATA, level: 0, open, set }) }) });
    }
  };
  var WithActions = {
    render: () => {
      const { open, set } = useOpen(["sakila", "public"]);
      const [on, setOn] = (0, import_react3.useState)(() => /* @__PURE__ */ new Set(["sakila", "public", "actor"]));
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { variant: "outline", className: "w-[36rem] overflow-clip p-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tree_exports.Tree, { inset: 24, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Tree_exports.TreeItem,
          {
            variant: "head",
            name: "Finance warehouse",
            expandable: true,
            open: true,
            actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Badge_exports.Badge, { variant: "success", size: "sm", rounded: "full", withDot: true, children: "Active" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Rows,
          {
            nodes: DATA,
            level: 1,
            open,
            set,
            actions: (n) => n.deleted ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Switch_exports.Switch,
              {
                checked: on.has(n.id),
                "aria-label": `Include ${n.name}`,
                onCheckedChange: (v) => setOn((s) => {
                  const out = new Set(s);
                  if (v) out.add(n.id);
                  else out.delete(n.id);
                  return out;
                })
              }
            )
          }
        )
      ] }) });
    }
  };
  var Searched = {
    render: () => {
      const [query, setQuery] = (0, import_react3.useState)("invo");
      const all = ["sakila", "public", "actor", "billing", "invoices"];
      const { open, set } = useOpen(all);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex w-[36rem] flex-col gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_exports.InputGroup, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_exports.InputGroupAddon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_InputGroup_exports.InputGroupInput,
            {
              value: query,
              onChange: (e) => setQuery(e.target.value),
              "aria-label": "Search the tree"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { variant: "outline", className: "overflow-clip p-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tree_exports.Tree, { inset: 24, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rows, { nodes: DATA, level: 0, open, set, query }) }) })
      ] });
    }
  };
  var Loading = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { variant: "outline", className: "w-[36rem] overflow-clip p-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tree_exports.Tree, { inset: 24, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Tree_exports.TreeItem,
        {
          name: "sakila",
          label: "Catalog",
          icon: ICON.catalog,
          expandable: true,
          open: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Tree_exports.TreeItem,
        {
          name: "public",
          label: "Schema",
          icon: ICON.schema,
          level: 1,
          expandable: true,
          open: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tree_exports.TreeLoadingRow, { level: 2, text: "Loading tables…" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Tree_exports.TreeItem,
        {
          name: "billing",
          label: "Schema",
          icon: ICON.schema,
          level: 1,
          expandable: true,
          open: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Tree_exports.TreeItem,
        {
          name: "invoices",
          icon: ICON.table,
          level: 2,
          expandable: true,
          open: true,
          loading: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tree_exports.TreeLoadingRow, { level: 3, text: "Loading columns…" })
    ] }) })
  };

  // .design-sync/.cache/previews/Tree.tsx
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
    compose(Tree_stories_exports, "Default")
  );
  var WithActions2 = (
    /* With Actions */
    compose(Tree_stories_exports, "WithActions")
  );
  var Searched2 = (
    /* Searched */
    compose(Tree_stories_exports, "Searched")
  );
  var Loading2 = (
    /* Loading */
    compose(Tree_stories_exports, "Loading")
  );
  return __toCommonJS(Tree_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/columns-3.js:
lucide-react/dist/esm/icons/database.js:
lucide-react/dist/esm/icons/folder.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/table-2.js:
lucide-react/dist/esm/icons/triangle-alert.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
