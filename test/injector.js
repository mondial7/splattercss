import 'jsdom-global/register'
import { expect } from 'chai'
import SplatterCss from '../src/index.js'

suite('Css Injector', function(){

  suiteSetup(function() {
    /**
     * Demo 1
     */
    this.cssDemo1 = {
      selector: '.test',
      rules: 'color: black;'
    }
    this.domDemo1 = '<div class="test"></div>'
    this.demo1 = SplatterCss.inject([this.cssDemo1], this.domDemo1)
    /**
     * Demo 2
     */
    this.cssDemo2 = {
      selector: '.test,.test2',
      rules: 'color: black;'
    }
    this.domDemo2 = '<div class="test"></div><div class="test2"></div>'
    this.demo2 = SplatterCss.inject([this.cssDemo2], this.domDemo2)
    /**
     * Demo 3
     */
    this.cssDemo3 = {
      selector: 'div > p',
      rules: 'color: black;'
    }
    this.domDemo3 = '<div><p></p><p></p><p></p></div>'
    this.demo3 = SplatterCss.inject([this.cssDemo3], this.domDemo3)
    /**
     * Demo 4
     */
    this.cssDemo4 = {
      selector: '.radom',
      rules: 'color: black;'
    }
    this.domDemo4 = '<div></div>'
    this.demo4 = SplatterCss.inject([this.cssDemo4], this.domDemo4)
    /**
     * Demo 5
     */
     this.cssDemo5 = {
       selector: '.test',
       rules: 'color: black'
     }
     this.domDemo5 = '<div class="test" style="color: black"></div>'
     this.demo5 = SplatterCss.inject([this.cssDemo5, this.cssDemo5], this.domDemo5)
  })

  test('should return empty string with missing parameters', function(done){
    expect(SplatterCss.inject()).to.be.a('string').that.is.empty
    done()
  })

  test('should return empty string with empty dom parameter', function(done){
    expect(SplatterCss.inject([this.cssDemo1], '')).to.be.a('string').that.is.empty
    done()
  })

  test('should return same dom parameter when there are no css rules', function(done){
    expect(SplatterCss.inject([], '<div></div>')).to.be.equal('<div></div>')
    done()
  })

  test('should return non empty string with valid parameters', function(done){
    expect(this.demo1).to.be.a('string').that.is.not.empty
    done()
  })

  test('should add style attribute', function(done){
    expect(this.demo1).to.include('style=')
    done()
  })

  test('should add the rules without permutations', function(done){
    expect(this.demo1).to.include(this.cssDemo1.rules)
    done()
  })

  test('should only add rules without mutating the initial dom', function(done){
    expect(this.demo1).to.include(`<div class="test" style="${this.cssDemo1.rules}"></div>`)
    done()
  })

  test('should add the rules twice if selector are twice', function(done){
    expect(this.demo2.match(/color: black;/g).length).to.be.equal(2)
    done()
  })

  test('should add the rules to multiple elements when using generic selectors', function(done){
    expect(this.demo3.match(/color: black;/g).length).to.be.equal(3)
    done()
  })

  test('should not add rules if not selector is matched', function(done){
    expect(this.demo4).to.not.include(this.cssDemo4.rules)
    done()
  })

  test('should append rules to existing rules', function(done){
    expect(this.demo5.match(/color: black/g).length).to.be.equal(3)
    expect(this.demo5.match(/color: black;color: black;color: black/g).length).to.be.equal(1)
    done()
  })

})
