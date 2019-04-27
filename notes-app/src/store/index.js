import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import main from '@/store/notes/main.js'

export default new Vuex.Store({
  modules: { main }
});