<template>
  <v-app-bar :class="lefty ? 'lefty' : ''" class="yoo" app>
    <!-- Settings Navigation drawer -->
    <settingsDrawer :lefty="lefty">
        <itmSwitch
          label="Licht- / Donkermodus"
          :model="$vuetify.theme.dark"
          rightIcon="mdi-brightness-3"
          leftIcon="mdi-brightness-5"
        />
        <itmSwitch 
          label="Links- / Rechtshandig"
          :model="lefty"
          rightIcon="mdi-hand-right"
          leftIcon="mdi-hand-left"
          reverseValues
        />
    </settingsDrawer>
    <v-spacer />
    <v-toolbar-title>{{ heading }}</v-toolbar-title>
    <v-spacer />
    <!-- Account icon -->
    <v-btn :to="{ name: 'account' }" class="mr-2" small icon>
      <v-icon
        :color="auth ? 'green' : 'grey lighten-6'"
        small
      >
        mdi-account
      </v-icon>
    </v-btn>
    <!-- Navigation menu (pages) -->
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn v-bind="attrs" icon v-on="on">
          <v-icon> mdi-menu </v-icon>
        </v-btn>
      </template>
      <v-list>
        <template v-for="(item, index) in pages">
          <v-list-item
            v-if="auth === item.restricted || item.restricted === false"
            :key="index"
            :to="item.slug"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Drawer from '@/components/parts/drawer.vue'
import ItmSwitch from '~/components/elements/switch_list-item__twostate--icons.vue'
export default defineComponent({
  components: {
    settingsDrawer: Drawer,
    itmSwitch: ItmSwitch
  },
  props: {
    heading: { type: String, required: false },
    auth: { type: Boolean },
    pages: { type: Array, required: false }
  },
  setup () {
    const settings = ref(null)
    const lefty = ref(false)
    return { settings, lefty }
  }
})
</script>
<style scoped>
.v-list-item__action{
  width: 150px;
}

.lefty /deep/ .v-toolbar__content {
  flex-direction: row-reverse !important;
}
</style>
