//import Cookie from 'js-cookie'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, val) {
      state.token = val
      sessionStorage.setItem('token', val)
    },
    clearToken(state) {
      state.token = ''
      sessionStorage.remove('token')
    },
    getToken(state) {
      state.token = sessionStorage.getItem('token')
    }
  },
  actions: {}
}
