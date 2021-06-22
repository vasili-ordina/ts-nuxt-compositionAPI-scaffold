import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface State {
    APIbaseurl: string,
    header: object
}
var stateinterface: State = {
    APIbaseurl: "https://nuxt-vue3-scaffold.herokuapp.com/",
    header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
}
export const state = () => (stateinterface)

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getHeader: state => state.header
}

export const mutations: MutationTree<RootState> = {
    CHANGE_HEADER: (state, payload:object) => {
        Object.assign(state.header, payload)
    }
}

export const actions: ActionTree<RootState, RootState> = {

  // actionA({ commit }, { var1, var2 }) {
  //   processAction(handler, () => {}, () => {})
  // }

  async addJWTtoHeader({ commit }, value:string) {
    commit('CHANGE_HEADER', { 'Authorized' : `Bearer ${value}` } )
  }
}