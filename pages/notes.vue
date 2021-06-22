<template>
<v-container>
    <h1>Notes</h1>
    <v-card class="my-6" v-for="note of notesdata" v-if="authenticated">
        <v-card-title>{{note.titel}}</v-card-title>
        <v-card-text>{{note.note}}</v-card-text>
    </v-card>
    <v-card v-else>
        <p>not authenticated, please log-in</p>
        <nuxt-link to="login">to login</nuxt-link>
    </v-card>
</v-container>

</template>
<script lang="ts">
import { defineComponent, onMounted, ref, useStore } from "@nuxtjs/composition-api"
export default defineComponent({
    setup() {
        console.dir(useStore)
        const store = useStore()
        const authenticated = ref()
        let notesdata = ref()
        onMounted(async () => {
            authenticated.value = store.getters['auth/authenticated']
            let req = await store.dispatch('content/reqNotes')
            notesdata.value = await store.getters['content/allNotes']
            }
        )
        return { 
            notesdata,
            authenticated
        }
    }
})
</script>