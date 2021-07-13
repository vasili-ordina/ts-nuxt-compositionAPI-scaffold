<template>
  <v-container class="boxed">
    <h1>{{ props.pageinfo }}</h1>
    <v-card
      v-for="note of notesdata"
      :key="note.id"
      class="my-6 pa-6"
    >
      <v-card-title>{{ note.titel }}</v-card-title>
      <v-card-text v-html="$md.render(note.note)"></v-card-text>
      <v-card-actions>
        <!-- <v-btn :to="'overview/' + note.id" flat>lees meer</v-btn> -->
        <nuxt-link :to="'overview/' + note.id" class="mx-2">Lees meer</nuxt-link>
      </v-card-actions>
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
    const notesdata = ref([])
    onBeforeMount(async () => {
      await store.dispatch('content/reqNotes')
      notesdata.value = await store.getters['content/allNotes'].map((obj:any) => {
        let newNote = obj.note.replace('(/uploads', '(https://nuxt-vue3-scaffold.herokuapp.com/uploads');
        return { ...obj, ...{ note: newNote } }
      })
    })
    return {
      notesdata,
      authenticated,
      props
    }
  }
})
</script>
