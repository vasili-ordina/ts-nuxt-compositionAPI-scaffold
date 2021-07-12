// export default function ({ store, redirect, route }) {
//   // Redirect user if not authenticated
//   interface pagedataInterface {
//     name: string, // the name of the /page/[...] file indentified by Nuxt
//     slug: string, // target address for url's (shouldnt this be the same as name then? no, i.e.: '/' = 'index.vue')
//     title: string, // title that should be shown in <title> and top of the page as <h1>?
//     icon?: string, // icon to show in menu
//     description?: string, // meta description
//     restricted?: boolean // if restricted is true then you need to be logged-in
//   }

//   const authState = store.getters['auth/getAll']
//   if (!authState.jwt && process.browser) {
//     const auth = sessionStorage.getItem('auth')
//     if (auth) { store.commit('auth/SET_RESPONSE', { data: JSON.parse(auth) }) }
//   }

//   const allPages:pagedataInterface[] = store.getters['pages/getPages'];
//   const currentPage:pagedataInterface = allPages.find(obj => obj.name === route.name);
//   console.dir(currentPage)
//   if (!authState.authenticated && currentPage.restricted) {
//     console.log('auth: '+authState.authenticated)
//     return redirect('/account?anticipated=' + route.path)
//   }
// }
