export default function ({ store, redirect, route }) {
    // Redirect user if not authenticated
   if (!store.getters['auth/authenticated'] && store.state.pages[route.name]?.restricted) {
       return redirect('/login?anticipated=' + route.path)
   }
}