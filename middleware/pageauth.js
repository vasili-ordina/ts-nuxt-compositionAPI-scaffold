export default function ({ store, redirect, route }) {
    // If the user is not authenticated
    // console.dir(store.getters['auth/authenticated'])
    // console.dir(store.state.pages.auth[route.name])
    if (!store.getters['auth/authenticated'] && store.state.pages.auth[route.name].restricted) {
       return redirect('/login?anticipated=' + route.path)
    }
  }