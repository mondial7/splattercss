const path = require('path')
const license = require('rollup-plugin-license')
const uglify = require('rollup-plugin-uglify-es')

const config = {
  input: 'src/index.js',
  output: {
    file: 'build/splattercss.min.js',
    format: 'umd',
    name: 'SplatterCss',
  },
  plugins: [
    license({
      banner: {
        commentStyle: 'ignored',
        content: {
          file: path.join(__dirname, 'LICENSE'),
        },
      },
    }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.unshift(uglify({
    output: {
      comments: function(node, comment) {
        return /^!/.test(comment.value)
      }
    }
  }))
}

export default config
