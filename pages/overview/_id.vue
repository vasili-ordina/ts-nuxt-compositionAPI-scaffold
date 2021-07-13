<template>
  <v-container class="boxed">
    <v-sheet elevation="2" v-if="item" class="px-10 py-8">
      <h1>{{item.titel}}</h1>
      <div v-html="$md.render(item.note)" class="my-8"></div>
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
    $store.dispatch('content/getItem', { id: $route.value.params.id } ).then(() => {
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