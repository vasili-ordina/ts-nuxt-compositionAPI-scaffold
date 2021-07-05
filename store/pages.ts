import { GetterTree, ActionTree, MutationTree } from "vuex/types/index";

interface statedataInterface {
    name: string, // the name of the /page/[...] file indentified by Nuxt 
    slug: string, // target address for url's (shouldnt this be the same as name then? no, i.e.: '/' = 'index.vue')
    title: string, // title that should be shown in <title> and top of the page as <h1>?
    icon?: string, // icon to show in menu 
    description?: string, // meta description
    restricted?: boolean // if restricted is true then you need to be logged-in
}

const statedata:statedataInterface[] = [
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
        restricted: false
    },
    {
        name: 'overview',
        slug: '/overview?type=B',
        title: 'Overview (restricted)',
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
export const state = () => (statedata)