import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface State {
    APIBaseURL: string
}
const stateinterface:State = {
  APIBaseURL: process.env.NODE_ENV === 'production' && process.env.API_URL ? process.env.API_URL : 'http://localhost:1337/'
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
