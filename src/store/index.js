import Vue from 'vue'
import Vuex from 'vuex'

/**
 * 用户token
 */
const USER_NAME = "USER_TOKEN";
/**
 * 语言名称
 */
const LANG_NAME = "USER_LANGUAGE";

Vue.use(Vuex)

let $i18n = null;
const store = new Vuex.Store({
  state: {
    user: localStorage.getItem(USER_NAME) || '',
    isLoadding: false,
    language: localStorage.getItem(LANG_NAME) || 'zh'
  },
  mutations: {
    setUsers(state, user) {
      state.user = user
      localStorage.setItem(USER_NAME, user)
    },
    removeUser(state) {
      state.user = '';
      localStorage.removeItem(USER_NAME);
    },
    setLanguage(state, lang) {
      state.language = lang;
      $i18n.locale = lang;
      localStorage.setItem(LANG_NAME, lang);
    },
  },
  actions: {},
  modules: {}
});

export default store;

export function setI18n(i18n) {
  $i18n = i18n;
}