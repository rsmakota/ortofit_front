import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const office = {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations,
  getters: getters
}

export default office
