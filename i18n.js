import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './locales/en.js'
import zh from './locales/zh.js'

Vue.use(VueI18n);

const messages = {
    en: {
       ...en
    },
    zh: {
       ...zh
    }
}

const i18n = new VueI18n({
    locale: 'zh',//默认语言为中文
    messages
})

export default i18n