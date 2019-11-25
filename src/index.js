/**
 * Define the module as empty object
 */
const SplatterCss = {}

/**
 * Parse a given css string
 * Splits the css strings into objects
 * { selector: String, rules: String }
 *
 * @param String css
 * @return Array {Object}
 */
SplatterCss.parse = function parse(css) {
  // return value
  const list = []
  // When the string is empty or undefined, no need to evaluate
  if (!css || css.length === 0) return list
  // loop around parenthesis `}`
  const pieces = css.split('}')
  for (let i = 0; i < pieces.length; i += 1) {
    const y = pieces[i].split('{')
    // check if { has been found
    if (y.length !== 1) {
      // get left and right of `{`
      const selector = y[0].trim()
      const rules = y[1].trim()
      // selector cannot be empty 0.0
      if (selector.length !== 0) {
        // add to resulting list
        list.push({ selector, rules })
      }
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
SplatterCss.inject = function inject(list, dom) {
  // when arguments are missing or empty
  // return the dom or empty string to silently fail
  // without throwing exceptions
  if (!list || !dom) {
    return dom || ''
  }
  // transform the dom string in HTMLElements in order to navigate it
  const container = document.createElement('div')
  container.insertAdjacentHTML('beforeend', dom)
  // loop through the list and add styles to dom
  for (let i = 0; i < list.length; i += 1) {
    container.querySelectorAll(list[i].selector).forEach((el) => {
      const currentStyles = el.getAttribute('style')
      const newStyles = currentStyles
        ? `${currentStyles};${list[i].rules}`
        : list[i].rules
      el.setAttribute('style', newStyles)
    })
  }
  // return the string representation of the styled dom
  return container.innerHTML
}

/**
 * Main method to parse given css and to inject it in the given dom
 *
 * @param String css
 * @param String dom
 * @return String styled dom
 */
SplatterCss.mesh = function mesh(css, dom) {
  return this.inject(this.parse(css), dom)
}

/**
 * Expose the defined module
 */
export default SplatterCss
