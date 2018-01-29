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
   * @param String css
   * @return Array {Object}
   */
  SplatterCss.parse = css => {
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
   * Inject the styles to a dom String and return the new dom String
   *
   * @todo there is no support for css precedences, that means you should take
   *       care not to define selectors pointing to same elements
   *
   * @param Array {Object} list evaluated by parse()
   * @param String dom
   * @return String new dom with injected styles
   */
  SplatterCss.inject = (list, dom) => {
    // if arguments are missing or empty return the empty string
    if (list === undefined || list.lenght === 0 || !dom) {
      return ''
    }
    // transform the dom string in HTMLElements in order to navigate it
    let container = document.createElement('div')
    container.insertAdjacentHTML('beforeend', dom)
    // loop through the list and add styles to dom
    for (let i = 0; i < list.length; i++) {
      container.querySelectorAll(list[i].selector).forEach(element => {
        element.setAttribute('style',list[i].rules)
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
