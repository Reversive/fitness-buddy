<template>
  <v-btn  x-large
          class="white--text"
          text
          :title="button.title"
          @click="$router.push(button.route)">
    <v-icon left medium>
      {{ button.icon }}
    </v-icon> {{ button.caption }}
  </v-btn>
</template>

<script>
export default {
  name: "BasicButton",
  props: {
    button: Object
  }
}
</script>

<style scoped>

</style>