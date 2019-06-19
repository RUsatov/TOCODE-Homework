import axios from 'axios';

export const state = () => ({
  postsLoaded: [],
  token: null
})

export const mutations = {
  setPosts(state, posts) {
    state.postsLoaded = posts
  },
  addPost(state, post) {
    state.postsLoaded.push(post)
  },
  editPost(state, postEdit) {
    const postIndex = state.postsLoaded.findIndex(post => post.id === postEdit.id);
    state.postsLoaded[postIndex] = postEdit;
  },
  setToken(state, token) {
    state.token = token;
  },
  destroyToken(state) {
    state.token = null;
  }
}

export const actions = {
  nuxtServerInit ({commit}, contex) {
    return axios.get('https://blog-nuxt-d2671.firebaseio.com/posts.json')
      .then(res => {

        const postsArray = [];
        for (let key in res.data) {
          postsArray.push( { ...res.data[key], id: key} )
        }
        // Res
        commit('setPosts', postsArray)
      })
      .catch(e => console.log(e))
  },
  authUser ({commit}, authData) {
    const key = 'AIzaSyAlCdqVEAlJYK5QniewhiHpiReinyQxpVg';

    return axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
    .then((res) => { commit('setToken', res.data.idToken) })
    .catch(e => console.error(e))
  },
  authUser({commit}) {
    commit('destroyToken');
  },
  addPost ({commit}, post) {
    return axios.post('https://blog-nuxt-d2671.firebaseio.com/posts.json', post)
      .then(res => {
        commit('addPost', {...post, id: res.data.name})
      })
      .catch(e => console.log(e))
  },
  editPost ({commit, state}, post) {
    return axios.put(`https://blog-nuxt-d2671.firebaseio.com/posts/${post.id}.json?auth=${state.token}`, post)
      .then(res => {
        commit('editPost', post)
      })
      .catch(e => console.log(e))
  },
  addComment({commit}, comment) {
    return axios.post('https://blog-nuxt-d2671.firebaseio.com/comments.json', comment)
      .catch(e => console.log(e))
  }
}

export const getters = {
  getPostsLoaded (state) {
    return state.postsLoaded;
  },
  checkAuthUser (state) {
    return state.token != null
  }
}