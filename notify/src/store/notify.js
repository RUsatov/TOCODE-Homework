export default {
  state: {
    messages: [],
    messageMain: []
  },
  mutations: {
    setMessage(state, payload) {
      state.messages = payload
    },
    setMessageMain (state, payload) {
      state.messageMain = payload
    },
  },
  actions: {
    setMessage ({commit}, payload) {
      commit('setMessage', payload)
    },
    setMessageMain ({commit}, payload) {
      commit('setMessageMain', payload)
    },
  },
  getters: {
    getMessage(state) {
      return state.messages
    },
    getMessageMain(state) {
      return state.messagesMain
    },

  }
}