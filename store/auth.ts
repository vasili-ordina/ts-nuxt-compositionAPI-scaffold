// import { useContext } from '@nuxtjs/composition-api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIBroker } from '~/helpers/APIbroker'
const api = new APIBroker({})

interface State {
    user: object,
    jwt: string,
    errorMssg: string,
    authenticated: boolean
}
interface APIBrokerCallbackInterface {
  commitkey: string,
  payload: any
}
const statedefaults: State = {
  user: {},
  jwt: '',
  errorMssg: '',
  authenticated: false
}
export let state = () => (statedefaults)
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAll: state => state,
  getJWT: state => state.jwt,
  getAuthenticated: state => state.authenticated,
  getErrorMssg: state => state.errorMssg,
  getUserInfo: state => state.user
}
export const mutations: MutationTree<RootState> = {
  SET_RESPONSE: (state, payload:Record<string, string>) => {
    Object.assign(state, payload.data)
  },
  SET_ERROR: (state, payload:any) => {
    state.errorMssg = payload.response.data.message[0].messages[0].message
  },
  SET_STATUS: (state, authstate:boolean) => {
    const newState = state
    newState.authenticated = authstate
    state = newState
    // state = {...state, authenticated: authstate }
    // Object.assign(state, payload)
  },
  RESET_STATE: (state) => {
    Object.assign(state, statedefaults)
    sessionStorage.clear()
  }
}
export const actions: ActionTree<RootState, RootState> = {
  logout ({ commit }) {
    commit('RESET_STATE')
    commit('SET_STATUS', false)
  },
  async login ({ commit }, { username, password }) {
    // api.config.baseURL = this.getters['getAPIBaseURL']
    api.config = { baseURL: this.getters.getAPIBaseURL }
    const respond:APIBrokerCallbackInterface = await api.ask({
      endpoint: '/auth/local',
      method: 'post',
      payload: { identifier: username, password }
    })
    commit(respond.commitkey, respond.payload)
    respond.commitkey === 'SET_RESPONSE' ? commit('SET_STATUS', true) : commit('SET_STATUS', false)
    sessionStorage.setItem('auth', JSON.stringify(this.getters['auth/getAll']))
  }
}
