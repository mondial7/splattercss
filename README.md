# Splatter Css 🥗

JS library to split and splatter your CSS rules into the style attribute of each related DOM element.

The idea first came as a trial for an alternative to ShadyCss while waiting for fully ShadowDom v1 support.

## Install
---
```bash
npm install splattercss
```
```js
// browser
<script src="./node_modules/build/splattercss.min.js"></script>

// ES import
import SplatterCss from 'splattercss/index'

// Node
// NOTE: you might need some DOM enabler
// like https://www.npmjs.com/package/global-jsdom
const SplatterCss = require('splattercss')

```

## Usage
---

```html
<div id="wrapper">
  <p class="red"></p>
  <p class="green"></p>
</div>
```
```js
import SplatterCss from 'splattercss'
// Get HTML and pass it as String
// together with the styles to apply
const node = document.getElementById('wrapper')
const _styledHtml = SplatterCss.mesh(`
  .red { color: red; }
  .green { color: green; }
`, node.innerHTML)
// Update with the new HTML
node.innerHTML = _styledHtml
```
Result
```html
<div id="wrapper">
  <p class="red" style="color: red;"></p>
  <p class="green" style="color: green;"></p>
</div>
```

## API

---
`.mesh()` splatters the CSS in the HTML provided and returns the updated HTML as String. It will parse the CSS and distributes the styles in the HTML by matching the CSS selectors. It's combination of the two APIs described below.

Example
```js
const newHTML = SplatterCss.mesh(`
  .red { color: red; }
  .green { color: green; }
`,`
  <p class="red"></p>
  <p class="green"></p>
`)

// newHTML = `
//  <p class="red" style="color: red;"></p>
//  <p class="green" style="color: green;"></p>
// `
```

---

`.parse()` will parse a CSS string and build an array of Objects
```js
// @return
[ { selector:String, rules:String }, ... ]
```

**Note** It's not a linter tool. Wrong syntax CSS will be parsed anyways with no rising Exceptions. Eventually, with the possibility of loosing some rules on the way.

Example
```js
const cssArr = SplatterCss.parse(`
  .red { color: red; }
  .green { color: green; }
`)

// cssArr = [
//   {
//     selector: '.red',
//     rules: 'color: red;'
//   },
//   {
//     selector: '.green',
//     rules: 'color: green;'
//   }
// ]
```
---
`.inject()` intermediary function that accepts the Array result of `.parse()` and the DOM as a String. It will injects the styles defined in the given DOM string and return the modified string.

Example
```js
const cssArr = [
  {
    selector: '.red',
    rules: 'color: red;'
  },
  {
    selector: '.green',
    rules: 'color: green;'
  }
]
const newHTML = SplatterCss.inject(cssArr, `
  <p class="red"></p>
  <p class="green"></p>
`)

// newHTML = `
//   <p class="red" style="color: red;"></p>
//   <p class="green" style="color: green;"></p>
// `
```


## License
---
MIT License (MIT)

## Contributing
---
Feel free to contribute and submit an issue or a pull request for any bug or enhancements.
