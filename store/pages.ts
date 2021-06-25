import { GetterTree, ActionTree, MutationTree } from "vuex/types/index";


interface Stateinterface {
    auth: Record<string, object>
}
const statedata: Stateinterface = {
    auth: {
        'notes': {
            title: 'Notes!',
            description: 'some description for notes',
            restricted: false
        },
        'login': {
            title: 'Log-in',
            restricted: false
        }
    }
}
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