import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface page {
    name: string, // the name of the /page/[...] file indentified by Nuxt
    slug: string, // target address for url's (shouldnt this be the same as name then? no, i.e.: '/' = 'index.vue')
    title: string, // title that should be shown in <title> and top of the page as <h1>?
    icon?: string, // icon to show in menu
    description?: string, // meta description
    restricted?: boolean // if restricted is true then you need to be logged-in
}
interface State {
  currentPage: page | object,
  pages: page[]
}

const statedata:State = {
  currentPage: {},
  pages: [
  {
    name: 'index',
    slug: '/',
    title: 'Home',
    icon: 'mdi-home',
    restricted: false
  },
  {
    name: 'overview',
    slug: '/overview?type=A',
    title: 'Overview',
    description: 'some description for some overview',
    restricted: true
  },
  {
    name: 'overview',
    slug: '/overview?type=B',
    title: 'Overview (another)',
    description: 'some description for some overview',
    restricted: true
  },
  {
    name: 'index',
    slug: '/',
    title: 'About us',
    description: 'about us yoo',
    restricted: false
  },
  {
    name: 'account',
    slug: '/account',
    title: 'My Account',
    icon: 'mdi-account',
    description: 'change your personal information',
    restricted: false
  }
]
}
export let state = () => (statedata)
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getPages: state => state.pages,
  getCurrentPage: state => state.currentPage
}
export const mutations: MutationTree<RootState> = {
  SET_CURRENT_PAGE: ( state, payload ) => {
    Object.assign(state, payload)
  }
}
export const actions: ActionTree<RootState, RootState> = {
  findCurrentPage ({ commit }, { routeName }) {
    const allPages:page[] = this.getters['pages/getPages']
    const currentPage:page|undefined = allPages.find(obj => obj.name === routeName)
    commit('SET_CURRENT_PAGE', { currentPage })
  }
}
