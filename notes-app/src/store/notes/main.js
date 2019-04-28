export default {
  state: {
    message: null,
    search: '',
    grid: true,
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
    },
    removeNote(state, index) {
      state.notes.splice(index, 1)
    },
    setGrid(state, payload) {
      state.grid = payload
    },
    search(state, value) {
      state.search = value
    }
  },
  actions: {
    addNote({commit}, payload){
      commit('addNote', payload)
      commit('clear')
    },
    removeNote({commit}, index){
      commit('removeNote', index)
    },
    setGrid({commit}, payload) {
      commit('setGrid', payload)
    },
    search({commit}, value) {
      commit('search', value)
    }
  },
  getters: {
    getMessage(state) {
      return state.message
    },
    getNote(state) {
      return state.note
    },
    getNotes(state) {
      let array = state.notes,
          search = state.search;
      if (!search) return array
      // Small
      search = search.trim().toLowerCase()
      // Filter
      array = array.filter(function (item) {
        if (item.title.toLowerCase().indexOf(search) !== -1) {
          return item
        }
      })
      // Error
      return array
    },
    getSearch(state) {
      return state.search
    },
    getGrid(state) {
      return state.grid
    },
  }
};