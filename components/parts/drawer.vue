<template>
  <nav>
    <v-icon @click.stop="settings = !settings">
      mdi-cog
    </v-icon>
    <v-navigation-drawer
      v-model="settings"
      :right="rightalign"
      width="auto"
      app
      absolute
      temporary
    >
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
    lefty: { default: false, type: Boolean }
  },
  setup (props) {
    let rightalign = ref(props.lefty)
    const settings = ref(null)
    return { settings, rightalign }
  }
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
