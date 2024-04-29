import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TabBarItem from '@/components/TabBarItem.vue'
import i18n from '@/locales'
import { ROUTER_NAME } from '@/router'

describe('TabBarItem.vue', () => {
  it('renders icon and text based on props', async () => {
    const wrapper = mount(TabBarItem, {
      props: {
        iconName: ROUTER_NAME.MANAGEMENT,
        selected: ROUTER_NAME.MANAGEMENT
      },
      global: {
        plugins: [i18n] // 使用 Vue I18n 实例
      }
    })

    // 检查是否具有激活状态的样式
    expect(wrapper.find('.tabBarItemContainer').classes()).toContain('actived')

    // 如果有更多的逻辑需要测试，例如点击事件，也可以在这里添加
  })

  // 可以添加更多的测试用例来覆盖不同的 props 或状态
})
