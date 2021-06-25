import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface State {
    APIBaseURL: string
}
var stateinterface: State = {
    APIBaseURL: "https://nuxt-vue3-scaffold.herokuapp.com"
}
export const state = () => (stateinterface)
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    getAPIBaseURL: state => state.APIBaseURL
}
export const mutations: MutationTree<RootState> = {
    // addNewEntry: (state, payload:string) => {
    //     Object.assign(state.key, payload)
    // }
}
export const actions: ActionTree<RootState, RootState> = {

  // *** concept ***
  // api = APIbroker({ baseURL: "https://nuxt-vue3-scaffold.herokuapp.com" })
  /* api.auth({
    handler: 'login',
    endpoint: '/auth/local',
    payload: { username, password },
    errorDrilldown: 'response.data.message[0].messages[0].message'
  })
  api.auth({
      handler: 'logout',
      endpoint 'auth,
      persist: true
  })
  api.content({
      handler: 'get',
      payload: {},
      endpoint: 'notes',
      persist: false,
      auth: true
  })
  */
}