import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIBroker } from '~/helpers/APIbroker'
const api = new APIBroker({})

interface APIBrokerCallbackInterface {
  commitkey: string,
  payload: any
}
interface State {
    notes: any,
    errorMssg: any
}
const stateinterface: State = {
  notes: [],
  errorMssg: {}
}
export const state = () => (stateinterface)
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  allNotes: state => state.notes
}
export const mutations: MutationTree<RootState> = {
  SET_RESPONSE: (state:State, payload:Record<string, string | object>) => {
    state.notes = payload.data
  },
  SET_ERROR: (state, payload:any) => {
    state.errorMssg = payload.response
  }
}
export const actions: ActionTree<RootState, RootState> = {

  async reqNotes ({ commit }) {
    api.config = {
      authToken: this.getters['auth/getJWT'],
      baseURL: this.getters.getAPIBaseURL
    }
    const respond:APIBrokerCallbackInterface = await api.ask({ endpoint: '/notes' })
    commit(respond.commitkey, respond.payload)
  },
  async getItem ({ commit }, { id }) {
    api.config = {
      authToken: this.getters['auth/getJWT'],
      baseURL: this.getters.getAPIBaseURL
    }
    const respond = await api.ask({ endpoint: '/notes/'+id})
    commit(respond.commitkey, respond.payload)
  }
}
