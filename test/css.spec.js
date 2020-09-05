import { shallowMount } from '@vue/test-utils'
import Css from './resources/Css.vue'
import ExternalCss from './resources/ExternalCss.vue'
import StyleModule from './resources/StyleModule.vue'

describe('processes .vue file with Css style', () => {
  let wrapper
  beforeAll(() => {
    wrapper = shallowMount(Css)
  })

  it('should bind from style tags with named module', () => {
    expect(wrapper.classes()).toContain('testA')
  })

  it('should bind from style tags with anonymous modules', () => {
    expect(wrapper.classes()).toContain('testB')
  })

  it('should not bind from style tags without a module', () => {
    expect(wrapper.vm.$style.testC).toBeFalsy()
  })

  it('handles style modules', () => {
    shallowMount(StyleModule)
  })
})

describe('processes .vue file with external Css style', () => {
  let wrapper
  beforeAll(() => {
    wrapper = shallowMount(ExternalCss)
  })

  it('should bind from style tags with an anonymous module', () => {
    expect(wrapper.classes()).toContain('testA')
    expect(wrapper.find('.testC').text()).toBe('Test text')
  })

  it('should bind from style tags with a named module', () => {
    expect(wrapper.classes()).toContain('testB')
  })

  it('should bind from style tags', () => {
    const innerElement = wrapper.find('.testD')
    expect(innerElement.text()).toBe('lorem ipsum')
    expect(innerElement.classes()).toContain('testD')
  })
})
