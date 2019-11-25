/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { expect } from 'chai'
import SplatterCss from '../src/index'

suite('Css Parser', () => {
  suiteSetup(() => {
    this.demo1 = SplatterCss.parse('.test { color: black; }')
    this.demo2 = SplatterCss.parse('.test,.test2 { color: black; }')
    this.demo3 = SplatterCss.parse('{ missing-selector: should not save this; }')
    this.demo4 = SplatterCss.parse('.test { color: black; } .test2 { color: white; }')
  })

  test('should return empty array with wrong css', (done) => {
    expect(SplatterCss.parse('}{.x{x:1}')).to.be.an('array').that.is.empty
    done()
  })

  test('shouldn\'t break with no arguments', (done) => {
    expect(SplatterCss.parse()).to.be.an('array').that.is.empty
    done()
  })

  test('should return an array', (done) => {
    expect(this.demo1).to.be.an('array')
    done()
  })

  test('should parse correct css and return a non-empty array', (done) => {
    expect(this.demo1).to.be.an('array').that.is.not.empty
    done()
  })

  test('should return an array of objects with the property `selector`', (done) => {
    expect(this.demo1[0]).to.have.own.property('selector')
    done()
  })

  test('should return an array of objects with the property `rules`', (done) => {
    expect(this.demo1[0]).to.have.own.property('rules')
    done()
  })

  test('should parse multiple rules', (done) => {
    expect(this.demo4).to.be.an('array')
    expect(this.demo4).to.have.lengthOf(2)
    expect(this.demo4[0].rules).to.include('black')
    expect(this.demo4[1].rules).to.include('white')
    expect(this.demo4[1].rules).to.not.include('black')
    done()
  })

  test('should parse multiple selectors in one single object', (done) => {
    expect(this.demo2[0].selector.split(',').length).to.be.equal(2)
    done()
  })

  test('should not save rules without a selector', (done) => {
    expect(this.demo3).to.be.an('array').that.is.empty
    done()
  })
})
