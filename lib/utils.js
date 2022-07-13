"use strict";

/**************************************************************************
 * FUNCTIONS
 ***************************************************************************/

/**
 * Executes multiple regular expressions until one succeeds
 * @public
 * @param  {object} regexes
 * @param  {string} str
 * @param  {string} [mode]
 * @return {object} The result of the first successfull regular expression
 */
var loopRegexes = function(regexes, str, mode = "match") {
  var _match;

  for (var _i = 0; _i < regexes.length; _i++) {
    var _regex = regexes[_i];

    if (typeof regexes[_i] === "string") {
      // Build the regex
      _regex = new RegExp(regexes[_i]);
    }

    switch (mode) {
      case "exec":
        _match = _regex.exec(str || "");
        break;
      case "test":
        _match = _regex.test(str || "");
        break;
      case "match":
        _match = (str || "").match(_regex);
        break;
      case "matchAll":
        _match = (str || "").matchAll(_regex);
        break;
      case "search":
        _match = (str || "").search(_regex);
        break;
      case "replace":
        _match = (str || "").replace(_regex, "");
        break;
      case "replaceAll":
        _match = (str || "").replaceAll(_regex, "");
        break;
      case "split":
        _match = (str || "").split(_regex);
        break;
      default:
        throw `${mode} is not allowed`;
    }

    if (mode === "replace") {
      // A successfull replace must return a smaller string than the input
      var _maxLength = str.length;

      if (_match.length < _maxLength) {
        break;
      }
    } else if (mode === "split" || mode === "match") {
      // A successfull split must return an array with at least two items
      var _minLength = mode === "split" ? 1 : 0;

      if ((_match || []).length > _minLength) {
        break;
      }
    }
  }

  return (_match || []);
}


/**
 * Trims a string
 * @public
 * @param  {string} str
 * @return {string} The trimed string
 */
var trimString = function(str) {
  return ((str || "").trim() || null)
}


/**************************************************************************
 * EXPORTS
 ***************************************************************************/

exports.loopRegexes = loopRegexes;
exports.trimString  = trimString;

exports.default = {
  loopRegexes : loopRegexes,
  trimString  : trimString
};
