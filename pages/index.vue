<template>
  <div class="container">
    <div>
      <h1 class="title">
        static title
      </h1>
      <div>
        <input :value="inpt" />
        <button @click="power()">power</button>
        <button @click="root()">root</button>
        <!-- <h2>{{result}}</h2> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useRoute, useStore, useMeta, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const store = useStore
    var inpt = ref<number>(2)
    const power = function () {
      inpt.value = Math.pow(inpt.value, 2)
    }
    const root = function () {
      inpt.value = Math.pow(inpt.value, 0.5)
    }
    const { $axios } = useContext();
    $axios.$get(`https://api.mockaroo.com/api/types?key=02439c80`)
    .then((r) => {
      console.log(r)
    })
    return { inpt, power, root }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

</style>
