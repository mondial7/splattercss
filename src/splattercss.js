/**
 * Will update this soon
 * Doing nothing yet
 */

/**
 * Modules exposure: AMD, CommonJS, ES6
 */
(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define(function(){
      return (root.SplatterCss = factory());
    });
  } else if(typeof module === "object" && module.exports) {
    module.exports = (root.SplatterCss = factory());
  } else {
    root.SplatterCss = factory();
  }
}(this, function() {

  /**
   * Define the module as empty object
   */
  let SplatterCss = {};

  /**
   * Parse a given css string
   * Splits the css strings into objects
   * { selector: String, rules: String }
   *
   * @param String
   * @return Array
   */
  SplatterCss.parse = function(css) {
    // return value
    let list = []
    // When the string is empty, no need to evaluate
    if (css.length === 0) return list;
    // loop around parenthesis `}`
    let pieces = css.split('}');
    for (let i=0; i<pieces.length; i++) {
      let y = pieces[i].split('{');
      // check if { has been found
      if (y.length === 1) {
        return list;
      } else {
        // get left and right of `{`
        let selector = y[0].trim(), rules = y[1].trim();
        // selector cannot be empty 0.0
        if (selector.length === 0) continue;
        // add to resulting list
        list.push({ selector, rules });
      }
    }
    return list;
  }

  /**
   * Expose the defined module
   */
  return SplatterCss;

}));
