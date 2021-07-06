import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface State {
    APIBaseURL: string
}
const stateinterface: State = {
  APIBaseURL: 'https://nuxt-vue3-scaffold.herokuapp.com'
}
export const state = () => (stateinterface)
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAPIBaseURL: state => state.APIBaseURL
}
export const mutations: MutationTree<RootState> = {

}
export const actions: ActionTree<RootState, RootState> = {

}
