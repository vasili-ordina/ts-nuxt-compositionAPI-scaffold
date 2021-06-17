import { useContext } from '@nuxtjs/composition-api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface State {
    name: string,
    authenticated: boolean
}
var stateinterface: State = {
    name: "Me",
    authenticated: false,
}
export const state = () => (stateinterface)

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: state => state.name,
}

export const mutations: MutationTree<RootState> = {
    CHANGE_NAME: (state, newName:string) => {
        state.name = newName
    },
    CHANGE_AUTHSTATE: (state, authstate:boolean) => {
        state.authenticated = authstate
    }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchThings({ commit }) {
    const { $axios } = useContext();
    const username:string = 'ehaley0'
    const password:string = 'blabla'
    // const things = await $axios.
    // $post(`https://my.api.mockaroo.com/users.json?key=02439c80`)
    const things = await $axios
    .post(
      `https://my.api.mockaroo.com/users.json?key=02439c80&__method=POST`,
      {
        username,
        password
      },
      {
        headers: {
          Accept: "application/json",
          allow: "POST,OPTIONS"
        }
      }
    )
    .then(response => {
        console.log('ActionTree:')
        console.log(things)
        commit('CHANGE_NAME', 'Vasili')
        commit('CHANGE_AUTHSTATE', true)
    })
  }
}