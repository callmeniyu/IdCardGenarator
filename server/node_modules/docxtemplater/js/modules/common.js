"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var wrapper = require("../module-wrapper.js");
var filetypes = require("../filetypes.js");
var _require = require("../content-types.js"),
  settingsContentType = _require.settingsContentType,
  coreContentType = _require.coreContentType,
  appContentType = _require.appContentType,
  customContentType = _require.customContentType;
var commonContentTypes = [settingsContentType, coreContentType, appContentType, customContentType];
var Common = /*#__PURE__*/function () {
  function Common() {
    _classCallCheck(this, Common);
    this.name = "Common";
  }
  return _createClass(Common, [{
    key: "getFileType",
    value: function getFileType(_ref) {
      var doc = _ref.doc;
      var invertedContentTypes = doc.invertedContentTypes;
      if (!invertedContentTypes) {
        return;
      }
      for (var j = 0, len2 = commonContentTypes.length; j < len2; j++) {
        var ct = commonContentTypes[j];
        if (invertedContentTypes[ct]) {
          Array.prototype.push.apply(doc.targets, invertedContentTypes[ct]);
        }
      }
      var keys = ["docx", "pptx"];
      var ftCandidate;
      for (var i = 0, len = keys.length; i < len; i++) {
        var contentTypes = filetypes[keys[i]];
        for (var _j = 0, _len = contentTypes.length; _j < _len; _j++) {
          var _ct = contentTypes[_j];
          if (invertedContentTypes[_ct]) {
            for (var k = 0, _len2 = invertedContentTypes[_ct].length; k < _len2; k++) {
              var target = invertedContentTypes[_ct][k];
              if (doc.relsTypes[target] && ["http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"].indexOf(doc.relsTypes[target]) === -1) {
                continue;
              }
              ftCandidate = keys[i];
              if (filetypes.main.indexOf(_ct) !== -1 || _ct === filetypes.pptx[0]) {
                doc.textTarget || (doc.textTarget = target);
              }
              doc.targets.push(target);
            }
          }
        }
        if (ftCandidate) {
          return ftCandidate;
        }
      }
      return ftCandidate;
    }
  }]);
}();
module.exports = function () {
  return wrapper(new Common());
};