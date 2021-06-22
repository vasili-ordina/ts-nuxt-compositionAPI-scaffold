import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface State {
    APIbaseurl: string,
    user: object,
    jwt: string,
    authenticated: boolean
}
var stateinterface: State = {
    APIbaseurl: "https://nuxt-vue3-scaffold.herokuapp.com/",
    user: {},
    jwt: "",
    authenticated: false,
}
export const state = () => (stateinterface)

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getJWT: state => state.jwt,
  authenticated: state => state.authenticated
}

export const mutations: MutationTree<RootState> = {
    SET_RESPONSE: (state, payload:object) => {
        Object.assign(state, payload)
    },
    SET_STATUS: (state, authstate:boolean) => {
        state.authenticated = authstate
    }
}

export const actions: ActionTree<RootState, RootState> = {

  // actionA({ commit }, { var1, var2 }) {
  //   processAction(handler, () => {}, () => {})
  // }

  async login({ commit }, { username, password }) {
    try {
      const response = await this.$axios
      // .$post(`https://my.api.mockaroo.com/users.json?key=02439c80`,
      .$post('https://nuxt-vue3-scaffold.herokuapp.com/auth/local',
      { 
        identifier: username, 
        password: password 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }) 
      console.log('login-in request ready:')
      console.log(response)
      if ( response ) { 
        commit('SET_RESPONSE', response )
        commit('SET_STATUS', true)
      } else {
        throw `- iets mis met verwerking van gegevens voor login: ${response}`
        // commit('SET_RESPONSE', '')
        // commit('SET_STATUS', false)
      }
    }
    catch(e) {
      throw(`- iets mis met verbinden of verwerken van log-in: ${e}`)
    }
  }
}