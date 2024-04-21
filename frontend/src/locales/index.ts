import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

const i18n = createI18n({
  legacy: true,
  locale: 'zh_cn',
  fallbackLocale: 'en_us',
  messages
})

export default i18n
