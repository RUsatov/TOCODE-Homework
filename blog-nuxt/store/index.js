import axios from 'axios';
import Cookie from 'js-cookie'

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
    .then((res) => {
      let token = res.data.idToken;
      commit('setToken', token);
      //to local storage
      localStorage.setItem('token', token)
      // to cookie
      Cookie.set('jwt', token)

    })
    .catch(e => console.error(e))
  },
  initAuth({commit}, req) {
    let token

    if (req) {
      if (!req.headers.cookie) return false
      const jwtCookie = req.headers.cookie.split(';').find(t => t.trim().startsWith('jwt='))
      if (!jwtCookie) return false
      token = jwtCookie.split('=')[1]
    } else {
      token = localStorage.getItem('token');
      if (!token) return false
    }
    commit('setToken', token)
  },
  logoutUser({commit}) {
    commit('destroyToken');
    localStorage.removeItem('token')
    Cookie.remove('jwt')
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