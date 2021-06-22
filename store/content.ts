import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface State {
    notes: any
}
const stateinterface: State = {
    notes: []
}
export const state = () => (stateinterface)
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  allNotes: state => state.notes
}
export const mutations: MutationTree<RootState> = {
    SET_RESPONSE: (state:State, payload:Record<string, string | object>) => {
        state.notes = payload.data
        // const newstate = state
        // newstate.notes = payload.data;
        // state = newstate
    }
}
export const actions: ActionTree<RootState, RootState> = {
  async reqNotes({ commit }) {
    const APIBaseURL = this.getters.getAPIBaseURL
    const jwt = this.getters['auth/getJWT']
    if(jwt){
      try {
        const response = await this.$axios
        .get(`${APIBaseURL}/notes`,
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