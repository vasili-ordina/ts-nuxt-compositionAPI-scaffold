<template>
  <v-app>
    <topbar
      :heading="`${pageinfo.header}  ${route.query.type ? route.query.type : ''}`"
      :auth="authState.authenticated"  
      :pages="allPages"
    />
    <v-main>
      <!-- Main page / template load -->
      <Nuxt v-if="setupReady" :pageinfo="pageinfo" />
      <div v-else class="text-center mt-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-main>
    <!-- Footer -->
    <footerbar />
  </v-app>
</template>
<script lang="ts">
import {
  watch,
  defineComponent,
  useStore,
  useRoute,
  useMeta,
  ref,
  reactive,
  onBeforeMount,
  onMounted
} from "@nuxtjs/composition-api";

import Topbar from "@/components/sections/topbar.vue"
import Footer from "@/components/sections/footer.vue"

export default defineComponent({
  name: 'default',
  components: {
    'topbar': Topbar,
    'footerbar': Footer,
  },
  setup() {
    interface routeObjI {
      name: string,
      title: string,
      header: string,
      description?: string,
      restricted?: boolean 
    }
    const setupReady = ref(false);
    const store: any = useStore();
    const route: any = useRoute();
    const pageinfo = ref({});
    const authState = reactive(store.getters["auth/getAll"]);
    const allPages:routeObjI[] = reactive(store.state.pages) // <Record<number, routeObjI>>
    onBeforeMount(() => {
      if (!authState.jwt) {
        const auth = sessionStorage.getItem("auth");
        if (auth) store.commit("auth/SET_RESPONSE", { data: JSON.parse(auth) });
      }
    });
    watch(
      () => [authState.user, authState.jwt],
      () => {
        if (process.browser && authState.jwt) {
          sessionStorage.setItem("auth", JSON.stringify(authState));
        }
      }
    );
    watch(
      route,
      () => {
        const currentPageObj = allPages.find( (obj) => obj.name === route.value.name);
        if (currentPageObj) {
          pageinfo.value = {
            header: currentPageObj.title, 
            title: currentPageObj.title + (currentPageObj.description ? ` - ${currentPageObj.description}` : ``),
            meta: [
              {
                name: "description",
                hid: "description",
                content: currentPageObj.description || ""
              },
              {
                name: "og:title",
                hid: "opengraph-title",
                content: currentPageObj.title
              },
              {
                name: "og:description",
                hid: "opengraph-description",
                content: currentPageObj.description || ""
              }
            ]
          };
        }
      },
      { immediate: true }
    );
    useMeta(() => pageinfo.value);
    onMounted(() => {
      setupReady.value = true;
    });
    return { allPages, pageinfo, setupReady, authState, route };
  },
  head: {}
});
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

// html {
//   font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
//     Roboto, "Helvetica Neue", Arial, sans-serif;
//   font-size: 16px;
//   word-spacing: 1px;
//   -ms-text-size-adjust: 100%;
//   -webkit-text-size-adjust: 100%;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-font-smoothing: antialiased;
//   box-sizing: border-box;
// }

// *,
// *::before,
// *::after {
//   box-sizing: border-box;
//   margin: 0;
// }

// .button--green {
//   display: inline-block;
//   border-radius: 4px;
//   border: 1px solid #3b8070;
//   color: #3b8070;
//   text-decoration: none;
//   padding: 10px 30px;
// }

// .button--green:hover {
//   color: #fff;
//   background-color: #3b8070;
// }

// .button--grey {
//   display: inline-block;
//   border-radius: 4px;
//   border: 1px solid #35495e;
//   color: #35495e;
//   text-decoration: none;
//   padding: 10px 30px;
//   margin-left: 15px;
// }

// .button--grey:hover {
//   color: #fff;
//   background-color: #35495e;
// }
</style>

