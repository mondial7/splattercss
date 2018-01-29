let expect  = require('chai').expect
let SplatterCss = require('../src/splattercss.js')

suite('Mesh', function(){

  suiteSetup(function() {

    require('jsdom-global')()

    /**
     * Demo 1
     */
    this.cssDemo1 = '.test { color: white; }'
    this.domDemo1 = '<div class="test"></div>'
    this.demo1 = SplatterCss.mesh(this.cssDemo1, this.domDemo1)
  })

  test('should return corretly meshed dom', function(done){
    expect(this.demo1).to.be.equal('<div class="test" style="color: white;"></div>')
    done()
  })

})
