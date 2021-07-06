<template>
  <v-list-item>
  <v-list-item-title>{{label}}</v-list-item-title>
  <v-list-item-action>
    <v-switch
      v-model="model"
      class="contrastmode-switch"
      :append-icon="rightIcon"
      :prepend-icon="leftIcon"
      :false-value="reverseValues"
      :true-value="!reverseValues"
      persistent-hint
      hide-details
    />
  </v-list-item-action>
</v-list-item>
</template>

<script lang="ts">
 import { defineComponent } from "@nuxtjs/composition-api"
 export default defineComponent({
   name: 'switch_list-item__twostate--icons',
   props: {
     label: { type: String },
     model: { required: true, type: Boolean },
     leftIcon: { type: String },
     rightIcon: { type: String },
     reverseValues: { type: Boolean, default: false}
   },
   setup(){
   }
 })
</script>

<style scoped>
.v-list-item__action{
  width: 150px;
}
</style>