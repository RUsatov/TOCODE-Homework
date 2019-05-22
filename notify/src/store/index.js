import Vue from 'vue'
import Vuex from 'vuex'

import notify from './notify'
import loader from './loader'
import error from './error'
import getData from './getData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notify,
    loader,
    error,
    getData
  }
})