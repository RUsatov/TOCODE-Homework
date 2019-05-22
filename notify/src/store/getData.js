import axios from 'axios'

export default {
  state: {
    res: []
  },
  mutations: {
    setData(state, res) {
    }
  },
  actions: {
    setData({commit}, res) {
      axios
        .get('https://tocode.ru/static/c/vue-pro/notifyApi.php')
          .then(reseponse => {
            let res = reseponse.data.notify,
                messages = [],
                messagesMain = [];

            // filter
            for (let i = 0; i < res.length; i++) {
              if (res[i].main) messagesMain.push(res[i])
              else messages.push(res[i])
            }

            this.$store.dispatch('setMessage', messages)
            this.$store.dispatch('setMessageMain', messagesMain)
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch('setError', 'Error: Network Error')
          })

          .finally( () => (this.$store.dispatch('setLoading', false) ))
      commit();
    }
  },
  getters: {
    getData(state) {
      return 
    }
  }
}