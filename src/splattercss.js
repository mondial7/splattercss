/**
 * @license
 * Copyright (c) 2018 Marco Mondini <mmondini@mondspace.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Modules exposure
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
  var SplatterCss = {};

  /**
   * Parse a given css string
   * Splits the css strings into objects
   * { selector: String, rules: String }
   *
   * @param String css
   * @return Array {Object}
   */
  SplatterCss.parse = function(css) {
    // return value
    var list = []
    // When the string is empty, no need to evaluate
    if (css.length === 0) return list;
    // loop around parenthesis `}`
    var pieces = css.split('}');
    for (var i=0; i<pieces.length; i++) {
      var y = pieces[i].split('{');
      // check if { has been found
      if (y.length === 1) {
        return list;
      } else {
        // get left and right of `{`
        var selector = y[0].trim(), rules = y[1].trim();
        // selector cannot be empty 0.0
        if (selector.length === 0) continue;
        // add to resulting list
        list.push({ selector: selector, rules: rules });
      }
    }
    return list;
  }

  /**
   * Inject the styles to a dom String and return the new dom String
   *
   * @todo there is no support for css precedences, that means you should take
   *       care not to define selectors pointing to same elements
   *
   * @param Array {Object} list evaluated by parse()
   * @param String dom
   * @return String new dom with injected styles
   */
  SplatterCss.inject = function(list, dom) {
    // if arguments are missing or empty return the empty string
    if (list === undefined || list.lenght === 0 || !dom) {
      return ''
    }
    // transform the dom string in HTMLElements in order to navigate it
    var container = document.createElement('div')
    container.insertAdjacentHTML('beforeend', dom)
    // loop through the list and add styles to dom
    for (var i = 0; i < list.length; i++) {
      container.querySelectorAll(list[i].selector).forEach(function(el) {
        el.setAttribute('style',list[i].rules)
      })
    }
    // return the string rapresentation of the styled dom
    return container.innerHTML
  }

  /**
   * Expose the defined module
   */
  return SplatterCss;

}));
