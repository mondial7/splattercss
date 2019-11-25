/* eslint-disable no-undef */
import { expect } from 'chai'
import SplatterCss from '../src/index'

require('jsdom-global')()

suite('Mesh', () => {
  suiteSetup(() => {
    /**
     * Demo 1
     */
    this.cssDemo1 = '.test { color: white; }'
    this.domDemo1 = '<div class="test"></div>'
    this.demo1 = SplatterCss.mesh(this.cssDemo1, this.domDemo1)
  })

  test('should return correctly meshed dom', (done) => {
    expect(this.demo1).to.be.equal('<div class="test" style="color: white;"></div>')
    done()
  })
})
