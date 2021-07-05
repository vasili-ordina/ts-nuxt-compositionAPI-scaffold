<template>
  <nav>
    <v-icon @click.stop="settings = !settings">mdi-cog</v-icon>
    <v-navigation-drawer 
      v-model="settings"
      :right="lefty"
      width="auto"
      app
      absolute 
      temporary>
      <v-list nav>
        <v-list-item-group active-class="white primary--text">
          <slot />
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    lefty: { default: false }
  },
  setup() {
    let settings = ref(null)
    return { settings }
  },
})
</script>
<style scoped>
 /*
 .contrastmode-switch {
  margin-top: 0;
  padding-top: 0;
}
 */
</style>
