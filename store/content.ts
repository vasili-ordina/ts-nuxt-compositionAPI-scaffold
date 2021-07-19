import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIBroker } from '~/helpers/APIbroker'
const api = new APIBroker({})
interface APIBrokerCallbackInterface {
  commitkey: string,
  payload: any
}
interface State {
    blogs: any,
    errorMssg: any
}
const stateinterface: State = {
  blogs: [],
  errorMssg: {}
}
export const state = () => (stateinterface)
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  allBlogs: state => state.blogs
}
export const mutations: MutationTree<RootState> = {
  SET_RESPONSE: (state:State, payload:Record<string, string | object>) => {
    state.blogs = payload.data
  },
  SET_ERROR: (state, payload:any) => {
    state.errorMssg = payload.response
  }
}
export const actions: ActionTree<RootState, RootState> = {
  async reqContent ({ commit }, payload) {
    api.config = {
      authToken: this.getters['auth/getJWT'],
      baseURL: this.getters.getAPIBaseURL
    }
    const respond:APIBrokerCallbackInterface = await api.ask({ endpoint: payload.endpoint })
    commit(respond.commitkey, respond.payload)
  },
  async getItem ({ commit }, { id }) {
    api.config = {
      authToken: this.getters['auth/getJWT'],
      baseURL: this.getters.getAPIBaseURL
    }
    const respond = await api.ask({ endpoint: '/blogs/'+id})
    commit(respond.commitkey, respond.payload)
  }
}
