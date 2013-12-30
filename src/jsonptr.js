/**
 * JSON Pointer based on draft: 
 * http://tools.ietf.org/html/rfc6901
 *
 * https://github.com/arifulh/jsonptr
 */

(function(root, undefined) {
  'use strict';

  /**
   * [Global function]
   * @param  {[string or object]} json [json string or object]
   * @param  {[string]} pointer  [pointer reference]
   * @return
   */
  root.jsonptr = root.jsonptr || function(json, pointer) {
    var get, tokens, obj = parseJSON(json);
    (tokens = pointer.split('/')).shift();
      
    // recursive lookup
    get = function(obj, tokens) {
      var tkn = decode(tokens.shift());
      if (!tokens.length) 
        return obj[tkn] !== undefined ? obj[tkn] : obj;
      return get(obj[tkn], tokens);
    };

    return get(obj, tokens);
  };

  /**
   * [encode Encode '/' and '~' to '~1' and '~0']
   * @param  {[string]} s [raw string]
   * @return {[string]} [encoded string]
   */
  function encode(s) {
    if (!s) return s;
    var str = s;
    str = str.replace(/\//g, '~1');
    str = str.replace(/\~/g, '~0');
    return str;
  };

  /**
   * [decode Decode ~1 and ~0 to '/' and '~']
   * @param  {[type]} s [encoded string]
   * @return {[type]}   [decoded string]
   */
  function decode(s) {
    if (!s) return s;
    var str = s;
    str = str.replace(/\~1/g, '/');
    str = str.replace(/\~0/g, '~');
    return str;
  };

  function parseJSON(o) {
    return (typeof o == 'string' || o instanceof String) ? JSON.parse(o) : o;
  };

  function isObject(o) {
    return Object.prototype.toString.call(o) == "[object Object]";
  };

  function isArray(o) {
    return Object.prototype.toString.call(o) === "[object Array]";
  };

}(this));



