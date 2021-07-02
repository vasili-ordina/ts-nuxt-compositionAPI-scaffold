import { GetterTree, ActionTree, MutationTree } from "vuex/types/index";

interface statedataInterface {
    name: string,
    slug: string,
    title: string,
    description?: string,
    restricted?: boolean 
}
const statedata:statedataInterface[] = [
    {
        name: 'index',
        slug: '/',
        title: 'Home',
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
        name: 'login',
        slug: '/login',
        title: 'Account',
        description: 'change your personal information',
        restricted: true
    },   
    {
        name: 'login',
        slug: '/login',
        title: 'Log-in',
        restricted: false
    }
]
export const state = () => (statedata)