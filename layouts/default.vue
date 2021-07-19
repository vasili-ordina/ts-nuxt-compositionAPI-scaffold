<template>
  <v-app>
    <topbar
      v-if="setupReady"
      :heading="`${pageinfo.header}  ${route.query.type ? route.query.type : ''}`"
      :auth="authenticated"
      :pages="allPages"
    />
    <v-main>
      <!-- Main page / template load -->
      <Nuxt v-if="setupReady" />
      <div v-else class="text-center mt-12">
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
    </v-main>
    <!-- Footer -->
    <footerbar />
  </v-app>
</template>
<script lang="ts">
import {
  watch,
  computed,
  defineComponent,
  useContext,
  useStore,
  useRoute,
  useRouter,
  useMeta,
  ref,
  reactive,
  onBeforeMount,
  onMounted
} from '@nuxtjs/composition-api'

import Topbar from '@/components/sections/topbar.vue'
import Footer from '@/components/sections/footer.vue'
export default defineComponent({
  name: 'Default',
  components: {
    topbar: Topbar,
    footerbar: Footer
  },
  head: {},
   setup () {
    interface pagedataInterface {
      name: string, // the name of the /page/[...] file indentified by Nuxt
      slug: string, // target address for url's (shouldnt this be the same as name then? no, i.e.: '/' = 'index.vue')
      title: string, // title that should be shown in <title> and top of the page as <h1>?
      icon?: string, // icon to show in menu
      description?: string, // meta description
      restricted?: boolean // if restricted is true then you need to be logged-in
    }

    var setupReady = ref(false)
    const context: any = useContext()
    const store: any = useStore()
    const route: any = useRoute()
    const router: any = useRouter()
    const pageinfo = ref({})
    const authenticated = computed(() => store.getters['auth/getAuthenticated'])
    const allPages:pagedataInterface[] = reactive(store.getters['pages/getPages'])

    // getting meta data for page keyed by the current routename
    store.dispatch('pages/findCurrentPage', { routeName: route.value.name })
    const currentPage:pagedataInterface = reactive(store.getters['pages/getCurrentPage'])
    const { title, meta } = useMeta()
    title.value = currentPage.title+(currentPage.description? ` - ${currentPage.description}`:'')
    meta.value = [
      {
        name: 'description',
        hid: 'description',
        content: currentPage.description||''
      },
      {
        name: 'og:title',
        hid: 'opengraph-title',
        content: currentPage.title
      },
      {
        name: 'og:description',
        hid: 'opengraph-description',
        content: currentPage.description||''
      }
    ]

    watch(
      route,
      async function () {

        // if auth then store it in sessionStorage
        const authState = await store.getters['auth/getAll']
        if(!authState.jwt && process.browser) {
          const auth = await sessionStorage.getItem('auth')
          if(auth) { store.commit('auth/SET_RESPONSE', { data: JSON.parse(auth) })} 
        }

        // redirect when is not authenticated
        if(!authState.authenticated && currentPage?.restricted) {
          router.push({ name: 'account', params: { anticipated: route.path } })
        }
        setupReady.value = true
      },
      { immediate: true }
    )

    return { allPages, pageinfo, route, authenticated, setupReady }
  }
})
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
</style>
<style>
.boxed{
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
}
</style>
