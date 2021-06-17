<template>
    
</template>
<script lang="ts">
import { defineComponent, useContext, onMounted } from "@nuxtjs/composition-api"
export default defineComponent({
    setup() {
        var context = useContext()
        onMounted(() => {
            console.log('yooo')
            console.dir(context)
            context.store.dispatch('auth/fetchThings')
        })
    }
})
</script>