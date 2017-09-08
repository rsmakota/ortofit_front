import state from './state'
import mutations from './mutations'
import actions from './actions'

const doctor = {
  state: state,
  namespaced: true,
  actions: actions,
  mutations: mutations
}

export default doctor
