import { createI18n } from 'vue-i18n'
import EN from './en'
import ZH from './zh'
import storage from '@/utils/storage'
const messages = {
  en: {
    ...EN
  },
  zh: {
    ...ZH
  }
}

const getCurrentLanguage = () => {
  const UAlang = navigator.language // zh-CN
  const oldLang = storage.getItem('lang')
  if (oldLang) {
    return oldLang
  } else {
    const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
    storage.setItem('lang', langCode)
    return langCode
  }
  // const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
  // storage.setItem('lang', langCode)
  // return langCode
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage() || 'zh',
  messages: messages
})

export default i18n
