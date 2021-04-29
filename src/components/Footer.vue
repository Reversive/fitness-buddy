<template>
  <v-footer padless color="#6F2DBD">
    <v-col
        class="text-center white--text"
        cols="12"
    >
      {{ new Date().getFullYear() }} - <h2 class="d-inline-flex white--text">FITNESS BUDDY</h2>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

* {
  font-family: 'Open Sans', sans-serif;
  font-size: large;
}

</style>