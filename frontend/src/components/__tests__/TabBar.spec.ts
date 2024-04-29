import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TabBar from '@/components/TabBar.vue'
import { ROUTER_NAME } from '@/router'
import i18n from '@/locales'

describe('TabBar.vue', () => {
  it('should be visible when show prop is true', () => {
    const wrapper = mount(TabBar, {
      props: { show: true },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.isVisible()).toBe(true)
  })

  it('should not be visible when show prop is false', () => {
    const wrapper = mount(TabBar, {
      props: { show: false },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.isVisible()).toBe(false)
  })

  it('emits update:selected event when a tab is clicked', async () => {
    const wrapper = mount(TabBar, {
      props: { show: true },
      global: {
        plugins: [i18n]
      }
    })
    await wrapper.vm.$nextTick()

    // Mock the handleSelect function or directly trigger click event
    // Assuming TabBarItem is a button or has a button that can be clicked
    const firstTab = wrapper.findAllComponents({ name: 'TabBarItem' })[0]
    await firstTab.trigger('click')

    // Check if the event has been emitted
    expect(wrapper.emitted()['update:selected']).toBeTruthy()
    // Check if the emitted event has the expected value
    // This assumes that the first item in your tablist corresponds to ROUTER_NAME.MANAGEMENT
    expect(wrapper.emitted()['update:selected'][0]).toEqual([ROUTER_NAME.MANAGEMENT])
  })
})
