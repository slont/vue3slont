import {createStore} from 'vuex'
import {State} from '@/store/type'
import user from './modules/user'

export default createStore<State>({
  state: {},
  mutations: {},
  actions: {},
  modules: {user}
})
