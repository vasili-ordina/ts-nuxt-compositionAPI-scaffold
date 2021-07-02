<template>
<v-container>
    <h1>{{props.pageinfo}}</h1>
    <template v-if="authenticated">
    <v-card 
        v-for="note of notesdata"
        :key="note.id"
        class="my-6" 
    >
        <v-card-title>{{note.titel}}</v-card-title>
        <v-card-text>{{note.note}}</v-card-text>
    </v-card>
    </template>
    <v-card v-else>
        <v-card-title>not authenticated, please log-in</v-card-title>
        <v-card-text>
            Voor deze content dient u te zijn ingelogd.    
        </v-card-text>
        <v-card-actions>
            <v-btn to="login">to login</v-btn>
        </v-card-actions>
    </v-card>
</v-container>

</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref, useStore } from "@nuxtjs/composition-api"
export default defineComponent({
    props: {
        pageinfo: { type: Object }
    },
    setup(props) {
        // console.dir(props)
        const store = useStore()
        const authenticated = ref()
        // const pageinfo = ref(props.pageinfo) || { title: 'something didnt work out' }
        let notesdata = ref()
        onBeforeMount(async () => {
            authenticated.value = store.getters['auth/authenticated']
            if(authenticated.value){
                let req = await store.dispatch('content/reqNotes')
                notesdata.value = await store.getters['content/allNotes']
            }
        })
        return { 
            notesdata,
            authenticated,
            props
        }
    }
})
</script>