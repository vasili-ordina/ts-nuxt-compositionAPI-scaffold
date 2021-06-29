<template>
  <v-app>
    <v-app-bar app>
      <h1>{{ pageinfo.title }}</h1>
      <h2>{{ pageinfo.meta[0].content }}</h2>
      <nuxt-link to="notes" style="float: right">To notes</nuxt-link>
    </v-app-bar>
    <v-main>
      <Nuxt v-if="setupReady" />
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
  setup() {
    const setupReady = ref(false);
    const store: any = useStore();
    const route: any = useRoute();
    const pageinfo = ref({
      // default values
      title: "",
      meta: [
        {
          name: "description",
          hid: "description",
          content: ""
        },
        {
          name: "og:description",
          hid: "opengraph-description",
          content: ""
        },
        {
          name: "og:title",
          hid: "opengraph-title",
          content: ""
        }
      ]
    });
    const authState = reactive(store.getters["auth/getAll"]);
    onBeforeMount(() => {
      if (!authState.jwt) {
        const auth = sessionStorage.getItem("auth");
        if (auth) store.commit("auth/SET_RESPONSE", { data: JSON.parse(auth) });
      }
    });
    watch(
      () => [authState.user, authState.jwt],
      () => {
        console.log("store.state has changed");
        if (process.browser && authState.jwt) {
          sessionStorage.setItem("auth", JSON.stringify(authState));
        }
      }
    );
    watch(
      route,
      () => {
        const currentPageObj = store.state.pages.auth[route.value.name];
        if (currentPageObj) {
          pageinfo.value = {
            title: currentPageObj.title,
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
    return { pageinfo, setupReady };
  },
  head: {}
});
</script>
<style>
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

