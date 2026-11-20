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
      function jsx4(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs4(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx4;
      module.exports.jsxs = jsxs4;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs4 : jsx4)(t, p, k);
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

  // .design-sync/.cache/previews/ListPageLayout.tsx
  var ListPageLayout_exports = {};
  __export(ListPageLayout_exports, {
    BodyInset: () => BodyInset2,
    CondensingHeader: () => CondensingHeader2,
    CondensingHeaderTablet: () => CondensingHeaderTablet2,
    CondensingHeaderWideScreen: () => CondensingHeaderWideScreen2,
    NarrowColumn: () => NarrowColumn2,
    Page: () => Page2,
    ShortContent: () => ShortContent2,
    WithStickyHeader: () => WithStickyHeader2,
    WithoutHeader: () => WithoutHeader2
  });
  init_define_import_meta_env();
  var React = __toESM(require_react_shim(), 1);

  // changes/components/ListPageLayout.stories.tsx
  var ListPageLayout_stories_exports = {};
  __export(ListPageLayout_stories_exports, {
    Page: () => Page,
    default: () => ListPageLayout_stories_default
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

  // node_modules/.pnpm/lucide-react@0.562.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/plus.js
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  var Plus = createLucideIcon("plus", __iconNode);

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g = window.DevartUI;
  var ds_Button_default = g["Button"] !== void 0 ? g["Button"] : g;

  // ds-shim:ds:ListPageLayout
  var ds_ListPageLayout_exports = {};
  __export(ds_ListPageLayout_exports, {
    default: () => ds_ListPageLayout_default
  });
  init_define_import_meta_env();
  __reExport(ds_ListPageLayout_exports, __toESM(require_ds_raw()));
  var g2 = window.DevartUI;
  var ds_ListPageLayout_default = g2["ListPageLayout"] !== void 0 ? g2["ListPageLayout"] : g2;

  // ds-shim:ds:PageHeader
  var ds_PageHeader_exports = {};
  __export(ds_PageHeader_exports, {
    default: () => ds_PageHeader_default
  });
  init_define_import_meta_env();
  __reExport(ds_PageHeader_exports, __toESM(require_ds_raw()));
  var g3 = window.DevartUI;
  var ds_PageHeader_default = g3["PageHeader"] !== void 0 ? g3["PageHeader"] : g3;

  // changes/Harness.tsx
  init_define_import_meta_env();

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

  // changes/journal.ts
  init_define_import_meta_env();

  // DESIGN-SYSTEM-CHANGES.md?raw
  var DESIGN_SYSTEM_CHANGES_default = "# Design-system changes found while building on it\n\nWhere **`@devart/ui-react`** differs from the developers' library — `upstream`,\n`devart/components/devart.ui.react`, at their 1.4.0 (f69ebc9). A change the\ndevelopers have since shipped, and this package has taken, leaves this file and\nits number is listed under *Retired numbers*; what is left is what a developer\nwould not find in `upstream`.\n\nEvery one was found the same way: by assembling a real screen out of real\ncomponents. In Storybook a component stands alone. On a page it stands next to\nothers, and that is where states, sizes and colours drift apart.\n\nIt is kept as its own file rather than inside each component's `.md`: component\nsources are periodically refreshed from upstream, and anything written into them\nis lost on the next sync.\n\n## The constraint that shapes all of this\n\n**Two products share one library**, and a change that fixes one and breaks the\nother is not a fix. Section 9 is a worked example of that mistake — made,\ncaught, and corrected.\n\nThe sidebar is the web shape and only that: the product mark, the name and the\ncollapse control live in it, because a browser tab is no place for them.\n\n## How a fix reaches the products\n\nThe fixes are in the source, so both products get them — but propagation is a\n**copy, not a subscription**:\n\n- `ds-bundle` must be rebuilt and copied into each product.\n- The corporate repository `devart/components/devart.ui.react` has none of this;\n  the work sits on `design-sync/insightis-audit` in `katerynak/design-system`.\n\nAny bridge duplicating a fix in a product's own CSS — `_shared/pages.css` carries\na few, each signed with a comment — must be removed once the bundle lands. Left\nin place it does not merely duplicate, it **masks**: the next regression in the\nlibrary would look fine on the page carrying the override and ship broken to the\none without it.\n\n---\n\n## What changed\n\nBy component, its changes in number order; the number is its section below.\n`draft` — new and not signed off: nothing should be built on it yet. `open` —\nfound and written down, not fixed.\n\nAn entry that adds a part, or changes what a part does by default, says\n**From** — the product it was made for — and **Used in** — where each product\nuses it, with the date it was checked (since 2026-11-03; older entries do not\ncarry it yet). Both products are searched before a default moves, Insightis's\n`h(D.Name, …)` as well as LinkAI's `<Name>`. A change to an entry's own draft\nrewrites that entry; it does not add a section beside it.\n\n| Component | Changes |\n|---|---|\n| `Accordion` | §49 `AccordionItem` `standalone` — an item that is its own surface<br>§69 `AccordionTrigger` `size` — a trigger that is a section heading · draft |\n| `ActivityTray` | §79 the kit's values on their tray — the chevron, the scrollbar, the exits |\n| `Alert` | §95 `title` is optional — a description-only Alert |\n| `Annotation` | §121 **new** — `AnnotationGroup`, labels that point at controls inside a lit area · draft |\n| `Badge` | §192 `tooltip` — a status that can explain itself, and `flat`, the opt-out from the hairline<br>§65 a fixed-height pill whose label could wrap<br>§83 `leading-none` clipped every descender<br>§86 `xs` was the same pill as `sm` — removed |\n| `Banner` | §85 the dismiss was a tertiary button on a painting<br>§90 `sm` kept the default's line gap |\n| `Button` and `IconButton` | §66 a switched-off control lit up under the pointer<br>§80 a disabled `secondary` has no fill, and `destructiveOutline` disables the same<br>§165 a disabled `secondary` fades (`--ink-body`, `opacity-disabled`), it is not repainted<br>§179 `primaryTertiary` — the label holds AA in every state, one token a state<br>§180 hover and press — one wash a family: neutral and red<br>§181 one disabled look for every unfilled button<br>§182 `Button` `xs` — the radius of `IconButton` `xs`<br>§183 `fullWidth` — the icon always beside the label<br>§101 `IconButton` `3xs` — 20px, the tree-row toggle · draft<br>§151 `tooltip` on `IconButton` and `Button` — the action or the reason on hover; a disabled control keeps it (`aria-disabled`, painted on every variant) |\n| `Card` | §4 `outline` — the hover border tint is gone<br>§59 `liftOnHover` — one elevation recipe, 1px<br>§60 `elevated` and `ghost` carry the card's box<br>§78 `variant=\"row\"` — its height is padding, not a ceiling<br>§123 `CardFooter` `sticky` and `divided` — a tall card keeps its actions in reach, as a band of its own · draft<br>§162 `CardHeader` `actions` — the head's trailing link or button, on the title's line, a link at 14px · draft<br>§171 `CardHeader` — 4px between title and description, on the 4px step |\n| `File` | §191 the chip is a surface, and an interactive one says so |\n| `Foundations` | §194 **new** — the token system as pages, generated from the live tokens · draft |\n| `ClampedText` | §153 **new** — a text cut to N lines, See more only when there is more · draft |\n| `CodeBlock` | §48 a snippet and the control that copies it — a header, line numbers, a height, wrapping, an error tint, syntax colours, the kit's scrollbar · draft |\n| `ConfirmationDialog` | §157 `description` — a paragraph that may name its subject in bold |\n| `ConnectorLogo` | §16 connector marks as data-URIs, a monogram for the rest; DB2 and SQLite · draft |\n| `DropdownMenu` | §43 two rows it could not draw — `accent`, `DropdownMenuRow` · draft<br>§55 a link may open a menu · draft<br>§74 the focus ring a closed menu left behind<br>§130 `DropdownMenuItem` `isExternal`<br>§131 **new** — `DropdownMenuSegmentedItem`, a choice that keeps the menu open · draft |\n| `FilterMenu` | §148 the hierarchy — a source, its mark, its connections under it; the pill itself is theirs now · draft |\n| `HighlightText` | §109 **new** — what a search matched, marked in the name · draft |\n| `IconHint` | §152 **new** — a glyph beside a name that says one thing on hover · draft |\n| `InlineRename` | §132 **new** — a row title edited in place · draft |\n| `Input` | §172 `digitsOnly` — a field that takes digits and nothing else · draft |\n| `InputGroup` | §7 `InputGroupAddon` resized glyphs it did not own<br>§9 a field label as loud as the hint beneath it — `TextArea`'s half<br>§45 `InputGroupAction` — the docked-icon inks |\n| `ListPageLayout` | §133 the header condenses, and the body takes a class |\n| `Modal` | §71 a `size` ladder — sm, md, lg, xl — and a height it cannot pass · draft<br>§159 **new** — `ModalDescription`, the line under the title, and the dialog's description · draft<br>§176 `ModalBody` — the scrollbar in the dialog's padding, the fields inset 16px on both sides<br>§185 the title clears the close button, and never truncates |\n| `PageHeader` | §15 the back control and the slots; `condensed`, moving as one; the title truncates, `wrapTitle` · draft |\n| `Pagination` | §82 `showPageNumbers` — a stream read in order · draft<br>§93 a `size` rung, and the `pageFloor` recipe · draft<br>§161 `totalItems` + `pageSize` — \"Showing x–y of z\" beside the pager · draft |\n| `PinToggle` | §136 **new** — pin a row · draft |\n| `Popover` | §34 a closed panel stayed painted<br>§88 floated on the page colour |\n| `ProgressBar` | §105 `trackVariant` — a bar split in two · draft |\n| `PromoCard` | §116 the hover holds over the dismiss |\n| `RowMenuButton` | §137 **new** — the ⋮ at the end of a list row · draft |\n| `SearchInput` | §145 `results` — the matches while typing; `variant`, `disabled`, `autoFocus` and the rest passed through · draft |\n| `SegmentedControl` | §73 `tone`, `tinted`, `deselectable`, `semantics` — a fact with a consequence, a value in effect, none chosen, a radio group · draft |\n| `SelectableListCard` | §138 keyboard, `aria-selected`, `menu`<br>§190 the checkbox of a row whose content is two lines; `checkboxAlign` |\n| `Separator` | §170 a border, not a filled pixel — thick at 125% display scaling |\n| `Sheet` | §156 the edge in the system's line — a white stripe down a dark sheet<br>§178 `SheetBody` — the bar against the sheet's edge, the content inset alike |\n| `Sidebar` | §10 `SidebarHeader` owns the horizontal inset<br>§11 `SidebarMenuButton` tooltips had no styling<br>§12 `SidebarMenuButton` — a 32px box its padding did not fit<br>§14 collapsing could remove the only way to expand<br>§35 the fixed panel was pinned to the viewport<br>§39 `SidebarMenu` rows 4px apart where the kit says 2<br>§64 `SidebarContent` — the nav column had no gutter<br>§72 the collapsed rail was never finished<br>§94 the product shape — sections, chat row, promo slot, compact footer<br>§139 `SidebarUser` — the rail lost the name<br>§140 `SidebarProvider` — the sheet outlived the phone layout<br>§141 `SidebarChatItem` — the ⋮ where there is no hover, `countLabel`<br>§142 `SidebarNavItem` `badge`, an element as `icon`; the label at its icon on a button<br>§143 the triggers' tooltips<br>§144 `SidebarStat` `asChild` |\n| `Spotlight` | §119 **new** — the scrim around a lit target, and `useTargetRect` · draft |\n| `StatusMark` | §188 **new** — one glyph that says the state, with its reason on hover · draft |\n| `StatusView` | §51 the illustration is a pack — empty, and empty search<br>§104 a wider message, 48ch inside the default block<br>§107 `EmptySearchIllustration` visible on a white card |\n| `StepProgress` | §117 `size=\"sm\"`, a state on each bar, no tooltip without a title · draft |\n| `Stepper` | §36 `StepperIndicator` — the numbered rail the headless Stepper never shipped · draft |\n| `Table` | §6 `TableHead` — the sort glyph did not hover with its label<br>§42 `TableCell` — a row that could not grow<br>§50 `TableCell` — pressed belonged to whatever was pressed<br>§53 `TableHead` `width` — a share, not a size<br>§54 `TableRow` `nested` — the child row's 8px<br>§56 `density` — a compact row step · draft<br>§76 a clickable row kept the text cursor |\n| `Tabs` | §8 `TabsContent` — the inactive panel came back as an empty box<br>§171 the list's line out of the layout — the strip was 39.8px at 125% scaling |\n| `TextArea` | §41 `hintText` — the counter row's empty slot<br>§70 the hint at 400; the counter and error lines |\n| `Toast` | §75 a stack of toasts, each a different width |\n| `Tooltip` | §13 the gap — tip 4px, bubble 8px from the trigger<br>§63 the delay before it opens<br>§177 above a dialog (`z-[110]`), not behind it<br>§184 a long tip wraps at 288px<br>§189 a long press where there is no hover · draft |\n| `Tour` | §122 **new** — a guided walk: Spotlight, their `GuideCard`, annotations; the card's placement, sheet, role and focus · draft |\n| `Tree` | §150 **new** — a hierarchy row by row: one step a level, an icon on every level · draft |\n| `Typography` | §100 an 18px rung, as prod sets it<br>§113 `lineThrough` ran along the tops of the lowercase<br>§193 `h3` has no size below `md` — `texl-xl` in their file compiles to nothing |\n| Tokens and colour | §2 dark destructive border — hover made it *less* visible<br>§5 `--ink-icon` / `--ink-icon-hover` — a standalone icon<br>§6a table rows as washes that stack; `--brand-300` retuned<br>§87 **new** — colour packs, `palettes.css` · draft<br>§48 `--code-*` — syntax colours, AA in both themes<br>§124 the chat-landing backgrounds were one product's — removed<br>§125 dark scrim on the page's grey, not on a navy<br>§167 green split like red — `--fb-green` a fill in both themes, `--fb-green-text` the ink<br>§174 dark `--ink-inactive` is grey — the placeholder no longer reads blue beside a faded control |\n| Sizes and glyphs | §40 the size ladder<br>§44 the icon surface — the glyph ladder, and the bundle that had none<br>§92 glyph stroke — one weight, set in CSS |\n| Across components | §99 disabled controls — the not-allowed cursor<br>§155 `pressed:` — an open disclosure is not a held press<br>§186 a field's label — one owner, so `InputGroup`, `TextArea` and `Autocomplete` step together; `Autocomplete` takes `required` |\n| Build and tooling | §19 a variant that is not enumerated is never compiled<br>§20 `pnpm bundle` and `pnpm check-bundle-css`<br>§37 `bg-surface-card/85` compiles to nothing · open<br>§84 the class list — list markers, `last:` borders |\n| Synced from upstream | §97 the developers' 1.1.0 parts — what stays different<br>§146 the developers' 1.2.0 parts — what stays different<br>§154 the developers' 1.3.0 and 1.4.0 parts — what stays different |\n\nRetired numbers, and where what they said lives now: §18 → §51 · §21 → §33 ·\n§23 → §75 · §27 → §142 · §58, §61, §77 → §97 (`IconCard`) · §110 → §15 · §118 → in `upstream` (`ChoiceCard`, `ChoiceGroup`) · §120 → in `upstream` as\n`GuideCard`, its placement in §122 ·\n§1, §17, §25, §28, §30, §68, §89, §91 → in `upstream` · §57, §163, §164 and §99's `Checkbox` → in `upstream` (1f6a577, MR !22):\nLucide `Check` / `Minus`, 10px at `stroke-[3.6]` · one entry per part made here (2026-11-03): §81, §127, §128, §129 → §48 (`CodeBlock`) · §108, §115 → §16 (`ConnectorLogo`) · §158 → §46 (`LinkButton`) · §134 → §52 (`MetaRow`) · §67, §111, §135 → §15 (`PageHeader`) · §96, §103, §168 → §73 (`SegmentedControl`) · §116 was given twice —\n`PromoCard` keeps it, `SearchInput` is §145 · §147 withdrawn (2026-11-10): the developers' name\n`destructiveOutline` is kept, and its disabled form is §80 ·\n§3, §62, §126 (`Autocomplete`), §98, §102, §106, §160, §169, §173, §175, and the parts\n§9's `InputGroup`, §74's `DropdownMenu`, §99's `Switch`, §151's `Switch` → in `upstream`\n(the eight merge requests !25 !26 !29 !30 !31 !37 !38 !39, merged 2026-11-16…18, master at\n`796efa7`): what is left of §9 is `TextArea`'s label, of §74 the tooltip that opens on\nkeyboard focus, of §99 the five controls and the menu rows, of §151 `Button` and `IconButton`.\n\n§46 (`LinkButton`), §47 (`StatTile`), §52 (`MetaRow`), §149 (`AlertStack`) and §33's hairline\n(`Badge`) → **in `upstream`, carried over by the developers themselves** rather than by a merge\nrequest of ours (AIINS-1742, AIINS-2176, AIINS-2177, AIINS-2179, AIINS-2282, 2026-11-10…18), and\ntaken back into this library on 2026-11-20, so those four components are now byte-identical to\ntheirs. They renamed on the way, and the names here follow theirs: `LinkButton` carries\n`variant` (`primary` / `secondary` / `white`) with `inline` as a boolean axis, not `tone`;\n`MetaRow` takes `align` rather than `variant` and exports `MetaRowCount` / `MetaRowActions`\ninstead of `MetaRow.Count` / `MetaRow.End`. What did not come with them is numbered: §148 (the\n`FilterMenu` hierarchy, which they removed in a commit of its own) and §192 (`Badge`'s `tooltip`\nand `flat`).\n\nOpen, and the same in `upstream`, so under *Open against the kit*: §22, §24,\n§26, §29, §31, §32, §38.\n\n---\n\n# `Accordion`\n\n## 49. `AccordionItem` — an item that is its own surface\n\n`src/components/Accordion/AccordionItem.tsx`\n\n```ts\nvariant: 'divided' | 'standalone'   // default 'divided'\n```\n\n`divided` is what it always did: a rule under every item but the last, items\nstacked inside one surface — `border-b last:border-b-0` since §97 (it was\nwritten as `not-last:border-b`, a Tailwind v4 variant this build compiles to\nnothing). `standalone` drops the rule, for one `Card` per section.\n\nThe two are not a style choice. A shut section inside a shared surface reads as\na gap in that surface; a shut section that IS a card reads as a closed object,\nwhich is what it is. Without the variant the consumer cancels the divider with\n`border-b-0` on every item — a page overriding a component because the component\nhas one layout and the page needs two.\n\n**Both products.** Additive; every existing item keeps the divider.\n\n## 69. `AccordionTrigger` — `size` · **DRAFT**\n\nOne size, `text-sm`, which is right for an accordion inside a card and wrong for\nan accordion that IS the section. In the connection form each settings group is\nits own card with the trigger as its heading, so the heading of a section read\none step smaller than the `title16` headings of the sections around it — the\nreviewer's note was that the section names had to be *more prominent*.\n\n`size=\"md\"` puts the trigger on `text-base`, matching `title16`. `sm` stays the\ndefault, so nothing that exists changes.\n\nDraft: it was made for one form, LinkAI's connection form.\n\n---\n\n# `ActivityTray`\n\n## 79. `ActivityTray` — the kit's values on their tray\n\n`src/components/ActivityTray/`\n\nThe tray is the developers' (their AIINS-1948, in `upstream` since). On top of\nit:\n\n- **The chevron** takes `iconButtonVariants({ variant: 'tertiary', size: 'xs' })`.\n- **The list** carries `scrollbar-thin` (§98) under its 14rem cap, the kit's\n  `.upl-list`.\n- **A row's error** is `text-balance` — the kit's\n  `.upl-item-err{text-wrap:balance}`.\n- **Leaving** — a row or the plate on its way out is `pointer-events-none`\n  (`.animate-row-out`, `.animate-panel-out`).\n\n---\n\n# `Alert`\n\n## 95. `Alert` — the title is optional\n\n- **`Alert`** — `title` is now optional (`title?: string`). Without it the\n  title line is not rendered, the description is the whole message, and the\n  glyph sits on the description's first line (same line box at both sizes).\n- **`Alert`** — a description with no title reads in `text-ink-primary`;\n  under a title it stays `text-ink-secondary`.\n- **Stories** — new `DescriptionOnly`.\n\nRaised by the workspaces prototype: the Permissions and Effective Access panes\nexplain the rules of the tree in a paragraph (PRD Workspaces F-25, F-31). As a\ntitled Alert the first sentence had to be lifted out of the paragraph to serve\nas a title, which read as a heading that repeated the copy beneath it. There\nwas no way to say \"an info block, no headline\" short of passing an empty string,\nwhich still rendered an empty line box above the text.\n\nWithout a title the description is the message, and in secondary ink the whole\nblock read grey — a footnote under a heading that is not there.\n\n---\n\n# `Annotation`\n\n## 121. New — `AnnotationGroup` · `Annotation` · **DRAFT**\n\n`src/components/Annotation/index.tsx`\n\nLabels that point at specific controls inside a lit area. Every label sits on\none line (`top`) and fans out from its target without overlapping its\nneighbour; a curved Brand/Primary arrow runs from it to a dashed ring 3px\naround the target, concentric with it (the target's radius + 3). Rings side\nby side never touch — they split the gap and keep 6px apart.\n`<Annotation target icon>text</Annotation>` renders nothing on its own — the\ngroup reads its children and draws them, portalled above the spotlight;\n`leaving` fades it out. Hidden at 640px and below, where the guide card lists\nthe same texts instead (`Tour` does that).\n\n**Both products.** New components, no call sites in the package.\n\n---\n\n# `Autocomplete`\n\n# `Badge`\n\n## 65. `Badge` — a fixed-height pill whose label could wrap\n\n`src/components/Badge/index.tsx`\n\n```diff\n  'inline-flex items-center border border-badge-border',\n+ 'whitespace-nowrap overflow-hidden',\n```\n\n```diff\n- <span className=\"inline-block align-text-top leading-none\">\n+ <span className=\"inline-block min-w-0 truncate align-text-top leading-none\">\n    {children}\n  </span>\n```\n\nwith `leftSlot` and `rightSlot` wrapped in `shrink-0` spans, as the dot and the\ndelete control already were.\n\nEvery size sets the height (`xs`/`sm` 20px, `md` 28px, `lg` 32px, `xl` 36px), so a\nlabel that wraps does not make the pill taller — the second line is drawn\noutside it, across the border and whatever sits below. Found on a dashboard\ntile: `1 not configured` in a 213px tile broke across two lines and the chip\nread as a rendering fault.\n\n`Badge.md` already carried the rule in prose — \"keep the label to one or two\nwords; a chip that wraps is a sentence wearing a chip's clothes\" — which holds\nonly while the author can see the narrow case. A three-digit count, a longer\nlocale or a column the page did not size is exactly where they cannot.\n\n**When a badge does not fit, the one allowed outcome is a truncated label.** Not\na second line, and not text running out over the neighbour: `nowrap` alone would\nhave swapped one broken frame for another. `overflow-hidden` is what makes the\npill able to give way at all — a flex item's automatic minimum size is its\ncontent width until the item hides its overflow, and then it is 0 — and\n`truncate` on the label span puts the ellipsis inside the border. The glyphs\nhold their size, so a squeezed chip reads `⚠ Not config…`, never half a glyph.\n\nThe ellipsis is a fallback, not a layout: it says the label wants shortening or\nthe column widening, and a badge whose text can be cut should carry `tooltip`.\n\n## 83. `Badge` — the pill cut the tail off a g\n\n`src/components/Badge/index.tsx`\n\nReported as text being cut in a badge, and it was — downward, not sideways.\n`PostgreSQL` lost the bottom of its **g** while every other letter looked\nwhole, which is why it read as a rendering fault rather than as a measurement.\n\nThe label carried `leading-none`: a line box exactly the size of the font, 14px\nfor a 14px label. A descender lives BELOW that box, and the pill hides its\noverflow (§65) — so the tail was clipped by the chip that was\nsupposed to contain it. Nothing was wrong with the width, which is where the\nfirst look goes.\n\n`leading-none` and the `align-text-top` beside it are gone. The label now takes\nthe line-height the type scale pairs with its size, which is also what the kit\nstates for `.badge` — `line-height: var(--ts-label-m-lh)`. Measured across the\nfour sizes, every line box is 4px taller than its font and sits clear of both\nedges:\n\n| Pill | Font | Line box | Clearance |\n|---|---|---|---|\n| 20px | 12 | 16 | 2 / 2 |\n| 28px | 12 | 16 | 6 / 6 |\n| 32px | 14 | 20 | 6 / 6 |\n| 36px | 14 | 20 | 8 / 8 |\n\nThe pill does not grow: its height comes from `size` and the row is\n`items-center`, so the taller line box centres inside the same chip.\n\n## 86. `Badge` — a step that was not a step\n\n`src/components/Badge/index.tsx`\n\nReported from a call site moving a pill from `sm` to `xs`: the result looked\nlike a mistake, because nothing anyone could see had changed.\n\nMeasured, it had not. Both steps were **20px tall with 12px text** and differed\nonly in their sides — and backwards at that: the step named smaller carried the\nLARGER inset.\n\n| | Height | Sides |\n|---|---|---|\n| `xs` | 20px | 8px |\n| `sm` | 20px | 6px |\n| `md` | 28px | 10px |\n\n`xs` is gone and `sm` keeps its own 6px. Nothing in the kit is contradicted by\neither half: the kit has **one** badge — 28px with 10px sides, which is this\nladder's `md` — so `xs`, `sm`, `lg` and `xl` are all the package's own, and\nthe one that was indistinguishable from its neighbour is the one that went.\n\nCall sites: `BADGE_SIZE_MAP` in `Autocomplete/BadgeList.tsx` now maps the\nfield's two smallest steps onto the same badge step, since there is no second\n20px rung to tell them apart with; the catalogue's `Sizes` story and its\n`size` control lost the rung; the LinkAI prototype moved 12 pills.\n\n---\n\n# `Banner`\n\n## 85. `Banner` — the dismiss answers with colour, not a fill\n\n`src/components/Banner/index.tsx`\n\n`upstream`'s dismiss is `IconButton variant=\"tertiary\" size=\"xs\"`, a box with a\nhover fill, as the kit's `.banner-close` fills on hover (`--state-hover`). On the\ngradient variants that fill is a pale box sitting on the artwork, and the ✕\nstops reading as part of the banner.\n\nHere it answers with colour only — `--ink-icon` to `--ink-icon-hover` on the\nsolid variant, `--banner-grad-sub` to `--banner-grad-text` on the gradients — in\na 32px box, which is the hit area. Measured: background `rgba(0, 0, 0, 0)` on\nboth, ink `rgb(90, 106, 128)` solid and white at 80% on the gradient.\n\nThe same rule as `InputGroupAction` (§45): an icon docked on a surface that\nalready owns hover does not get a surface of its own.\n\n## 90. `Banner` — `sm` kept a line gap chosen for a larger title\n\n- **`Banner`** — `size=\"sm\"`: title→description gap `gap-1.5` → **`gap-0.5`**.\n- **`Banner`** — the body gains `data-slot=\"banner-body\"`, so the size can reach it.\n\n`sm` already steps the title down to 14/20, but the gap under it stayed at the\ndefault's 6px — a value chosen for a 16px title. Beside an `Alert size=\"md\"`,\nwhich states the same kind of thing at the same type with 2px between its\nlines, the two read as different components rather than as two sizes of one\nsystem.\n\nThe default size is untouched: its 16px title and taller block still want the\nair.\n\n---\n\n# `Button` and `IconButton`\n\n## 66. `Button` / `IconButton` — a switched-off control lit up under the pointer\n\nReported plainly: *\"a disabled button cannot hover.\"* It did. `:hover` matches a\ndisabled button — it is not focusable and it does not fire, but it is still hit\nby the pointer — and each variant's hover recipe was a plain `hover:` utility,\nso a disabled Secondary took the hover border and the hover fill and then sat\nthere looking pressable with an inactive label.\n\nEvery variant now switches its own hover recipe off again, at the same\nspecificity the state deserves: `disabled:hover:*` is `:disabled:hover`, three\ncompound selectors against `hover:*`'s two, so the disabled recipe wins without\n`!important`.\n\n**Not `disabled:pointer-events-none`**, which is the one-line version of this\nfix and would have been wrong. A disabled control is exactly the one that needs\na tooltip saying why it is disabled, and a tooltip needs the pointer events it\nwould have removed. The `aria-disabled` form keeps both its pointer events and\nits focus, which is why a disabled control with a `tooltip` renders that form\n(§151).\n\n`cursor-not-allowed` stays on both forms, and now means something: the cursor is\nthe only thing that changes under the pointer.\n\n## 80. A disabled `secondary` has no fill\n\n`src/components/Button/index.tsx`, `src/components/IconButton/index.tsx`\n\n`upstream` paints a disabled `secondary` `--state-disabled`\n(`disabled:bg-state-disabled`), as the kit's `.s-disabled.btn-secondary` does.\nHere it is transparent, which is what `outline` does: the border\n(`--btn-secondary-border`) and the inactive label carry the state. Reported as\n'disable secondary should have no fill'. An opaque fill depends on where it\nlands — on a tinted surface (a chips row, a banner, a table header) a switched-off\nbutton became the brightest thing in the row. `primary` keeps\n`--state-disabled`: a filled button switched off has nothing else to be.\n\nMeasured: `rgba(0, 0, 0, 0)`, the border at `--btn-secondary-border`, the label\nat `--ink-inactive`. **The label changed in §165**: `--ink-body`, the whole control\nfaded; no fill still holds.\n\n**`destructiveOutline` and `outline` are switched off the same way** (`outline`\nsince §181): disabled each is the disabled `secondary` — `--btn-secondary-border`,\nno fill, the label at `--ink-inactive` (`--ink-body` faded since §165) — on\n`Button` and `IconButton`. Both read one fragment,\n`secondaryDisabled` (`src/lib/utils.ts`). `upstream` and the kit\n(`.s-disabled.btn-outline-destructive`) give it the outline's `--ink-inactive`\nborder.\n\n## 101. `IconButton` — `3xs`, the tree-row toggle · draft\n\n- **`IconButton`** — new `size` value `3xs`: `size-5` (20px) with a 12px\n  glyph (`[&_svg]:size-3`), the `rounded` radius as on `2xs` / `xs`, the\n  `xs` spinner. Story `Sizes` and `IconButton.md` list it.\n\n`2xs` (24px) was the smallest box, and it is the expand / collapse at the start\nof every row in the workspaces' data trees (Data model, Permissions, Effective\naccess). One to a row, beside a 14px name, it outweighed the names. Asked for\nin review of the workspaces prototype. Row actions stay `2xs`.\n\n## 165. A disabled `secondary` fades, it is not repainted\n\n`src/lib/utils.ts` (`secondaryDisabled`) — `Button` and `IconButton`,\n`secondary` and `destructiveOutline`\n\nSwitched off, the label was `--ink-inactive` (slate-400). On dark it read blue,\nand beside it a `primary` with `isLoading` — faded to `opacity-disabled`, its\nown colours kept — looked like a different system: Deny and Allow in one row,\none grey-blue, one teal at 65% (Insightis consent screen, designer\n2026-10-29: \"text in the disabled button looks bad — too blue\"). Now the label\nkeeps `--ink-body` and the whole control fades to `opacity-disabled`, the rule\n`Checkbox` already follows (§163): disabled is a fade, not a colour swap.\n\nNo fill still holds (§80): the fade is of the border and the label over\nwhatever surface the button sits on. Hover stays switched off (§66); the\npointer events stay, for a tooltip on the `aria-disabled` form.\n\n**`destructiveOutline` loses its red.** It reads the same fragment, so switched\noff it is the disabled `secondary` — `--btn-secondary-border`, the label in\n`--ink-body`, faded — not a faded red button: a red label on a control that\ncannot act would split it from every other switched-off button (designer,\n2026-10-29).\n\nSince §181 every unfilled button is switched off this way.\n\n## 179. `primaryTertiary` — the label holds AA in every state\n\n`globals.css`, `src/lib/constants.ts`, `src/components/Button/index.tsx`,\n`src/components/IconButton/index.tsx`\n\n`upstream` moves the label through the brand ramp — `--brand-primary`,\n`--brand-hover`, `--brand-press` — in both themes. Two of the six states fell\nunder AA 4.5 for text: light hover, `--brand-hover` on the hover wash, 3.66:1;\ndark press, `--brand-press` on the press wash, 3.09:1. On dark this package had\nalready put the label at `--ink-highlight` through `dark:` classes, on `Button`\nalone; `IconButton` kept the ramp.\n\nNow one token a state, `--btn-primary-tertiary-text{,-hover,-press}`:\n\n| | rest | hover | press |\n|---|---|---|---|\n| light | `--brand-primary` 4.77 | `--brand-press` 6.11 | `--brand-press` 5.88 |\n| dark | `--ink-highlight` 7.89 | `--ink-highlight` 6.99 | `--ink-highlight` 6.52 |\n\nMeasured on `--surface-card` under the state wash; on `--surface-page` the\nlowest is 4.55, light at rest. The `dark:` classes and their disabled\nre-assertions are gone from `Button`, and `IconButton`'s glyph reads the same\ntokens, so on dark it is `--ink-highlight` too. Asked for as \"it has to pass\naccessibility; if that needs tokens, add tokens\" (designer, 2026-11-10).\n\n## 180. Hover and press — one wash a family\n\n`globals.css` (`--btn-secondary-bg-*`, `--btn-outline-bg-*`,\n`--btn-outline-destructive-bg-*`, `--btn-destructive-tertiary-bg-*`),\n`src/components/IconButton/index.tsx`\n\nThe buttons that are not filled answered the pointer in four strengths: `secondary`\na brand blend 5% / 8%, `outline` a brand wash 6% / 8%, `tertiary` the state wash\n8% / 12%, and the two red buttons apart from each other (light 4% / 6% both,\ndark 15% / 20% bordered against 20% / 30% tertiary). Now one wash a family:\n\n| | hover / press, light | dark |\n|---|---|---|\n| `secondary`, `outline`, `tertiary`, `primaryTertiary` | `--state-hover` / `--state-pressed`, 8% / 12% | the same |\n| `destructiveOutline`, `destructiveTertiary` | red 8% / 12% | red 12% / 15% |\n\n`secondary` keeps its white fill and takes the wash on top of it, so it stays a\nwhite chip on any ground; the developers' replaces the fill with the wash and\nturns the colour of whatever it sits on (a second card, a brand-tinted band).\nRed is `--fb-red`, a dark red in both themes: over a near-black card the light\nstrengths barely move it, so dark takes more. The ceiling is the red label\npressed on a hovered table row: 4.48:1 at 20%, 4.32:1 at 25%, so dark stops at\n15% (4.63:1). Chosen from 12 / 15, 15 / 18 and 15 / 25 seen live (designer,\n2026-11-12). Judged by eye beside the neutral pair; lightness alone (dL*)\nunder-read the red, which is how light had sunk to 4% / 6%. `theme-audit`\nnow checks both halves — the red no fainter than the neutral (ΔE), and the label\n≥ 4.5 on the card, the page and a hovered row. Every label holds AA 4.5 in every\nstate.\n\nBordered buttons step the border on hover and keep it pressed; `IconButton`'s\n`secondary` put the rest border back on press, `Button`'s did not.\n\n## 181. One disabled look for every unfilled button\n\n`src/lib/utils.ts` (`ghostDisabled`), `Button` and `IconButton`\n\nSwitched off, a button keeps its shape and loses its colour, two ways:\n\n- **filled** (`primary`, `destructive`) — `--state-disabled` fill, `--ink-inactive` label, as before;\n- **everything else** — the label in its own `--ink-body`, the whole control at\n  `opacity-disabled`; a bordered one (`secondary`, `outline`,\n  `destructiveOutline`) takes the secondary border (`secondaryDisabled`), a\n  borderless one (`tertiary`, `primaryTertiary`, `destructiveTertiary`,\n  `transparent`, `transparentUnderline`) none (`ghostDisabled`).\n\n`outline` had kept the old recipe — a full-strength `--ink-inactive` border — and\nread heavier than the two bordered buttons beside it (\"a disabled outline looks\nlike a disabled destructive one, not a bright border\", designer, 2026-11-10).\nThe tertiaries' `--ink-inactive` label was the blue-grey §165 moved\n`secondary` off. `transparent` did not look switched off at all. Hover stays\noff everywhere (§66).\n\n## 182. `Button` `xs` — the radius of `IconButton` `xs`\n\n`src/components/Button/index.tsx`\n\n`IconButton` takes the smaller radius (`rounded`, 4px) on its 24 and 28px boxes;\n`Button` `xs` is the same 28px and kept `rounded-md` (6px), so a text button and\nan icon button of one size, side by side in a row of actions, had different\ncorners. Same compound rule now, scoped to the default `rounded=\"md\"`.\n\n## 183. `fullWidth` — the icon always beside the label\n\n`src/components/Button/index.tsx`\n\n`fullWidth` stretched the label across the row, so `leftSlot` sat at the leading\nedge and the words in the middle — \"+ Add Group or User\" on LinkAI's\nPermissions read as two things. The label stretches now only where that keeps\nthe icon beside it: with no `leftSlot` (the datepicker's month), or a\nleft-aligned label (`SidebarMenuRow`). Centred or right-aligned with a leading\nicon, the pair stays together and the row's own `justify` places it. \"The icon\nalways stands beside the text\" (designer, 2026-11-10). The `FullWidth` story\nshows every case; `button-full-width.test.tsx` holds them.\n\n---\n\n# `Card`\n\n## 4. `Card` / `outline` — the hover border tint is gone\n\n`src/components/Card/index.tsx`\n\n```diff\n- border border-stroke hover:border-card-border-hover\n+ border border-stroke\n```\n\nOne line against the released library. An `outline` card is a surface, not a\ncontrol: it tinted its border toward brand on hover while doing nothing when\nclicked, so the tint promised an interaction the card did not have. Cards that\nare controls say so — `Card variant=\"ghost\"` is the browse-more tile, and a\nclickable row uses the table's own interactive states.\n\n> Filed originally as \"a surface that wrongly answered hover **and press**\".\n> The press half never existed in any published version — it was added and\n> removed inside this branch — so only the hover line is a change anybody\n> outside it can see.\n\n## 59. `liftOnHover` — one elevation recipe, 1px\n\n`src/lib/utils.ts`, `src/components/Card/index.tsx`,\n`src/components/IconCard/index.tsx`\n\n`upstream` writes the lift into `Card` `elevated` —\n`transition-all duration-slow hover:-translate-y-0.5` — and `IconCard` inherits\nit, 2px. Here it is one recipe both import:\n\n```ts\nexport const liftOnHover = (distance: 1 | 2 = 1) => cn(\n  'transition-[box-shadow,border-color,transform] duration-base',\n  distance === 1 ? 'hover:-translate-y-px' : 'hover:-translate-y-0.5',\n  'hover:border-card-lift-border hover:shadow-lift-hover'\n);\n```\n\nThe distance is a parameter because it is the one part that legitimately\ndiffers — the kit lifts a catalog tile 1px and a larger card 2px, since the\nsame travel reads bigger on a smaller box. Everything else is fixed, and the\ntransition is a scoped list: a card that animates every property also animates\nits own content reflowing.\n\n**Not a component.** `Card` is a `<div>` surface, the tile a `role=\"button\"`\nwith a hover scrim and a revealed action, so the shared part is a recipe both\nimport, not a base component both extend.\n\n## 60. `Card` — `elevated` and `ghost` carry the card's box\n\n`src/components/Card/index.tsx`\n\n`secondary` and `outline` draw `flex flex-col gap-3 p-4`. In `upstream`\n`elevated` and `ghost` draw neither layout nor padding, so the card that lifts\non hover is the one every page pads itself, and an `outline` card beside an\n`elevated` one sits on a different inset. Here all four carry the same box, and\n`ghost`'s `items-center justify-center` has a `flex` to act on.\n\n## 78. A list item that could only ever be one line\n\n`Card variant=\"row\"` is the product’s clickable list item, and it carried `h-11`.\n44px is right for the row it was drawn from — one line of `text-sm` — but a fixed\nheight states it as a ceiling as well as a floor, so the first consumer with a\nname over a description had two bad choices: clip, or argue the component out of\nits own height at the call site. The connection form did the second, with\n`h-auto min-h-11 items-start py-3` — three layout classes to undo one.\n\nThe size is **padding** now: `px-4 py-3`, and no height at all. One line of\n`text-sm` is 20px, plus 12 above and below, is the same 44 — so nothing that used\nthe row before changes height — and two lines grow to 64 instead of being cut off.\nA list item does not know how many lines its consumer has; it knows how much air\nbelongs around them.\n\nThe horizontal inset is its own decision and it is 16, not the 12 the fixed-height\nversion carried: 12 read as tight the moment the row held two lines, and 16 is\nwhere text starts from the edge in every other card in the system.\n\nNothing else in the variant changes: the pointer, the hover fill, the focus ring,\nthe press scale and the `:has()` guard that keeps the press off the card while a\nbutton inside it is pressed or its menu is open are what make this a component\nrather than a bordered div, and they are why the call site should not have been\nreaching for its own box in the first place.\n\n## 123. `CardFooter` — `sticky` and `divided` · **DRAFT**\n\n`src/components/Card/CardFooter.tsx`\n\n```ts\nsticky?: boolean    // default false; true → sticky bottom-0 z-10 rounded-b-[inherit] bg-surface-card\ndivided?: boolean   // default false; true → a rule across the top (border-stroke border-t)\n```\n\n- **`divided`** (2026-10-26) — the footer as a band of its own under the\n  content, not a row of it: the commit apart from what it commits. In a card\n  whose sections run edge to edge (`p-0`) the footer takes the card's padding\n  itself (`px-6 py-4`).\n- **The bottom corners** (2026-10-26) — pinned over a rounded card, the\n  footer's square corners let the content scrolling under it show through at\n  the card's edge. It inherits the card's bottom radius now.\n- The LinkAI prototype drew this band itself (`ActionBand`: a\n  separator, the card's surface, `rounded-b-lg`, sticky) under the Data model,\n  Permissions and the setup page; it is this footer now.\n\nA card taller than the window keeps its actions in reach. Without it the footer\nscrolls with the card, so the actions of a long card sit below the fold until\nthe reader reaches its end. With `sticky` the footer sticks to the bottom of\nthe scroller while the card scrolls under it, and settles in place at the\ncard's end. It carries the card's own surface, so the content passing under it\ndoes not show through, and `z-10`, so that content stays under it.\n\n`cardFooterVariants` is exported from `@devart/ui-react/Card` now — it was\ndeclared and never reachable — so a consumer can tell whether its build has\nthe variant (`cardFooterVariants({ sticky: true })` yields `sticky`).\n\n**Both products.** Additive; every existing footer keeps scrolling with its\ncard.\n\n## 162. `CardHeader` — `actions`, `actionsAlign` · **DRAFT**\n\n`src/components/Card/CardHeader.tsx`\n\n```ts\nactions?: ReactNode                // the head's trailing action\nactionsAlign?: 'title' | 'center'  // default 'title'\n```\n\n- **What** — a trailing slot for what the card's head offers: a \"Permissions\n  →\" link, Export, Delete Workspace (2026-10-27). The prototype hand-built the\n  head as `title16` + a `body14` sentence + a trailing link or button at eight\n  places, because the header had nowhere to put it.\n- **`actionsAlign=\"title\"`** (default) — the slot is one title line tall\n  (`h-6`, `CardTitle`'s 24px line) and centres what it holds on that line\n  (`items-center`), so a link, a 24px icon button and a 32px button all sit on\n  the title's middle however many lines the description runs: a link or a count\n  that belongs to the title, over content that goes on below.\n- **`actionsAlign=\"center\"`** — the slot is centred on the title and the\n  description together (`self-center`): the card's one act, a card that is only\n  its head and a button — Delete connection, Delete workspace. On the title's\n  line it stood at the card's top edge, over a two-line head (2026-11-03). The\n  same as `title` when there is no description.\n  - **It goes under the text when narrow** — the row wraps (`flex-wrap`), the\n    text column keeps at least 20rem (`basis-80`), and once there is less the\n    button moves under the text, at the start, 16px below it (`gap-y-4`). On a\n    phone the sentence had been squeezed into a column a few words wide beside\n    the button (2026-11-04). The Insightis kit's own card already did this\n    (2026-10-22, \"кнопка мала опускатись під\"); both products now take it\n    from here.\n- **Text size** — the slot is `text-sm`: a `LinkButton` takes the size of the\n  text around it, so a head link is 14px under the 16px title, as in the\n  product's prototype (a 12px link under a 13.5px title). Buttons carry their\n  own size and do not move.\n- **Layout** — with `actions` the vertical head becomes a row: the title and\n  description in a `min-w-0 flex-1` column that keeps the head's 4px rhythm,\n  the slot after it, 12px apart; `ms-auto`, `shrink-0`, `gap-2` between\n  several. The horizontal head adds the slot after its column.\n- `false` / `null` (a conditional action) render no slot.\n- Known difference, not restyled: `CardTitle` is `title16` plus\n  `tracking-tight` (other products use it as it is), the prototype's heads set\n  `title16` with no tracking. (Title to description is 4px since §171.)\n- **From** — LinkAI, the workspace cards. The one-act card was built in both\n  products' kits — LinkAI's `DangerZoneCard`, Insightis's Overview row.\n- **Used in** (2026-11-04) — LinkAI: Members with access, Connections\n  (Workspaces → Overview), the connection form's workspaces count (`title`);\n  `DangerZoneCard` — Delete connection, Delete workspace (`center`). Insightis:\n  a workspace's Overview — Delete workspace, Leave workspace (`center`).\n\n**minor** (`.changeset/card-header-actions.md`).\n\n---\n\n\n# `CodeBlock`\n\n## 48. New — `CodeBlock` · **DRAFT**\n\n`src/components/CodeBlock/index.tsx` · `globals.css` · `src/lib/constants.ts`\n\nA snippet the user is meant to paste somewhere else and the button that copies\nit, as one object: a copy control beside a block is not obviously attached to\nanything.\n\n- **`code`** — what is shown and what is copied, so they cannot drift.\n  `children` renders highlighted markup in its place and must render the same\n  lines.\n- **Copy** — `copyable` (on by default), `copyLabel` / `copiedLabel`. The\n  confirmation is the control itself — the glyph becomes a tick for two\n  seconds — not a toast. `navigator.clipboard` needs a secure context, which a\n  `file://` page is not: the component falls back to `execCommand`, so the\n  button keeps its promise there.\n- **`header`** — a bar above the code (`data-slot=\"code-block-header\"`) on\n  Surface/Card with a hairline under it: a file name, a language glyph, a\n  status `Badge`; a bare `<svg>` in it is 14px. Copy moves into it, at its end,\n  on the spot it held in the corner — the bar is 40px at `md`, so the button\n  stays 8px from the top and the end.\n- **`lineNumbers`** — a gutter in Ink/Inactive that a selection and a screen\n  reader both skip (`select-none`, `aria-hidden`). It counts the lines of\n  `code`: a trailing newline is not a line, CRLF is one break. Not meant with\n  `wrap`.\n- **`maxHeight`** — the code scrolls inside it; the header stays put.\n- **`wrap`** — output read as prose (a log, a traceback) wraps instead of\n  scrolling sideways.\n- **`variant=\"error\"`** — the code tinted Feedback/Red-text at 8% over the\n  block's Surface/Page (`[&>[data-slot=code-block-body]]:bg-fb-red-text/8`),\n  the kit's mix, no new token. The border and the header stay neutral: the\n  header names the failure, the code under it is what failed.\n- **Syntax colours** — no parser, the palette a caller's highlighter paints\n  with: `codeSyntaxVariants({ variant: 'keyword' | 'string' | 'number' | 'comment' })`\n  is a span's class; `code` stays the plain text Copy copies.\n\n  | Token | Light | Dark |\n  |---|---|---|\n  | `--code-keyword` | Violet-600 #7C3AED | Violet-400 #A78BFA |\n  | `--code-string` | Green-700 #047857 | Green-500 #10B981 |\n  | `--code-number` | Blue-600 #2563EB | Blue-400 #60A5FA |\n  | `--code-comment` | Text/Secondary | Text/Secondary |\n\n  All four AA on Surface/Page (light 4.9–5.5:1, dark 7.1–7.6:1). New\n  primitives `--violet-400`, `--violet-600`, `--green-700`: Chart Violet is\n  4.6:1 on dark, Green-600 3.6:1 on light. Comments are Text/Secondary, not the\n  kit's Ink/Inactive, which is 3.3:1 and fails AA. `--code-comment` is one of\n  the scoped-theme mirrors.\n- **The scrollbar** — the kit's hairline, `scrollbar-thin` on the `<pre>`:\n  10px track, 4px thumb, `--stroke-border` at rest and `--ink-inactive` on\n  hover, as every menu in the package. The platform's 16px trough with arrows\n  made it the one scroller that looked like the operating system — and the\n  utility was copied from the kit's `.cp-code-pre` in the first place.\n- **Padding** is on the `<pre>` and the root clips, so the header and both\n  scrollbars reach the edges; the horizontal scrollbar sits on the box's\n  bottom edge.\n- **From** — LinkAI, the MCP setup panel's snippets. The header, line numbers,\n  height, wrapping, error tint and syntax colours came from Insightis's chat\n  answers that ran code: its kit carried its own copy (owner's call,\n  2026-10-19 — what a kit duplicates comes from the library).\n- **Used in** (2026-11-03) — LinkAI: the connection form's help panel, a\n  workspace's MCP panel. Insightis: `ChatToolCalls` (`header`, `lineNumbers`,\n  `wrap`, `codeSyntaxVariants`). `variant=\"error\"`: neither yet.\n\n**minor** (`.changeset/code-block-header.md`).\n\n---\n\n# `ConnectorLogo`\n\n## 16. `ConnectorLogo` · **DRAFT**\n\n`src/components/ConnectorLogo/` + `scripts/gen-connector-logos.mjs`\n\n- **Data-URIs** — nothing is fetched at runtime, so a mark cannot arrive as a\n  broken image in a consumer's build, in Storybook or on a design canvas.\n- **A monogram** for an unknown connector, not an empty square.\n- **Names resolve loosely** — `PostgreSQL`, `postgresql`, `Postgres` find the\n  same mark, so a page never needs the slug.\n- **The pack is generated** from the Insightis app's SVG folder by the\n  script: extending it is a re-run, not a code change.\n- **Two marks the folder does not have**, both Devart's own from the dotConnect\n  pages (`cdn0.devart.com/images/logo/database/logo-db2.svg`, `…/logo-sqlite.svg`,\n  60×60), in `logos.ts` in alphabetical order:\n  - `db2` — its tile filled 90% of the file, a size larger than the marks\n    beside it, so it is drawn in a 94-unit box (`viewBox=\"-17 -17 94 94\"`): 57%,\n    as FreshBooks' (146 of 256);\n  - `sqlite` — the blue square and the feather filled 81% where the marks\n    beside it fill 64–70% (PostgreSQL 64, MySQL 63, SQL Server 70, Oracle 70,\n    measured off the rendered images), so it is drawn in a 74-unit box\n    (`viewBox=\"-7 -7 74 74\"`): 66%.\n\n  Before the generator is next run against the app's folder, put the same files\n  there as `db2.svg` and `sqlite.svg`, or the run drops them.\n- **From** — Insightis, its connector list; DB2 and SQLite for LinkAI's\n  catalog, where they fell back to a letter on a grey tile.\n- **Used in** (2026-11-03) — LinkAI: the catalog tiles, the source badge, list\n  rows and tree rows. Insightis: inside `IK.ConnectorMark`, with the old\n  prototype's logos where the pack has none.\n\n**minor** (`.changeset/connector-logo.md`).\n\n---\n\n# `DropdownMenu`\n\n## 43. `DropdownMenu` — two kinds of row it could not draw · **DRAFT**\n\n`src/components/DropdownMenu/DropdownMenuItem.tsx`,\n`src/components/DropdownMenu/DropdownMenuRow.tsx` (new)\n\nA menu could only draw one kind of row: an item that highlights on hover and\ndoes something when clicked. Two shapes the kit specifies had nowhere to go, so\npages built them out of a `Popover` instead.\n\n**`variant=\"accent\"`** — the one row in a menu that *is* the action, such as\n\"Choose File\" or \"Manage Connections\":\n\n```\naccent: 'font-medium text-ink-highlight'   // + the same hover/pressed as any row\n```\n\nInk and weight, on the same rail as everything else. Not a bordered button: at\n4px of menu padding a second edge lands against the divider and outweighs the\nlist it belongs to. `--ink-highlight` is Brand-600 on light and Tertiary-400 on\ndark, so one value holds AA in both.\n\n**`DropdownMenuRow`** — a label with its own control (a switch, a badge, a\ncounter) or a plain reading. Same `px-3 py-1.5` as an item, so every label in\nthe menu shares one left edge. **No hover fill, no pointer cursor** — a hover\nsurface promises the row does something.\n\n`DropdownMenuLabel` is not this: it is the 10px caps heading that captions a\ngroup.\n\n## 55. `DropdownMenu` — a link may open a menu · **DRAFT**\n\n`src/components/DropdownMenu/DropdownMenu.md`, `changes/Harness.tsx`\n\n**Nothing in the library changed.** `DropdownMenuTrigger asChild` already\naccepts any child and `Link` already inherits its font-size from the line it\nsits in. What is new is the statement that this is allowed, and the two rules\nthat go with it — one menu whatever the handle, and the state glyph outside the\ntrigger, because it marks the row rather than the destination.\n\n**Why it is marked draft.** It is written down for one of three design concepts\nfor the Connections list. The concept that keeps a Workspaces *column* hangs\nthe menu off a disclosure control and has no use for this; the concept that\ncarries the answer as a sentence under the connection's name has no other\nhandle that fits. If that concept is not chosen the section goes and nothing\nelse moves, so nothing should be built on it meanwhile.\n\nThe storybook harness gained a `draft` state for exactly this\n(`changes/Harness.tsx`), distinct from `proposed`: a proposal has not been\nmade yet, a draft has — what is undecided is whether it gets to stay. It paints\non the attention tokens, which is what this system already uses for \"needs a\ndecision\".\n\n**Both products.** Documentation and a storybook state; no component code.\n\n## 74. The focus ring a closed menu left behind\n\nReported from the connections list: open a row’s Workspaces menu with the\nmouse, close it, and the trigger is left wearing a focus ring — on one row of\na table nobody is navigating with the keyboard, until the next click somewhere\nelse. It reads as \"this row is selected\", which is a state that column already\nuses for something else.\n\nRadix returns focus to the trigger when an overlay closes, and it has to: a\nkeyboard user who opened a menu from a row must land back on that row. It does\nit with a programmatic `focus()`, and Chrome answers a programmatic focus with\n`:focus-visible` — so the ring appears whether or not a keyboard was ever\ninvolved. The browser’s own heuristic is what is wrong here, which is why no\nstylesheet can fix it after the fact: by the time the ring is painted, the two\ncases are indistinguishable in CSS.\n\nSo the component asks the question the heuristic cannot: `lib/focus-modality`\nkeeps one boolean — was the last interaction this document saw a keystroke or a\npointer — from a capture-phase `keydown`/`pointerdown` pair (modifier-only\npresses do not count, or holding Shift before a click would make that click a\nkeyboard interaction). `DropdownMenuContent` hands focus back to the trigger\nitself, as Radix would, through `restoreFocus(trigger)` — `focus({ ...options,\nfocusVisible })` set from that boolean: after the keyboard the ring shows, after\nthe pointer it does not. Focus lands on the trigger either way, so the next Tab\ngoes on from the menu’s button. (The first version skipped the restore for the\npointer altogether; the next Tab then started from the top of the page — found\nhanding `Select` over, 2026-11-05.)\nThe hand-back runs only when focus went nowhere (`document.body`): an item that\nmoved focus on purpose keeps it, and a click into another field stays there. A\nconsumer’s own handler runs first and its `preventDefault` still wins.\n`DropdownMenu` and `DropdownMenuTrigger` wrap Radix’s to share the trigger’s\nref — and the root’s `modal` — through `DropdownMenu/context.ts`.\n\n**The menu half is in `upstream`** (MR !37, `32f88e9`); what is left here is the\ntooltip paragraph below — a trigger's tooltip opening on keyboard focus only.\n\nThe developers kept Radix’s own exception when they took this (2026-11-16,\n`e2c1511`): after any outside interaction with a non-modal menu, or a\nright-click / Ctrl+click outside any menu, focus stays where the user put it,\nso `onInteractOutside` sets a flag the close handler reads and clears.\n\nHanding focus back also opened the tooltip around a trigger — `RowMenuButton`’s\n⋮, `SidebarChatItem`’s — because Radix opens one on any focus: after a mouse\npick the row said “More actions” to nobody. `TooltipTrigger` now opens on focus\nonly after the keyboard; hover is unchanged. (The developers’ package has no\ntooltip-wrapped menu trigger yet, so this half goes with `Tooltip`’s own MR.)\n\n`Select` is on Radix Select and hands focus back the same way itself; `Modal`\nand `Popover` can take the same when each one is looked at. `Autocomplete` prevents the restore outright —\nthe right answer for a field that keeps its own focus.\n\n## 130. `DropdownMenuItem` — `isExternal`\n\n`src/components/DropdownMenu/DropdownMenuItem.tsx`\n\nA menu row that opens a new tab — Help, Terms — says so the way\n`SidebarMenuRow` already does: a 14px trailing arrow in Text/Secondary, and\nvisually hidden text, `externalLabel` (default \"(opens in new tab)\"). With\n`asChild` both go inside the caller's link. Insightis carried its own copy of this in its custom kit; owner's call (2026-10-19): what the kit duplicates comes from the library, and what the library lacks is added here, one capability at a time.\n\n## 131. New — `DropdownMenuSegmentedItem` · **DRAFT**\n\n`src/components/DropdownMenu/DropdownMenuSegmentedItem.tsx`\n\nA menu row holding a segmented choice — the theme in an account menu — changed\nwithout closing the menu. `label`, `options` (`{ value, label, icon? }`),\n`value` / `defaultValue` / `onValueChange`, `hint`, `disabled`.\n\n- ←/→ step and wrap; Enter and Space step forward; the menu stays open. A click\n  picks the segment under it.\n- A screen reader hears \"Theme: Light\" and the hint.\n- Icon-only options name themselves in a tooltip, so it needs a\n  `TooltipProvider` above.\n\nThe label sits on the left and the control on the right. The kit's row was the\ncontrol alone, full width, so the Insightis account menu changes when it moves\nonto this. Both are **minor** (`.changeset/dropdown-menu-external-and-segmented.md`).\n\n---\n\n# `HighlightText`\n\n## 109. `HighlightText` — what a search matched, marked · **DRAFT**\n\n- **`HighlightText`** — new: `text`, `query`, `className`. Every occurrence of\n  the query, case-insensitive, plain substring, as a `<mark>`:\n  `bg-badge-brand-bg text-ink-primary font-medium rounded-sm`\n  (`data-slot=\"highlight-text-match\"`). An empty query renders the text as it is.\n- **Stories** — `Default`, `InATree`.\n\n**Where it goes: a tree, or text long enough to hide the match** — not a flat\nlist of short names filtered by name. There the filter already says why a row\nstayed, and most products leave the rows unmarked; a mark on every row is\nnoise. In a tree a search shows each match with the path above it (catalog,\nschema, table), and only the mark tells the matching row from the rows shown\nto place it — a table kept for a column inside it, a schema kept for one of a\nthousand tables.\n\nA highlighter, because that is what a reader recognises as \"this is what you\nsearched for\": the brand tint behind the match — `--badge-brand-bg`, the\n`brand` badge's fill, 1.34:1 against the card in light and 1.31:1 in dark —\nunder the name's own ink (`text-ink-primary`, 13:1 and 11:1 on it), with one\nstep of weight so the mark does not rest on colour alone. No new token: the\nfill is the one the system already uses for a brand chip.\n\nTwo tries went before it, both not seen on the connections list: ink alone\n(`--ink-highlight`, no fill) on a 500-weight name, and the Primary badge's\nBrand-50 fill (1.14:1 against white). The `brand` badge's own text is not\nused — 4.30:1 on its fill in dark. The kit's weight-only `.cl-mention-hl`\nsays even less on a 400 body.\n\nWhat is marked is the test the list keeps a row by (`includes`, lowercased), so\nthe mark is exactly why the row is there. No regular expressions: a query is\ntext, and `a.b` means a, a dot, b.\n\nUsed in the LinkAI prototype's data trees — the Data model, the\nconfigure window and page, Permissions — and the connection form's scope tree.\nTried on the flat lists and pickers too, and taken off them again.\n\n---\n\n# `InlineRename`\n\n## 132. New — `InlineRename` · **DRAFT**\n\n`src/components/InlineRename/index.tsx`\n\nA row's title becomes a 24px field in place — Rename in a row menu. Insightis carried its own copy of this in its custom kit; owner's call (2026-10-19): what the kit duplicates comes from the library, and what the library lacks is added here, one capability at a time.\n\n`defaultValue`, `aria-label` (required), `onCommit(trimmed)`, `onCancel()`.\nEnter or blur commits, once; Esc, an empty value and an unchanged one cancel;\nEnter while an IME is composing is ignored. Its clicks and keys never reach the\nrow it sits in.\n\nIt focuses and selects one tick after mounting: Radix runs a menu item's\n`onSelect` while the menu's focus trap still holds, so focusing at once would\nblur and commit before the person typed anything. Built on the bare `Input` at\n24px with `-my-0.5`, so a 44px row stays 44px — `InputGroup`'s smallest is 28px.\n\n**minor** (`.changeset/list-row-actions.md`).\n\n---\n\n# `Input`\n\n## 172. `Input` — `digitsOnly`\n\n`src/components/Input/index.tsx` · `InputGroup/InputGroupInput.tsx` (takes `InputProps`)\n\n```ts\ndigitsOnly?: boolean   // default false\n```\n\n- **What** — a field that takes digits and nothing else: a port, a timeout, a\n  count. A letter typed, pasted or dropped never reaches the value — \"30s\"\n  pasted is 30, a letter typed leaves the value as it was — so the form has no\n  \"Enter a whole number\" to show (2026-11-03).\n- **How** — a letter is stopped before it lands (`beforeinput`): typed over a\n  selection, the selected digits stay; a paste goes in as its digits only,\n  through the field's own undo history. What gets past that — a drop, autofill\n  — is cleaned in `onChange` before the caller's handler runs, and the caret\n  keeps its place less what was dropped before it. `inputMode=\"numeric\"` for\n  the phone's keypad, unless the caller passes its own.\n- **Fixed 2026-11-04** — cleaning only in `onChange` let the letter in first:\n  digits selected and a letter typed over them were wiped (\"8080\" → empty).\n- **Not `type=\"number\"`** — its spinner steps a value nobody steps (a port is\n  typed), it takes `e`, `-` and `.`, and its value reads empty while it holds\n  them.\n- A range (a port's 1–65535) is still the caller's check.\n- **From** — LinkAI, the connection form's number fields.\n- **Used in** (2026-11-03) — LinkAI: every number field of the connection form\n  (Port, timeouts, counts). Insightis: no number fields.\n\n**minor** (`.changeset/input-digits-only.md`).\n\n---\n\n# `InputGroup`\n\n## 7. `InputGroupAddon` resized glyphs it did not own\n\n`src/components/InputGroup/InputGroupAddon.tsx`\n\n```diff\n- xs: '[&_svg]:size-4',  sm: '[&_svg]:size-5',  md: '[&_svg]:size-5',\n+ xs: '[&>svg]:size-4',  sm: '[&>svg]:size-5',  md: '[&>svg]:size-5',\n```\n\nA descendant selector reaches into every control nested in the addon and\nout-specifies its own size step. The rule now means what it was meant to mean:\nthe addon sizes **its own** decorative glyph; a nested control sizes its own.\n\n### The \"before\", measured rather than remembered\n\nAn earlier draft of this section described the old behaviour from the diff and\ngot it wrong in the detail. Measured in the published Storybook\n(`origin/master`, the pre-audit baseline), `PasswordInput` rendered:\n\n| field | leading `Lock` | trailing `Eye`, inside an `IconButton` |\n|---|---|---|\n| xs · 28px | 16 | **18** |\n| sm · 32px | 20 | **18** |\n| md · 36px | 20 | **18** |\n| lg · 40px | 20 | **18** |\n| xl · 44px | 20 | **18** |\n\nTwo things follow, and neither is what the first draft said.\n\n**The leading glyph carried no override at all.** It tracked the addon's ladder\nexactly — 16 at `xs`, 20 everywhere else — because it is a direct child and the\naddon was entitled to size it. Nothing was fighting there.\n\n**The trailing glyph was pinned to 18px with `!important`** — `!size-[1.125rem]`\non both `Eye` and `EyeOff`. That is the real cost of the descendant rule: a\nnested control could not state its own size, so the only way out was `!` plus a\nliteral. And 18px is on **no** ladder — not the old 16/20, not the kit's\n14/16/16/20/24, not anything. It was chosen to sit between the 20px lock and\nwhatever looked balanced, which is what a workaround looks like when the system\ngives you no step to ask for.\n\nSo the field's two glyphs disagreed at every size except one, and the disagreement\nwas invisible in review because both halves looked deliberate: one followed a\nladder, the other was explicitly pinned.\n\n> The earlier text claimed \"three `!size-4`\" and a clear button rendering 20px.\n> The overrides were one `!size-4` and two `!size-[1.125rem]`, and the trailing\n> glyph measured 18px, not 20px. Corrected against the published build rather\n> than the diff — the diff shows what changed, not what rendered.\n\n### It took two more passes to actually finish\n\nRemoving the `!` marks was necessary and not sufficient. The lock then followed\nthe addon (correct), while the toggle fell back to whatever the nested\n`IconButton`'s own `size` prop said — a hardcoded `sm`, so 16px at every step.\nThe two ends of the field still disagreed, just less visibly.\n\nThe ladder is only shared once the size is passed **to the button** rather than\nwritten on the icon (§44): a class on the glyph loses to the addon's child\nselector in one direction and to the IconButton's own descendant selector in the\nother, so the icon's own `className` was never going to decide anything.\n\n## 9. A field label as loud as the hint beneath it\n\n`src/components/TextArea/index.tsx` — `InputGroup`'s half is in `upstream` (MR !29)\n\n```diff\n- textColor=\"secondary\"\n+ textColor=\"body\"\n```\n\nLabel and helper both resolved to `--ink-secondary`; only weight separated them.\nA hint as loud as the label it belongs to stops being subordinate to it.\n\nThe hint was **not** moved down instead: `--ink-secondary` is its role, and the\nstep below (`--ink-inactive`) is the placeholder/disabled role — a hint rendered\nin it says \"this field is switched off\". Moving the label up gives the pair a\nclean step of hierarchy with no new token.\n\n## 45. `InputGroupAction` — the docked-icon inks\n\n`src/components/InputGroup/InputGroupAction.tsx`\n\nThe action is `upstream`'s — a 24px box around a 16px glyph, no surface, the\nfield's `pe-2` inset. It answers the pointer in the inks every docked icon here\nuses: `--ink-icon` → `--ink-icon-hover` (§5), where `upstream`'s goes\n`text-ink-secondary` → `hover:text-ink-primary`.\n\n---\n\n# `ListPageLayout`\n\n## 133. `ListPageLayout` — the header condenses, and the body takes a class\n\n`src/components/ListPageLayout/index.tsx` · `use-list-header-height.ts`\n\nThe layout owns the scroller, so it is where condensing is decided; `PageHeader`\nstill has no scroll listener (§15). Insightis carried its own copy of this in its custom kit; owner's call (2026-10-19): what the kit duplicates comes from the library, and what the library lacks is added here, one capability at a time.\n\n- `condenseAfter` — past that many pixels, below `lg`, the header condenses: its\n  padding tightens to 6px over `--motion-slow` and the wrapper carries\n  `data-condensed`. From `lg` up the header scrolls away and never condenses.\n- `stickyHeader` also takes a function, `({ condensed }) => node`, so the header\n  can pass `condensed` on to `PageHeader`. No context, no new hook, no\n  `cloneElement` guessing which child is the header. The type is\n  `ListPageLayoutHeaderState`.\n- `bodyClassName` reaches the body's own `pb-3` and `gap-3`, which\n  `contentClassName` cannot — it sits on the column that also holds the header,\n  so its padding stacks. A page's 4rem bottom room is `bodyClassName=\"pb-16\"`.\n- `data-slot` on both parts: `list-page-layout-header`, `list-page-layout-body`.\n\n**A flicker the simple rule has.** `scrollTop > 60` — what the Insightis kit did\n— loops under scroll anchoring: stop just past the line, the header shrinks, the\nbrowser takes the difference off `scrollTop`, the header grows back, and it\nrepeats every frame (62 ↔ 48, measured in Chromium). The layout adds back the\nheight the header lost since it condensed, so the test is stable; a unit test\nholds it there.\n\n**minor** (`.changeset/list-page-condense.md`).\n\n---\n\n# `Modal`\n\n## 71. `Modal` — a `size` ladder, and a height it cannot pass · **DRAFT**\n\n`src/components/Modal/ModalContent.tsx`, `globals.css`\n\n`upstream`'s `ModalContent` is one width and one cap: `max-w-lg`,\n`max-h-[90dvh]`. Here it takes `size` — `sm` 22.5rem, `md` 30rem (the default),\n`lg` 36rem, `xl` 56rem — from `--modal-w-*` (`max-w-modal-*`), and caps at\n`--modal-max-h`.\n\n**`xl`.** The ladder stopped at `lg`, 36rem, described as \"for a multi-step wizard\" —\nwhich is a column of fields, the widest thing a form needs. A dialog holding\na **tree** or a **table** is not that: a row of the connection-scope tree\ncarries a disclosure, a name, a row count and a two-state control, and the\ncontrol alone is 150px. At 36rem the table names truncated to one word.\n\n`xl` is 56rem — the same ratio step as 30 → 36 — and still leaves a page\ngutter on a 1280px window, which is inside the 900px minimum this product\ndeclares only because the dialog caps at the viewport anyway.\n\nIt is a last resort, and the docblock says so: a surface this wide covering\nthe page is usually the sign that the thing belongs on a screen of its own.\nThe case for using it has to say why the context behind must not be lost.\n\n`--modal-w-xl` in `globals.css`, `max-w-modal-xl` in the preset, and the class\nlisted in `gen-classlist.mjs` — a `max-w` the enumeration does not know about\ncompiles to nothing (§19), and the ladder is enumerated by name.\n\n### And a height it cannot pass\n\nWidening the ladder made the other axis the problem: a dialog holding a tree\ngrows with its content, and `ModalContent` had `max-h-[90dvh]` — 10% of the\nwindow left over, split between two ends, so on a 900px window the dialog\nstopped 45px short of each edge and read as a page with a hairline round it.\nA dialog has to be visibly ON something.\n\n`--modal-max-h: 80dvh` in `globals.css`, `maxHeight: { modal: … }` in the\npreset, `max-h-modal` on `ModalContent`, and `modal` in the `max-h` cross in\n`gen-classlist.mjs`. Measured on a 900px window: 720px, with the tree\nscrolling inside its own body. The arbitrary value had to go for the same\nreason `max-w-[56rem]` could not stay — `max-h-[90dvh]` is not enumerated, so\nit compiled to nothing and the cap was never applied at all.\n\n`dvh`, not `vh`: on a window whose chrome can retract, `vh` measures the\nlarger state and a dialog sized against it is clipped in the smaller one.\n\n## 159. New — `ModalDescription` · **DRAFT**\n\n`src/components/Modal/ModalDescription.tsx` · `src/components/Modal/ModalContent.tsx`\n\n- **What** — the line under a dialog's title, on Radix `Dialog.Description`\n  (2026-10-27). `Modal.md` documented it and the package never had it, so\n  dialogs wrapped `ModalTitle` and a `Typography` in a div of their own inside\n  `ModalHeader` (three in the prototype's workspaces page).\n- **Look** — `body14`, `--ink-secondary`, a `<p>`; overridable (`textStyle`,\n  children) for a shorter or iconed line.\n- **Place** — inside `ModalHeader`, after `ModalTitle`, in the header's own\n  gap. Known difference: the prototype set its pair 4px apart; `ModalHeader`'s\n  gap is 6px (`gap-1.5`) and is not changed here.\n- **`ModalContent` no longer passes `aria-describedby={undefined}`** — it\n  silenced the old Radix warning and also overrode the id Radix points at a\n  Description, so the sentence was never announced. Radix 1.1.23 leaves the\n  attribute off by itself when no Description is mounted; a caller's own\n  `aria-describedby` still wins (`ConfirmationDialog`).\n\n**minor** (`.changeset/modal-description.md`).\n\n## 176. `ModalBody` — the scrollbar in the dialog's padding, the fields inset alike\n\n`src/components/Modal/ModalBody.tsx`\n\n**From** Insightis (Create metric, designer 2026-11-09: \"скрол мав бути на краю\nпопапа, а він на краю контенту\"; \"ліва сторона меншою за праву\"). **Used in**\nevery dialog whose body scrolls.\n\n`ModalBody` reached into the dialog's right padding by a fixed 16px (`-mr-4`)\nand gave 8px back (`pr-2`), as if the bar were always 8px. It is not:\n`scrollbar-thin` is 8px in Firefox, about 11px in Chrome on Windows, and 0\nwhere scrollbars overlay. So with a bar the fields stopped about 19px from the\nright edge and 16px from the left, and with no bar (a short form) they ran to\n8px from the right — the body was a different width from the header and footer\nit sits between, and changed width as it started to scroll.\n\nNow the body spans the dialog's full width (`-mx-4 px-4`), the gutter is\nreserved whether or not it overflows (`scrollbar-gutter: stable`), and the\nright padding is the **left padding less the bar's width**, both measured\n(re-measured on resize, since a zoom re-sizes the bar in CSS px). The bar sits\nin the dialog's own padding, against its edge; the content is inset alike on\nboth sides, with a bar or without one (measured in Chrome on Windows: 10px\ngutter + 6px padding against 16px on the left).\n\nMeasuring the left padding rather than assuming 16px keeps a body with its own\ninset symmetric too. `ConfirmationDialog`'s dialog has no padding (`p-0`) and\nits body is `px-5`: it now passes `mx-0` (it passed `mr-0`, which with the new\n`-mx-4` would have pulled its text 16px past the dialog's left edge) and gets\n20px on both sides.\n\n**patch** (`.changeset/modal-body-scrollbar-edge.md`).\n\n---\n\n# `PageHeader`\n\n## 15. `PageHeader` — the back control, the slots, `condensed`, the title · **DRAFT**\n\n`src/components/PageHeader/index.tsx`\n\n`upstream`'s `PageHeader` is `titleLeft`, the `h2` title, `titleRight` and\n`actions`: a `div` with `mb-2`, the title cluster at `gap-2`, the actions at the\nfar edge at `gap-2`. On top of that, here:\n\n- **`onBack`** (`backLabel`) — a tertiary back control before the title: a 36px\n  box with a 24px glyph, the glyph 12px from the title (the cluster's `gap-1`\n  plus `me-0.5`). At 12px the arrow still reads as the title's own; the rest of\n  the row is spaced wider.\n- **`titleLeft` opens the row** — before the back control when there is one;\n  the mobile sidebar trigger goes there. `upstream` describes it as immediately\n  before the title.\n- **`titleRight`** sits 12px from the title (`ms-2` on the cluster's `gap-1`).\n- **The row** is a `<header data-slot=\"page-header\">` with no margin of its\n  own, its parts and its actions 12px apart (`gap-3`).\n- **`condensed`** — the header once the page scrolls: the same row with the\n  title at `heading20` (the kit's `.cl-page-title` once its sticky head has\n  scrolled) where the full title is `upstream`'s `h2` (`text-2xl md:text-3xl`),\n  and the back control at 32/16, sized against the title. Every part keeps its\n  column, so it is a shrink, not a relayout. On a 900px window a header that\n  stays put is a fifth of the height in front of the form.\n  - **The consumer decides when** — no scroll listener: which element scrolls\n    is the page's fact (`ListPageLayout condenseAfter`, §133, decides it for a\n    list page).\n  - **It moves as one** — the title (30 → 20px), the back control's box and its\n    glyph (24 → 16px) over `--motion-slow` (240ms) on the standard curve\n    (`transition-all duration-slow`), `motion-reduce:transition-none`; a\n    consumer animates its padding over the same. In one frame it read as a\n    jump; a font-size transition reflows one line of one header for a quarter\n    of a second, the cost that did not show. The kit's `.cl-page-title`\n    animates its size too.\n- **The title truncates**, one line beside the actions; `wrapTitle` wraps it\n  instead (`min-w-0 break-words`), so on a phone \"Data Sources\" beside Create\n  Connection does not read \"Data So…\". `upstream`'s always wraps.\n- **From** — LinkAI, the connection form (the back control, `condensed`).\n  `wrapTitle` from Insightis, whose kit carried its own copy (owner's call,\n  2026-10-19).\n- **Used in** (2026-11-03) — LinkAI: Connections, the connection form,\n  Workspaces, the catalog (`onBack`, `condensed`). Insightis: `ListPage`\n  (`onBack`, `wrapTitle`).\n\n```jsx\n<PageHeader\n  title=\"Connect to DB2\"\n  onBack={…}\n  titleRight={<Badge variant=\"secondary\" leftSlot={<ConnectorLogo connector=\"DB2\" size=\"2xs\" />}>DB2</Badge>}\n/>\n```\n\n**minor** (`.changeset/page-header.md`; `wrapTitle` in `.changeset/list-page-condense.md`).\n\n---\n\n# `Pagination`\n\n## 82. `Pagination` — a stream read in order has no use for page numbers · **DRAFT**\n\n`src/components/Pagination/index.tsx`\n\nNew prop: `showPageNumbers` (default `true`, so nothing that exists moves).\n\nThe component always drew the numbered buttons. That is right wherever a page\nnumber is a DESTINATION — a table somebody searches, sorts and comes back to,\nwhere \"page 4\" is a place you meant to be. It is wrong for a stream that is read\nin order. A connection's log is the case that raised it: three pages, three\nnumber buttons, all of them doing what Next does, and the one that is current\ndoing nothing at all. What keeps the reader's place there is the range beside\nthe control — *Showing 51–100 of 118* — and what moves it is Prev and Next.\n\n```jsx\n<Pagination\n  currentPage={page}\n  totalPages={pages}\n  onPageChange={setPage}\n  showFirstLast={false}\n  showPageNumbers={false}\n/>\n```\n\nPair it with `showFirstLast={false}`: First and Last are jumps of the same kind,\nand leaving them in while the numbers go is half a decision.\n\n## 93. `Pagination` takes a rung, and the page gets a floor · **DRAFT**\n\n- **`Pagination`** — new `size` prop: `sm` (32px, default) · `xs` (24px).\n  Threaded to `PageButton`, `NavButton` and `EllipsisIndicator`; the row gap\n  closes with it (8px → 4px). New `Pagination/size.ts` holds the type and the\n  box map, so one file decides what a rung measures.\n- **`lib/utils`** — new `pageFloor` recipe (`pb-8`), beside `focusRing` and\n  `glyphStroke`.\n\n### The rung\n\nEvery part was hard-coded to `size-8` with `size=\"sm\"` underneath it. That is\nright when the pager is the page’s own control, and wrong under a table: there\nit shares a footer band with the range it annotates — \"Showing 1–20 of 300\" at\n`body12` — and a 32px control beside 12px text is the loudest thing in a strip\nwhose whole job is to be quiet. 24px is the floor for the hit target, so the\nladder is two rungs and stops.\n\n### The floor\n\nRaised by the connections prototype, where the last table row finished flush\nagainst the bottom of the window — for the second time.\n\nThe reason it comes back is that the padding looks present and does nothing.\nA page puts `pb-8` on its content box, that box is `min-h-0 flex-1`, and such\na box is sized to the SCROLLPORT: its padding is drawn at its own bottom edge,\nwhich is the bottom of the window, and the content scrolls straight past it.\n\nPadding on the scroll container is the other wrong answer — it moves the sticky\nconstraint rectangle, and a `sticky bottom-0` commit bar then stops short of the\nwindow with the form scrolling visibly underneath it.\n\nSo the recipe names where it goes as much as what it is: the element that GROWS\nwith the content. `lib/utils` is re-exported into the design-sync bundle, so a\nconsumer gets the name rather than a number it picks for itself.\n\n## 161. `Pagination` — `totalItems` and `pageSize`, the range · **DRAFT**\n\n`src/components/Pagination/index.tsx`\n\n```ts\ntotalItems?: number   // with pageSize → \"Showing {from}–{to} of {total}\"\npageSize?: number\n```\n\n- **What** — the readout `Pagination.md` and the `showPageNumbers` / `size`\n  docs already ask for (\"always show the current range and the total\"), built\n  by hand beside the pager at three places in the prototype (2026-10-27).\n- **Look** — \"Showing 26–50 of 60\" (en dash), `body12`, `--ink-secondary`, on\n  the leading edge of one band; the pager on the trailing edge; `flex-wrap\n  justify-between gap-3`, the band every one of the three drew. Pair it with\n  `size=\"xs\"` under a table.\n- **Arithmetic** — from `(currentPage − 1) × pageSize + 1` to\n  `min(currentPage × pageSize, totalItems)`; an empty list reads 0–0 of 0.\n- `totalPages` is still the caller's; without both new props the pager renders\n  alone, as before.\n\n**minor** (`.changeset/pagination-range.md`).\n\n---\n\n# `PinToggle`\n\n## 136. New — `PinToggle` · **DRAFT**\n\n`src/components/PinToggle/index.tsx`\n\nPin a row: an outline glyph when off (`tertiary`), a filled brand glyph turned\n30° when on (`primaryTertiary`), both keyed on `aria-pressed`. Insightis carried its own copy of this in its custom kit; owner's call (2026-10-19): what the kit duplicates comes from the library, and what the library lacks is added here, one capability at a time.\n\n`pressed` / `defaultPressed` / `onPressedChange`, `pinLabel` (\"Pin\"),\n`unpinLabel` (\"Unpin\"), `size` (default `2xs`). The accessible name stays\n\"Pin\" in both states — the pressed state says the rest — and only the tooltip\nflips. Its clicks and keys never open the row. Not taken from the kit: the glyph\nstraightening on hover. **minor** (`.changeset/list-row-actions.md`).\n\n---\n\n# `Popover`\n\n## 34. `PopoverContent` — a closed panel stayed painted\n\n`src/components/Popover/PopoverContent.tsx`\n\n```diff\n  'data-[state=closed]:animate-out',\n+ 'data-[state=closed]:fill-mode-forwards',\n  'data-[state=closed]:fade-out-0',\n  'data-[state=closed]:zoom-out-95',\n```\n\nMeasured in the browser with the page's bridge removed: after clicking a second\nrow's trigger, the first popover held `display: block` and **`opacity: 1`** for\nover 700ms before Radix unmounted it — two panels on screen at once, one of them\nbelonging to a row already left.\n\nThe cause is in the compiled rule:\n\n```css\n.data-\\[state\\=closed\\]\\:animate-out[data-state=closed]{animation-name:exit;animation-duration:.15s}\n@keyframes exit{to{opacity:var(--tw-exit-opacity,1); transform:…}}\n```\n\n`exit` has only a `to` frame and nothing sets `animation-fill-mode`, so the\nmoment the 150ms run ends the element **snaps back** to its own opacity and sits\nthere fully painted until the unmount lands. `forwards` holds the faded-out end\nframe instead.\n\nThe page's bridge was `[role='dialog'][data-state='closed'] { display: none }`,\nwhich is worse than it looks: `display:none` also stops the animation, and the\n`animationend` Radix is waiting on to unmount never fires.\n\n**Both products.** Purely additive — it changes nothing while the popover is\nopen or opening. The same pattern (`animate-out` with no fill mode) is on\n`DropdownMenuContent`, `TooltipContent` and `SheetContent`; none of them was\nreported, so they are left alone and noted here rather than changed blind.\n\n## 88. `Popover` floated on the page colour\n\n- **`PopoverContent`** — background `bg-surface-page` → **`bg-surface-card`**.\n\nSurface/Page is the colour the page is painted. A popover wearing it had no\nsurface of its own: over the page body only the 1px border said where the\npanel began, and over a card — which is where most of them open — it read as\na hole cut in the card rather than a panel above it.\n\n`DropdownMenuContent` has always been `bg-surface-card`, and the two are the\nsame family of floating panel with the same elevation shadow. One of them\nwearing the page colour was the defect; the shade itself was never the\ndecision.\n\nRaised by the connections prototype, where a popover carrying a connection’s\ndescription and its problems opens over the catalog table.\n\n---\n\n# `ProgressBar`\n\n## 105. `ProgressBar` — `trackVariant` · draft\n\n- **`ProgressBar`** — new `trackVariant?: 'default' | 'destructive'`. The\n  track's `bg-surface-chips` moves from the base into `default`;\n  `destructive` is `bg-fb-red`. The indicator's `variant` is unchanged.\n\nFor a bar that splits a whole into two answers — the workspaces prototype's\n\"Members with access\": 12 Allowed · 12 Denied — the grey track read as \"nothing\nyet\", so the Denied half looked empty. With `variant=\"green\"` and\n`trackVariant=\"destructive\"` both halves show.\n\n---\n\n# `PromoCard`\n\n## 116. `PromoCard` — the hover holds over the dismiss\n\nThe dismiss is a sibling of the link laid over its corner, and `upstream`'s\nhover is `hover:bg-state-hover` on the link. So the pointer moving from the card onto\nthe ✕ left the link — and the card dropped its hover while the pointer was still\non it. The Insightis original does the same (`.promo-card:hover` on the anchor,\nthe ✕ beside it, and there the card also fell 1px as its lift went), which is\nhow it reached the package.\n\nThe hover now hangs on the root: `group/promo-card` there,\n`group-hover/promo-card:bg-state-hover` on the link. Over the ✕ the card keeps\nits fill and the ✕ adds its own tertiary wash on top. The hit areas do not change:\nthe link is still the card, the ✕ still its own control.\n\n---\n\n# `RowMenuButton`\n\n## 137. New — `RowMenuButton` · **DRAFT**\n\n`src/components/RowMenuButton/index.tsx`\n\nThe ⋮ at the end of a list row and the menu it opens — what every list with a\nrow menu hand-rolled. It is not a new look (`IconButton` `tertiary` `2xs`),\nso it is not a variant, and it is not a part of `SelectableListCard`: exports\nare by subpath, and a `TableRow` would otherwise import a list card to get a\nkebab. Insightis carried its own copy of this in its custom kit; owner's call (2026-10-19): what the kit duplicates comes from the library, and what the library lacks is added here, one capability at a time.\n\n- `reveal` (default on) fades it in off `group/row` — hover, focus inside the\n  row, open — by opacity only, so nothing in the row moves. Below `md` and with\n  `(hover:none)` it is always there.\n- Its clicks and keys, and the portalled menu's, never reach the row.\n- A menu item that moves focus keeps it: `DropdownMenuContent` hands focus back\n  to the trigger only when it went nowhere (`document.body`), so Rename's field is not robbed.\n- It names itself in a tooltip, the same as `SidebarChatItem`'s ⋮, so the two\n  row menus read alike. Needs a `TooltipProvider` above.\n\n**minor** (`.changeset/list-row-actions.md`).\n\n---\n\n# `SearchInput`\n\n## 145. `SearchInput` — the matches while typing\n\n`src/components/SearchInput/`\n\n`upstream`'s `SearchInput` is the field: `value`, `onValueChange`, `onClear`,\n`placeholder`, `clearLabel`, `size`, `ref`, and the ✕ while there is text. On\ntop of it, here:\n\n- **`results`** — with `getResultLabel`, `renderResult`, `onSelect`,\n  `emptyText` (`No matches`). What matches the\n  query, in a list under the field that opens only while something is typed:\n  not on focus, not on a click into the field, not with the picked name still\n  in it — there is no whole list to browse, so there is no chevron. At most\n  seven and a half rows (5.5 until 2026-11-05; raised with Autocomplete's list\n  limit), measured off the rendered rows; the half says there is more. Picking puts the result's name in the field and calls `onSelect`. The\n  caller matches; the field shows what it is given. The list is `Autocomplete`'s\n  combobox mechanics (`useAutocomplete`) and its option row, so the two lists\n  look and behave alike.\n- **Pass-throughs** — `variant`, `aria-label`, `autoFocus`: the ones LinkAI\n  and Insightis set. `disabled`, `id`, `style`, `onKeyDown`, `maxVisibleResults`\n  and `enterKeyHint` were dropped on 2026-11-10 — nothing used them. The\n  browser's own suggestions are off only with the list (the combobox sets\n  `autocomplete=\"off\"`); a plain search field keeps them.\n- The 7.5-row cap never applied until 2026-11-10: it was measured before the\n  portal had mounted the list. The list node is now held in state.\n\nFirst call sites: every search field in the LinkAI prototype, and its Effective\naccess search with results. Written as `SearchField` until §146.\n\n---\n\n# `SegmentedControl`\n\n## 73. `SegmentedControl` — `tone`, `tinted`, `deselectable`, `semantics` · **DRAFT**\n\n`src/components/SegmentedControl/*` · `SegmentedControl.md`\n\nThe control had one selected state, a raised card-tone pill — right when the\noptions are alternatives of one kind (Read / Read & write, Light / Dark), wrong\nwhen it states a **fact with a consequence**: Included / Excluded down a\nforty-row scope tree, read at a glance for the exceptions.\n\n- **`tone`** on `SegmentedControlTrigger`, `positive` / `negative` — the chosen\n  option is the fill, `--fb-green` / `--fb-red`, white on it\n  (`--content-on-solid`), no pill shadow, one green and one red in both themes\n  like the destructive button. On the trigger, not the control: only the option\n  knows whether it is the permissive one. Unchosen, both tones are the neutral\n  text of any trigger — the colour is the answer, not the offer. The dark fill\n  is stated (`dark:data-[state=active]:bg-fb-*`): the base's\n  `dark:data-[state=active]:bg-surface-chips` out-specified the bare tone, and\n  a chosen Allow was a grey chip.\n- **`tinted`** on a trigger — a value in effect without being chosen on this\n  row (inherited, a default), on an unchosen option: the tone's wash at 10%\n  under its ink, `--fb-green-text` / `--fb-red-text` (§167); neutral is\n  `bg-surface-card/60 text-ink-primary`. Sets `data-tinted`. 10%, a step under\n  a Badge's 15%, because it sits on the recessed track. Hover keeps the wash and\n  the ink and takes the rim every option takes — a 30% hover fell under 4.5:1\n  (green 2.4:1 on light). A plain unchosen option keeps the neutral hover\n  whatever its tone: a grey option turning red under the pointer offered a Deny\n  nobody had chosen.\n  - `tintedLabel` (default `'in effect'`) — read after the label while the\n    option is tinted and not chosen; a screen reader heard \"not checked\".\n- **`deselectable`** on the control — `value` may be `''`: a press (mouse down,\n  Enter / Space) on the chosen, enabled option clears it, `onValueChange('')`.\n  The consumer's own `onMouseDown` / `onKeyDown` run first; Radix's handler is\n  stopped. The root holds the value beside Radix and puts `deselectable`,\n  `value` and `clear()` on the context. The way back to \"inherit\" is the\n  control's: a page catching the press itself did it on one tree and not the\n  other.\n- **`semantics`** `'tabs' | 'radio'`, radio by default when deselectable — the\n  list a `radiogroup`, each option a `radio` with `aria-checked`; arrows, Tab\n  and Space as before. Built on Radix Tabs, every picker announced \"Allow, tab,\n  1 of 2\" and pointed `aria-controls` at a panel it never renders. A view\n  switcher with `SegmentedControlContent` stays `tabs`.\n- **Docs** — `SegmentedControl.md`: the one-active rule names its exception;\n  Tones, Nothing selected, Disabled (keeps tone and tint, dimmed), A tooltip on\n  a trigger (wrap it: `TooltipTrigger asChild` overwrites `data-state`).\n  Stories: Tones, Tinted, Deselectable, Disabled.\n- **Build** — listed in `gen-classlist.mjs`: `CV` carries\n  `data-[state=open|on|checked]`, not `active`, the state Radix Tabs stamps,\n  and a colour on it compiles to nothing otherwise (§19).\n- **From** — LinkAI, the workspace's Data model and Permissions trees.\n- **Used in** (2026-11-03) — LinkAI: `LevelToggle`, the row toggle of both\n  trees, and the review kit's access page. Insightis: none.\n\n---\n\n# `SelectableListCard`\n\n## 138. `SelectableListCard` — keyboard, `aria-selected`, `menu`\n\n`src/components/SelectableListCard/index.tsx`\n\nThe item opened on a click and nothing else. Now it is a tab stop; Enter and\nSpace call `onCardClick`, but only when the item itself has focus — a key from a\ncontrol inside it is that control's. It carries `aria-selected`, and the card\nlayout gets the system `focusRing`. Insightis carried its own copy of this in its custom kit; owner's call (2026-10-19): what the kit duplicates comes from the library, and what the library lacks is added here, one capability at a time.\n\nThe row layout takes `menu` (`DropdownMenuItem`s) and `menuLabel` (default\n\"More actions\"): a `RowMenuButton` (§137) at the right edge, with `-my-0.5`\nso a row with a menu stays 44px. The card layout puts one in `rightSlot`.\n`aria-selected` means something to assistive tech only under a list or grid\nrole, which the caller gives. **minor** (`.changeset/list-row-actions.md`).\n\n---\n\n# `Sidebar`\n\n## 10. `SidebarHeader` owns the horizontal inset\n\n`src/components/Sidebar/SidebarHeader.tsx`\n\n`upstream`'s header is `flex gap-2 p-4`, and `SidebarPanelHeader` adds its own\n`pr-2 pl-4` on the row inside it. Here the header owns the inset —\n`ps-4 pe-2 pt-3 pb-2`, `px-2` in the collapsed rail (§72) — and\n`SidebarPanelHeader` has none, so the two never stack and a row laid out by hand\nlands on the same 16px line as the nav glyphs. `pe-2` matches the nav column, so\na trailing collapse control lines up with the menu edge. A row that genuinely\nneeds the edges opts out with `-ms-4 -me-2`.\n\n## 11. `SidebarMenuButton` rendered tooltips with no styling at all\n\n`src/components/Sidebar/SidebarMenuButton.tsx`\n\nIn the collapsed rail the labels showed as loose text floating over the page.\nMeasured, not guessed: the tooltip carried `className: \"\"` and\n`background-color: rgba(0, 0, 0, 0)`.\n\nThe component imported `Tooltip`, `TooltipContent` and `TooltipTrigger` from\n`@radix-ui/react-tooltip` — the **raw primitives** — instead of from `../Tooltip`.\nRadix ships behaviour, not appearance: no bubble, no arrow, and no portal\ncontainer. The last part matters beyond looks — `TooltipContent` is what honours\n`PortalContainerProvider`, so a sidebar tooltip was also ignoring scoped theming\nand portal retargeting that every other tooltip respects.\n\nNot configurable, and should not be: a sidebar tooltip has no reason to look\nunlike every other tooltip in the system.\n\n## 12. `SidebarMenuButton` — a 32px box its own padding did not fit\n\nThe account avatar was visibly clipped on its right side in the collapsed rail.\n\nCollapsed, the component forces `!size-8` — 32×32 — while the consumer keeps\n`px-2`, leaving **16px** of usable width. A 16px navigation icon fits exactly,\nwhich is why this surfaced on the 28px avatar and nowhere else; the overflow was\nthen cut by the component's own `overflow-hidden`. The trap was already known in\none place: the `lg` size carried `group-data-[collapsible=icon]:!p-0`, the\ndefault size did not.\n\n**The second half of the same defect.** Adding `justify-center` alone did\nnothing, because the label span was still in the row: `icon + text` is wider than\n32px, so the content overflowed and centring was meaningless — the icon stayed\npinned to the left edge.\n\nThree parts, all in the component: `!px-0` so the 32px box is usable,\n`justify-center` to replace the alignment the padding provided, and\n`[&>span:last-child]:hidden` so the label goes with it. That selector is the one\nthe neighbouring truncate rule already uses, chosen for what it does *not* match:\na nav row is `icon, span` so the label matches, while the footer row is `avatar,\nspan, chevron` — the span is not the last child, so an avatar-led row is left\nalone rather than blanked.\n\nVerified: every mark centres at **24** regardless of its own size — 16px icons,\nthe 28px avatar, and the window-bar logo.\n\n## 14. Collapsing could remove the only way to expand\n\n`src/components/Sidebar/Sidebar.md`, shell example\n\nReproduced on the prototype: with `collapsible=\"icon\"` and the trigger inside\n`SidebarHeader` under `group-data-[collapsible=icon]:hidden`, collapsing leaves\n**no control on screen that can expand it**. There is no expand-on-hover in this\npackage, and the doc's shell example did not include `SidebarRail` — so an app\nthat copied the doc inherited the dead end.\n\nNew rule, plus `SidebarRail` in the example: a `SidebarTrigger` may not be the\nonly way back if it hides when collapsed. Either render the rail, keep the\ntrigger visible, or move it outside the sidebar entirely — a page\nheader — where collapsing cannot take it away.\n\n## 35. `Sidebar` — the fixed panel was pinned to the viewport\n\n`src/components/Sidebar/index.tsx`\n\n```diff\n  'fixed inset-y-0 z-10',\n  'hidden lg:flex',\n- 'h-svh w-[--sidebar-width]',\n+ 'w-[--sidebar-width]',\n```\n\n`inset-y-0` already sets `top: 0; bottom: 0`, so the panel's height is its\ncontaining block's height. `h-svh` overrode that with the **viewport's** height,\nand the two are the same only while the app shell *is* the viewport.\n\n`position: fixed` resolves against the nearest transformed ancestor, and the\nshell that found this had one (`translateZ(0)`), with a bar above it. So\n`inset-y-0` was correct and `h-svh` was 40px too tall, which slid the account\nrow off the bottom edge. The page's answer was an override on a design-system component:\n\n```css\n.app-viewport div.fixed.inset-y-0 { height: 100%; }\n```\n\n**Both products.** Insightis is a web application with no transformed ancestor\nabove the shell, so its containing block *is* the viewport and `inset-y-0`\nresolves to exactly what `h-svh` was giving it. Nothing changes there. This is\nthe §8-class check the constraint at the top of this file asks for, and it comes\nout clean: one product is fixed, the other is unaffected, because the removed\ndeclaration was redundant in the case that still works.\n\n## 39. `SidebarMenu` — nav rows 4px apart where the kit says 2\n\n`src/components/Sidebar/SidebarMenu.tsx`\n\n```diff\n- 'flex w-full min-w-0 flex-col gap-1',\n+ 'flex w-full min-w-0 flex-col gap-0.5',\n```\n\nReported by eye, confirmed against the kit, which states both halves:\n\n```css\n.sbx-nav      { display:flex; flex-direction:column; gap:2px; padding:0 8px 16px }\n.sbx-nav-item { height:2rem; padding:0 .5rem; border-radius:.375rem; … }\n```\n\nand, in its spacing section, *\"Spacing on a 4px step with a **2px fine\nsub-step**\"* — so 2 is on the scale, not an exception to it. Everything else on\nthat row already matched: 32px height, 8px inset, 6px radius, 16px glyph.\n\n4px between 32px rows reads as a list of separate buttons; 2px reads as one\nnavigation block, which is what it is. The difference is small per row and\ncompounds: seven rows put the account footer 14px lower than the design.\n\nWorth noting **how this was missed**. Both bundles — the one committed and the\none rebuilt — carry `gap-1`, so this is not a regression and no rebuild\nintroduced it; the value has been wrong since the component was written, and the\nkit↔package audit walked components rather than composed screens, where\na 2px difference in a list of seven is what you actually see.\n\n**Both products.** The kit is the shared reference — Insightis' own sidebar is\nbuilt from `.sbx-nav`, which is already at 2px, so this moves the package\ntowards what that product ships rather than away from it.\n\n## 64. `SidebarContent` — the nav column had no gutter\n\n`src/components/Sidebar/SidebarContent.tsx`\n\n```diff\n- 'flex min-h-0 flex-1 flex-col gap-2'\n+ 'flex min-h-0 flex-1 flex-col gap-2 px-2 pb-4'\n```\n\nNothing between the sidebar edge and a row button supplied a horizontal inset,\nso the nav sat on 8px while §10 had moved the brand mark to 16. The catalog\nstory hid it by giving its own wrapper `p-2`, which meant the story certified a\nrail the library does not draw.\n\nMeasured after: the row fill starts 8px from the edge and the glyph lands on\n16 — the brand mark’s line, and what the product renders.\n\n## 72. The collapsed rail was never finished\n\nReported from the catalog's own `Collapsed Icon` story, where the product name\nran straight across a 48px rail and over the page behind it. Three things, one\ncause: the rail had been given its width and nothing else.\n\n**Nav rows had no tooltip.** `SidebarMenuButton` has carried a `tooltip` prop all\nalong — it renders the label to the side and hides it unless the sidebar is\ncollapsed — and `SidebarNavigationItems` passed it on none of the three rows it\ncan render collapsed. So the one state where a row has no label was the state\nwith nothing to supply one. Every collapsed row now passes its own title.\n\n**The delay was overridden to 500ms.** `SidebarProvider` wrapped the shell in\n`TooltipProvider delayDuration={500}`, with no note saying why. The package's\nown value is 300, the kit's. A collapsed rail has the strongest claim on the\nshorter one: the tooltip there is not extra information about the row, it is the\nname of it. The override is gone.\n\n**The header leaned 4px right of its own column.** `SidebarHeader` carries\n`ps-4 pe-2` — correct expanded, where the mark lines up with the nav glyphs.\nCollapsed, an asymmetric inset in a 48px rail stops being an inset: it put the\nsurviving control's centre on 28 while every nav glyph below centres on 24.\n`group-data-[collapsible=icon]:px-2` makes it the same 8px gutter the nav column\nuses. Measured after: both on 24.\n\n**The story was the fourth thing, and it is why none of this showed.** The\ncatalog's header row was a hand-rolled `div` with its own `px-2` and an `h5`,\nnot the brand part — so it stacked an inset on `SidebarHeader`'s own and had\nnothing to hide its label with, which is the overflow in the report. A story\nthat does not use the part cannot demonstrate the part. It uses\n`SidebarPanelHeader` now, with `SidebarTrigger` as the trailing control.\n\n## 94. The product sidebar — Pinned / Recent, the chat row, the promo slot, the compact footer\n\n`src/components/Sidebar/SidebarSection.tsx`, `SidebarChatItem.tsx`, `SidebarAccount.tsx`\n\nStorybook showed the old prod shape — Home / Search / a `Chats` row with a nested,\nleft-railed sub-list, a Settings line for a footer — long after Insightis had\nreplaced it. §10–§14, §35, §39, §64 and §72 ported the **shell**: insets, rows,\ngutter, the collapsed rail. The redesign inside the shell (`Insightis/legacy-html/changes/Sidebar.md`)\nis information architecture, and it never came across, because it needed parts the\npackage did not have. A `PromoCard` existed, but only as a separate story with\nnowhere in the sidebar to put it.\n\n**New parts**\n\n- **`SidebarSection`** — a flat list with an overline label (`Text/Inactive`,\n  brightening to `Text/Primary` under the pointer), a chevron that only appears on\n  hover and stays when closed, and an `action` slot for \"See all\" that reveals on\n  hover or focus and is always visible below `lg` and on touch. The whole label\n  toggles; the action is a sibling and never collapses. Spacing is the\n  component's: 16px under the nav, 12px between sections.\n- **`SidebarChatItem`** — h28, 14px `Text/Secondary`, radius `md`; hover\n  `State/Hover`, pressed and active `State/Pressed`, active ink `Text/Body`. The\n  title **fades** rather than ellipsising: a 36px gradient in the row's own\n  surface colour, widening to 72px on hover so the kebab sits on solid fill. The\n  gradient takes a *pre-composited* colour — `--state-hover` is a translucent\n  overlay, and a gradient ending in it would let the letters through.\n  `status=\"loading\" | \"new\"` (each with a spoken label) or a queue `count`\n  (`Counter sm`, the fade off so the title stops before the number) share the\n  right-edge slot and fade out for the kebab. `menu` takes `DropdownMenuItem`s;\n  the kebab is the shared `IconButton` tertiary `2xs` and a **sibling** of the\n  link.\n- **`SidebarPromo`** — the slot for one `PromoCard`, above the footer rule, 8px\n  gutter, hidden on the collapsed rail. No sidebar prop decides whether it shows:\n  that is the product's (free plan, not yet dismissed).\n- **`SidebarStat`** and **`SidebarUser`** — the compact footer. One figure,\n  label left and value right with a 12px glyph on a round `State/Hover` chip; and\n  the account row — 24px avatar, 12px semibold name, 10px meta, 14px up-down\n  chevron at 70%. Both are buttons with the neutral hover / pressed recipe.\n  Collapsed, the stat leaves and the account row keeps its avatar.\n\nMeasured against the kit's `chat-landing` at 1280×800: section, promo, footer, stat\nand avatar boxes land on the same pixels.\n\n**Stories.** Expanded, CollapsedIcon, Floating, Inset, AppShell and MobileOverlay\nrender the product shape; **Promo card** is a control on every one, and `WithPromo`\nhas it on. The nested-group tree moved to `NestedGroup`, since `NavigationGroup`\nstays for consumers whose second level really is navigation.\n\n**Not ported**, deliberately: the collapsed rail's single \"Chats\" icon that stands in\nfor the lists. It is a product affordance (where it links), not a sidebar part —\na `SidebarMenuButton` in the consumer's nav does it.\n\n## 139. `SidebarUser` — the rail kept the avatar and lost the name\n\n`src/components/Sidebar/SidebarAccount.tsx`\n\nOn the icon rail the name and the meta were `hidden`, so the account-menu\nbutton had no name. They are `sr-only` there now: off the screen, still spoken.\n**patch** (`.changeset/sidebar-small-fixes.md`).\n\n## 140. `SidebarProvider` — the sheet outlived the phone layout\n\n`src/components/Sidebar/SidebarProvider.tsx`\n\nWidening the window past `sheetBreakpoint` left `openMobile` true: the sheet\nstayed open behind the rail and came back the next time the window narrowed. It\ncloses when the layout stops being the phone one. **patch**\n(`.changeset/sidebar-small-fixes.md`).\n\n## 141. `SidebarChatItem` — the ⋮ where there is no hover, and `countLabel`\n\n`src/components/Sidebar/SidebarChatItem.tsx`\n\nOn a touch screen and below `lg` (the sheet) a ⋮ that waits for the pointer is\na ⋮ that is not there. It now stays, the link keeps 32px for it (`pr-8`), and\nthe title's fade ends where that room begins; the status stays beside it. The\nbreakpoint is `SidebarSection`'s \"See all\" one, so a 768–1023px window does not\nshow one always and the other on hover. The ⋮ names itself in a tooltip\n(`menuLabel`). `countLabel` says what the queue count means — \"3 messages\nqueued, still sending\" — in a tooltip, and is spoken in place of the bare\nnumber; the count is inside the link, so it is not a tab stop. Insightis carried its own copy of this in its custom kit; owner's call (2026-10-19): what the kit duplicates comes from the library, and what the library lacks is added here, one capability at a time.\n**minor** (`.changeset/sidebar-rows-and-triggers.md`).\n\n## 142. `SidebarNavItem` — `badge`, and an element as `icon`\n\n`src/components/Sidebar/SidebarNavItem.tsx`\n\nA nav row takes a trailing `badge` — a `Counter` or a `Badge` —\nhidden on the rail and read as the row's description (`aria-describedby`).\n`icon` also takes an element, a product mark, set in the same 16/14px box as a\ncomponent icon. **minor** (`.changeset/sidebar-rows-and-triggers.md`).\n\nOn a `<button>` (`asChild`, a row that acts rather than links) the label sat in\nthe middle of the row — a button centres its text. The row is `text-start`\n(2026-10-27). **patch** (`.changeset/sidebar-nav-item-text-start.md`).\n\n## 143. `SidebarTrigger`, `SidebarMobileTrigger` — their tooltips\n\n`src/components/Sidebar/SidebarTrigger.tsx` · `SidebarMobileTrigger.tsx`\n\nOpening the sheet focuses its trigger, and the panel trigger's tooltip popped up\nover the sheet; it has none while `isMobile`. The mobile trigger can name\nitself the same way: `tooltip` and `tooltipSide` (default `bottom`). **minor**\n(`.changeset/sidebar-rows-and-triggers.md`).\n\n## 144. `SidebarStat` — `asChild`\n\n`src/components/Sidebar/SidebarAccount.tsx`\n\nA figure that opens nothing — a balance — was still a `<button>`. With\n`asChild` the label and the value go inside the caller's element, a `<div>` or\na router link, with no `type` put on it. **minor**\n(`.changeset/sidebar-rows-and-triggers.md`).\n\n---\n\n# `Spotlight`\n\n## 119. New — `Spotlight` and `useTargetRect` · **DRAFT**\n\n`src/components/Spotlight/index.tsx` · `src/hooks/use-target-rect/`\n\nDims and blurs the page around one or more targets. The cutout stays sharp\nand live — clicks reach the controls inside it — and everything else takes\nno clicks. The scrim is ONE layer over the bounds, the modal scrim under a\n3px blur, with a rounded hole cut by its `clip-path` (an `evenodd` path), so\nthe dim follows the ring's corners and no corner is left undimmed. A 2px\nBrand/Primary ring with a halo and a glow frames the cutout, concentric with\nwhat it lights, pulses, and glides to the next target: the hole and the\nring's position and corner move on one curve.\n\n`target` (a selector, an element, a ref, or an array of them — lit as one\nunion) or a measured `rect`; `radius` — the corner, by default the\ntargets' own radius + `padding`, else 12; `padding` (8); `boundary`, the\narea the scrim may cover, so a strip above it stays uncovered;\n`onScrimClick`; `pulse`; `leaving` — fades out and lets every click through\nwhile a tour closes. Portalled to `document.body`, or the nearest\n`PortalContainer`. While it is in the page, the Toaster drops one step under\nthe scrim (`--spotlight-z` − 1, through `:root:has()` on the layer itself):\nsonner's own layer would lay a toast over the dimmed page and the tour.\nWhat pops out of a lit control (Radix's popper wrapper: a tooltip, a menu, a\npopover) goes one step over it (`--spotlight-z` + 1) — under the scrim it read\nas a half-transparent grey box.\n\n`useTargetRect(target, { padding, boundary })` →\n`{ rect, bounds, radius, vw, vh }` comes from the same entry: the\nmeasurement the whole tour family shares, kept current through resize,\nscroll, document resize, DOM changes and font loading. `radius` is the\ntargets' `border-radius` — or, for a part with square corners such as a\ntable row, that of the nearest rounded ancestor up to four levels up — plus\nthe padding.\n\n**Tokens.** `--spotlight-blur` (3px, `backdrop-blur-spotlight`);\n`--spotlight-halo` and `--spotlight-glow` (Brand/Primary at `--tint-20` and\n`--tint-30`) composed into `--shadow-spotlight` (`shadow-spotlight`);\n`--spotlight-move`, one duration and curve for every move, read by a\n`transition` shorthand; `--spotlight-z` (70 — annotations +1, the guide card\n+2). The halo, the glow and the shadow are mirrored in `.dark` for scoped\nthemes. The scrim has no colour of its own: it is `--overlay-scrim`\n(`bg-overlay-scrim`).\n\nThe layer fades in and the ring breathes every 2.2s; all of it stops under\n`prefers-reduced-motion`.\n\n**Both products.** New component, no call sites in the package.\n\n---\n\n# `StatusView`\n\n## 51. `StatusView` — the illustration is a pack, not a rule — **revised**\n\n`src/components/StatusView/index.tsx`\n\n`EmptyStateIllustration` came first — a 150×104 SVG, a crisp top card fading\ninto two ghosts, the shape of the very list that is missing — and read as\nthough the system had picked the artwork. It had not, and should not: `StatusView` takes whatever goes in its\n`icon` slot — a lucide glyph, one of these, or a product's own drawing — and\nthat was already true before it.\n\nWhat was actually missing is that **one picture cannot say two things**. \"There\nis nothing here yet\" and \"your search matched nothing\" are different states, and\na list that shows the same artwork for both is telling the user the query made\nno difference. So the pack is two:\n\n| | |\n|---|---|\n| `EmptyStateIllustration` | three list rows fading out — the shape of the list that is missing |\n| `EmptySearchIllustration` | a search field with a query in it, over two dashed empty rows |\n\nThe magnifier in the second one is **part of the depicted field**, not a symbol\nstanding in for \"not found\" — which is the objection to using a magnifier as the\nwhole picture, and it still stands.\n\nEvery colour is a token, so both re-theme with the page and neither needs a dark\nvariant. Use either as `icon={<EmptyStateIllustration />}` with\n`withIconHalo={false}`.\n\n## 104. `StatusView` — a wider message\n\n- **`StatusView`** — the description's cap is `max-w-[48ch]` inside the\n  default `md` block (`upstream`'s `contentWidth`: `sm` = `max-w-sm`, `md` =\n  `max-w-md`); under `sm` the block is the narrower limit and the cap is\n  dropped. The kit's `.empty-msg` is 32ch. `text-balance` unchanged.\n\nAt 32ch a message of two short sentences — what is empty, what to do — broke\ninto three or four lines of a few words each and read as fragments (the\nworkspaces prototype's empty Data model: \"The linked connections returned no /\ncatalogs, schemas or tables. Check / what their user can read, then refresh.\").\n48ch keeps it to two lines; balancing still keeps a last word off a line of its\nown. A departure from the kit's `.empty-msg`, on purpose.\n\n## 107. `EmptySearchIllustration` — visible on a white card\n\n- **`EmptySearchIllustration`** — the field's outline `stroke-stroke` →\n  `stroke-stroke-hover`; the magnifier `stroke-ink-inactive/60` →\n  `stroke-ink-inactive` (the field glyph's own grey, §106); the query bar\n  `fill-ink-inactive/35` → `/55`. The two dashed rows under it: outline\n  `stroke-stroke` → `stroke-stroke-hover`, opacity 0.4 / 0.2 → 1 / 0.5.\n\nEvery line of it was the lightest border grey, and the rows under the field were\nthat grey again at 40% and 20%, dashed, white on white: in the workspaces\nprototype's \"Find somebody\" window only the field showed, and barely. Still the\nsame drawing — a search over rows that came back empty, fading — at the\nstrength `EmptyStateIllustration` beside it already has.\n\n---\n\n# `StepProgress`\n\n## 117. `StepProgress` — `size`, a state on each bar · **DRAFT**\n\n`src/components/StepProgress/`\n\n`StepProgress` is `upstream`'s 1.3.0 — the bars, read-only without\n`onStepSelect`, `label`, `labelPosition`, `showStepTitle`, the recipes and the\ndata-slots. On top of it:\n\n- **`size=\"sm\"`** — the label and the gaps one step down (`StepProgress.tsx`,\n  `StepProgressHeader.tsx`, `stepProgressLabelVariants`): the read-out in a\n  tour card (§122).\n- **`data-state`** — `done` / `current` / `upcoming` on each step\n  (`StepProgressBar.tsx`).\n- **No tooltip on a step with an empty `title`** (`StepProgressBar.tsx`).\n\nNot `StepperIndicator` (§36): that is a numbered rail to travel along; this is\na read-out that fits on a header line.\n\n---\n\n# `Stepper`\n\n## 36. New — `StepperIndicator` · **DRAFT**\n\n`src/components/Stepper/StepperIndicator.tsx`\n\n`Stepper` is headless. It owns the index and hands it to a render function, and\nships **no rail** — so every consumer draws its own numbered circles out of raw\nutilities. Three of them were doing it: the connections wizard, and the\npackage's own `Stepper.stories.tsx`, twice over (`StepIndicator` in the story\nfile was not exported and not reusable). The wizard's version was this:\n\n```jsx\n<span className=\"flex size-5 shrink-0 items-center justify-center rounded-full text-xs …\">\n```\n\n— a component the system does not have, invented on the page, which is the case\nthe whole review was about.\n\n```ts\ninterface StepperIndicatorProps {\n  steps: { id: string; label: ReactNode }[];\n  current: number;\n  orientation?: 'horizontal' | 'vertical';   // default horizontal\n  navigable?: 'completed' | 'all' | 'none';  // default completed\n  onStepSelect?: (index: number) => void;\n  size?: 'sm' | 'md';                        // 20px / 28px marker\n}\n```\n\nThree states on system tokens: active `bg-brand-primary` + `text-content-on-solid`,\ndone `bg-state-pressed` + `text-ink-body` and a check glyph, upcoming\n`bg-state-disabled` + `text-ink-inactive`.\n\n`navigable=\"completed\"` is the create-flow rule made a prop rather than a\nconvention every consumer re-derives: going back to correct a port is normal,\ngoing forward is not, because the reason a sequence exists is that the later\nsteps depend on the earlier ones.\n\nDeliberately **uncoupled from `Stepper`** — it takes `current` and reports a\nselection, so it also sits on top of a tab set, which is what the connections\nform drives it from.\n\n**Both products.** New surface area, no existing call site, nothing to break.\nInsightis gets a rail it does not have to build.\n\n**One defect found while writing it.** The page was passing\n`textColor=\"inactive\"` to `Typography`, and there is no such key — the ladder is\n`primary` / `secondary` / `light` / `body` / `accent` / … with `light` being\n`text-ink-inactive`. `cva` emits nothing for an unknown key, silently, so every\nupcoming step label had been inheriting its parent's colour rather than reading\nas not-yet-reached. TypeScript catches it in the library; it cannot in a `.jsx`\nprototype, which is an argument for the rail living in the library and not on\nthe page.\n\n---\n\n# `Table`\n\n## 6. `TableHead` — the sort glyph did not hover with its label\n\n`src/components/Table/TableHead.tsx`\n\n```diff\n- 'transition-colors hover:text-ink-body',\n+ 'group transition-colors hover:text-ink-icon-hover',\n```\n\nThe label moved to `--ink-body` on hover and the chevrons stayed at\n`--ink-inactive`, so a header read as two controls. `group` on the button and\n`group-hover:text-ink-icon-hover` on the glyph move them together.\n\nNo press state. A sort commits on click and the feedback is the table\nreordering; a press colour on a control with no box reads as a flicker.\n\n## 42. `TableCell` — a row that could not grow, under a comment saying it could\n\n`src/components/Table/TableCell.tsx`, `.design-sync/gen-classlist.mjs`\n\nAgainst the published catalog the cell is one clipped line —\n`h-9 whitespace-nowrap p-2 text-xs`. This branch had already replaced that with\na scoped truncation rule and a comment claiming it only bit under\n`layout=\"fixed\"`; both are quoted below, and the comment was wrong:\n\n```diff\n- // Truncate rather than wrap. In an auto-layout table the column just\n- // widens, so this only bites under `layout=\"fixed\"` — which is exactly\n- // where a long value must not blow its column open.\n- 'overflow-hidden text-ellipsis whitespace-nowrap',\n+ '[[data-layout=fixed]_&]:overflow-hidden',\n+ '[[data-layout=fixed]_&]:text-ellipsis',\n+ '[[data-layout=fixed]_&]:whitespace-nowrap',\n```\n\n`white-space: nowrap` stops text wrapping whatever `table-layout` is in effect.\nUnder `auto` the column widened instead and the table scrolled sideways; under\n`fixed` it ellipsised. **A two-line cell was unreachable in both modes** — so the\nrow height was always one line plus padding, never the content.\n\nTwelve lines further down the same file says the opposite:\n\n> Height comes from the padding, never from an `h-*` lock — a two-line cell has\n> to be free to grow.\n\nBoth comments were in the file at once. The class string won, and nothing\ncontradicted it, because a row that never wraps looks deliberate.\n\n### What the reference does\n\n```css\ntable.tbl td { padding: .625rem 1rem; border-bottom: 1px solid var(--stroke-border); color: var(--ink-body) }\n```\n\nNo `white-space`, no `overflow`, no `text-overflow`. The cell wraps and the row\ngrows. Truncation exists in the kit twice, and both are opt-ins next to the thing\nthey affect:\n\n- `.ds-conn-tbl .ds-conn-cell-desc` — the one description column in the\n  Connections table, with `max-width:0` to make the ellipsis land;\n- `.cp-tbl-scroll table.tbl th, td` — the horizontally scrolling variant, where\n  wrapping would defeat the scroll.\n\n### Where the clamp belongs\n\n`layout=\"fixed\"`, and only there. That mode takes its column widths from the\nfirst row and never re-measures, which is the case where a long value genuinely\nmust not blow its column open — it is also the reason the prop exists (see\n`table-composition.md`). The scope is a descendant selector on the `data-layout`\nattribute the `Table` root already stamps, so the cell needs no new prop and no\ncontext.\n\n### The enumeration is part of the fix, not an afterthought\n\n`[[data-layout=fixed]_&]:` is an arbitrary variant. Nothing in\n`gen-classlist.mjs` generates that prefix, so all three classes are listed by\nhand — §19's failure mode exactly: un-enumerated, they compile to nothing in the\n`ds-bundle` and a fixed-layout table silently stops truncating, with Storybook\nstill showing it working because Storybook compiles from source.\n\n### Breaking\n\nA table relying on single-line rows gets taller rows the moment a value wraps.\nTwo ways back, and the second is the better one: `layout=\"fixed\"` on the table,\nor `truncate` on the specific cells that should clamp — which is what the kit\ndoes, and it keeps the decision beside the column it applies to.\n\n## 50. `TableCell` — pressed belonged to whatever was pressed\n\n`src/components/Table/TableCell.tsx`\n\n```diff\n- 'group-data-[interactive]/row:group-active/row:bg-tbl-row-pressed',\n+ 'group-[[data-interactive]:active:not(:has(button:active)):not(:has(a:active)):not(:has([data-state=open]))]/row:bg-tbl-row-pressed',\n```\n\n`:active` fires while the pointer is held **anywhere inside** the row. So\npressing a toggle, a checkbox, a kebab or a disclosure inside a clickable row\npainted the entire row as though the row had been clicked, and an open menu kept\nit painted afterwards — the user cannot tell which of the four things they just\npressed, because all four look the same from the row's point of view.\n\nThe rule, stated as a product rule during the review: **in a table the click\ntarget is the object, not the row, and the row takes the pressed fill only when\nthe row itself is what went down.** This is the same guard `Card variant=\"row\"`\nalready carries (`:not(:has(button:active))`), applied where it was missing.\n\nHover is left alone: a clickable row answering the pointer is correct, and it is\nthe press that was lying about what had been pressed.\n\n**Both products.** Strictly narrows when the fill paints; no row loses a state\nit should have had.\n\n## 53. `TableHead` — a column width is a share, not a size\n\n`src/components/Table/TableHead.tsx`\n\n```ts\nwidth?: 'auto' | 'control' | 'actions' | 'sm' | 'md' | 'lg'   // default 'auto'\n```\n\n| | |\n|---|---|\n| `auto` | no width — takes whatever is left. The reading column. |\n| `control` | 48px. A checkbox or a single toggle. |\n| `actions` | 112px, the label right-aligned over the cluster. The row's trailing cluster, matching `TableActionsCell`. |\n| `sm` | 12% — a toggle with its label, a short flag. |\n| `md` | 16% — a connector mark and a word, a status badge, a timestamp. |\n| `lg` | 20% — a count with a disclosure, or text with a control beside it. |\n\n**From** — LinkAI, the connections table. **Used in** (2026-11-03) — LinkAI:\nthe Connections list, the Workspaces list, a workspace's Connections tab, the\nconnection form's workspaces table.\nInsightis: not used — its four Actions heads set their own width and\n`text-right`, as LinkAI's did before `actions` set it.\n\n**Updated (2026-11-18, review of LinkAI !3 / !4, DBM-25175):**\n- **The head cuts its label** under `layout=\"fixed\"`, with an ellipsis, as\n  `TableCell` cuts its text (the same `[data-layout=fixed]` hook). It ran on\n  over the next column — \"Contributors\" (106px) in a 96px column on a 708px\n  table printed over the Connections head. A sortable head cuts the label\n  inside its button and keeps the glyph.\n- **`WidthLadder`** — the story that shows every rung on one table; the rungs\n  were described in the code only.\n- **The examples take `width`.** `Table/FixedLayout`, `WithRowActions` and\n  the cheat sheet (`.design-sync/conventions.md`, which becomes a product's\n  `ds-bundle/README.md`) drew columns with raw `w-1/2` / `w-32` / `w-12` —\n  the two most-read examples taught the opposite of this section.\n- **Choosing a rung:** the lowest that holds the column's widest reading on\n  the narrowest table it is drawn on.\n\nThe connections table set five column widths by hand — `w-12`, `w-48`,\n`w-44`, `w-52`, `w-28` — because the component had nothing to say about\nwidth, so the page said it. Each of those is a **reservation**: Data source held\n192px for a connector mark and one word, Last check held 208px for a badge, and\nthe Name column — the only one where truncation costs the reader anything —\nlived on what was left over. None of them narrowed when the window did.\n\n`sm`/`md`/`lg` are **shares of the table, not sizes**, and that distinction\nis the whole reason this ladder is allowed to exist where a pixel ladder is\nnot: 16% narrows when the table narrows, `w-48` does not. `control` and\n`actions` stay in pixels because a checkbox and a row's action cluster each\nhave exactly one correct size and gain nothing from more.\n\n### The version of this that was wrong, and what it taught\n\nThis first shipped as `width: 'auto' | 'fit'`, where `fit` was `w-0` — \"ask\nfor nothing and the table's auto layout answers with your content width\". The\nargument was right; the mechanism was not. Measured on the page:\n\n- Tables that load, filter or paginate **must** be `layout=\"fixed\"` — it is\n  the standing rule in `Table.md`, and it exists because under `auto` the\n  columns visibly jump between the empty state, the loading `colSpan` row and\n  every page of data. The connections table filters, so it is `fixed`.\n- Under `fixed`, the specified widths **are** the algorithm. Content sizes\n  nothing, so `w-0` means zero: four columns collapsed to their 32px of\n  padding and the Name column took 975 of 1150px.\n- `min-width` on a `th` is **ignored outright** under `fixed` — verified at\n  three table widths, where columns with `width:5%; min-width:144px` rendered\n  46px. So \"a percentage with a pixel floor under it\" is a floor that never\n  holds, and the floor has to be the scroll container's own `min-width`\n  instead: one number, in one place, from which every percentage column\n  inherits a sensible minimum.\n\nA **share** is what the original argument was reaching for. A share is not a\nreservation; it shrinks. The percentages are set from measured content at the\nnarrowest the table is allowed to be — a 58rem container gives 12% ≈ 111px,\n16% ≈ 148px, 20% ≈ 186px, against columns whose widest content measured 102,\n142 and 157px.\n\nOne thing to know: a `th`'s width is overruled by a body cell that sets one of\nits own, so the page's `TableActionsCell className=\"w-28\"` had to go with the\nhand-set heads. Stated in `Table.md` rather than discovered twice.\n\n**Both products.** Additive; every existing column keeps `auto`, which is what\nit had.\n\n## 54. `TableRow` — nesting was a number one table owned\n\n`src/components/Table/TableRow.tsx`, `src/components/Table/TableCell.tsx`\n\n```ts\nnested?: boolean   // → data-nested on the <tr>\n```\n```diff\n  // TableCell\n+ 'group-data-[nested]/row:py-2',   // 8px, against a top-level row's 10px\n```\n\nA row that belongs to the row above it — a metric under its provider, a schema\nunder its connection, a child under its group — is 8px where a top-level row is\n10px. The number was not new. It existed **once**, as a local override on the\nInsightis metrics table (`.mx-metric-child td{padding:.5rem 1rem}`), which is\nexactly why it needed moving: a number that lives on one table is a fact about\nthat table, so every other place that nests rows either invents its own or does\nnot tighten at all. The contract had already drifted off it — `changes/Table.md`\ndocumented the same cell as `.4375rem` while the CSS said `.5rem`.\n\n**Why 8 and not 10.** A child row set at the same height as its parent reads as\nits *sibling*; the tighter rhythm is what says it is one level down. It is\ndeliberately the only difference — no tint, no smaller type, no separate border.\nThose make a child look like a different **kind** of object rather than the same\nobject nested.\n\n**What the prop does not do.** Horizontal padding is unchanged, and the first\ncell's indent stays with the consumer: how far in a child sits depends on what\nis in the parent's first cell — a chevron, a logo, both — which the table cannot\nknow. Locking an indent into the component would be the same mistake one level\nup.\n\n`data-nested` rather than a class because the padding lives on the **cells**,\nand they read it back off the row through the `group/row` hook the row already\ncarries for its fills.\n\n**Both products.** Additive; a row without the prop is the row it always was.\nShipped in parallel as `table.tbl tbody tr[data-nested] td` in the kit and\nrecorded in the prod migration report\n(`Insightis/legacy-html/reports/2026-09-19-prod-interaction-states-migration.md`) — zero\nvisual delta, since the only rows carrying it today already had the 8px.\n\n## 56. `Table` — `density` · **DRAFT**\n\n`src/components/Table/index.tsx`, `TableCell.tsx`, `TableHead.tsx`\n\n```ts\ndensity?: 'comfortable' | 'compact'   // default 'comfortable'\n```\n\n`compact` is 6px of vertical cell padding against the default 10, and the\nheader tightens with it (36px → 28). Stamped on the table as `data-density`\nand read by the cells, the same mechanism `layout` already uses — the row's air\nis a decision about the whole table, and a cell that took its own would let two\ncolumns disagree.\n\n**Why it exists now.** Row density had been sitting in Open questions as an\nobservation with no argument attached: ours is ~44px, which is web density. The\nargument arrived with the audience. LinkAI is for technical\nadministrators, who *scan* a list rather than read it, and four more rows on\nscreen is worth more to them than breathing room. Insightis' users are asking\nquestions of data and are better served by the comfortable default — which is\nwhy this is a prop and not a new number for everybody.\n\n**Draft**, for the same reason as §55: it exists for a screen that has not been\nchosen yet. Nothing changes for any existing table, since `comfortable` is\nwhat they all render today.\n\n## 76. A clickable row kept the text cursor\n\n`data-interactive` on `TableRow` is how a table says a row opens something, and\nit already carried three fills: hover, pressed and focus, all painted on the\ncells because a `<tr>` background renders under every `<td>`. It carried no\n**cursor**. So the one row state whose entire meaning is \"this is pressable\"\nanswered the pointer with a text caret: the fill said pressable and the cursor\nsaid selectable text, on the same pixel.\n\nIt went unnoticed because consumers documented it as though it were there — the\nconnections list has a comment promising \"`data-interactive` — the hover fill\nand the pointer cursor\" — and no rule emitted one.\n\n`data-[interactive]:cursor-pointer` on the row, and the class enumerated in\n`gen-classlist.mjs`: the `cursor-*` cross there carries `disabled:` and nothing\nelse, so a `data-[…]` variant of it is never compiled unless it is named (§19).\n\nOn the row rather than on the cells, unlike the fills: a cursor is not painted,\nso it inherits, and the row is the thing being described.\n\n---\n\n# `Tabs`\n\n## 8. `TabsContent` — the inactive panel came back as an empty box\n\n`src/components/Tabs/TabsContent.tsx`\n\n```diff\n+ 'data-[state=inactive]:!hidden',\n```\n\nRadix hides the inactive panel with the `hidden` attribute — a UA-stylesheet\n`display:none`, which any display class from the consumer (`flex`, `grid`)\nbeats. The panel came back as an empty block and pushed the active one down.\n\n---\n\n# `TextArea`\n\n## 41. `TextArea` — the counter row had a slot nothing could fill\n\n`src/components/TextArea/index.tsx`\n\n`showCount` (`upstream`'s) draws the counter into a two-column row whose left half only\never held `errorText`. F-25 in the connections PRD wants a standing caveat\nthere — *\"Do not include passwords, API tokens, or personal data…\"* — beside the\ncounter, and the component had no way to put it there. So the page turned\n`showCount` off and rebuilt the row by hand:\n\n```jsx\n<div className=\"-mt-2 flex items-start justify-between gap-4\">\n  <Typography … className=\"min-w-0 flex-1\">{AI_WARNING}</Typography>\n  <Typography … className=\"shrink-0 whitespace-nowrap tabular-nums\">\n    {instructions.length}/4000\n  </Typography>\n</div>\n```\n\nThree utilities and a negative margin to reproduce a row the component already\ndraws, and a counter the component already counts.\n\n```ts\nhintText?: ReactNode;\n```\n\nIt takes the left half, and **yields it to `errorText` when the field is\ninvalid**: an error about what you just typed outranks advice about what to\ntype. That ordering is the reason it is one slot and not two.\n\n**Both products.** Additive; a `TextArea` without `hintText` renders exactly as\nbefore. Any field with a limit and a caveat stops hand-building the row.\n\n## 70. `TextArea` — the hint at 400, and the counter and error lines\n\n`src/components/TextArea/index.tsx`, `TextAreaCount.tsx`\n\n- **`hintText`** (§41) is `textStyle=\"body12\"` — 12/400. Written as\n  `variant=\"span\"` it took that ladder's `font-medium`, and helper text sat a\n  weight above the body copy around it (\"why is the font still bold\").\n- **The counter** is `textStyle=\"body12\"`, a 16px line, where `upstream`'s\n  `TextAreaCount` is `leading-5`.\n- **The error line** is `text-xs font-medium`, as in `InputGroup`, where\n  `upstream`'s is `text-sm`.\n\n---\n\n# `Toast`\n\n## 75. A stack of toasts, each a different width\n\nThree \"connection OK\" toasts from one bulk action stacked in the corner at\n317, 296 and 268px — measured — because each one had sized itself to its own\nmessage. Three ragged boxes down the edge of the screen read as three\nunrelated events; one column of one width reads as what it is, a log of the\nsame action repeated.\n\n`Toaster` already declares `--width: 356px`, and sonner applies it to toasts it\nstyles itself. `toast.custom` — which is how every toast in this system is\nbuilt, because the body is our own `ToastMessage` — is `data-styled=\"false\"`,\nso it fell through to fitting its content. `createToast` now passes\n`style: { width: var(--width) }`, so the Toaster keeps ownership of the number\nand an explicit `width` option still overrides it.\n\n---\n\n# `Tooltip`\n\n## 13. `Tooltip` — the arrow put the gap off the 4px scale\n\n`src/components/Tooltip/TooltipContent.tsx`\n\nThe arrow is **8×4**, not Radix's default 10×5, and `sideOffset` is **4**: the\narrow's tip is 4px from the trigger and the bubble 8px — every number on the\n4px scale.\n\nCorrected 2026-10-28, measured in Chromium: this section first assumed Radix\ndraws the arrow **into** the `sideOffset` gap. It draws it **beside** the gap —\nwith `sideOffset = 8` the tip sat 8px and the bubble 12px from the trigger, and\na tooltip under a checkbox read as detached. `sideOffset` 8 → 4 moves every\ntooltip 4px closer to what it names.\n\n**A second cause, in the consumer.** Radix measures `sideOffset` from the\ntrigger, not from the glyph inside it. An icon-only trigger left as a plain\ninline `<span>` grows to the line box — **20px around a 14px icon** — so the tip\ndrifted a further 6px. `inline-flex` makes the box hug the icon.\n\nThat half is not fixed in the package because the trigger belongs to the\nconsumer, but it is a consequence of a package decision:\n`.design-sync/tailwind-export.css` overrides preflight with `svg { display:\ninline-block }`. That is one of the two reasons a component can behave\ndifferently in a bundle than in Storybook — see §20.\n\n## 63. `Tooltip` — the delay before it opens\n\n`src/components/Tooltip/index.tsx`\n\n`TooltipProvider` was a bare re-export of Radix’s, so the delay was whatever\neach call site passed: 200ms in `ModalContent` and three stories, 500ms in the\nsidebar rail, and Radix’s own 700ms anywhere a consumer forgot.\n\nIt now defaults to **300ms**, the kit’s value — `[data-tip]` opens on\n`transition: opacity .12s .3s`. At 200 the bubble appears while the pointer is\nstill crossing the row; at 700 it reads as never coming.\n\nThe three 200s are removed so they take the default — `upstream`'s\n`ModalContent` still passes 200 — and so is the sidebar's 500 (§72).\n\nUnchanged, and worth knowing: the bubble itself is not a transition but a\n`tailwindcss-animate` keyframe — 150ms `ease`, `fade-in-0 zoom-in-95` plus an\n8px slide from the trigger’s side. That 150 is the plugin’s default, not\n`--motion-*`.\n\n## 177. `Tooltip` — above a dialog, not behind it\n\n`src/components/Tooltip/TooltipContent.tsx`, `src/components/Modal/ModalContent.tsx`\n\n**From** Insightis (Create metric in a workspace, 2026-11-09: a disabled\n\"Data Source\" segment whose tooltip says why). **Used in** every tooltip on a\ncontrol inside a `Modal`.\n\n`TooltipContent` was `z-50`; `Modal`'s overlay and content are `z-[100]`. A\ntooltip on anything inside a dialog opened behind it — only the sliver past the\ndialog's edge showed. `Autocomplete`'s list and `Select`'s were each lifted to\n`z-[110]` with a comment, and `ModalContent` lifted its own close button's\ntooltip the same way, per call.\n\nNow `TooltipContent` is `z-[110]` itself, and the close button's per-call\n`className=\"z-[110]\"` is gone. `Popover` and `DropdownMenu` are still `z-50` —\nthe same gap, no reported symptom yet, so not changed on the strength of this one.\n\n**patch** (`.changeset/tooltip-above-modal.md`).\n\n## 184. `Tooltip` — a long tip wraps at 288px\n\n`src/components/Tooltip/TooltipContent.tsx`\n\nThe bubble is `w-max max-w-72 whitespace-normal text-left`: a short tip hugs its\ntext, a long one stops at 288px — the width of a medium menu — and wraps onto two\nor three lines. Without it a tip is one line however long, and an error message\nor a setting's explanation runs off the viewport.\n\nIn the library since 2026-09-15 (reference-kit alignment) without a number;\nnumbered 2026-11-12 so it is handed over with the rest of `Tooltip`. Story:\n`Tooltip` → Widths.\n\n## 185. `Modal` — the title clears the close button, and never truncates\n\n`src/components/Modal/ModalHeader.tsx` · `ModalTitle.tsx` · `ModalContext.ts` ·\n`src/components/ConfirmationDialog/index.tsx`\n\n**The close button is drawn over the dialog**, not in the flow, so nothing in\nthe header knew it was there. Measured 2026-11-17 in the package: a long title\nran **32px under the ✕**. `ConfirmationDialog` had solved it for itself\n(`pr-16` on its own header) and the product kits patched the title by hand\n(`break-words` in two Insightis dialogs) — the same fix written twice and\nmissing where every other dialog is built.\n\nNow `ModalContent` tells the header whether it draws one\n(`ModalCloseButtonContext`), and `ModalHeader` reserves `pe-8` while it does —\nonly while it does, so a dialog without a ✕ keeps a centred title centred.\n`ConfirmationDialog` keeps a wider reserve, because its own button sits further\nin, and drops its hand-patched title.\n\n**The title is never truncated**, and gets `min-w-0 break-words`: a name with no\nspaces (a connection id) breaks instead of running out of the dialog.\nResearched 2026-11-17 against the big systems, and the weight is clear —\nCarbon forbids truncating titles and headers outright, Atlassian says never\ntruncate text and, if it cannot be avoided, give a way to read the rest,\nPrimer prefers wrapping. Those that do truncate a title do it as an opt-in for\ncramped places (Polaris `lineClamp`, SAP Fiori two lines then an ellipsis,\nPatternFly) — a dialog is not one, and everything that truncates then owes the\nreader the full text, which a hover tooltip cannot give on a touch screen\n(Maersk, Twilio Paste). A 50-character name inside a sentence is two lines,\nrarely three; the body scrolls, so the height is not the title's to save.\n\n**patch** (`.changeset/modal-title-clears-close.md`).\n\n---\n\n# `Tour`\n\n## 122. New — `Tour` · **DRAFT**\n\n`src/components/Tour/` (`index.tsx`, `TourCard.tsx`, `place.ts`)\n\nA guided walk over the real interface: per step a `Spotlight`, `upstream`'s\n`GuideCard` and, when the step has annotations, an `AnnotationGroup`. The caller\nholds the step (`step`, `onStepChange`); the tour reports how it ended\n(`onClose('finish' | 'skip' | 'escape')`).\n\n`steps` — `{ id, target, title, icon?, content, label?, side?, width?,\nannotations? }`. `progress` — `{ steps, offset }`, the longer flow the tour is\npart of, read out in the card as `StepProgress size=\"sm\" labelPosition=\"top\"`;\ndefault: the tour's own steps. `onBeforeFirst` — Back on the first step, for a\ntour that continues an onboarding. `labels` (Back · Next · Skip · Done),\n`boundary`, `padding`. Back is a plain tertiary button, like the question\ncard's.\n\n**The engine half of the card is the tour's.** `GuideCard` draws the card and\nits arrow; where it goes, the dialog role and focus belong to the tour that\nrenders it (their docs say so), so they live here (`TourCard.tsx`):\n\n- **Placement** (`place.ts`, exported as `placeGuideCard`): the first preferred\n  side where the card fits whole without covering the target, 14px off it and\n  8px inside the bounds; when none fits, the first with 75% of the card free,\n  else the roomiest, pinned to that edge. It re-places as the page moves and\n  hands `GuideCard` its `arrowOffset` — the target's centre.\n- **At 640px and below** the card is a bottom sheet with no arrow, and the\n  annotations become a list inside it.\n- **`role=\"dialog\"`**, non-modal, labelled by its title and described by its\n  body, `tabIndex={-1}`; focus moves to it on every step. `tourCardVariants` is\n  the placed card's styling.\n\nKeyboard: → next, ← back, Esc closes — ignored while typing in a field. A click\non the scrim nudges the card (`nudgeCount`). Closing never just vanishes:\n`open` → false keeps the tour mounted for 300ms while the scrim and the\nannotations fade, the card fades and drops 8px (`isLeaving`), and nothing takes\na click.\n\n**Both products.** New component, no call sites in the package.\n\n---\n\n# `Typography`\n\n## 100. `Typography` — an 18px rung, as prod sets it\n\n- **`Typography`** — new `textStyle` values `heading18` (500) and `title18`\n  (600): `text-lg` with a 24px leading (`leading-6`). No `body18`.\n\nThe type-scale audit (Insightis, 2026-09-04) took 18 out of the set and moved\nit to 20. Prod still sets it, measured on insightis-app.devart.info: the\nprofile dialog's **Manage plan** panel — \"Choose a plan\" at 18 / 500, the plan\nnames at 18 / 600 — and its **Balance** panel — the credit amounts at 18 / 600,\n\"left\" at 18 / 400. The approved `user_profile-modal.ds.html` hand-rolls the\nsame credit amount (`.pack-credits`: `--font-size-lg`, semibold), because the\nscale had no style for it. No other page in the app renders 18.\n\nAll four prod elements declare `leading-6`. On the plan panel they render 28px\nanyway: `md:text-lg` comes later in the stylesheet and brings Tailwind's paired\n28px with it. The style takes the 24px that was asked for.\n\n## 113. `Typography` — `lineThrough` ran along the tops of the lowercase\n\n`src/components/Typography/index.tsx`\n\n```diff\n- lineThrough: { true: 'line-through' }\n+ lineThrough: { true: 'bg-[linear-gradient(currentColor,currentColor)]\n+   bg-[length:100%_max(1px,0.075em)] bg-[position:0_calc(50%+0.107em)] bg-no-repeat' }\n```\n\n`line-through` draws where the font says: DM Sans's strikeout position sits at\nthe top of its x-height. Measured at 200px: the stroke at 70px from the top of\nthe line, the x-height from 62 to 120 — on the tops of the lowercase, not\nthrough them. At 14px, in a struck-through tree row, it read as off-centre.\n\nCSS cannot move a `line-through` (`text-underline-offset` is for underlines\nonly), so the stroke is a background band now. From the font's own metrics\n(ascent 1.0em, descent 0.29em, x-height 0.5em): the middle of the x-height is\n0.107em below the middle of the line box, at any line height, since leading is\nadded evenly above and below. Thickness `max(1px, 0.075em)` — 1px at 14, 2px\nat 30, about what the browser drew.\n\nTied to DM Sans: another face would need its own offset.\n\n---\n\n# Tokens and colour\n\n## 2. Dark destructive border — hover made the control *less* visible\n\n`globals.css`, `.dark`\n\n`upstream`'s dark theme keeps the light pair: Red-700 at rest, Red-800 on hover.\nOn the near-black Card `#17171E` that inverts — **hover drops contrast 2.76 →\n2.15**, the only control that gets fainter under the pointer; everything else\ngoes lighter on dark (`--btn-secondary-border`: Grey-600 → Grey-500, 2.30 →\n3.69). The frame also sits darker than its own label, Red-400 on dark.\n\n```diff\n- --btn-outline-destructive-border: var(--red-700);         /* #B91C1C */\n- --btn-outline-destructive-border-hover: var(--red-800);   /* #991B1B */\n+ --btn-outline-destructive-border: var(--red-500);         /* #EF4444 — CR 4.74 */\n+ --btn-outline-destructive-border-hover: var(--red-400);   /* #F25555 — CR 5.27 */\n```\n\nLight's rule — **border = label colour, hover one step more prominent** — with\nthe step mirrored because the ground is dark. Red-500 → Red-400 keeps light's\nproportion, ×1.22; Red-400 → Red-300 was tried first and jumped ×1.79.\n\n## 5. No token for a standalone icon — new `--ink-icon` / `--ink-icon-hover`\n\n`globals.css` (Layer 2), `src/lib/constants.ts`\n\nThe system had no colour token for a glyph. The ink ladder is primary / body /\nsecondary / inactive / highlight, and icons simply inherited their container's\ntext colour.\n\nThat is fine for an `IconButton`: it has a box, and hover fills the box. It is\nnot fine for an icon **without** a box — an ⓘ beside a name, a sort arrow in a\nheader. There is nothing to fill, so colour is the only thing that can answer the\npointer, and nothing in the system said which colour.\n\n```css\n--ink-icon: var(--ink-secondary);        /* #5A6A80 */\n--ink-icon-hover: var(--ink-primary);    /* #0F172A */\n```\n\nBoth alias Layer-2 roles, so neither needs a `.dark` twin. Exposed as\n`text-ink-icon` / `text-ink-icon-hover`.\n\nRule: **a standalone interactive icon changes colour only.** If it also needs a\nfill, it is an `IconButton` and should be one.\n\n## 6a. Table rows as washes that stack\n\n`globals.css`, `src/lib/constants.ts`, `src/components/Table/TableCell.tsx`\n\n`upstream` makes the control states washes — `--state-overlay`, `--state-hover`\nand `--state-pressed` at `--tint-8` / `--tint-12`, bare `var()`. Its table rows\nstay solid: `--tbl-row-hover` / `--tbl-row-pressed` are Slate-50 / Slate-100\n(Grey-800 on dark), with a third, `--tbl-row-selected-hover`.\n\nHere the rows are washes over the same `--state-overlay`, lighter than the\ncontrols — a row is wide and sits in a stack, where a heavy wash turns a list\ninto stripes. Inside a row the two composite, so a control on a hovered row is\nalways the deeper of the pair. Composited over the card, measured from\n`globals.css`:\n\n| | strength | light | Δ | dark | Δ |\n|---|---|---|---|---|---|\n| row hover | `--tint-4` | `#F8FBFC` | 7 | `#1C1D24` | 5 |\n| row pressed / selected | `--tint-8` | `#F0F8F9` | 15 | `#21222A` | 10 |\n| control hover | `--tint-8` | `#F0F8F9` | 15 | `#21222A` | 10 |\n| control pressed | `--tint-12` | `#E9F4F7` | 22 | `#262830` | 15 |\n\n`--tbl-row-pressed` and `--state-hover` are the same declaration on purpose: a\ncontrol hovering on a selected row lands at 8% over 8% ≈ 15% and reads a clear\nstep deeper. A check asserting the four raw values are distinct tests the wrong\nthing.\n\n- **`--tbl-row-selected-hover` removed**, with the two `TableCell` utilities\n  that named it. A selected row keeps its surface and controls composite on top;\n  the token made a row read as *less* selected the moment you touched it.\n- **`--brand-300`** is `#46A6B9` (190°, 45%), where `upstream` has `#5DA0A8`.\n  The old step had the right hue at 29% saturation, and a desaturated wash reads\n  dirty rather than soft.\n\n## 87. New — colour packs (`palettes.css`) · **DRAFT**\n\n`palettes.css`, `scripts/gen-palettes.mjs`\n\nThe system could be recoloured all along; nothing shipped that did it. The AI\nconnectivity prototype had worked this out and carried it locally, which meant\nthe one piece of the token system with no consumer-facing lever lived outside\nthe package. Ported, not redesigned.\n\n**A pack redeclares Layer 1 and nothing else** — the `--brand-*` and\n`--tertiary-*` ramps. Everything above re-resolves by itself, including every\n`color-mix()`: hover fills, card borders, toast tints, banner gradients, the\npale fill behind a selected row. This is decision 3 paying for itself — no\ncomponent can name a ramp step, so no component is touched to change the colour\nof the system.\n\n```html\n<html data-palette=\"blue\">\n```\n\nOne pack — `blue` — and no attribute leaves teal, which the file does not\ndeclare. Azure, indigo and iris were generated and then dropped: four of them\nmade the palette read as a preference rather than as a product. `:root[data-palette]` (0,2,0) beats `:root` and\n`.dark` (0,1,0); `:root[data-palette].dark` (0,3,0) beats the dark branch. So a\npack needs no `!important` and no load order beyond coming second.\n\nEach pack takes the L and C profile of the default teal (C ≈ 0.09 in OKLCH) and\nrotates the hue only, so none is louder than teal, and the key steps are solved\nagainst contrast thresholds taken from the teal original. Feedback colours are\nnot packed: red and attention stay loud, which is their job.\n\nMeasured in Storybook: with `blue`, `--brand-600` and `--brand-primary` both\nmove to the pack's #3870B8; with no attribute they are back to\n`179 89.6% 26.5%` and `rgb(7, 128, 126)`.\n\nThe catalogue carries a **Palette** toolbar switch, and that is the point of it\nrather than a convenience: it is the only way to see a component that pinned\nitself to a ramp step, because that one stays teal while the page around it\nmoves.\n\n## 124. The chat-landing backgrounds were one product's, not the system's — removed\n\n`globals.css` (`:root` and `.dark`), `src/tailwind-preset.ts`\n\n`--chat-shell-bg` (a radial brand-tertiary tint at the top, 2% light / 4% dark)\nand `--chat-glow-fill` (the soft pool behind the composer, `--tint-8` / `--tint-20`)\ncame over from the Insightis kit's `.cl-shell` together with two utilities,\n`bg-chat-shell` and `bg-chat-glow`. No component here reads them: they paint one\nscreen of one product. Owner's call (2026-10-16) — the background is an Insightis\nelement, so its tokens live in the Insightis kit (`devart-ui/insightis-kit/core/ik-core.css`),\nnot in the system every product inherits.\n\n```diff\n- --chat-shell-bg: radial-gradient(at 50% 0%, color-mix(… --brand-tertiary 2%|4% …), … 55%);\n- --chat-glow-fill: color-mix(in srgb, hsl(var(--brand-tertiary)) var(--tint-8|20), transparent);\n- 'chat-shell': 'var(--chat-shell-bg)',\n- 'chat-glow': 'radial-gradient(ellipse 55vw 45vh at 50% 50%, var(--chat-glow-fill), transparent 65%)',\n```\n\nA removed public token and utility: **major** (`.changeset/chat-backgrounds-to-insightis.md`).\nThe built `dist/` and `ds-bundle/` still carry them until the next `pnpm bundle`.\n\n## 125. Dark scrim — on the page's grey, not on a navy\n\n`globals.css`, `.dark`\n\nEvery dark surface is the Grey ramp (`--surface-page` Grey-950 `#0F0E14`, cards\nGrey-900/800), but the scrim behind a Modal, a Sheet and the Spotlight tour was\n**Slate-950** — `hsl(229 84% 5%)`, a saturated navy. At 60% over the grey page\neverything outside the dialog or the lit target went visibly blue, sidebar\nincluded (found in Insightis, step 4 of the onboarding tour). The scrim now\ndarkens with the page's own grey.\n\n```diff\n- --overlay-scrim: hsl(var(--slate-950) / 60%); /* #020617 @60% */\n+ --overlay-scrim: hsl(var(--grey-950) / 60%);  /* #0F0E14 @60% */\n```\n\nLight keeps Slate-950 — over white it reads as a neutral dim, not as a colour.\nEvery reader of the token follows (`ModalOverlay`, `Sheet`, `Spotlight`,\n`constants.ts` `scrim`). A token value change in `globals.css`: **minor**\n(`.changeset/dark-scrim-neutral.md`).\n\n## 167. Green, split the way red is\n\n`globals.css`, `src/lib/constants.ts`, `Alert`, `Badge`, `IconHint`, `Spinner`, `StatusView`, `Timeline`, `Typography`, `src/__tests__/contrast.test.ts`\n\nRed already had two tokens: `--fb-red`, the fill, one step in both themes with\nwhite on it (the destructive button, a chosen Deny), and `--fb-red-text`, the\nink and the washes, which moves with the theme. Green had one token doing both\njobs and moving with the theme — Green-600 on light, Green-500 on dark — so the\nfill lightened on dark and white on it fell to 2.54:1 (3.77:1 on light), and as\ntext on the card it was 3.77:1 on light.\n\n- `--fb-green` — Green-700 in both themes. White on it 5.48:1.\n- `--fb-green-text` — new: Green-800 on light, Green-500 on dark. New primitive\n  `--green-800` (#065F46). Green-700 is not enough on light: on its own 15% wash\n  it is 4.4:1; Green-800 is 6.0:1.\n- Every success text reads `--fb-green-text`, and so does every green wash —\n  `--alert-*-success`, `--toast-*-success`, `--badge-green-*` — exactly as the\n  red ones read `--fb-red-text`. On dark nothing moves (Green-500 before and\n  after); on light the washes are mixed from Green-800, a shade deeper.\n- `src/__tests__/contrast.test.ts` reads `globals.css` and checks, in both\n  themes, white on both fills, both inks on the card, a Badge wash under its ink,\n  and the SegmentedControl pairs (§73). Run against the old values it fails five\n  of eighteen.\n\n`apps/web/src/index.css` carries its own copy of the tokens and needs the same\nedit.\n\n## 174. Dark `--ink-inactive` is grey, like the rest of the dark ink ladder\n\n`globals.css`\n\n**From** Insightis (Data Sources, designer 2026-11-05: a disabled tab and the\nsearch placeholder under it are two different greys). **Used in** every\nplaceholder and every `disabled:text-ink-inactive` in both products.\n\nOn light the ink ladder is one family — Slate-900, 700, 550, 450. On dark it\nwas Grey-50, Grey-100, Grey-300 and then **Slate-400** (`#94A3B8`): the last\nstep changed family and read blue. §165 met it on the disabled `secondary` and\nanswered with a fade — disabled is `opacity-disabled` over the control's own\nink, not a colour swap — so every faded control (`Tabs`, `Button`,\n`Checkbox`, `Switch`) became neutral grey, and the placeholder beside it stayed\nblue. On Data Sources a switched-off \"My Connections\" tab (`--ink-secondary`\nat 0.65, about `#909399` on the card) sat over a \"Search data sources…\"\nplaceholder in `#94A3B8`.\n\nNow `--ink-inactive` on dark is **Grey-400** (`#9CA3AF`) — the same 65%\nlightness, so no contrast moves, only the hue. Placeholders, the field's search\nglyph (§106) and the text of a switched-off `DropdownMenuItem`, `Input`,\n`Select`, `TextArea`, `Toggle` or `LinkButton` move with it. Light is\nunchanged.\n\n`apps/web/src/index.css` carries its own copy of the tokens and needs the same\nedit.\n\n---\n\n# Sizes and glyphs\n\n## 40. The size ladder\n\n**The canonical ladder. Four sources carry this table and must agree:** this\nfile, `Insightis/legacy-html/reports/2026-09-04-insightis-ux-audit.md` (#15, #36),\n`Insightis/legacy-html/reports/2026-09-19-prod-interaction-states-migration.md` and\n`Insightis/legacy-html/pages/kit-theme.css`.\n\n| step | height | button padding | field padding | gap | label | glyph |\n|---|---|---|---|---|---|---|\n| xs | 28 | 8 | 8 | 4 | 12 | 14 |\n| sm | 32 | 12 | 12 | 6 | 14 | 16 |\n| md | 36 | 12 | 12 | 8 | 14 | 16 |\n| lg | 40 | **16** | 12 | 8 | 16 | 20 |\n| xl | 44 | **20** | 12 | 8 | 16 | 20 |\n\nThe button opens out at `lg` and `xl`; the field family — `Input`,\n`InputGroup`, `Autocomplete`, `TextArea` — holds 12px. They share an edge at\n`xs`, `sm` and `md`, which is every step the product uses. The gap has three\nsteps, not two. No half-steps.\n\n### What the package had\n\n| | was | is |\n|---|---|---|\n| `Button` padding | `px-2.5` = 10 at every step | 8 / 12 / 12 / 16 / 20 |\n| `Button` gap | `gap-1.5` = 6 at every step | 4 / 6 / 8 / 8 / 8 |\n| `Button` label | 12 at `xs`, 14 above it | 12 / 14 / 14 / 16 / 16 |\n| `Button` glyph | 12 at `xs`, 16 above it | 14 / 16 / 16 / 20 / 20 |\n| `IconButton` glyph | 16 / 12 / 16 / 20 / 20 / 20 for `2xs`…`xl` | 14 / 14 / 16 / 16 / 20 / 20 |\n\nOnly the height was on a ladder. `IconButton` had no glyph ladder at all: 12px\nat `xs`, one step *below* the 16px it gave `2xs`.\n\n### The field is built differently from the kit, deliberately\n\nThe kit has two field implementations and they put the inset in different\nplaces: `.field` carries it on the shell, `.igrp` carries it on the parts\n(`.igrp-add{padding-left:12px}`, `.igrp-input{padding:0 12px 0 8px}`). The\npackage puts it on the shell in both cases, so one component owns the field\nedge. Rendered result is what has to match, and does.\n\nField text also moved: `sm` 12 → 14, `lg`/`xl` 14 → 16. The `sm` step is a\ncorrection in its own right — the earlier \"13 → 14\" migration rounded it down to\n12, where the kit's `sm` field has always been Body M.\n\n## 44. The icon surface\n\nThree things, one of which is the reason the other two would not have shipped.\n\n(A fourth — an ink rule on the leading glyph — is in the archive: it was\ninvented inside the package and stepped away from the kit.)\n\n### The ladder stops at 20px, and the type at 16px\n\nThe kit's `--icon-xl` is 24px. On a 44px field that reads as an icon that\noutgrew its control. The ladder repeats at both ends — **14 / 16 / 16 / 20 / 20** —\nthe way it already repeats 16 across `sm` and `md`.\n\nThe type took the same cap: `xl` was 18px, now 16, the same rung as `lg`. So\n`Typography` keeps `label16` and the two 18px control rungs are gone again —\n§100 brought `heading18` / `title18` back for headings, the one place prod still\nsets 18.\n\nChanged in three places, because the ladder exists in three: the package,\n`Insightis/legacy-html/pages/kit-theme.css` (`.btn-xl`, `.igrp.is-xl .igrp-input`,\n`.field.is-xl input`, `.ta.is-xl`) and this file.\n\n`Typography`'s prose scale keeps `text-lg` in `h4`, `h5` and `large` — headings\nin running text, not control labels.\n\n### A field's two glyphs were sized by two mechanisms\n\n`PasswordInput`: the leading lock grew with the field, the trailing eye stayed\n16px at every step.\n\nThe lock is a direct child of `InputGroupAddon`, so `[&>svg]:size-*` reaches it\nand beats the `size-4` written on the icon. The eye sits inside an\n`IconButton`, which the addon does not reach (§7), and whose own\n`[&_svg]:size-*` beats any class on the glyph. Either way the icon's own\n`className` did nothing.\n\nFix: stop writing sizes on icons. The lock carries no size class; the eye takes\nthe field's step from `passwordToggleVariants` (14/16/16/20/20) on the toggle,\nso it does not lean on the `IconButton` ladder, which the developers' package\nstill draws differently at `xs` and `md`.\n\nThe eye shows the action, as the toggle's label does: an open eye to show, a\ncrossed-out one to hide — the same as the Insightis sign-in page.\n\n### `xs` field edge — 6px, reverted to 8px\n\nMoved to 6px on the argument that an 8px edge crowds a 14px glyph at 28px tall.\nReverted: `Button` `xs` stayed at 8, so a field and a button beside it stopped\nlining up, and the package was the only one of four sources carrying 6. The\nladder has no half-steps.\n\n### The glyph rules were absent from the bundle\n\n`.design-sync/.cache/ds-classlist.txt` contained zero `svg`-scoped classes.\nEvery glyph rule in the library is a child or descendant selector —\n`[&_svg]:size-4` in `Button`, `IconButton`, `Badge`, `File`; `[&>svg]:size-*`\nin `InputGroupAddon`; `[&_svg]:stroke-[1.75]` (now `stroke-2`, §92) in `DropdownMenuItem` — and the\nenumerated vocabulary generated none of them.\n\nSo in the bundle no glyph ladder existed, no shrink guard, no menu stroke\nweight: every icon fell back to whatever `lucide-react` renders, and nothing\nfailed. §19 at library scale.\n\n## 92. Glyph stroke — one weight, set in CSS\n\n- **`glyphStroke`** (`src/lib/utils.ts`) — `[&_svg]:stroke-2`, on `Button`,\n  `IconButton`, `InputGroupAddon`, `DropdownMenuItem` and `Alert` at both sizes.\n- **`gen-classlist.mjs`** — the enumerated form, so the bundle carries the same\n  rule as Storybook (§19).\n\n`upstream` sets no stroke on `Button`, `IconButton`, `InputGroupAddon` or\n`Alert`, and draws `DropdownMenuItem` at 1.75 (`[&_svg]:stroke-[1.75]`). A CSS\n`stroke-width` beats the attribute on the `<svg>`, so here a glyph passed in\nwith its own `strokeWidth`, or from a set that does not default to 2, comes out\nat the weight of the glyph beside it. 2 is what prod draws: every UI glyph on\nthe live app is Lucide's default, `stroke-width=\"2\"` in a 24 viewBox — 20\nglyphs, 13 in a 16px box and 7 in a 14px one. The kit tried 1.75 and reverted\nit; the same mark came out 12% lighter than production.\n\nThe `StatusView` illustrations draw at 1.5 in a 150-unit\nviewBox; they are artwork, not UI glyphs.\n\n---\n\n# Across components\n\n## 99. Disabled controls — the not-allowed cursor\n\n- **`SegmentedControlTrigger`**, **`TabsTrigger`**, **`Toggle`**,\n  **`DropdownMenuItem`**,\n  **`DropdownMenuCheckboxItem`**, **`DropdownMenuRadioItem`** — no\n  `disabled:pointer-events-none` (`data-[disabled]:` on the menu items), which\n  `upstream` still carries beside `cursor-not-allowed`. With no pointer events\n  the cursor is never asked for, so a switched-off control showed the arrow,\n  and a tooltip could not open on it. Hover recipes are behind `enabled:`, so\n  nothing lights up.\n- **`AccordionTrigger`** — `disabled:cursor-not-allowed`.\n\n`RadioButton`, `Button` and `IconButton` already work this way in `upstream`,\nand `Switch` does since MR !26 — its track and its `tertiary` row both key on\n`data-disabled` there (`e88067c`).\nRaised by the workspaces prototype: a Permissions row out of the data model\nscope, whose Allow / Deny is switched off.\n\n---\n\n# `FilterMenu`\n\n## 148. `FilterMenu` — a hierarchy of sources and their connections · **DRAFT**\n\n`src/components/FilterMenu/index.tsx`\n\n**The pill itself is in `upstream`** (AIINS-2178, 2026-11-17), ported from here: the plain list of\nchoices, the counts, the check on the chosen one, the ✕ that puts the filter back. What is left\nhere is the part they took out again, in a commit of its own — \"прибрати дерево з FilterMenu\".\n\n```ts\nicon?: ReactNode            // a group's mark, in a fixed 20px slot\nchildren?: FilterMenuOption[]   // one level of options under a group\n```\n\nOne level of hierarchy: a group — a data source, with its connector mark — and its connections\nunder it. A child's label starts exactly under its group's, the group reads at 500 and the child\nat 400, groups are separated by a rule, and a hierarchy gets a fixed 288px menu so nested labels\nline up from one menu to the next.\n\n**Why they dropped it, read off their code.** The hierarchy was a flag that swapped the whole\nrender — `isTree` decided the menu's width, whether a 20px mark slot was drawn on every row, and\nwhich of two ink levels a label took. That is the shape their own rule names: *one component, one\njob; a prop that swaps the whole render is a separate exported component* — the same call they\nmade on `SearchInput results` → `SearchInputWithResults`. The rows also had to be built by hand\n(`role=\"menuitemradio\"`), and their review took those back to `DropdownMenuRadioItem`, which a\nnested list cannot be expressed through.\n\n**So it is not offered again as a flag.** It goes over as its own exported component over their\n`FilterMenu`, or not at all. Until then the library keeps the one component with the hierarchy in\nit, because Insightis's Provider filter is that hierarchy: `IK.mxSourceTree(rows)` builds\n`{ value: 'g:<prov>', label, connector, count, children: [{ value: 'c:<id>', label, count }] }` and\n`WsMetrics` renders it through `D.FilterMenu`. Taking their shape without a replacement blanks\nthat filter.\n\n**Also theirs, and ours to follow:** `defaultValue` was renamed `resetValue` — React's names keep\nReact's meaning, and this one is the value the ✕ returns to, not an initial value.\n\n**minor** (`.changeset/filter-menu-alert-stack.md`).\n\n# `Tree`\n\n## 150. New — `Tree` · **DRAFT**\n\n`src/components/Tree/index.tsx`\n\nA hierarchy read row by row — a data source's catalogs, schemas, tables and columns. The AI\nconnectivity prototype drew the same row in six places (the Data model, the setup page and window,\nPermissions, Effective access) from code of its own; owner's call (2026-10-23): the tree belongs in\nthe library.\n\n- `Tree` — the container; `inset` is the edge of what holds it, at both ends of every row (24 in a\n  card under its title, 16 in a pane).\n- `TreeItem` — one row, 40px at every level, a rule under it, the last one ending on its holder's\n  border. The whole row opens; `actions` at the right edge never fold it.\n  - **The last rule is transparent, not removed** (`last:border-b-transparent`, `TreeLoadingRow`\n    too) — a row keeps its box wherever it stands. With `last:border-b-0` a branch that became the\n    last row on folding lost the rule's height and its toggle, icon and name dropped by half of it,\n    0.4px — a whole device pixel at 125% — and rose again on opening (2026-10-29).\n  - **Hover is a row's wash** — `tbl-row-hover` (`--tint-4`, §6a, as Table's rows), not the\n    control's `state-hover`: over the card that one is exactly `surface-card2` on dark, the head's\n    tone, and a hovered node ran into the head above it (2026-10-27). Card → hover → head:\n    `#FFFFFF` → `#F8FBFC` → `#F1F5F9` light, `#17171E` → `#1C1D24` → `#21212C` dark.\n  - **One step a level** — the toggle and its gap, 20 + 8 = 28px (`TREE_INDENT`): a level's +/−\n    starts under the icon above it.\n  - **An icon on every level** (`icon`, 14px, secondary ink), and **every row keeps the toggle's\n    slot** — empty on a row that cannot open — so each level's icon stands one full step in from its\n    parent's. A column without the slot put its icon under its table's and read as a sibling.\n  - The toggle is `IconButton` `3xs` `secondary` (§101), +/−, named \"Expand / Collapse {name}\",\n    `aria-expanded` — a disclosure. The +/− says the state, as a tree's caret does: **an open branch\n    is not a pressed button** (§155).\n  - `label` — the kind before the name in secondary ink (`Catalog · sakila`).\n  - `query` — what a search matched, marked (`HighlightText`, §109).\n  - `struck` — gone from the source: the name struck through (§113), secondary ink.\n  - `loading` — the name under a `Skeleton` of its own size, so nothing on the row moves.\n  - `after` — right after the name (a warning mark); `variant=\"head\"` — a branch head the caller\n    groups by (a connection over its catalogs): `surface-card2`, no hover, `title14`. Not the\n    page's grey: on dark the page is darker than the card, and the head read as a hole in it;\n    card2 is a step lighter than the card on dark and a tinted band on light (2026-10-27).\n- `TreeLoadingRow` — what an opened branch shows while its children are read: the spinner in the\n  coming rows' icon slot, the words where their names start.\n\nThe tree holds no data: which rows exist, which are open, what loads and what a search keeps is the\ncaller's.\n\n**minor** (`.changeset/tree.md`).\n\n---\n\n# `IconButton`, `Button`, `Switch` tooltip\n\n## 151. `IconButton`, `Button` — `tooltip`; a disabled control keeps it\n\n`src/components/Tooltip/ControlTooltip.tsx` (internal) ·\n`src/components/IconButton/index.tsx` · `src/components/Button/index.tsx` ·\n`src/lib/utils.ts` (`secondaryDisabled`)\n\n**`Switch`'s half is in `upstream`** (MR !26, `e88067c`): the same props, the\ntrack keeping its own `data-state` under the trigger, the off look on\n`data-disabled`, and — since the developers' `f7463ae` — a soft-disabled switch\nthat submits nothing in a form. What is left here is `Button` and `IconButton`.\n\n```ts\ntooltip?: ReactNode | true   // true → the aria-label; a node → that, over a longer accessible name\ntooltipSide?: 'top' | 'right' | 'bottom' | 'left'   // default 'top'\n```\n\n- **`IconButton`** — an icon-only control names its action on hover and\n  keyboard focus. Every product page built it by hand — an `IconButton` inside\n  a `TooltipTrigger` (the LinkAI prototype's `IconAction`, 19 uses) —\n  now a prop, the way `Badge` carries its own.\n- `true` shows the `aria-label`; a node shows a shorter word over a longer\n  name (\"Set Up\" over \"Set up Finance warehouse in Data Analyze\").\n- Without `tooltip` the component renders exactly as before.\n- **`Button`** (2026-10-27) — the same props on the same code\n  (`ControlTooltip`: the control is the trigger, `asChild`). Its first use is\n  the reason a button is off; the prototype built it three times as a disabled\n  `Button` in a focusable span in a `Tooltip` (\"Add Workspace\", \"Set Up\" on an\n  inactive connection, a workspace's Set Up while creating).\n- **A disabled control keeps its tooltip** (2026-10-27) — on all three. A\n  `disabled` button is out of the tab order and, in the products' browsers,\n  reports no hover, so the reason reached nobody. With `disabled` and a\n  `tooltip` the control renders `aria-disabled` instead: focusable, announced\n  as unavailable, the tooltip on hover and focus; the click is swallowed\n  (default prevented — no submit, no toggle — and propagation stopped, so a\n  row behind it does not open).\n- **The `aria-disabled` form on every variant** (2026-10-27) — `Button` and\n  `IconButton` painted it only on the three tertiaries; `primary`, `outline`,\n  `destructive` and the secondaries (`secondaryDisabled`) now paint it as they\n  paint `disabled`, hover and press switched off. The snapshot moves on every\n  `buttonVariants` / `iconButtonVariants` line, because the default\n  `primary` is on every line.\n- **The soft-disabled form carries `data-disabled`** as well as\n  `aria-disabled`, set by `disabledProps` (2026-11-18, the developers' shape of\n  the helper), so a recipe may key an off look on the attribute.\n- Like every `Tooltip`, it needs a `TooltipProvider` above it.\n\n**minor** (`.changeset/hint-clamp-tooltip.md`; `Button`, `Switch` and the\ndisabled form: `.changeset/control-tooltip.md`).\n\n---\n\n# `IconHint`\n\n## 152. New — `IconHint` · **DRAFT**\n\n`src/components/IconHint/index.tsx`\n\nA glyph beside a name that says one thing on hover: a note (ⓘ — a\ndescription, what a field is for) or a state.\n\n- `variant` — `neutral` (ⓘ, the icon ink, a step up on hover and focus — no\n  fill) · `info` · `warning` (the triangle) · `error` (the cross in a circle) ·\n  `success` (the tick). The tones are `Alert`'s glyph tones, so a state reads\n  the same in a banner and beside a name.\n- `size` — `sm` 14px beside a 14px name, `md` 16px beside a 16px title.\n- `tooltip` + `label` — **both required** (2026-11-19). The glyph with nothing\n  to explain is `StatusMark` (§188).\n- **It is a glyph, not a control** (2026-11-19). On a desktop pressing it does\n  nothing, so it is not marked or painted as one — no `button`, no pointer\n  cursor. Touch is not its business either: the long press belongs to\n  `Tooltip` (§189), so this component holds no rule of its own about the\n  pointer.\n\nReplaces the prototype's `InfoHint` (the description ⓘ) and `ProblemMark` (the\nwarning beside a tree row or a member) — two hand-built spans with a tooltip.\nMerging them into one component is what put two jobs behind one prop; §188\nseparates them again.\n\n**minor** (`.changeset/hint-clamp-tooltip.md`); the split is **major**\n(`.changeset/icon-hint-split-and-status-mark.md`).\n\nThe error to avoid here is taking half of each: a control that is clickable on\na desktop where hover has already shown the words gives the pointer cursor a\npromise nothing keeps.\n\n---\n\n# `ClampedText`\n\n## 153. New — `ClampedText` · **DRAFT**\n\n`src/components/ClampedText/index.tsx`\n\nA text cut to a number of lines, with See more when there is more — and only\nthen.\n\n- `lines` 1–6 (default 3).\n- **Measured, not guessed** — whether the text is cut is read off its box on\n  every resize: in a popover the first layout happens before the panel has its\n  width, and one measurement there found nothing cut.\n- In place, See more opens the text and See less folds it. With `onMore` it\n  hands the whole text to the caller instead — a dialog from a hover panel,\n  which must stay a glance.\n- A press on See more stops there: it sits in rows and panels whose own press\n  opens something else.\n- **A word longer than the line breaks** — `overflow-wrap: anywhere` on the\n  text (2026-11-17, DBM-25468). Unbroken, a URL or an id typed without spaces\n  was one line to the clamp: See more never appeared and the text ran out of\n  its box sideways (575px in a 343px card, LinkAI's Add workspaces at 375).\n  `break-words` does not fix it — the text sits at `items-start`, its own\n  width, and `break-word` keeps a long word's minimum width; `anywhere` lets\n  the box shrink to the line. Story `LongWord`; test\n  `__tests__/clamped-text.test.tsx`. **patch**\n  (`.changeset/clamped-text-long-word.md`).\n  - **From** — LinkAI, a workspace's description in Add workspaces (DBM-25468).\n  - **Used in** (2026-11-17) — LinkAI: `ChoiceCard` descriptions in Add\n    workspaces and the connection form's workspace step (`_shared/form.jsx`),\n    Add connections and Add to Permissions (`_shared/workspaces.jsx`), the\n    row hint's description (`RowMark`). Measured at 375 before and after:\n    ordinary descriptions keep their width and height, only the unbroken one\n    changes (575px → the card's 263px). Insightis: not checked — no clone on\n    this machine.\n\nWas the prototype's `DescriptionClamp` (a row's description in its hint panel\nand in the pickers).\n\n**minor** (`.changeset/hint-clamp-tooltip.md`).\n\n---\n\n# Build and tooling\n\n## 19. A variant that is not enumerated is never compiled\n\n`.design-sync/gen-classlist.mjs`\n\n`ds-bundle` — the CSS the products load — is compiled from an enumerated list\nof classes, not scraped from the components. A variant missing from that list\nproduces no rule and no error.\n\n`empty:` was missing, so `empty:pb-0` (§11) worked in Storybook and did nothing\nin the products. `empty:pb-0`, `empty:pt-0` and `empty:hidden` are now\nenumerated.\n\n## 20. `pnpm bundle` and `pnpm check-bundle-css`\n\n**`pnpm bundle`** runs the six-command chain that used to be typed by hand. The\norder is load-bearing — `package-build` reads `dist`, so an edit made after\n`pnpm build` never reached the bundle — and a skipped step does not fail:\nskipping the Storybook build once dropped `FilterChips` from a bundle that\nreported no diagnostics, because the roster comes from the Storybook index.\n\nIt decides the Storybook step itself, by diffing the component directories\nagainst what the last bundle holds. `--storybook` / `--no-storybook` override\nit; skipping warns if the roster did change.\n\n**`pnpm check-bundle-css`** catches the two ways a component looks right in\nStorybook and wrong on a page:\n\n1. Storybook compiles Tailwind from the sources; the bundle compiles from an\n   enumerated class list, so a missing class produces no CSS and no error (§19).\n2. `tailwind-export.css` overrides preflight with `svg { display: inline-block }`,\n   which Storybook does not have. That is what made a tooltip trigger 20px in a\n   bundle and 14px under preflight (§13).\n\nIt compiles a second stylesheet with the built components as Tailwind's content\nand diffs the class selectors, letting Tailwind's own extractor decide what is a\nclass — a regex first attempt produced 163 false positives from import\nspecifiers and `data-slot` values. One-directional: the vocabulary is\ndeliberately wider than what components use.\n\nA class assembled at runtime from a variable is in no compiled text, so this\nnarrows the gap rather than closing it. The pixel comparison in\n`.ds-sync/storybook/compare.mjs` is what would close it.\n\n## 37. Build — `bg-surface-card/85` is a class that compiles to nothing\n\n`.design-sync/gen-classlist.mjs`\n\n`--surface-card` is an HSL triplet exposed with `<alpha-value>`, so\n`bg-surface-card/85` is valid Tailwind. The enumerated class list does not carry\nit, the bundle therefore has no rule for it, and the element renders with **no\nbackground at all** — no error, no warning, nothing in `check-bundle-css`,\nbecause the class was never asked for.\n\nThis is the §19 failure mode on a different axis: §19 was a *variant* that was\nnot enumerated, this is a *modifier*. `_shared/card-scrim` writes the mix by\nhand for that reason.\n\nNot fixed here, because enumerating an opacity ladder for every colour is a\ndecision about bundle size rather than a defect: the useful shape is probably a\nshort list of steps the system actually uses. Recorded so the next person who\nfinds a silently unpainted element has somewhere to look.\n\n## 84. The class list — a list with markers, and the last band of a stack\n\n`.design-sync/gen-classlist.mjs`\n\nSix utilities added, because a consumer had no way to write two ordinary things\nand the compiled sheet turned both into silent no-ops:\n\n```\nlist-disc  list-decimal  list-none\nlast:border-b-0  last:border-0  first:border-t-0\n```\n\n**The list.** The preflight strips markers from every `ul`, which is right —\nnavigation and menus are lists too — but it leaves prose with no way back. The\ncase that raised it is a troubleshooting panel whose *Potential causes* and\n*Suggested actions* are bulleted lists; they were written as `list-disc` and\nhave been rendering without markers since, because the class was never\nenumerated.\n\n**The stack.** `border-b` on every band and `last:border-b-0` on the stack is\nthe standard way to rule between bands without a trailing rule against the\ncontainer's own edge. Without the `last:` half a consumer either builds the\ndivider out of a separate element, or reaches for `not-last:` — a Tailwind v4\nvariant this v3 bundle compiles to nothing. The settings panel in the\nconnections prototype has been missing its dividers for exactly that reason.\n\n**Why enumeration and not a safelist**: the file's own note at the top. A class\nthat is not in the list does not exist in the sheet, and nothing warns — which\nis what both of these were.\n\n---\n\n# Synced from upstream\n\n## 97. The developers' 1.1.0 parts — what stays different\n\n`upstream` 1.1.0 (81596ad) and their AIINS-1948 `ActivityTray`, ported by hand:\ntheir names, exports, props and variant keys. What differs on top:\n\n- **`./cn` helpers.** `upstream`'s `src/lib/utils.ts` exports only `cn`.\n  `focusRing`, `glyphStroke` (§92), `pageFloor` (§93) and `liftOnHover` (§59)\n  are this package's.\n- **The kit's values over theirs.** `FilterChips` — 6px between chips, 8px\n  inside one, the selected count at 70%, scrolling below `md` (`.chip-row`,\n  `.chip`, `.chip-n`). `Sidebar` — 120ms transitions where they have\n  `duration-100` (`.sbx-nav-item`, `.sbx-brand-id`), the external arrow at\n  14px, the burger glyph at 18px (`.cl-burger`). `ActivityTray` — §79.\n- **`IconCard`** — the kit's tile: `h-32`, `p-4`, a 400 caption, the 1px lift\n  (§59), the focus ring, `bg-ds-card-scrim`. Its floor is on the grid, where\n  the kit puts it — `repeat(auto-fill, minmax(max(7rem, (100% - 7 * .75rem)/8), 1fr))`,\n  never under 7rem, at most 8 a row, where `upstream`'s story uses\n  `minmax(7.5rem, 1fr)`. A `min-w-fit` on the tile does not hold: `IconCard`\n  is `content-visibility: auto`, and a skipped tile keeps its remembered width.\n- **`File`** — the chip draws the ring through `:has()`, and takes the pressed\n  fill only when the content area is pressed, not when dismiss is.\n- **`scripts/lint-tokens.mjs`** — string literals read through the TypeScript\n  parser and hex-escaped commas decoded; `upstream`'s regexes read prose in\n  comments as classes.\n- **Not brought back:** `Button ghost`, `Badge xs` (§86), and the tokens\n  `--bg` (`surface-bg`), `--border-hover` (`stroke-border-hover`) and\n  `--tbl-row-selected-hover` (§6a). `upstream` still has all five; this package\n  removed them as duplicates, and that stands.\n\n---\n\n## 146. The developers' 1.2.0 parts — what stays different\n\n`upstream` 1.2.0 (8d69821), ported by hand on the rule the designer set:\n**their names and their base, this package's changes as extensions on top, and\nnothing this package removed comes back** (`Button ghost`, `Badge xs`,\n`--chat-*`, `--bg`, `--border-hover`, `--tbl-row-selected-hover` stay gone).\nThe extensions:\n\n- **`SearchInput`** — the results list and the pass-throughs (§145).\n- **`PageHeader`** — the back control, `condensed`, the truncating title, and\n  `titleLeft` at the start of the row (§15).\n- **`StepProgress`** — `size`, a state per bar (§117); the rest is theirs\n  since 1.3.0 (§154).\n- **`Alert`** — the optional `title` (§95), the `illustration` slot,\n  `glyphStroke` (§92).\n- **`TextArea`** — `hintText` (§41) and its type (§70); `required` — the asterisk\n  and a required field, as `InputGroup`'s (2026-11-10). `wrapperClassName` was\n  dropped on 2026-11-10: nothing used it.\n- **`IconCard`** — the kit's tile (§97).\n- **`InputGroupAction`** — the docked-icon inks (§45) and the `xs` box (§102).\n- **`Popover`** — `portalContainer`, the trigger's focus ring, the kit's\n  surface `bg-surface-card shadow-overlay-soft` where `upstream` has\n  `bg-surface-page shadow-md` (§88), `fill-mode-forwards` (§34).\n- **`PromoCard`** — the hover on the root (§116).\n- **`ConfirmationDialog`** — on this package's `Modal` (§71): `size=\"sm\"` is its\n  360px, and `ModalFooter`'s own divider replaces theirs.\n- **Storybook** — `Proposed changes` and `Foundations` are this package's\n  sections, above `upstream`'s `Components` and `Compositions`.\n\n## 154. The developers' 1.3.0 and 1.4.0 parts — what stays different\n\n`upstream` 1.4.0 (f69ebc9) and 1.3.0 (c456805), ported by hand on the same\nrule: their names and their base, this package's changes as extensions on top,\nnothing removed comes back.\n\n**Replaced by theirs.** `Coachmark` (§120) is their `GuideCard`; what it did\nthat a card does not — placement, the phone sheet, the dialog role, focus — is\nthe engine's and moved into `Tour` (§122). `StepProgress`'s `counter` is their\n`label`, and `fill` their `labelPosition=\"top\"`.\n\n| Was | Now |\n|---|---|\n| `Coachmark` | `GuideCard` — `nudge` → `nudgeCount`, `leaving` → `isLeaving`; `target`, `rect`, `bounds`, `boundary`, `onPlace`, `portalContainer`, the side list and the dialog role → `Tour` |\n| `coachmark*` data-slots, `coachmark*Variants`, `animate-coachmark-*` | `guide-card*`, `guideCard*Variants`, `animate-guide-card-*` |\n| `CoachmarkSide` · `CoachmarkPosition` · `CoachmarkPlacement` | `GuideCardSide` · `GuideCardPosition` · `TourCardPlacement` |\n| `StepProgress` `counter` (default \"Step N of M\") | `label` — passed by the caller; no `label`, no read-out |\n| `StepProgress` `fill` | `labelPosition=\"top\"` (root) · `stretched` (the parts) |\n| `step-progress-head` | `step-progress-header`, which now also wraps a label beside the bars |\n| `ChoiceGroup` `columns={2}` | `className=\"sm:grid-cols-2 sm:gap-3\"` — the same classes, the developers' layout |\n| Storybook `Compositions/ChoiceCard` | `Components/ChoiceCard` |\n\n**Extensions on their base:**\n\n- **`StepProgress`** — `size=\"sm\"`, a `data-state` per bar, no tooltip without a\n  title (§117).\n- **`StatusView`** — the illustration pack (§51, §107) and the kit's halo sizes,\n  spacing and type. Their `iconSize`, `titleSize`, `contentWidth` and the `base`\n  step are taken at their values; the 48ch cap (§104) holds inside the default\n  `md` block only.\n- **`ScrollShadow`** — their `focusable` (a Tab stop only while it overflows\n  with nothing focusable inside) with the system `focusRing` while it is one, and\n  its direct children watched for size, so a container already at its cap\n  notices content that grows without the child list changing.\n- **`Tour`** — the engine half of the card (§122).\n\n# Documentation that was missing or wrong\n\nThese are not code changes, and `upstream` ships no component docs, so every\n`.md` here is this package's. Each is a place where every page was inventing its\nown answer, which is how two products drift apart without either being \"wrong\".\n\n- **`Card.md` — `ghost`.** ~~Documented as a drop target.~~ **Withdrawn.** The\n  doc and the implementation did disagree, but the correction went the wrong\n  way: `ghost` is the dashed *\"browse more\" tile* — `Card.stories.tsx` has\n  always called it that, and `CardIcon variant=\"ghost\"` is its centred dashed\n  icon well, which is not the anatomy of a drop target. A dashed edge in this\n  system means *nothing here yet*; sometimes that empty thing accepts a drop and\n  sometimes you click it. `Card.md` now says so.\n- **`Table.md` — the empty state.** The doc asked for \"a single row with\n  `colSpan` and `h-24 text-center`\" and stopped, so every page improvised. Now\n  specified: `StatusView` with `surface=\"embedded\" tone=\"transparent\"` in that\n  row, `py-12` on the cell, and three things spelled out — the empty state lives\n  *inside* the table so the header and toolbar stay put; a first run and a\n  filtered miss are two different texts; both carry an action, because an empty\n  state is never a dead end.\n- **`Switch.md` — which size where.** Both sizes existed (`default` 36×20, `sm`\n  28×16); what was missing was the choice. In a table row the default toggle sits\n  a step louder than everything around it and pulls the eye off the name it\n  belongs to — you end up reading a column of switches instead of a list of\n  connections. **`sm` in a table or dense list row, `default` in forms and\n  settings.** The doc also covers when a toggle should confirm: only when\n  switching **off** has a consequence invisible from where the user stands, and\n  then in that direction only — switching back on is its own undo, and a dialog\n  in both directions teaches people to dismiss it.\n\n---\n\n# Open against the kit\n\n## Raised by the kit ↔ Storybook audit\n\nThree are contradictions **inside the kit**, and the package cannot implement\neither side until the design answers:\n\n| | |\n|---|---|\n| **`--tbl-row-pressed`** | Prose says neutral, `--tint-6` of `--ink-primary`. CSS says `color-mix(in srgb, #07807E 4%, transparent)` — brand teal, off the tint scale. |\n| **18px in the type scale** | `Body XL` and `Label 2XL` are 18/28 and on the list of nineteen; the same section lists 18px under *не на шкалі* with migration 18→20. See §44 and §100. |\n| **Sidebar active ink** | The row table says active is *\"`Text/Body` (no brand colour)\"*; the Collapsed row two lines down says *\"(active = teal icon)\"*. The package follows the first. |\n\nEight more are the kit's own ⚠ markers — agreed to be *needed*, never specified,\nso there is nothing to implement yet. Listing them so they are not rediscovered\nas bugs:\n\n| Component | What the kit leaves open |\n|---|---|\n| `Tabs` | tab with a counter / badge |\n| `Card` | focus (for focusable cards) and disabled; self-hover on `secondary` |\n| `DropdownMenu` | item keyboard focus; item selected / checked |\n| `Toast` | pause countdown on hover; focus-visible |\n| `File` | disabled; pressed (marked optional) |\n| `Separator` | a `muted` variant between `border` and `primary` |\n| `Sheet` | surface harmonization — the `Popover` half was retracted (archive), still open in the kit’s own text |\n| `Resizable` | the kit draws a 6px handle, the package a 1px line plus a grip; neither clears 24px, and the kit has no `:active` rule to compare against |\n\nOne is a behaviour difference that may be intentional and is recorded rather\nthan \"fixed\": the kit's `Accordion` is *\"an instant show/hide (no CSS\ntransition)\"*, while the package animates with `accordion-up` / `accordion-down`.\nThe kit is describing production; the animation is an improvement, but it is a\ndivergence from the agreed reference and should be ratified, not assumed.\n\n## What this round did **not** change, and why\n\n- **`ScrollShadow` and `scrollbar-gutter`.** The prototype reserves the\n  scrollbar gutter on its own scroll container. That is page layout, not a\n  component override — and `ScrollShadow` also paints edge shadows the container\n  does not want. Left on the page.\n- **`DropdownMenuContent` / `TooltipContent` / `SheetContent` exit animations.**\n  Same missing fill mode as §34, no reported symptom. Changing three more\n  floating surfaces on the strength of one measurement is how a fix becomes a\n  regression.\n- **`Badge size=\"sm\"` radius.** Archived — the request against `Badge` was the hairline, and this was never part of it.\n  Out of scope for a round that was about where components come from.\n\n## Open here, and the same in `upstream`\n\nFound while building on the package and not fixed. `upstream` has the same, so\nnone of it is a difference; kept with their numbers so the review pages still\nfind them.\n\n- **`Alert` under a scoped `.dark`.** `--alert-border-*` has no `.dark` copy,\n  so under a `.dark` on a wrapper the borders keep their light colours.\n\n### 22. Five controls still fade at `opacity-50`\n\nThe audit produced one unified disabled recipe — `opacity: var(--opacity-disabled)`\n(0.65) plus `pointer-events: none` — and the kit repeats it under Checkbox,\nSwitch, SegmentedControl, Tabs, Button and IconButton: *\"same recipe as Switch /\nCheckbox / Button\"*. Five call sites never took it:\n\n| File | Line |\n|---|---|\n| `src/components/Sidebar/SidebarMenuButton.tsx` | `disabled:opacity-50`, `aria-disabled:opacity-50` |\n| `src/components/Autocomplete/OptionItem.tsx` | `aria-disabled:opacity-50` |\n| `src/components/Datepicker/Calendar.tsx` | `aria-disabled:opacity-50` ×2, `text-ink-secondary opacity-50` |\n\n0.50 against 0.65 is a visible step, and it lands on exactly the controls a\nkeyboard user tabs through fastest. The Sidebar row misses the other half of the\nkit's rule as well: *\"text `Text/Inactive`, `aria-disabled=\"true\"`\"* — the\npackage only dims.\n\nThe Datepicker's third case is different and should not simply be swapped: it is\nthe outside-month day, which the kit specifies as `text content-secondary` with\nno opacity at all.\n\n### 24. `Sheet` — the default side is the one without a border\n\n`src/components/Sheet/index.tsx`, `sheetVariants`\n\n```\ntop    → 'inset-x-0 top-0',    'border-b'\nbottom → 'inset-x-0 bottom-0', 'border-t'\nleft   → 'inset-y-0 left-0',   'border-r'\nright  → 'inset-y-0 right-0'            ← nothing\n```\n\nThe kit lists all four: *\"Right · right (default) · `border-l` · slide-from-right\"*.\n`right` is the default side, so the drawer most consumers get is the only one\nwith no edge against the scrim. It is a one-token omission that reads as a\nrendering bug on a light theme, where panel and page are both near-white.\n\n### 26. `Tabs` — no flush tabset, so two rules stack\n\n`src/components/Tabs/TabsList.tsx`\n\n`TabsList` always carries `border-b`. The kit adds `.tabset.var-flush`, which\ndrops it:\n\n```css\n.tabset.var-flush { border-bottom-style: none; }\n```\n\nIts reason is the common layout, not an exotic one — tabs on the left, controls\non the right, inside a row that already draws its own hairline. *\"Without it the\ntwo rules stack into a 2px edge.\"* The DS Connections tab row is the shipped\ncase. A `bordered` boolean variant on `TabsList` covers it.\n\n### 29. `Datepicker` — one bespoke focus ring, not three missing states\n\n**Mostly retracted.** Filed as \"no hover, no today, no disabled\" after reading\n`CalendarDayButton.tsx` alone. The per-day classes do not live there — they live\nin `Calendar.tsx`'s `classNames` map, and all three are present:\n\n```\nday:      [&:not([data-selected=true])]:hover:bg-state-hover   ← the kit's State/Hover\ntoday:    bg-state-hover text-ink-primary\noutside:  text-ink-secondary                                    ← matches the kit exactly\ndisabled: text-ink-secondary opacity-50\n```\n\nSo the kit's three ⚠ *needed* rows are answered. Two real items survive:\n\n**The focus ring is the only one in the package that is not the shared recipe.**\nThe kit specifies *\"Focus (keyboard) → `--shadow-focus` 2px + 2px gap\"* — the ring\nButton, IconButton, Switch, SegmentedControl and StepSlider all use, and which\n`focusRing` / `formFocusRing` in `src/lib/utils.ts` now exist to enforce. The day\nbutton rolls its own:\n\n```\ngroup-data-[focused=true]/day:ring-[3px]\ngroup-data-[focused=true]/day:ring-focus-ring-brand/50\n```\n\n3px at 50% alpha with no offset gap. A calendar is precisely where a keyboard\nuser lives, and it is the one grid where \"which cell am I on\" is the entire\ninteraction.\n\n**`disabled` fades at `opacity-50`** — §22, along with the two month-nav chevrons.\n\n`dark:hover:text-ink-primary` on `CalendarDayButton` is also one of the two\n`dark:`-class holdouts SPEC lists under *Creating a New Theme*. Now that the light\nhover is a token (`bg-state-hover`), that line is the last piece of the day cell\nthat a third theme would not reach.\n\n### 31. The toast close button is off the 24px ladder\n\n`src/components/Toast/ToastMessage/index.tsx`\n\nThe kit's `IconButton` section enumerates what lives on the `2xs` rung: *\"the row\nkebab `[data-kbp]` (chats, files, metrics, connections, sidebar), `.toast-x`,\n`.sht-x`\"*. `Sheet` already took it — `variant=\"tertiary\" size=\"2xs\"`, with a\ncomment saying so. `Toast` did not:\n\n```\n<IconButton variant=\"transparent\" size=\"sm\" className=\"mt-0.5 shrink-0 text-ink-body\">\n```\n\n`transparent` has no box, so it has no hover pill and no press state; `size=\"sm\"`\nis 32px, off the rung; `mt-0.5` and `text-ink-body` are the bespoke corrections\nthat having neither forces. Matching `Sheet` deletes all three.\n\n### 32. `ghost` — one of the three \"unrelated\" ones is not\n\n`Button`'s `ghost` was removed in favour of `tertiary`, and the changeset says\n`Card`, `CardIcon` and `Toggle` keep their own **unrelated** `ghost`. Two of\nthose are unrelated. `Toggle`'s is the removed variant under another name:\n\n| | |\n|---|---|\n| `Button` `tertiary` | `border-transparent bg-transparent text-ink-body` · `hover:bg-state-hover` · `pressed:bg-state-pressed` |\n| `Toggle` `ghost` | `border-transparent bg-transparent text-ink-body` · `hover:bg-state-hover` · `active:bg-state-pressed` |\n\nClass for class the same, except `active:` where `Button` uses `pressed:`.\n`Toggle` sits on the same variant scale, so a consumer reads in `Button.md` that\nthe name does not exist and finds it on the sibling meaning what it used to.\n\n**To do:** rename to `tertiary`, switch `active:` → `pressed:`.\n\n`Card.ghost` stays: it is the dashed \"browse more\" tile — an empty slot that\nadds the thing the grid is full of — and `CardIcon.ghost` is its icon well.\n`Card.md` describes it as a drop target, which is a different component\n(`DropZone`); that line is what needs fixing, not the variant.\n\n### 38. `StepSlider` — four measurements against a spec that argues for each one\n\n*Kit ↔ Storybook audit, finished after round 4 landed; numbered here to avoid\ncolliding with it.*\n\n`src/components/StepSlider/index.tsx`\n\nThe kit's StepSlider entry is the most closely argued in the whole document: it\nbuilds the control as a member of the Switch family and gives a reason for every\nnumber. Four of them do not match.\n\n| | Kit | Package |\n|---|---|---|\n| Track fill | `--surface-card2` | `bg-surface-chips` |\n| Dot, at rest | 6px, `--ink-inactive` (4px at `sm`) | `size-1` = **4px**, `bg-ink-secondary` |\n| Dot, on hover | lifts to `--ink-secondary` | — no hover rule |\n| Width, default | **68px** (`2 + 3×1rem + 2×.5rem + 2`) | `w-20` = **80px** |\n| Hit area | 24×24 via `::before {inset:-4px}` on a 1rem slot | `before:-inset-2` on a 4px dot = **20×20** |\n\nThe thumb is right — `size-4` / `size-3` matching Switch's 16/12px, with\n`shadow-thumb`, which is the part the kit cares most about (\"the mark grows to\nfill its slot and becomes exactly the paired Switch's thumb\"). So the family\nresemblance holds; the rail it sits on does not.\n\n**The dot colour is the one to fix first, because it collapses two states into\none.** The kit picks `--ink-inactive` deliberately and shows its work: the\nobvious family choice, Switch's `--switch-off-bg`, gives *\"1.34:1 on the\n`--surface-card2` rail (1.10:1 dark)\"*, and since the dots **are** the other\nsteps — the only cue that the control has three positions — WCAG 1.4.11's 3:1\napplies to them. Hover then *\"lifts one step along the ink ramp → `--ink-secondary`\"*.\n\nThe package starts at `--ink-secondary`, which is where the kit's hover ends. So\nthe rest state is one step too loud and the hover step does not exist: pointing\nat a dot changes nothing.\n\n**The hit area misses the floor the kit claims it clears.** `before:-inset-2`\nexpands 8px around a 4px dot — 20×20, under WCAG 2.5.8's 24×24. The kit reaches\n24 by insetting 4px around a **16px slot**, not around the mark: *\"the slot plus\nan invisible `::before` ring clears 24×24 on both axes without changing layout.\"*\nSame trick as `.swt::before`, which the package did implement correctly (§28 of\nthe kit's Switch entry, `-inset-x-1 -inset-y-3`). The gap is that the dot here is\nthe mark, not the slot — the constant-slot layer the kit describes was not built,\nwhich is also why the width came out at 80px instead of 68px.\n\n**The track token matters for one reason the kit names.** `--surface-card2` is\n*\"one notch recessed from the popover's Surface/Card\"*; `--surface-chips` is a\nstep further still. On the composer popover — the shipped consumer — the control\nsits on Surface/Card, so the package's track reads as a deeper well than the\ndesign intends, and the 4px dots on it are what has to carry the contrast.\n\nNone of these are visible in the published Storybook, which predates the\ncomponent's current form; all four were read off the kit's rendered CSS and the\npackage source side by side.\n\n---\n\n## 155. `pressed:` — an open disclosure is not a held press\n\n`src/tailwind-preset.ts` · `Tree`, `SidebarMenuButton`\n\nThe `pressed:` variant matched `:active` and every `aria-expanded=\"true\"`. The second half is for\na trigger held open while the popup it opens is open — a menu, a popover, a dialog, a select — and\nthere it is right: the button that opened the menu stays down until the menu goes. But a\ndisclosure carries `aria-expanded` too — an open section, a tree branch, \"Show less\" — and every\none built on `Button` / `IconButton` sat pressed for as long as it was open: a column of pressed\n−'s down an opened tree; `AlertStack`'s \"Show less\"; an expandable `ChoiceCard` once chosen, whose\npressed fill out-ranked the chosen wash. `SidebarMenuButton` had already stepped round it with\n`active:` for the same reason.\n\nWhat trees and disclosures do (WAI-ARIA APG *Tree View* and *Disclosure*, Carbon *Tree view*):\nthe glyph says the state — +/−, a caret turned right or down; pressed is only the moment of the\npress. So the variant now holds a button pressed only while it is a popup trigger:\n\n| | matches |\n|---|---|\n| the press | `&:active` |\n| a menu, popover or dialog trigger, open | `&[aria-expanded=\"true\"][aria-haspopup]:not([aria-haspopup=\"false\"])` (+ `:hover`) |\n| a select, open | `&[aria-expanded=\"true\"][role=\"combobox\"]` (+ `:hover`) |\n\nRadix stamps `aria-haspopup` on `DropdownMenu`, `Popover` and `Dialog` triggers and\n`role=\"combobox\"` on `Select`'s, so every trigger that showed pressed while open still does.\n\n- `Tree` — the toggle keeps `aria-expanded` (it is a disclosure), and no longer looks pressed.\n- `SidebarMenuButton` — keeps `active:`; its note no longer blames the variant.\n\n**patch** (`.changeset/pressed-popup-only.md`).\n\n---\n\n## 186. A field's label — one owner, so the three fields step together\n\n`src/components/InputGroup/FieldLabel.tsx` **new**, `src/components/InputGroup/index.tsx`,\n`src/components/TextArea/index.tsx`, `src/components/Autocomplete/index.tsx`\n\n- **`FieldLabel`** (internal) — the label above a field: the size rung, the asterisk and the\n  `<label>` itself, in one place. `InputGroup`, `TextArea` and `Autocomplete` render it.\n- **`RequiredMark`** — the asterisk itself is the developers' own component (2026-11-16, their\n  `design/text-area`), taken here and rendered by `FieldLabel`: one red ` *`, `aria-hidden`,\n  at the label's own size. They wrote it because `InputGroup` and `TextArea` spelled the span\n  out twice; here the one owner of the label is the one caller.\n- **`Autocomplete`** — new `required`, as `InputGroup`'s: the asterisk on the label and\n  `aria-required` on the input, off unless a form asks for it.\n\n**Three components drew this label and each drew it differently.** `InputGroup`'s stepped with\nthe field — 12 at `xs` and `sm`, 14 from `md` — while `TextArea` and `Autocomplete` hardcoded\n14 and both accept the same five sizes. So an `Autocomplete` beside an `Input` at `sm` carried a\nlabel two pixels larger than its neighbour's, in the same form, on the same row. The ladder was\nnever the question: `label12` and `label14` are both on the type scale. The question was that the\nlabel was written three times, and only one copy knew about the ladder.\n\nThe rung is unchanged — it is the package's own (`f69ebc9`), and it stops at 14 while the field's\ntext goes on to 16 at `lg` and `xl` (2026-11-17: leave it there). `required` was missing from\n`Autocomplete` outright: §175 added the asterisk to `InputGroup` and `TextArea` has it, so the\none field that cannot be marked was the one a form reaches for when the value comes from a list.\n`InputGroupInput` already reads `required` off the context, so `Autocomplete` passing it to the\n`InputGroup` it wraps is the whole of the `aria-required` half.\n\n**No visual change where the products stand**: every `TextArea` in LinkAI and Insightis is `md`,\nthe one `Autocomplete` (Insightis, the metric dialog) is `lg`, and both rungs are 14 either way.\n`xs` and `sm` are where the labels now agree, and nothing uses them today.\n\n**Still different, not changed here**: `TextArea` puts native `required` on its `<textarea>`,\nwhich `InputGroup` deliberately does not (§175 — the browser's own validation bubble stays out of\na form that validates itself). Behaviour, not type; left for its own decision.\n\n**minor** (`.changeset/field-label-one-owner.md`).\n\n---\n\n## 156. `Sheet` — the edge in the system's line\n\n`src/components/Sheet/index.tsx`\n\nThe sides draw an edge — `border-r` on the left sheet, `border-t` / `border-b` on the bottom and\ntop ones — with no colour, so it took Tailwind's default (`#E5E7EB`): a white stripe down a dark\nsheet. The sidebar's phone drawer is a left `Sheet`, so it was the first place anyone saw it. The\nbase now names `border-stroke`, the line every other edge in the system uses.\n\n**patch** (`.changeset/sheet-edge-stroke.md`).\n\n---\n\n## 178. `SheetBody` — the scrollbar against the sheet's edge, the content inset alike\n\n`src/components/Sheet/index.tsx`, `src/hooks/use-gutter-inset`, `src/components/Modal/ModalBody.tsx`\n\n**From** Insightis (details panels, designer 2026-11-09, after §176: the same in the panels). **Used\nin** every sheet whose middle scrolls.\n\n`SheetBody` was a bare `overflow-y-auto`: the platform's bar (16px with arrows on Windows), inside\n`SheetContent`'s `p-6`, and the content lost the bar's width on the right only — in the Insightis\ndetails panel 24px on the left, 34px on the right while it scrolled, 24px when it did not, so the\ncontent changed width as it began to scroll.\n\nNow it is §176's `ModalBody` for a sheet: `scrollbar-thin`, it spans the sheet's width (`-mx-6\npx-6`, out over `p-6`), and the gutter and the right padding come from **`useGutterInset`** — the\ngutter reserved, the right padding the measured left padding less the bar. The bar sits against the\nsheet's edge; the content is inset alike on both sides, with a bar or without one. A sheet with no\npadding of its own (`p-0`) passes `mx-0`. `ModalBody` now takes the same hook instead of its own copy.\n\nTests: `use-gutter-inset.test.tsx` (the padding arithmetic: 16 and 20px, a 0px overlay bar, never\nbelow zero), `modal-body.test.tsx` (each body reaches over its surface's padding only by default,\n`mx-0` replaces it), and `ConfirmationDialog` keeps `mx-0` — it fails on the `mr-0` that §176 first\nleft beside the new `-mx-4`.\n\n**patch** (`.changeset/sheet-body-scrollbar-edge.md`).\n\n---\n\n## 157. `ConfirmationDialog` — `description` takes inline marks\n\n`src/components/ConfirmationDialog/index.tsx`\n\n`description` was typed `string`. A confirmation names what it acts on, and products bold that name —\n\"Remove **Finance warehouse** from **Data Analyze**?\" — so every product that had a question like that\nbuilt the dialog again from `Modal` parts rather than lose the bold (the LinkAI prototype had\ntwelve such copies). It renders inside a `<p>` already; the type is now `ReactNode` — inline content,\none paragraph. A second block still goes in `bodySlot`.\n\n**patch** (`.changeset/confirmation-description-node.md`).\n\n---\n\n## 170. `Separator` — a border, not a filled pixel\n\n`src/components/Separator/index.tsx`\n\nThe line was a 1px box filled with the colour (`h-px bg-stroke`). A browser snaps a border to whole\ndevice pixels and leaves a fill where the layout puts it: at 125% display scaling — common on Windows\nlaptops — the fill is 1.25 device pixels, and wherever the content above lands it on a fraction it is\nsmeared over two rows and reads twice as thick as the card's own 1px border beside it (2026-11-03). What\nput it on a fraction is §171 — the Tabs strip and `CardHeader`'s 6px; this makes the line crisp wherever\nit lands.\n\nThe line is now a border on a box of no size: `h-0 w-full border-t` horizontal, `h-full w-0 border-s`\nvertical, the variants' colours as `border-*`. Same 1px, same colours, crisp at every scale and position.\nA caller that repainted it with a `bg-*` class has nothing to paint now — none in this package.\n\n- `Separator`\n  - horizontal: `h-px bg-stroke` → `h-0 border-t border-stroke`\n  - vertical: `w-px` → `w-0 border-s`\n  - `primary` / `secondary`: `bg-brand-*` → `border-brand-*`\n\n**patch** (`.changeset/separator-border.md`).\n\n---\n\n## 171. Off the device-pixel grid at 125% — `Tabs`, `CardHeader`\n\n`src/components/Tabs/TabsList.tsx` · `TabsTrigger.tsx` · `src/components/Card/CardHeader.tsx`\n\nAt 125% display scaling one CSS pixel is 1.25 device pixels; only multiples of 4px land on whole device\npixels (4px = 5). Two parts put everything under them on a fraction — on a workspace's Overview the\nseparator under the card head stood at 393.25 device pixels (2026-11-03):\n\n- `Tabs`\n  - the list's bottom line was its own `border-b`, which the browser renders 0.8px there, while the\n    triggers stepped down onto it by a full 1px (`-mb-px`): the strip came out 39.8px, not 40 — a\n    quarter device pixel off for the whole page below it;\n  - the line is now a border on the list's `::before` — no height, out of the layout, painted before the\n    triggers so the active underline lies over it; the triggers lose `-mb-px`, the underline sits on\n    their own bottom edge (`after:bottom-0`). The strip is 40px; the look is unchanged.\n- `CardHeader`\n  - title to description was 6px (`space-y-1.5`) — off the 4px step, 7.5 device pixels: half a pixel\n    for everything under the head;\n  - now 4px (`space-y-1`), in the plain head and in the text column beside `actions`. Products' card\n    heads tighten by 2px.\n\n**patch** (`.changeset/device-pixel-grid.md`).\n\n## 188. New — `StatusMark` · **DRAFT**\n\n`src/components/StatusMark/index.tsx`\n\nThe glyph that says a state and nothing else: the triangle for a warning, the\ncross in a circle for an error, the tick for success, the ⓘ for a note.\n\n- Decoration, always — `aria-hidden`, no focus, no words of its own. The words\n  beside it carry the meaning: a status line's mark, the mark on a row.\n- `variant` — `neutral` (the note and the description) · `warning` · `error`.\n  `Alert`'s glyph tones, so a state reads the same in a banner and beside a\n  name.\n- `size` — `sm` 14px beside a 14px name, `md` 16px beside a 16px title.\n- `interactive` — inside a control that can be hovered or focused, which\n  today is `IconHint`'s button (`group/icon-hint`). Only the neutral note has\n  a step to take: a state's colour **is** the state, and brightening it would\n  read as the state changing.\n\nIt was the `tooltip`-less half of `IconHint` (§152), where one prop swapped the\nwhole render — a focusable `role=\"img\"` with it, an `aria-hidden` span without.\nTwo renders and two accessibility contracts behind one prop is the thing\n`COMPONENT-RULES.md` › \"One component, one job\" names, and `IconHint` now\nrenders this inside its button rather than repainting the glyph itself.\n\n- **From** — the review of the Connections work on a phone (2026-11-19).\n- **Used in** — LinkAI: `RowMark`, `StatusLine` (the two call sites that\n  passed no `tooltip`). Insightis: no call sites.\n\n**major** (`.changeset/icon-hint-split-and-status-mark.md`).\n\n---\n\n## 189. `Tooltip` — a long press where there is no hover · **DRAFT**\n\n`src/components/Tooltip/TooltipTrigger.tsx`, `TooltipRoot.tsx`, `context.ts`\n\nRadix's trigger ignores a `touch` pointer in its own `onPointerMove` by\ndesign, so every tooltip in this kit was silent on a phone — all fourteen\ncomponents that carry one. A LONG PRESS opens it; the tap is left alone.\n\n- **Why a press and not a tap.** The tap already belongs to the trigger: a\n  `Badge` that opens its log, a `Button` that runs its action, a row's ⋮ that\n  opens its menu. Opening on tap would race every one of them — which is why\n  a per-component fix could never reach the control tooltips on `Button`,\n  `IconButton` and `Switch`. A long press collides with nothing.\n- **The delays are MUI's** — 700ms to open (`enterTouchDelay`), 1500ms after\n  the finger lifts before it closes (`leaveTouchDelay`). Angular Material's\n  `matTooltip` settled on the same gesture (`touchGestures`,\n  `touchLongPressShowDelay`). We follow them rather than invent.\n- **`touchGestures`** — `auto` (default) or `off`, for a trigger whose own\n  long press means something: a text selection, a drag. Angular Material's\n  axis and its name.\n- **It lives in the primitive**, as it does in both of those systems, so a\n  consumer never writes a rule about the pointer. `Tooltip` keeps the open\n  state and shares it through `TooltipContext` (`null` under a bare Radix\n  root); a consumer's own `open` / `onOpenChange` still win.\n\nKnown limit, MUI's too: on iOS a long press over text can still start a\nselection. The native context menu is suppressed once our press has fired.\nDiscoverability is the trade — a press is quieter than a tap, and both of\nthose systems accept that.\n\n- **From** — the review of the Connections work on a phone (2026-11-19).\n- **Used in** — every tooltip in the kit: Badge, CodeBlock, DropdownMenu,\n  IconHint, ListSelectionBar, MetaRow, Modal, PinToggle, RowMenuButton,\n  SearchInput, Sidebar, StepProgress, StepSlider, TruncatedTitleTooltip.\n\n**minor** (`.changeset/tooltip-long-press.md`).\n\n---\n\n---\n\n## 190. `SelectableListCard` — the checkbox of a row whose content is two lines\n\n`src/components/SelectableListCard/index.tsx`\n\nFrom — LinkAI, both lists' cards below `md` (DBM-25175).\n\nIn `layout=\"row\"` the checkbox span is a flex child of the `Card`, and the\ncard's own `align-items` decides where it lands. On a one-line row that is\nthe title's line and it is right. On a card of two or three lines it is the\nmiddle of the whole card — measured on the connections card at 390px, the\ncheckbox's centre sat **16px below** the switch's and the name's. Passing\n`items-start` to move it up overshoots the other way: the checkbox is 18px\nand the title's line is 20px, so it then sat **3px above** them.\n\nA caller cannot reach that span, so the slot carries the line itself:\n`h-5 self-start`, and its own `items-center` lands the checkbox on the title\nwhatever the caller aligns the card to. The bridge LinkAI held meanwhile\n(`_shared/pages.css`, `.lk-card`) goes with this bundle.\n\nWhich line the checkbox belongs to is the caller’s to say, though: not\nevery multi-line row reads as a title over a description, and one that\nreads as a single block wants its checkbox in the middle. `checkboxAlign`\ncarries the two — `first-line`, the default and the measurement above, and\n`center`.\n\n- **The `menu` slot still centres against the whole card** (`-my-0.5\n  ms-auto`), so a multi-line row that wants its ⋮ level with the title still\n  has to draw its own — LinkAI does, which is a component being worked\n  around rather than used. Not fixed here; it is the same defect one slot\n  along.\n- **The 18px checkbox** is itself off the 4px step, and it is what makes\n  \"align to the top\" land 1px out even where the card is one line.\n\n## 191. `File` — the chip is a surface, and an interactive one says so\n\n`src/components/File/index.tsx`\n\n`upstream` has the component; these are the differences the audit of 2026-11-20 found, none of\nwhich had a number before.\n\n| | `upstream` | here |\n|---|---|---|\n| `default` fill | border only | `border-stroke bg-surface-card` — the kit's 1px `--border` on a `--card` surface |\n| inset | `px-2.5 py-1` | `px-2 py-1` — the kit's 4px / 8px |\n| a chip with `onClick` | no hover, no press | `hover:bg-state-hover`, and `State/Pressed` while held; skipped on error so the red tint is not overpainted |\n| focus | ring on the content area | ring on the whole chip, read through `:has([data-slot=file-action]:focus-visible)` — focus still lands on the content area |\n| the name | `weight=\"normal\"` | `weight=\"medium\"` |\n\nThe press follows the content area, which is the row's action: a press on retry or dismiss is not\na press on the row. The content area is a sibling of those controls rather than their parent — a\nbutton that contains buttons is unreachable for assistive technology — which is what `data-slot`\nis for here.\n\n`duration-fast` on the `tertiary` variant is held with the rest of the motion decision.\n\n**Taken from them (2026-11-20):** `dismissLabel` (AIINS-2282), the accessible name of the ✕,\ndefaulting to `Dismiss`.\n\n**Both products.** Additive; a chip with no `onClick` is unchanged.\n\n**patch.**\n\n## 192. `Badge` — a status that can explain itself, and the opt-out from the hairline\n\n`src/components/Badge/index.tsx`\n\nThe hairline itself is in `upstream` since AIINS-2282, identical to ours (§33, retired). Two parts\nof that entry did not go with it.\n\n```ts\ntooltip?: ReactNode\ntooltipSide?: 'top' | 'right' | 'bottom' | 'left'   // default 'top'\nflat?: boolean                                      // default false\n```\n\n- **`tooltip`.** A badge is a status, never a control: it carries no action, and a tooltip is the\n  only behaviour it is allowed to have. Without the prop every page that wanted one wrapped the\n  badge in a `<button>` — which gives it `role=\"button\"`, a press state and a promise of an action\n  it does not keep. Insightis's `DsLastCheck` is that wrapper. Here the trigger stays the badge,\n  made reachable with `tabIndex` and nothing else.\n- **`flat`** puts `border-transparent` back for a chip on a surface it already contrasts with —\n  the opt-out the kit's own `.badge-flat` has.\n\n**Both products.** Additive; every call site keeps the look it has.\n\n**minor.**\n\n## 193. `Typography` — `h3` has no size below `md`\n\n`src/components/Typography/index.tsx`\n\nA typo in `upstream`, found by the audit of 2026-11-20 and already fixed here:\n\n```diff\n- h3: 'texl-xl scroll-m-20 font-medium md:text-2xl',\n+ h3: 'scroll-m-20 font-medium text-xl md:text-2xl',\n```\n\n`texl-xl` compiles to nothing, so below `md` an `h3` falls back to the inherited size — on their\nStorybook it renders at the body's 14px while `h2` and `h4` step correctly. It is the failure\n`pnpm lint:tokens` is blind to, since the class names no token family.\n\nOne character, and the smallest thing we have to hand over.\n\n**patch.**\n\n## 194. New — `Foundations`, the token system as pages · **DRAFT**\n\n`src/components/Foundations/` — `index.tsx`, `tokens.ts`, five `*.stories.tsx`, four `*.md`\n\n`upstream` has no documentation of its own token system: a developer reaching for a colour reads\n`globals.css`. These are the pages that answer it — Primitives, Colors, Radius, Shadows, Spacing,\nMotion — and they are generated rather than written: `tokens.ts` reads the live custom properties\noff the document (`declarationsFor(':root')` / `'.dark'`), resolves aliases, groups the ramps and\nconverts triplets to hex, so a page cannot fall behind the tokens it documents.\n\nIt is reachable as `@devart/ui-react/Foundations` through the package's `./*` wildcard and ships in\n`dist`, so it is public surface, not a local scratch area — `SPEC.md` calling it \"docs-only\" says\nwhat it draws, not where it lives.\n\nIt goes over **after** the token sections it illustrates (§2, §5, §87, §40, §44, §48, §124, §125,\n§167, §174), and not before it is split: `index.tsx` holds thirteen components in one file, which\nis the first thing their review asks about. The split follows the pages it already has —\n`Colors.tsx`, `Radius.tsx`, `Shadows.tsx`, `Spacing.tsx`, `Motion.tsx`, `Primitives.tsx` over a\nshared `Grid` / `Group`, with `index.tsx` re-exporting.\n\n**Both products.** Documentation; nothing imports it.\n\n**minor.**\n";

  // HANDOFF.md?raw
  var HANDOFF_default = "# Handoff to the developers' GitLab\n\nWhat goes from this package to `devart/components/devart.ui.react` (`upstream`), in which merge\nrequest, in what state. Kept by the `ds-handoff` skill (`Design system/.claude/skills/ds-handoff`).\nA § leaves `DESIGN-SYSTEM-CHANGES.md` only when the developers have **released** it.\n\n## Header\n\n| | |\n|---|---|\n| design base | `upstream` **1.4.0 — `f69ebc9`** (since 2026-10-28, the 1.3/1.4 sync §154). Packages are cut from it; `git diff f69ebc9 master -- <files>` is what is still ahead |\n| developers now | `796efa7` (2026-11-18). Eight of her merge requests are in: `773d5d8` `6dc3101` `e88067c` on 2026-11-06, then `ee7bdb5` `27214a4` `69e3dd8` `32f88e9` `0d7843d` `4d72640` on 2026-11-16. Andrii refactored what he merged — `f7463ae` (`disabledProps`, `Switch` split), `e2c1511` (`DropdownMenu` context, `restoreFocus`), `85bfe0f` + `b6c5b36` (`Select` split) — and those are in the library since 2026-11-18, with `261513b` (no `size-control`) since 2026-11-19. Oleksii's own work rides on top: `LinkButton` `StatTile` `MetaRow` `FilterMenu` `AlertStack`, `Badge` and `File` fixes — **taken back on 2026-11-20**: `LinkButton`, `StatTile`, `MetaRow` and `AlertStack` are now byte-identical to theirs (component, stories and tests), `File` took their `dismissLabel`, and `globals.css` took `--link-underline`. `FilterMenu` is the one that did not come whole: they removed the hierarchy in a commit of its own, so ours keeps it — §148 |\n| open MRs (MCP, 2026-11-19) | **merged**: !25 !26 (2026-11-06), !29 !30 !31 !37 !38 !39 (2026-11-16). **Still open**: !40 (now targeting `master`) !41 !42 !44 !45 !46 !47 !48 — **every pipeline green**, no conflicts, no review comments, and **!44 approved** (Andrii, 2026-11-18 21:15). On 2026-11-18 he rebased the whole remaining chain onto master himself and re-applied her commits onto his own split; `git range-diff` says each of hers came through unchanged. His own commits on the open branches: `12f633a` `a36d358` (`design/search-input`), `2ef7fc5` (`design/text-area`), `261513b` (`design/controls`) |\n| stacked on her branches | `oleksiip` cut his own MRs on top of the chain: !27 StatTile → `design/switch`, !32 FilterMenu → `design/autocomplete`, !33 AlertStack → !32, !43 Badge hairline → `design/digits-only` (2026-11-10: the library's `--badge-border` and base `border-badge-border`, identical — the rest of `Badge` is still ahead). Those bases are merged now, and his work with them, so only `design/digits-only` and the links above it still carry anyone else's MR: **no force-push from `design/search-input` up** — changes go forward as new links of the chain |\n| differences left | **132** entries in the `DESIGN-SYSTEM-CHANGES` index (143 → 141 after !22 → 131 after the eight → 133 on 2026-11-19 → **132 on 2026-11-20**: five closed because the developers ported those components themselves — §33's hairline, §46, §47, §52, §149 — against four newly numbered, §191 `File`, §192 `Badge`, §193 `Typography` `h3`, §194 `Foundations`; §188 §189 §190 were written up on 2026-11-19 and never indexed). Index and sections agree both ways — `node scripts/sync-audit.mjs` asserts it. Goal: 0 |\n| route | **A** — branch `design/<KEY>-<slug>` pushed to their project, MR inside it, their CI runs (2026-10-28) |\n| her role in their project | **Developer** (access level 30) — confirmed by the MCP, 2026-10-28. Can push a branch; merging stays theirs |\n| `katerynak/design-system` a GitLab fork of theirs | not needed for route A |\n| AIINS task per MR | **none** — her decision, 2026-10-28; the § number is the reference |\n| grouping | **one MR per component** if it is not big (≈300 lines, ≈5 §s, or any 🔴 → split by §); one commit per § |\n| GitLab MCP | `Design system/.mcp.json` → built-in server, GitLab 19.5.1, **connected** 2026-10-28 as `katerynak`; all write tools denied — also those of the GitLab plugin (`mcp__plugin_gitlab_gitlab__*`) |\n| worktree | `Design system/_handoff` (own `core.autocrlf=input`) |\n| audit | `node scripts/sync-audit.mjs` — what moved in `upstream` since the last run, our own house-rule debt (theirs subtracted), comment weight, and whether the index and the sections still agree. State in `.sync-audit.json`; `--where` prints each violating line, `--full` rescans, `--write` stores the new baseline |\n\nStatus: `prepared` (local commit, gates green) → `published` (Draft MR) → `in review` → `merged` →\n`released vX.Y.Z` → § retired.\n\n## Packages\n\n| id | § | component | local branch | bump | gates | MR | status |\n|---|---|---|---|---|---|---|---|\n| H-001 | §99 §163 §164 (§57 dropped) | `Checkbox` | MR !22 | patch | CI ✓ | [!22](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/22) | **merged** 2026-11-03 as `1f6a577` (squash); Andrii put the marks back to Lucide 10px `stroke-[3.6]` — the library follows |\n| H-002 | radio — size, border, hover, disabled, error, focus offset, label | `RadioButton` | `handoff/radiobutton` @ `214a664` → `design/radiobutton` (from master `1f6a577`) | patch | all 6 ✓ · CI ✓ | [!25](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/25) | **merged** 2026-11-06 as `773d5d8`; closes no § — `RadioButton` already worked this way in `upstream` for §99 |\n| H-003 | switch — description, tooltip, disabled state, label | `Switch` (+ `Tooltip/ControlTooltip`) | `handoff/switch` @ `74d59bc` → `design/switch` (on `design/radiobutton`) | minor | all 6 ✓ · CI ✓ | [!26](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/26) → `design/radiobutton` | **merged** 2026-11-06 as `6dc3101` + `e88067c`; closes §160 and §151's and §99's `Switch`. Andrii then split the component — `f7463ae`, in the library 2026-11-18 |\n| H-004 | field padding 8/12/12/12/12, icon 14/16/16/20/20, gaps, text sm 14 · lg/xl 16, unit 12, label body, error 12, disabled cursor, xs ✕ 14, block addons, Autocomplete text and chips on the field's text line | `Input` + `InputGroup` (+ `Autocomplete` insets, `SearchInput` test) | `handoff/input` @ `41034d9` → `design/input` (on `design/switch` `74d59bc`) | minor | all 6 ✓ · CI ✓ | [!29](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/29) → `design/switch` | **merged** 2026-11-16 as `ee7bdb5`; closes §102 §169 §173 and §9's `InputGroup`. Still ahead: §7's `[&>svg]` and §45's docked-control inks |\n| H-005 | thin scrollbar as a base rule in the preset (+ `scrollbar-thin`, `scrollbar-none`) | preset | `handoff/scroll` @ `39b1b54` → `design/scroll` (on `design/input`) | minor | all 6 ✓ · CI ✓ | [!30](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/30) → `design/input` | **merged** 2026-11-16 as `27214a4`; closes §98 — the preset's base rule gives `Table` and `ModalBody` the thin bar without the class. 🔴 apps/web must drop its own global scrollbar rule |\n| H-006 | Autocomplete: real ✕/chevron buttons + labels, chips on the 4px scale, list (padding, check, hover clears, 7.5 rows, one-row empty), multi stays open, endAddon, label; addon icon grey; placeholder ellipsis | `Autocomplete` (+ hook, `InputGroupAddon`, `InputGroupInput`) | `handoff/autocomplete` @ `8b107e9` → `design/autocomplete` (on `design/scroll`) | minor | all 6 ✓ · CI ✓ | [!31](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/31) → `design/scroll` | **merged** 2026-11-16 as `69e3dd8`; closes §3 §62 and §106. Not now: chip hairline border (Badge MR) |\n| H-007 | menu focus: back to the trigger as before, the ring only after the keyboard; no ring on rows | `DropdownMenu` (+ `lib/focus-modality`, `trigger-ref`) | `handoff/dropdown-menu` @ `4e84f67` → `design/dropdown-menu` (on `design/autocomplete` `ecdce0e`) | patch | all 6 ✓ | [!37](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/37) → `design/autocomplete` | **merged** 2026-11-16 as `32f88e9`; closes §74's menu half — the tooltip half waits on !47. Andrii then moved the trigger ref into `context.ts` and added `restoreFocus` (`e2c1511`), in the library 2026-11-18 |\n| H-008 | new Select on Radix Select (+ `@radix-ui/react-select` ^2.3.7, shares the menu's internals); `InputGroup` `required` — asterisk + `aria-required`, off by default; disabled guard for any control; the menu list surface as a recipe | `Select` (+ `InputGroup`, `DropdownMenuContent`) | `handoff/select` @ `1117392` → `design/select` (on `design/dropdown-menu`) | minor | all 6 ✓ | [!38](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/38) → `design/dropdown-menu` | **merged** 2026-11-16 as `0d7843d`; closes §175. Andrii then split the component and kept the error border while the list is open (`85bfe0f`, `b6c5b36`), in the library 2026-11-18; her copy differs by `usePortalContainer` and the empty option id (!45) |\n| H-009 | the eye follows the field size (14/16/16/20/20, `passwordToggleVariants` — not the `IconButton` ladder) and shows the action, as the Insightis sign-in does | `PasswordInput` | `handoff/password-input` @ `d9ac00b` → `design/password-input` (on `design/select`) | minor (recipe exported) | all 6 ✓ | [!39](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/39) → `design/select` | **merged** 2026-11-16 as `4d72640`; closes no § — the eye has none of its own. Their play test was already carried back |\n| H-010 | §145: the matches under the field while typing (`results`, `onSelect`, `getResultLabel`, `renderResult`, `emptyText`; 7.5 rows, the cap fixed to apply once the portal mounts); passes on `variant`, `aria-label`, `autoFocus`. Dropped 2026-11-10 as unused: `disabled`, `id`, `style`, `onKeyDown`, `maxVisibleResults`, `enterKeyHint`; browser suggestions off only with the list | `SearchInput` | `handoff/search-input` @ `4269b8c` → `design/search-input` (on `design/password-input`) | minor | all 6 ✓ | [!40](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/40) → `design/password-input` | published 2026-11-10; behaviour checked by the With Results story scenario — her unit tests stay in the library (they need `setup.ts` stubs the package has not got). Andrii refactored on the branch (`f096000`, `8a8490a`) and it is **not** in the library — see *Found while preparing* |\n| H-011 | padding / text / label / error as `Input`; `required` (asterisk + native required, off by default) as `InputGroup`'s; `hintText` (§41/§70) beside the counter, the error replaces it; disabled keeps pointer events, no hover border; counter row 16px. `wrapperClassName` dropped 2026-11-10 as unused | `TextArea` | `handoff/text-area` @ `281bf84` → `design/text-area` (on `design/search-input`) | minor | all 6 ✓ | [!41](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/41) → `design/search-input` | published 2026-11-10 with push options (MCP needed re-auth — squash left at the project default); the hint and counter use the package's `Typography` API (`variant=\"span\"` + `weight=\"normal\"` + `text-xs`), the library keeps `textStyle=\"body12\"` until `Typography` is handed over — same pixels |\n| H-012 | §172 `digitsOnly` on `Input` / `InputGroupInput` (typed, pasted, dropped letters never land; Ctrl+Z kept through `execCommand`; numeric keypad); `InputGroupInput` takes `InputProps` | `Input` (+ `InputGroupInput`) | `handoff/digits-only` @ `846b06a` → `design/digits-only` (on `design/text-area`) | minor | all 6 ✓ | [!42](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/42) → `design/text-area` | published 2026-11-10; the hidden browser ✕ on `Input` kept out on purpose (see *Found while preparing*) |\n| H-013 | `focusRing` (`lib/utils`, from `./cn`) shared by the three controls; `Switch` takes the package's `withDescription` only beside the label (the `sm` track no longer drops 2px with the label above / below); her stories carried over. The preset's `size-control` was dropped by Andrii (`261513b`) — see *Found while preparing* | `Checkbox`, `RadioButton`, `Switch` | `handoff/controls` @ `9c29927` → `design/controls` (on `design/digits-only`) | minor | all 6 ✓ | [!44](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/44) → `design/digits-only` | **approved** by Andrii 2026-11-18, CI ✓ on `261513b`; `duration-fast` held back on her word (see *Found while preparing*) — the only difference left in these three files. His re-application put her `Switch` change on his split, with a `besideLabel` prop; the library is byte-identical to `2ff5f0f` + `261513b` apart from `duration-fast` |\n| H-014 | an option with an empty `id` (a default such as \"Automatic\") shows and can be picked: Radix keeps `''` for \"nothing picked\", so the option goes by `__empty__` inside; with `name`, a hidden input submits the option's own `id` | `Select` | `handoff/select-empty-id` @ `93796a3` → `design/select-empty-id` (on `design/controls`) | patch | all 6 ✓ | [!45](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/45) → `design/controls` | published 2026-11-10, squash off; found through LinkAI (PostgreSQL → Protocol stayed empty); the library keeps the Empty Id Option story |\n| H-015 | §40 §44 size ladder; §66 no hover when disabled; §80 §165 §181 one disabled look (`secondaryDisabled`, `ghostDisabled`); §151 `tooltip`; §179 `primaryTertiary` label tokens; §180 one wash a family (red 8/12 light, 12/15 dark); §182 xs radius; §183 icon beside the label; `asChild` (threw on every render), no empty label box; `ghost` removed; `IconButton` `aria-label` required, ladder 14/14/16/16/20/20 | `Button` + `IconButton` (+ `lib/utils`, tokens, `ModalContent` / `SidebarMobileTrigger` label types, `ghost` call sites in Sidebar) | `handoff/button` @ `0fd93ce` → `design/button` (on `design/select-empty-id`) | **major** | all 6 ✓ (unit 390, storybook 362) · CI ✓ | [!46](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/46) → `design/select-empty-id` | published 2026-11-12 (ready, squash off). Held in the library: `duration-fast`, `glyphStroke` (§92), `IconButton` `3xs` (with Tree), `data-variant` (read by the library's `TableActionsCell` — goes with Table; the 2026-11-10 sheet wrongly said nobody reads it). 4b done: Button, IconButton, utils, ControlTooltip and focusRing comments are the package's |\n| H-016 | §13 the gap (tip 4, bubble 8, arrow 8×4); §63 delay 300 by default (Modal's 200 and Sidebar's 500 dropped); §177 above a dialog (`z-[110]`, the close button's per-call one dropped); focus opens it only after the keyboard (from H-007); `focusRing` on a bare trigger; §184 a long tip wraps at 288px | `Tooltip` (+ `ModalContent`, `SidebarProvider`) | `handoff/tooltip` @ `c8ad5c5` → `design/tooltip` (on `design/button`) | minor | all 6 ✓ (unit 392, storybook 363) | [!47](https://git.devart.com/devart/components/devart.ui.react/-/merge_requests/47) → `design/button` | published 2026-11-13 (ready, squash off). Held: `portalContainer` (needs `PortalContainer`, not in the package). The test stubs jsdom's missing `ResizeObserver` and top layer in its own file, as their tests do; the library keeps both in its setup too |\n\n## Waves — how the rest breaks down (2026-10-27)\n\nIndex of `DESIGN-SYSTEM-CHANGES.md`: 127 entries — 85 signed off, 41 draft, 1 open.\n\n0. **Take theirs back first** — done, §154 (committed 2026-10-28). Where they had moved: 1.3.0–1.4.0 added `ChoiceGroup` /\n   `ChoiceCard` (AIINS-2125, AIINS-2143), `GuideCard` (AIINS-2127), `StatusView` sizes (AIINS-2143),\n   `ScrollShadow` tab stop (AIINS-2137). Our §118 (ChoiceCard, draft), §120 (Coachmark — vs their\n   GuideCard), §51 §104 §107 (StatusView) are to be compared with theirs before anything is sent.\n1. **Foundations** — one MR each, each 🔴 (tokens are a two-repository change: `apps/web/src/index.css`):\n   tokens and colour §2 §5 §6, §48's `--code-*` · sizes and glyphs §40 §44 §92 · across components §98 §99 · plus\n   the shared pieces the component diffs reach for (`focusRing`, `duration-fast`, …).\n2. **Standalone fixes** on components they have, needing nothing from wave 1 — like §57. Quick, patch.\n3. **Fixes that need wave 1** — after it is merged.\n4. **New components** (17 not in theirs, all draft today) — after sign-off, and after wave 1.\n5. **Not for them**: §19 §20 §84 (build and tooling), §97 §146 (sync records), `ds-bundle/`,\n   `changes/`, palettes, `.design-sync/`. Waiting on a component they do not have: CodeBlock §48,\n   ConnectorLogo §16, MetaRow §52.\n\n## Found while preparing — decide before the wave that touches it\n\n- **`size-control` is gone, on Andrii's call (2026-11-18, `261513b` on !44).** He took the token\n  out of the preset and wrote `size-[18px]` into `Checkbox` and `RadioButton`, and trimmed the\n  changeset line that named it. Carried into the library 2026-11-19: their code wins, and it is a\n  visual no-op — both controls still measure 18px. What is lost is the name: the token existed\n  because the two disagreed (18 vs 20) and one of them was an arbitrary value, so the 18 is an\n  arbitrary value again, now written twice. He approved !44 straight after, so this is the shape\n  that merges. Hers to re-open if she wants the name back — a token MR of its own, not a fix over\n  his commit.\n- **`besideLabel` is public in their `Switch` (2026-11-18, `2ff5f0f`).** `SwitchBaseProps` omits\n  only `descriptionId` and `tooltip`, so the internal prop reaches `SwitchProps`, and `Switch`\n  spreads `{...controlProps}` **after** it — a consumer passing `besideLabel` overrides the\n  computed value and defeats the fix. One word (`'besideLabel' |` in the `Omit`) closes it. Not\n  changed here: the library matches his file byte for byte, and this is worth a word to him\n  rather than a silent divergence.\n\n- **`SearchInput` — their split is held (2026-11-19, her word: «поки не чіпати»).** On `design/search-input`\n  (`12f633a`, `a36d358` after his 2026-11-18 rebase) Andrii cut the component in two: `SearchInput` no longer takes `results` at\n  all, and the list under the field becomes a public `SearchInputWithResults`, with\n  `SearchResultsList.tsx` and `use-search-results.ts` beside it and `SearchInputProps` no longer\n  generic. §145 gave `results` to `SearchInput` itself, and LinkAI calls it that way in\n  `linkai-kit.stories.js` and `_shared/workspaces.js` — under their shape the list there goes blank\n  until both are rewritten. **Half of it is carried, which this entry used to deny:** the library\n  has `SearchInputWithResults.tsx` as its own file since `1d00a57` (2026-11-12) and `SearchInput`\n  delegates to it when `results` is given, so only the public shape still differs — theirs drops\n  `results` from `SearchInput` entirely. Their `SearchResultBase` typing came over on 2026-11-20,\n  which removed the two `as { … }` casts their review named. Decide with !40: if it merges as it\n  stands, the public shape moves then, and the two LinkAI call sites move with it.\n  `Issues/oleksiip/AIINS-2343` (\"extended search input\") is already stacked on the whole open\n  chain, so this is theirs to extend either way.\n\n- **Their `StatTile` carries two classes the `Card` MR has to remove (2026-11-20).** It sets\n  `bg-surface-card hover:border-stroke` on the tile, which is them neutralising, by hand and in one\n  component, the two things §4 and §60 change about `Card outline` — their outline card has no fill\n  and tints its border on hover, ours is filled and does not. The library took their file verbatim,\n  so the two classes are a no-op here and the components stay byte-identical. When §4 goes over,\n  those two classes come out of `StatTile` in the same MR, or they stay as dead weight that\n  contradicts the card under them.\n\n- **`scrollbar-thin` on `Table` and `ModalBody` is now spare (2026-11-18).** !30 put the thin bar\n  in the preset as a base rule on `*`, so both surfaces draw it in `upstream` without the class —\n  which is why §98 is retired. The library still writes the class on `TableContainer` and\n  `ModalBody`; it is the same declarations, one layer higher, so nothing changes either way. Drop\n  it with the next MR that touches those two files, or leave it as insurance against an app that\n  overrides the base rule — her call.\n\n- **`Toggle` / `ToggleGroup` → a batch MR of small fixes, later (2026-11-12, her word).** The variant names stay theirs (`outline`, `stroke`, `ghost`, `badge`) — a toggle is not a button, so no renaming to the button scale. What differs is small: a disabled toggle lights up under the pointer in theirs (`enabled:` hover guards here, as §66 for buttons), and theirs `disabled:pointer-events-none` hides the not-allowed cursor and any tooltip; `ToggleGroupItem` takes `focusRing` here (check it moves nothing); `duration-fast` is held as for the controls; `/6` vs `/[0.06]` is syntax — keep theirs.\n- **Glyph stroke §92 is not handed over (2026-11-12, her word: \"товщини лінії іконок давай не рухати\").** The library keeps `glyphStroke` (`[&_svg]:stroke-2`); the package keeps the glyphs' own weight. Not offered as an MR again unless she brings it back.\n- **Controls' motion (2026-11-10, her word: \"duration поки не треба\").** The library animates `Checkbox`, `RadioButton` and `Switch` at `duration-fast` (`--motion-fast`, 120ms); the package keeps `duration-150` (Checkbox, RadioButton) and `duration-100` (Switch). Held out of !44; hand over when she decides on motion as a whole.\n- **`Input` hides the browser's own ✕ in `type=\"search\"` (2026-11-10).** In the library since 2026-09-20 (`[&::-webkit-search-cancel-button]:hidden` on the base `Input`); the package hides it only inside `SearchInput`. Not dead code: Insightis builds two search fields by hand — `InputGroupInput type=\"search\"` with its own clear button (ChatLibrary, DsCatalog) — and without the rule Chrome draws a second ✕ there. Kept out of the digitsOnly MR on purpose (unrelated, it only shares the file); hand over with the next `Input` / `SearchInput` change.\n\n- **`--ink-inactive` reads blue (2026-11-05, her call: recolour later, from an existing token).** It is `--slate-450` #7C8CA2 — the lightest step of the slate text ladder, so the hue shows most (placeholders, disabled text, decorative icons: 216 uses in 39 files). Candidates already in the ramps: `--grey-500` #6B7280 (neutral, 4.8:1 on white, close to `--ink-secondary` in weight), `--grey-400` #9CA3AF (neutral, 2.5:1 — too faint for text). Decide on a side-by-side of the form story (`Review/Form fields`), both themes; a token change, so the developers' `apps/web/src/index.css` too.\n- **`Checkbox` exports.** Ours exports `Checkbox, checkboxVariants`; theirs also\n  `checkboxContainerVariants, checkboxIndicatorVariants`. Copying our file would remove two exports\n  — a major for them. Keep theirs.\n\n---\n\n## H-001 — `Checkbox`: §57 §99 §163 §164\n\nCut from `upstream/master` `f69ebc9`, one commit `4698ac9`, 5 files (+128 −25). Not pushed.\n\n- **Gates:** format-and-lint ✓ · lint:tokens ✓ · check-types ✓ · test:unit ✓ 363 (snapshot: Checkbox\n  lines only) · test:storybook ✓ 343 · check-changeset ✓ patch.\n- **Checked live:** the tooltip opens over the disabled box itself; no hover fill; cursor not-allowed.\n- **§57 reworked on her review (2026-10-28):** marks looked off-centre and the bar long → redrawn in a 10px grid,\n  bar 8px; approved in the design library first («на локал виглядає ок»), then ported.\n- **Her answers (2026-10-28):** rows 1–5 of the change sheet approved; rows 6–8 wait for foundations;\n  exports and `Checkbox.md` stay out.\n\n**MR title:** `[UI-Kit]: Checkbox — позначки по центру й однієї товщини, вимкнений стан і підпис, як у дизайні`\n\n**MR description:**\n\n> ## Що змінилось\n>\n> | § | Зміна | Було → стало |\n> |---|---|---|\n> | §57 | Галочка й риска однієї товщини, по центру | Lucide 14px → власна сітка 10px, stroke 1.5; 4px з боків — цілий піксель при 100–200%; риска 8px, по 5px до країв |\n> | §99 | Вимкнений не підсвічується під курсором | `hover:` → `enabled:hover:`; прибрано `disabled:pointer-events-none` — видно курсор not-allowed |\n> | §99 | На вимкнений можна повісити підказку | нова сторі `DisabledWithTooltip` (підказка на обгортці: `TooltipTrigger asChild` перетер би `data-state`) |\n> | §163 | Позначка вимкненого блідне разом із квадратиком | була `text-ink-inactive` — майже не видно → `content-on-solid` + `opacity-disabled` |\n> | §164 | Підпис | `text-ink-body`; підписи `CheckboxGroup` — `font-medium text-sm`, як в одиночного |\n>\n> Пропи, експорти й `data-*` без змін. Bump: **patch**.\n>\n> **Дизайн:** https://katerynakl404.github.io/devart.ui/?path=/story/components-checkbox--states\n>\n> **Перевірки (локально, на `master` f69ebc9):** format-and-lint ✓ · lint:tokens ✓ · check-types ✓ ·\n> test:unit ✓ (знімок — лише рядки Checkbox) · test:storybook ✓ · check-changeset ✓\n>\n> 🔴 До застосунку дійде після релізу пакета й оновлення версії в `apps/web`.\n>\n> **Не входить** (окремими MR пізніше): анімація через токен `duration-fast`, розмір через `size-control`,\n> фокус через спільний `focusRing` — чекають спільних основ.\n";

  // changes/journal.ts
  var import_meta = {};
  function parseEntry(raw) {
    const match = /^§(\d+[a-z]?)\s+(.*)$/.exec(raw.trim());
    if (!match) return null;
    const [, n = "", rest = ""] = match;
    const isNew = /\*\*new\*\*/.test(rest);
    const isDraft = /·\s*draft\s*$/.test(rest);
    const isOpen = /·\s*open\s*$/.test(rest);
    const text = rest.replace(/\*\*new\*\*\s*—\s*/, "").replace(/\s*·\s*(draft|open)\s*$/, "").replace(/\*\*/g, "");
    return { n, text, isNew, ofNewComponent: false, isDraft, isOpen };
  }
  function parseJournal(source) {
    const newSections = new Set(
      [...source.matchAll(/^## (\d+[a-z]?)\. New — /gm)].map((m) => m[1])
    );
    const lines = source.split(/\r?\n/);
    const start = lines.findIndex((line) => line.startsWith("## What changed"));
    if (start < 0) return [];
    const groups = [];
    for (const line of lines.slice(start + 1)) {
      if (line.startsWith("## ") || line.startsWith("---")) break;
      const row = /^\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/.exec(line);
      if (!row) continue;
      const [, name = "", changes = ""] = row;
      if (name === "Component" || /^-+$/.test(name)) continue;
      const entries = changes.split("<br>").map(parseEntry).filter((entry) => entry !== null);
      for (const entry of entries) {
        if (newSections.has(entry.n)) entry.isNew = true;
      }
      const first = entries.reduce(
        (low, e) => low && Number.parseInt(low.n, 10) < Number.parseInt(e.n, 10) ? low : e,
        void 0
      );
      if (first?.isNew) {
        for (const entry of entries) entry.ofNewComponent = !entry.isNew;
      }
      groups.push({ name: name.replace(/`/g, ""), entries });
    }
    return groups;
  }
  function parseHandoff(source) {
    const byNumber = /* @__PURE__ */ new Map();
    const lines = source.split(/\r?\n/);
    const start = lines.findIndex((line) => line.startsWith("## Packages"));
    if (start < 0) return byNumber;
    for (const line of lines.slice(start + 1)) {
      if (line.startsWith("## ")) break;
      const cells = line.split("|").map((cell) => cell.trim());
      const [, id = "", numbers = ""] = cells;
      if (!/^H-\d+$/.test(id)) continue;
      const pkg = { id, status: cells.at(-2) ?? "" };
      for (const [, n = ""] of numbers.matchAll(/§(\d+[a-z]?)/g)) {
        byNumber.set(n, pkg);
      }
    }
    return byNumber;
  }
  function sanitize(part) {
    return part.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function parsePages(sources) {
    const pages = [];
    for (const source of Object.values(sources)) {
      const title = /title: '([^']+)'/.exec(source)?.[1];
      if (!title) continue;
      const numbers = [
        ...source.matchAll(/\bn=\{(\d+)\}/g),
        ...source.matchAll(/\bn="(\d+[a-z]?)\b/g)
      ].map((m) => m[1] ?? "");
      const noPanel = [
        ...source.matchAll(
          /<NoPanel\b[\s\S]*?section=(?:\{(\d+)\}|"(\d+[a-z]?)")/g
        )
      ].map((m) => m[1] ?? m[2] ?? "");
      pages.push({
        title,
        group: /group="([^"]+)"/.exec(source)?.[1],
        numbers,
        noPanel,
        storyId: `${sanitize(title)}--page`
      });
    }
    return pages;
  }
  var JOURNAL = parseJournal(DESIGN_SYSTEM_CHANGES_default);
  var HANDOFF = parseHandoff(HANDOFF_default);
  var PAGES = parsePages(
    import_meta.glob("./**/*.stories.tsx", {
      query: "?raw",
      import: "default",
      eager: true
    })
  );
  var DRAWN = new Map(
    PAGES.flatMap((page) => page.numbers.map((n) => [n, page]))
  );
  var NO_PANEL = new Map(
    PAGES.flatMap((page) => page.noPanel.map((n) => [n, page]))
  );

  // changes/Harness.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var STATE_LABEL = {
    "docs-only": "Documentation only",
    proposed: "Proposed — not made yet",
    "not-a-library-change": "Not a library change",
    draft: "Draft"
  };
  var STATE_CLASS = {
    "docs-only": "border-stroke bg-surface-chips text-ink-secondary",
    proposed: "border-brand-primary/40 bg-brand-primary/10 text-ink-body",
    "not-a-library-change": "border-fb-red/40 bg-fb-red/10 text-ink-body",
    /* Attention, not brand: a draft is something to come back to, and the
       attention tokens are what this system already uses for "needs a decision"
       (the Workspaces warning, the unconfigured badge). */
    draft: "border-fb-attention/40 bg-fb-attention/10 text-ink-body"
  };
  function Eyebrow({
    children,
    className
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        className: cn(
          "font-medium text-xxs uppercase leading-4 tracking-caps",
          className
        ),
        children
      }
    );
  }
  function Code({ children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { className: "rounded bg-surface-chips px-1 py-0.5 font-mono text-ink-body text-xxs", children });
  }
  function JournalText({ text }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text.split("`").map(
      (part, i) => i % 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: part }, part + String(i)) : part
    ) });
  }
  function HandoffChip({ n }) {
    const pkg = HANDOFF.get(n);
    if (!pkg) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        className: "rounded-full border border-brand-primary/40 bg-brand-primary/10 px-2 py-0.5 text-ink-body text-xxs",
        title: `Handed to the developers in ${pkg.id}: ${pkg.status}`,
        children: pkg.id
      }
    );
  }
  function Panel({
    side,
    note,
    children
  }) {
    const isBefore = side === "before";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: cn(
          "flex min-w-0 flex-col overflow-hidden rounded-lg border",
          isBefore ? "border-fb-red/35" : "border-fb-green/35"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: cn(
                "flex items-center gap-2 border-b px-3 py-1.5",
                isBefore ? "border-fb-red/25 bg-fb-red/10" : "border-fb-green/25 bg-fb-green/10"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { className: isBefore ? "text-fb-red" : "text-fb-green", children: isBefore ? "Before" : "After" }),
                note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "min-w-0 truncate text-ink-secondary text-xxs", children: note }) : null
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-1 items-start bg-surface-card p-4", children })
        ]
      }
    );
  }
  function ChangeCase({
    n,
    title,
    files,
    state,
    why,
    beforeSource,
    before,
    after,
    beforeNote,
    afterNote,
    footnote
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "flex flex-col gap-3 border-stroke border-b pb-8 last:border-b-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-semibold text-ink-inactive text-sm tabular-nums", children: typeof n === "number" || /^\d/.test(String(n)) ? `§${n}` : n }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "font-semibold text-base text-ink-primary", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandoffChip, { n: String(n) }),
          state ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: cn(
                "rounded-full border px-2 py-0.5 text-xxs",
                STATE_CLASS[state]
              ),
              children: STATE_LABEL[state]
            }
          ) : null
        ] }),
        files?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-x-3 gap-y-1", children: files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: file }, file)) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "max-w-[72ch] text-ink-body text-sm leading-5", children: why })
      ] }),
      before ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { note: beforeNote, side: "before", children: before }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { note: afterNote, side: "after", children: after })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { note: afterNote, side: "after", children: after }),
      beforeSource ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "max-w-[72ch] text-ink-secondary text-xs leading-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-ink-body", children: "Before is: " }),
        beforeSource
      ] }) : null,
      footnote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "max-w-[72ch] text-ink-secondary text-xs leading-5", children: footnote }) : null
    ] });
  }
  function EntryLine({ entry }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex gap-2 text-ink-body text-sm leading-5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "w-10 shrink-0 text-ink-inactive tabular-nums", children: [
        "§",
        entry.n
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "min-w-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalText, { text: entry.text }),
        entry.isDraft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-ink-secondary", children: " · draft" }) : null,
        entry.isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-ink-secondary", children: " · open" }) : null
      ] })
    ] });
  }
  function GroupGaps({ group }) {
    const entries = JOURNAL.find((g5) => g5.name === group)?.entries ?? [];
    const missing = entries.filter(
      (e) => !(e.isNew || e.ofNewComponent || DRAWN.has(e.n) || NO_PANEL.has(e.n))
    );
    const isNew = entries.filter((e) => e.isNew || e.ofNewComponent);
    if (!(missing.length || isNew.length)) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "flex flex-col gap-4 rounded-lg border border-stroke border-dashed p-4", children: [
      missing.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { className: "text-ink-secondary", children: "No panel yet" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "flex flex-col gap-1", children: missing.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryLine, { entry }, entry.n)) })
      ] }) : null,
      isNew.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { className: "text-ink-secondary", children: "New here, not in the developers' library — reviewed in its own story under Components" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "flex flex-col gap-1", children: isNew.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryLine, { entry }, entry.n)) })
      ] }) : null
    ] });
  }
  function GroupCount({ group }) {
    const entries = JOURNAL.find((g5) => g5.name === group)?.entries;
    if (!entries) return null;
    const changes = entries.filter(
      (e) => !(e.isNew || e.ofNewComponent || NO_PANEL.has(e.n))
    );
    const drawn = changes.filter((e) => DRAWN.has(e.n));
    const noBefore = entries.filter((e) => NO_PANEL.has(e.n)).length;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-ink-secondary text-sm tabular-nums", children: [
      drawn.length,
      " of ",
      changes.length,
      " ",
      changes.length === 1 ? "change" : "changes",
      " drawn",
      noBefore ? ` · ${noBefore} with no Before to draw` : ""
    ] });
  }
  function ChangePage({
    title,
    group,
    intro,
    children
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex max-w-[1100px] flex-col gap-8 p-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { className: "text-ink-inactive", children: "Proposed changes" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "font-semibold text-ink-primary text-xl", children: title }),
        group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupCount, { group }) : null,
        intro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "max-w-[72ch] text-ink-body text-sm leading-5", children: intro }) : null
      ] }),
      children,
      group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupGaps, { group }) : null
    ] });
  }
  function TryIt({
    children,
    action
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-2", children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { className: "text-ink-inactive", children: action })
    ] });
  }

  // changes/components/ListPageLayout.stories.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var meta = {
    title: "Proposed changes/Components/ListPageLayout",
    parameters: {
      layout: "padded",
      controls: { disable: true }
    }
  };
  var ListPageLayout_stories_default = meta;
  function Rows() {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex flex-col gap-2", children: Array.from({ length: 24 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        className: "flex h-11 shrink-0 items-center rounded-lg border border-stroke bg-surface-card px-3 text-ink-body text-sm",
        children: [
          "connection-",
          i + 1
        ]
      },
      `row-${i + 1}`
    )) });
  }
  function header({ condensed }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ds_PageHeader_exports.PageHeader,
      {
        actions: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Button_exports.Button, { size: "sm", variant: "primary", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, {}),
          "New"
        ] }),
        condensed,
        title: "Connections"
      }
    );
  }
  function Window({ condensing }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "h-[360px] w-full overflow-hidden rounded-lg border border-stroke bg-surface-page", children: condensing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_ListPageLayout_exports.ListPageLayout, { condenseAfter: 60, stickyHeader: header, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Rows, {}) }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_ListPageLayout_exports.ListPageLayout, { stickyHeader: header({ condensed: false }), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Rows, {}) }) });
  }
  var Page = {
    name: "ListPageLayout",
    globals: { viewport: { value: "tablet", isRotated: false } },
    render: () => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ChangePage,
      {
        group: "ListPageLayout",
        intro: "Opens at the tablet viewport: the header is sticky, and so can condense, only below lg (1024px). From lg up it scrolls away with the page.",
        title: "ListPageLayout",
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ChangeCase,
          {
            after: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TryIt, { action: "Scroll past 60px — the inset tightens and the title steps down", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Window, { condensing: true }) }),
            afterNote: "condenseAfter={60} · header as ({ condensed }) => …",
            before: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TryIt, { action: "Scroll the list — the header keeps its full height", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Window, {}) }),
            beforeNote: "the header as a node — it sticks and never changes",
            beforeSource: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              "the live layout with ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "condenseAfter" }),
              " omitted and the header passed as a node, which renders as the published layout: the same sticky header at the same height however far the list goes."
            ] }),
            files: [
              "src/components/ListPageLayout/index.tsx",
              "src/components/ListPageLayout/use-list-header-height.ts"
            ],
            footnote: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              "Condensed, the header's inset tightens to 6px over",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "--motion-slow" }),
              " and a render-function",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "stickyHeader" }),
              " receives ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "condensed" }),
              " to hand to",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "PageHeader" }),
              " — no context, no ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "cloneElement" }),
              ". The kit's ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "scrollTop > 60" }),
              " flickered when parked just past the line: the header shrank, scroll anchoring took the difference off ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "scrollTop" }),
              ", and it grew back, every frame. The layout adds back the height the header lost, so the test holds. ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "bodyClassName" }),
              " reaches the body's own",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "pb-3" }),
              " and ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "gap-3" }),
              ", which",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Code, { children: "contentClassName" }),
              " cannot — its padding stacks on the body's."
            ] }),
            n: 133,
            title: "The header condenses, and the body takes a class",
            why: "Below lg the header stayed on screen at full height however far the list scrolled, and the layout — the one part that owns the scroller — could not say when to condense. Insightis' kit carried its own copy to do it."
          }
        )
      }
    )
  };

  // src/components/ListPageLayout/ListPageLayout.stories.tsx
  var ListPageLayout_stories_exports2 = {};
  __export(ListPageLayout_stories_exports2, {
    BodyInset: () => BodyInset,
    CondensingHeader: () => CondensingHeader,
    CondensingHeaderTablet: () => CondensingHeaderTablet,
    CondensingHeaderWideScreen: () => CondensingHeaderWideScreen,
    NarrowColumn: () => NarrowColumn,
    ShortContent: () => ShortContent,
    WithStickyHeader: () => WithStickyHeader,
    WithoutHeader: () => WithoutHeader,
    default: () => ListPageLayout_stories_default2
  });
  init_define_import_meta_env();
  var import_test = __toESM(require_test());

  // ds-shim:ds:Typography
  var ds_Typography_exports = {};
  __export(ds_Typography_exports, {
    default: () => ds_Typography_default
  });
  init_define_import_meta_env();
  __reExport(ds_Typography_exports, __toESM(require_ds_raw()));
  var g4 = window.DevartUI;
  var ds_Typography_default = g4["Typography"] !== void 0 ? g4["Typography"] : g4;

  // src/components/ListPageLayout/ListPageLayout.stories.tsx
  var import_jsx_runtime3 = __toESM(require_react_shim());
  var Rows2 = ({ count = 15 }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex flex-col gap-2", children: Array.from({ length: count }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      className: "flex h-11 items-center rounded-lg border border-stroke bg-surface-card px-3",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ds_Typography_exports.Typography, { variant: "span", textColor: "body", children: [
        "Row ",
        index + 1
      ] })
    },
    `row-${index + 1}`
  )) });
  var meta2 = {
    title: "Components/ListPageLayout",
    component: ds_ListPageLayout_exports.ListPageLayout,
    tags: ["autodocs"],
    argTypes: {
      children: { control: false },
      stickyHeader: { control: false },
      onScrollElementChange: { control: false }
    },
    parameters: { layout: "fullscreen" },
    // The layout owns its own scroll container, so the canvas must be exactly as
    // tall as the viewport — a taller box would scroll the preview frame as well
    // and show a second scrollbar. Docs renders stories inline, where the page
    // itself scrolls, so there a fixed box is what's wanted.
    decorators: [
      (Story, { viewMode }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: cn(
            "bg-surface-page",
            viewMode === "docs" ? "h-[50rem]" : "h-dvh"
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Story, {})
        }
      )
    ]
  };
  var ListPageLayout_stories_default2 = meta2;
  var WithStickyHeader = {
    name: "Sticky header (small screens only)",
    globals: { viewport: { value: "mobile1", isRotated: false } },
    args: {
      stickyHeader: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_PageHeader_exports.PageHeader, { title: "Files" }),
      contentClassName: "max-w-5xl",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Rows2, {})
    },
    /**
     * The shadow follows the scroll position: hidden at the top, shown once the
     * page has moved, hidden again when it comes back. The container itself
     * takes focus, so the list is scrollable by keyboard before any row is.
     */
    play: async ({ canvasElement }) => {
      const scroller = canvasElement.querySelector(
        ".overflow-y-auto"
      );
      const shadow = canvasElement.querySelector(".top-full");
      await (0, import_test.expect)(scroller).toHaveAttribute("tabindex", "0");
      await (0, import_test.expect)(shadow).toHaveStyle({ opacity: "0" });
      await (0, import_test.expect)(scroller.scrollHeight).toBeGreaterThan(scroller.clientHeight);
      scroller.scrollTop = 200;
      scroller.dispatchEvent(new Event("scroll"));
      await (0, import_test.waitFor)(() => (0, import_test.expect)(shadow.style.opacity).toBe("1"));
      scroller.scrollTop = 0;
      scroller.dispatchEvent(new Event("scroll"));
      await (0, import_test.waitFor)(() => (0, import_test.expect)(shadow.style.opacity).toBe("0"));
    }
  };
  var WithoutHeader = {
    args: {
      contentClassName: "max-w-5xl",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Rows2, {})
    }
  };
  var ShortContent = {
    args: {
      stickyHeader: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_PageHeader_exports.PageHeader, { title: "Insights" }),
      contentClassName: "max-w-5xl",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Rows2, { count: 3 })
    }
  };
  var NarrowColumn = {
    args: {
      stickyHeader: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_PageHeader_exports.PageHeader, { title: "Metrics" }),
      contentClassName: "max-w-xl",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Rows2, {})
    }
  };
  var condensingHeader = ({ condensed }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    ds_PageHeader_exports.PageHeader,
    {
      title: "Data Sources",
      condensed,
      wrapTitle: true,
      onBack: (0, import_test.fn)(),
      backLabel: "Back to home",
      actions: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ds_Button_exports.Button, { size: "sm", variant: "primary", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Plus, {}),
        "Create Connection"
      ] })
    }
  );
  var scrollTo = (scroller, top) => {
    scroller.scrollTop = top;
    scroller.dispatchEvent(new Event("scroll"));
  };
  var CondensingHeader = {
    name: "Condensing header (small screens only)",
    globals: { viewport: { value: "mobile1", isRotated: false } },
    args: {
      condenseAfter: 60,
      stickyHeader: condensingHeader,
      contentClassName: "max-w-5xl",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Rows2, { count: 40 })
    },
    play: async ({ canvasElement }) => {
      const scroller = canvasElement.querySelector(
        ".overflow-y-auto"
      );
      const header2 = canvasElement.querySelector(
        '[data-slot="list-page-layout-header"]'
      );
      const row = canvasElement.querySelector(
        '[data-slot="page-header"]'
      );
      await (0, import_test.expect)(header2).not.toHaveAttribute("data-condensed");
      await (0, import_test.expect)(row).not.toHaveAttribute("data-condensed");
      scrollTo(scroller, 400);
      await (0, import_test.waitFor)(() => (0, import_test.expect)(header2).toHaveAttribute("data-condensed"));
      await (0, import_test.expect)(row).toHaveAttribute("data-condensed");
      scrollTo(scroller, 0);
      await (0, import_test.waitFor)(() => (0, import_test.expect)(header2).not.toHaveAttribute("data-condensed"));
      await (0, import_test.expect)(row).not.toHaveAttribute("data-condensed");
    }
  };
  var CondensingHeaderTablet = {
    name: "Condensing header (tablet)",
    globals: { viewport: { value: "tablet", isRotated: false } },
    args: CondensingHeader.args,
    play: CondensingHeader.play
  };
  var CondensingHeaderWideScreen = {
    name: "Condensing header (wide screens: never)",
    globals: { viewport: { value: "desktop", isRotated: false } },
    args: CondensingHeader.args,
    play: async ({ canvasElement }) => {
      const scroller = canvasElement.querySelector(
        ".overflow-y-auto"
      );
      const header2 = canvasElement.querySelector(
        '[data-slot="list-page-layout-header"]'
      );
      scrollTo(scroller, 400);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await (0, import_test.expect)(header2).not.toHaveAttribute("data-condensed");
      scrollTo(scroller, 0);
    }
  };
  var BodyInset = {
    args: {
      stickyHeader: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_PageHeader_exports.PageHeader, { title: "Files" }),
      contentClassName: "max-w-5xl",
      bodyClassName: "pb-16",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Rows2, {})
    }
  };

  // .design-sync/.cache/previews/ListPageLayout.tsx
  function compose(S, key) {
    const meta3 = S.default ?? {};
    const st = S[key];
    const args = { ...meta3.args ?? {}, ...st && st.args ? st.args : {} };
    const at = { ...meta3.argTypes ?? {}, ...st && st.argTypes ? st.argTypes : {} };
    for (const k of Object.keys(args)) {
      const m = at[k] && at[k].mapping;
      if (m && typeof m === "object" && args[k] in m) args[k] = m[args[k]];
    }
    const title = typeof meta3.title === "string" ? meta3.title : "";
    const ctx = {
      args,
      name: key,
      title,
      kind: title,
      id: "",
      componentId: "",
      globals: {},
      viewMode: "story",
      parameters: (st && st.parameters) ?? meta3.parameters ?? {}
    };
    let render = null;
    if (st && typeof st.render === "function") render = () => st.render(args, ctx);
    else if (typeof st === "function") render = () => st(args, ctx);
    else if (typeof meta3.render === "function") render = () => meta3.render(args, ctx);
    else {
      const C = st && st.component || meta3.component;
      if (C) render = () => React.createElement(C, args);
    }
    if (!render) return () => null;
    const decorators = [].concat((st && st.decorators) ?? []).concat(meta3.decorators ?? []);
    return decorators.reduce((inner, dec) => () => {
      const out = dec(inner, ctx);
      return out === void 0 ? inner() : out;
    }, render);
  }
  var Page2 = (
    /* ListPageLayout */
    compose(ListPageLayout_stories_exports, "Page")
  );
  var WithStickyHeader2 = (
    /* Sticky header (small screens only) */
    compose(ListPageLayout_stories_exports2, "WithStickyHeader")
  );
  var WithoutHeader2 = (
    /* Without Header */
    compose(ListPageLayout_stories_exports2, "WithoutHeader")
  );
  var ShortContent2 = (
    /* Short Content */
    compose(ListPageLayout_stories_exports2, "ShortContent")
  );
  var NarrowColumn2 = (
    /* Narrow Column */
    compose(ListPageLayout_stories_exports2, "NarrowColumn")
  );
  var CondensingHeader2 = (
    /* Condensing header (small screens only) */
    compose(ListPageLayout_stories_exports2, "CondensingHeader")
  );
  var CondensingHeaderTablet2 = (
    /* Condensing header (tablet) */
    compose(ListPageLayout_stories_exports2, "CondensingHeaderTablet")
  );
  var CondensingHeaderWideScreen2 = (
    /* Condensing header (wide screens: never) */
    compose(ListPageLayout_stories_exports2, "CondensingHeaderWideScreen")
  );
  var BodyInset2 = (
    /* Body Inset */
    compose(ListPageLayout_stories_exports2, "BodyInset")
  );
  return __toCommonJS(ListPageLayout_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.562.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
