<template>
  <v-container>
    <h1>{{ props.pageinfo }}</h1>
    <v-card
      v-for="note of notesdata"
      :key="note.id"
      class="my-6"
    >
      <v-card-title>{{ note.titel }}</v-card-title>
      <v-card-text>{{ note.note }}</v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref, useStore } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    pageinfo: { type: Object }
  },
  setup (props) {
    const store = useStore()
    const authenticated = ref()
    const notesdata = ref()
    onBeforeMount(async () => {
      const req = await store.dispatch('content/reqNotes')
      notesdata.value = await store.getters['content/allNotes']
    })
    return {
      notesdata,
      authenticated,
      props
    }
  }
})
</script>
