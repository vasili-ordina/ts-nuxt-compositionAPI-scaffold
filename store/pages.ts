import { GetterTree, ActionTree, MutationTree } from "vuex/types/index";

interface statedataInterface {
    slug: string,
    title: string,
    description?: string,
    restricted?: boolean 
}
const statedata:Record<number, statedataInterface> = [
    {
        slug: '/',
        title: 'Home',
        restricted: false
    },
    {
        slug: '/overview?type=A',
        title: 'Overview A',
        description: 'some description for some overview',
        restricted: false
    },
    {
        slug: '/overview?type=B',
        title: 'Overview B (restricted)',
        description: 'some description for some overview',
        restricted: true
    },
    {
        slug: '/',
        title: 'About us',
        description: 'about us yoo',
        restricted: false
    },
    {
        slug: '/login',
        title: 'Account',
        description: 'change your personal information',
        restricted: true
    },   
    {
        slug: '/login',
        title: 'Log-in',
        restricted: false
    }
]
export const state = () => (statedata)

// export const state = () => {
//     auth: [
//         {
//             alias: 'notes',
//             title: 'Notes!',
//             restricted: true
//         },
//         {
//             alias: 'login',
//             title: 'Log-in',
//             restricted: false
//         }
//     ]
// }