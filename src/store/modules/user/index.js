import userService from './../../../service/UserService'

const state = {
  user: null,
  groups: {}
}

const actions = {
  loadUser ({commit}) {
    userService.getCurrent(user => {
      commit('initUser', user)
    })
    userService.getCurrentGroups(groups => {
      commit('initGroups', groups)
    })
  }
}

const getters = {
  getUser: (state) => {
    return state.user
  },
  getGroups: (state) => {
    return state.groups
  }
}

const mutations = {
  initUser (state, data) {
    state.user = data
  },
  initGroups (state, data) {
    state.groups = data
  }
}

const user = {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}

export default user
