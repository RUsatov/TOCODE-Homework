export default {
  state: {
    input: {
      title: null,
      descr: null
    },
    show: {
      title: null,
      descr: null
    }
  },
  mutations: {
    showInput(state, payload){
      if(payload.descrText.innerText === payload.text){
        state.show.descr = payload.index;
        state.input.descr = payload.text;
      }
      if(payload.titleText.innerText === payload.text){
        state.show.title = payload.index;
        state.input.title = payload.text;
      }
    },
    saveText(state, payload){
      if(state.show.title !== null) {
        payload.notes[payload.index].title = state.input.title;
        state.show.title = null;
      }
      if(state.show.descr !== null) {
        payload.notes[payload.index].descr = state.input.descr;
        state.show.descr = null;
      }
    }
  },
  actions: {
    showInput({commit}, payload){
      commit('showInput', payload)
    },
    saveText({commit}, payload){
      payload.notes[payload.index].date = new Date(Date.now()).toLocaleString();
      commit('saveText', payload)
    },
  },
  getters: {
    getInput(state) {
      return state.input
    },
    getShow(state) {
      return state.show
    },
  },
};