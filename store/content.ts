import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface State {
    auth: any
    APIbaseurl: string,
    notes: [],
}
var stateinterface: State = {
    APIbaseurl: "https://nuxt-vue3-scaffold.herokuapp.com/",
    notes: []
}
export const state = () => (stateinterface)

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  allNotes: state => state.notes
}

export const mutations: MutationTree<RootState> = {
    SET_RESPONSE: (state, payload:Record<string, string>) => {
        state.notes = payload.data
        // const newstate = state
        // newstate.notes = payload.data;
        // state = newstate
    }
}

export const actions: ActionTree<RootState, RootState> = {

  // actionA({ commit }, { var1, var2 }) {
  //   processAction(handler, () => {}, () => {})
  // }
  async reqNotes({ commit }) {
    // console.dir(this.state.auth.jwt)
    const jwt = this.state.auth.jwt
    if(jwt){
      try {
        const response = await this.$axios
        .get(`https://nuxt-vue3-scaffold.herokuapp.com/notes`,
        {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        if ( response ) { 
          commit('SET_RESPONSE', response )
        } else {
          throw `- iets mis met verwerking van gegevens voor notes: ${response}`
        }
      }
      catch(e) {
        throw ('nope..')
      }
    } else {
      throw('no jwt, so no request is sent')
    }
  }
}