import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'
import ft from './ft'
import $store, {
  setI18n
} from '../../store/index'

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: $store.state.language,
  messages: {
    en,
    zh,
    ft,
  }
});

setI18n(i18n);

export default i18n;