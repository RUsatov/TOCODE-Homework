import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import main from '@/store/notes/main.js'
import changeNote from '@/store/notes/changeNote.js'

export default new Vuex.Store({
  modules: { main, changeNote }
});