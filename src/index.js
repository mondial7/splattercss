'use strict'

/**
 * Define the module as empty object
 */
let SplatterCss = {}

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
  let list = []
  // When the string is empty or undefined, no need to evaluate
  if (!css || css.length === 0) return list
  // loop around parenthesis `}`
  let pieces = css.split('}')
  for (let i=0; i<pieces.length; i++) {
    let y = pieces[i].split('{')
    // check if { has been found
    if (y.length === 1) {
      continue
    } else {
      // get left and right of `{`
      let selector = y[0].trim(), rules = y[1].trim()
      // selector cannot be empty 0.0
      if (selector.length === 0) continue
      // add to resulting list
      list.push({ selector: selector, rules: rules })
    }
  }
  return list
}

/**
 * Inject the styles to a dom String and return the new dom String
 *
 * @param Array[Object] list evaluated by parse()
 * @param String dom
 * @return String new dom with injected styles
 */
SplatterCss.inject = function(list, dom) {
  // if arguments are missing or empty return the empty string
  if (list === undefined || list.lenght === 0 || !dom) {
    return ''
  }
  // transform the dom string in HTMLElements in order to navigate it
  let container = document.createElement('div')
  container.insertAdjacentHTML('beforeend', dom)
  // loop through the list and add styles to dom
  for (let i = 0; i < list.length; i++) {
    container.querySelectorAll(list[i].selector).forEach(function(el) {
      let currentStyles = el.getAttribute('style')
      let newStyles = !!currentStyles
        ? `${currentStyles};${list[i].rules}`
        : list[i].rules
      el.setAttribute('style', newStyles)
    })
  }
  // return the string rapresentation of the styled dom
  return container.innerHTML
}

/**
 * Main method to parse given css and to inject it in the given dom
 *
 * @param String css
 * @param String dom
 * @return String styled dom
 */
SplatterCss.mesh = function(css, dom) {
  return this.inject(this.parse(css), dom)
}

/**
 * Expose the defined module
 */
export default SplatterCss
