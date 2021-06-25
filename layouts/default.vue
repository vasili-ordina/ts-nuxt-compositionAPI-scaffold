<template>
  <v-app>
    <v-app-bar app
      ><h1>{{dynamicMeta.title}}</h1><h2>{{dynamicMeta.description}}</h2>
      <nuxt-link to="notes" style="float: right">To notes</nuxt-link></v-app-bar
    >
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer>
      footer..
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import { defineComponent, useStore, useRouter, useMeta } from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const dynamicMeta = store.state.pages.auth[router.history.current.name]
    useMeta(() => ({ 
      title: dynamicMeta.title,
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: dynamicMeta.description
        }
      ]
    }))
    return { dynamicMeta }
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
