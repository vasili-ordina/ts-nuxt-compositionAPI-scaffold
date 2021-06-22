<template>
<v-container>
    <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
    >
        <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
        </template>
        <v-card-title>Inloggen</v-card-title>
        <v-card-text>
            <v-text-field
                v-model="username"
                label="Gebruikersnaam"
                hide-details="auto"
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Wachtwoord"
                type="password"
                hide-details="auto"
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="deep-purple lighten-2"
                text
                @click="login()"
            >
                Inloggen
            </v-btn>
        </v-card-actions>
    </v-card>
    <nuxt-link to="notes">To notes</nuxt-link>
</v-container>

</template>
<script lang="ts">
import { defineComponent, onMounted, ref, useStore } from "@nuxtjs/composition-api"
export default defineComponent({
    setup() {
        console.dir(useStore)
        const store = useStore()
        let loading = ref(false)
        let username = ref('')
        let password = ref('')
        const login = () => { 
            store.dispatch('auth/login', { username: username.value, password: password.value }) 
        }
        onMounted(() => {
        })
        return { 
            username, 
            password, 
            loading,
            login
        }
    }
})
</script>