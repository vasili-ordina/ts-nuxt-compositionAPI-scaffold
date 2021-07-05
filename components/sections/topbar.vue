<template>
  <v-app-bar app>
    <!-- Settings Navigation drawer -->
    <settingsDrawer>
      <v-list-item>
        <v-list-item-title>Licht- / Donkermodus</v-list-item-title>
        <v-list-item-action>
          <v-switch
            class="contrastmode-switch"
            v-model="$vuetify.theme.dark"
            append-icon="mdi-brightness-3"
            prepend-icon="mdi-brightness-5"
            persistent-hint
            hide-details
          ></v-switch>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Links- / Rechtshandig</v-list-item-title>
        <v-list-item-action>
          <v-switch
            class="contrastmode-switch"
            v-model="leftright"
            append-icon="mdi-hand-right"
            prepend-icon="mdi-hand-left"
            persistent-hint
            hide-details
          ></v-switch>
        </v-list-item-action>
      </v-list-item>
    </settingsDrawer>
    <v-spacer></v-spacer>
    <v-toolbar-title>{{ heading }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Account icon -->
    <v-btn :to="{ name: 'account' }" class="mr-2" small icon>
      <v-icon :color="auth ? 'green' : 'grey lighten-6'" small
        >mdi-account</v-icon
      >
    </v-btn>
    <!-- Navigation menu (pages) -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
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
import { defineComponent, ref } from "@nuxtjs/composition-api";
import Drawer from "@/components/parts/drawer.vue";
export default defineComponent({
  props: {
    heading: { type: String },
    auth: { type: Boolean },
    pages: { type: Array },
  },
  components: {
    settingsDrawer: Drawer,
  },
  setup() {
    let settings = ref(null);
    let leftright = ref(true)
    return { settings, leftright };
  },
});
</script>
<style scoped>
.v-list-item__action{
  width: 150px;
}
</style>