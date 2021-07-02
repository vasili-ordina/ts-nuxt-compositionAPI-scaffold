<template>
  <v-app>
    <v-app-bar app>
      <v-switch
        v-model="$vuetify.theme.dark"
        append-icon="mdi-brightness-3"
        prepend-icon="mdi-brightness-5"
        persistent-hint
        hide-details
      >
      </v-switch>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ pageinfo.header }} {{ route.query.type }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/login" class="mr-2" icon>
        <v-icon :color="authState.authenticated ? 'green' : 'grey lighten-6'">mdi-account</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
          v-bind="attrs"
          v-on="on"
          icon>
            <v-icon>
              mdi-menu
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <template v-for="(item, index) in allPages">
            <v-list-item
              v-if="authState.authenticated === item.restricted || item.restricted === false"
              :key="index" 
              :to="item.slug"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
         </template>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <Nuxt v-if="setupReady" :pageinfo="pageinfo" />
      <div v-else class="text-center mt-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-main>
    <v-footer>
      footer..
    </v-footer>
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

export default defineComponent({
  name: 'default',
  setup() {
    interface routeObjI {
      slug: string,
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
    const allPages = reactive(store.state.pages) // <Record<number, routeObjI>>
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
        const currentPageObj = allPages.find( (obj) => obj.name === route.value.name )
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
<style lang="scss">
// @import '~vuetify/src/styles/styles.sass';
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

