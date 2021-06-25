import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface State {
    user: object,
    jwt: string,
    errorMssg: string,
    authenticated: boolean
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
  getJWT: state => state.jwt,
  authenticated: state => state.authenticated,
  getErrorMssg: state => state.errorMssg,
  getUserInfo: state => state.user
}
export const mutations: MutationTree<RootState> = {
    SET_RESPONSE: (state, payload:Record<string, string>) => {
        Object.assign(state, payload.data)
    },
    SET_ERROR: (state, payload:string) => {
        state.errorMssg = payload
    },
    SET_STATUS: (state, authstate:boolean) => {
        state.authenticated = authstate
    },
    RESET_STATE: (state) => {
      Object.assign(state, statedefaults)
    }
}
export const actions: ActionTree<RootState, RootState> = {
  async logout({ commit }) {
    commit('RESET_STATE')
  },
  async login({ commit }, { username, password }) {
    try {
      const APIBaseURL = this.getters.getAPIBaseURL
      const response = await this.$axios
      .post(`${APIBaseURL}/auth/local`,
      { 
        identifier: username, 
        password: password 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).catch((error) => {
        console.error('error log:')
        console.error(error.response.data.message[0].messages[0].message)
        commit('SET_ERROR', error.response.data.message[0].messages[0].message)
      })
      if ( response ) { 
        commit('SET_RESPONSE', response)
        commit('SET_STATUS', true)
      } else {
        throw ` - something went wrong with the response data... ${response}`
      }
    }
    catch(e) {
      throw ` - something went wrong with connection to the server: ${e}`
    }
  }
}