"use strict";

var _require = require("./errors.js"),
  throwUnimplementedTagType = _require.throwUnimplementedTagType,
  XTScopeParserError = _require.XTScopeParserError;
var getResolvedId = require("./get-resolved-id.js");
function moduleRender(part, options) {
  var moduleRendered;
  for (var i = 0, l = options.modules.length; i < l; i++) {
    var _module = options.modules[i];
    moduleRendered = _module.render(part, options);
    if (moduleRendered) {
      return moduleRendered;
    }
  }
  return false;
}
function render(options) {
  var baseNullGetter = options.baseNullGetter;
  var compiled = options.compiled,
    scopeManager = options.scopeManager;
  options.nullGetter = function (part, sm) {
    return baseNullGetter(part, sm || scopeManager);
  };
  var errors = [];
  var parts = compiled.map(function (part, i) {
    options.index = i;
    options.resolvedId = getResolvedId(part, options);
    var moduleRendered;
    try {
      moduleRendered = moduleRender(part, options);
    } catch (e) {
      if (e instanceof XTScopeParserError) {
        errors.push(e);
        return part;
      }
      throw e;
    }
    if (moduleRendered) {
      if (moduleRendered.errors) {
        Array.prototype.push.apply(errors, moduleRendered.errors);
      }
      return moduleRendered;
    }
    if (part.type === "content" || part.type === "tag") {
      return part;
    }
    throwUnimplementedTagType(part, i);
  }).reduce(function (parts, _ref) {
    var value = _ref.value;
    if (value instanceof Array) {
      for (var i = 0, len = value.length; i < len; i++) {
        parts.push(value[i]);
      }
    } else if (value) {
      parts.push(value);
    }
    return parts;
  }, []);
  return {
    errors: errors,
    parts: parts
  };
}
module.exports = render;