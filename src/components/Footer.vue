<template>
  <v-footer padless class="light-blue darken-2">
    <v-col
        class="text-center"
        cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Fitness Buddy</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>