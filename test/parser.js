let expect  = require('chai').expect
let SplatterCss = require('../src/splattercss.js')

suite('Css Parser', function(){

  suiteSetup(function(){
    this.demo1 = SplatterCss.parse('.test { color: black; }')
    this.demo2 = SplatterCss.parse('.test,.test2 { color: black; }')
    this.demo3 = SplatterCss.parse('{ missing-selector: should not save this; }')
  })

  test('should return an array', function(done){
    expect(this.demo1).to.be.an('array')
    done()
  })

  test('should parse correct css and return a non-empty array', function(done){
    expect(this.demo1).to.be.an('array').that.is.not.empty
    done()
  })

  test('should return an array of objects with the property `selector`', function(done){
    expect(this.demo1[0]).to.have.own.property('selector')
    done()
  })

  test('should return an array of objects with the property `rules`', function(done){
    expect(this.demo1[0]).to.have.own.property('rules')
    done()
  })

  test('should parse multiple selectors in one single object', function(done){
    expect(this.demo2[0].selector.split(',').length).to.be.equal(2)
    done()
  })

  test('should not save rules without a selector', function(done){
    expect(this.demo3).to.be.an('array').that.is.empty
    done()
  })

})
