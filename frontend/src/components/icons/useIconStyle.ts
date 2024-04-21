// useIconStyle.ts
import { computed, type CSSProperties, type ExtractPropTypes } from 'vue'

export function useIconStyle<T extends ExtractPropTypes<T>>(props: T, name: keyof T) {
  const iconStyle = computed(() => {
    const styleObj = {} as CSSProperties
    if (props[name]) {
      styleObj.fill = 'black'
      styleObj.opacity = 0.7
    } else {
      styleObj.fill = '#E6E8EB'
    }
    return styleObj
  })

  return iconStyle
}
