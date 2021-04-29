<template>

  <v-card>
    <v-toolbar
        color="#6F2DBD"
        dark
    ><h2>EXERCISE LIBRARY</h2></v-toolbar>
    <v-card-text>

    </v-card-text>
    <v-toolbar
        color="#6F2DBD"
        dark
    ><h2>CUSTOM EXERCISE LIBRARY</h2></v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "AddExercisePopup",
  data: () => {
    return {
      exercises: [],
      selectedExercise: 0,
    }
  }
}
</script>

<style scoped>

</style>