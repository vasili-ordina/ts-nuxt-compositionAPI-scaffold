<template>
<v-container>
    <v-card
        :loading="data.loading"
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
        <template v-if="data.authorized">
            <v-card-title>Ingelogd</v-card-title>
            <v-card-text>U bent ingelogd als: {{data.username}} ({{data.email}})</v-card-text>
            <v-card-actions>
                <v-btn
                    @click="logout()"
                >
                Uitloggen
                </v-btn>
            </v-card-actions>
        </template>
        <template v-else>
            <v-card-title>Inloggen</v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="data.username"
                    label="Gebruikersnaam"
                    hide-details="auto"
                ></v-text-field>
                <v-text-field
                    v-model="data.password"
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
        </template>
    </v-card>
    <v-snackbar
        :color="data.snackbar.color + ' darken-2'"
        v-model="data.snackbar.state"
        :timeout="data.snackbar.timeout"
    >
    {{data.snackbar.txt}}
    </v-snackbar>
</v-container>

</template>
<script lang="ts">
import { defineComponent, ref, reactive, useStore } from "@nuxtjs/composition-api"
export default defineComponent({
    setup() {
        const store = useStore()
        const data = reactive({
            authorized: <boolean>store.getters['auth/authenticated'],
            loading: false,
            snackbar: <any>{
                state: false,
                txt: '',
                timeout: 2000,
                color: 'dark'
            },
            username: <string>store.getters['auth/getUserInfo'].username || '',
            password: '',
            email: <string>store.getters['auth/getUserInfo'].email || ''
        })
        const logout = () => {    
            data.username = '';
            data.password = '';
            store
            .dispatch('auth/logout')
            .then( () => {
                data.snackbar = {
                    state: true,
                    color: 'orange',
                    txt: 'Succesvol uitgelogd'
                }
                data.authorized = store.getters['auth/authenticated']
            })
        }
        const login = () => {
            data.loading = true
            store
            .dispatch('auth/login', { username: data.username, password: data.password })
            .then( () => { 
                data.loading = false
                data.authorized = store.getters['auth/authenticated']
                data.email = store.getters['auth/getUserInfo'].email
                if (data.authorized) {
                    data.snackbar = {
                        state: true,
                        color: 'green',
                        txt: 'Succesvol ingelogd!'
                    }
                } else {
                    throw 'unknown auth error.'
                }
            })
            .catch( (e) => { 
                Object.assign(data,{
                    loading: false,
                    authorized: false,
                    snackbar: {
                        state: true,
                        color: 'red',
                        txt: store.getters['auth/getErrorMssg'] ||  'error: ' + e
                    }
                })
            })
        }
        return { 
            data,
            login,
            logout
        }
    }
})
</script>