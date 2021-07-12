<template>
  <v-container class="boxed">
    <v-sheet elevation="2" v-if="item" class="px-8 py-6">
      <h1>{{item.titel}}</h1>
      <p>{{item.note}}</p>
    </v-sheet>
  </v-container>
</template>

<script>
import { defineComponent, useRoute, useStore, ref } from "@nuxtjs/composition-api"
export default defineComponent({
  setup() {
    const $route = useRoute();
    const $store = useStore();
    var item = ref()
    console.log($route)
    $store.dispatch('content/getItem', { id: $route.value.params.id } ).then(() => {
      console.log('some id of content:')
      console.dir($store.getters['content/allNotes'])
      item.value = $store.getters['content/allNotes']
    })
    return { item }
  }
})
</script>

<style scoped>
.v-sheet{
  min-height: 400px
}
</style>