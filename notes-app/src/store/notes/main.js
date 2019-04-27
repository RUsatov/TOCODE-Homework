export default {
  state: {
    message: null,
    note: {
      title: '',
      descr: '',
      priority: 'normal',
    },
    notes: [
      {
        title: 'First Note',
        descr: 'Description for first note',
        date: new Date(Date.now()).toLocaleString()
      },
      {
        title: 'Second Note',
        descr: 'Description for second note',
        date: new Date(Date.now()).toLocaleString()
      },
      {
        title: 'Third Note',
        descr: 'Description for third note',
        date: new Date(Date.now()).toLocaleString()
      }
    ]
  },
  mutations: {
    addNote(state, payload){
      if(payload.title === ''){
        state.message = 'Title can`t be blank!'
        return false
      } state.message = null

      state.notes.push(payload)
    },
    clear(state){
      state.note.title = ''
			state.note.descr = ''
			state.note.priority = 'normal'
    }
  },
  actions: {
    addNote({commit}, payload){
      // payload.date = new Date(Date.now()).toLocaleString()
      commit('addNote', payload)
      commit('clear')
    },
  },
  getters: {
    getMessage(state) {
      return state.message
    },
    getNote(state) {
      return state.note
    },
    getNotes(state) {
      return state.notes
    },
  }
};