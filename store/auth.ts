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
    jwt: "",
    errorMssg: "",
    authenticated: false,
}
export const state = () => (statedefaults)
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAll: state => state,
  getJWT: state => state.jwt,
  authenticated: state => state.authenticated,
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
        state.authenticated = authstate
    },
    RESET_STATE: (state) => {
      Object.assign(state, statedefaults)
      localStorage.clear(); // needs clearing the localStorage
    }
}
export const actions: ActionTree<RootState, RootState> = {
  async logout({ commit }) {
    commit('RESET_STATE')
  },
  async login({ commit }, { username, password }) {
    // api.config.baseURL = this.getters['getAPIBaseURL']
    api.config = { baseURL: this.getters['getAPIBaseURL'] }
    const respond:APIBrokerCallbackInterface = await api.ask({
      endpoint: '/auth/local',
      method: 'post',
      payload: { identifier: username, password: password}
    })
    commit(respond.commitkey, respond.payload)
    respond.commitkey === 'SET_RESPONSE' ?
      commit('SET_STATUS', true) : 
      commit('SET_STATUS', false)
    ;
  }
}
