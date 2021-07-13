<template>
  <v-container>
    <loginPanel class="loginPanel mx-auto my-12" />
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LoginPanel from '@/components/sections/login_panel.vue'
export default defineComponent({
  components: {
    loginPanel: LoginPanel
  },
  setup () {
    return {}
  }
})
</script>
<style lang="scss">
.loginPanel{
  max-width: 374px;
}
</style>
