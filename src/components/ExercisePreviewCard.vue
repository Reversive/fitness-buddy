<template>
  <v-card
      :color="active ? undefined : '#6F2DBD'"
      class="ma-4 rounded-lg"
      elevation="10"
      height="150"
      width="150"
      @click="onExerciseSelect"
  >
    <v-card-text class="text-center white--text">
      <h3>{{exercise.name}}</h3>
    </v-card-text>
    <v-img :src="exercise.image" contain height="70px"> </v-img>
  </v-card>
</template>

<script>
export default {
  name: "ExercisePreviewCard",
  props: {
    exercise: Object,
    active: Boolean
  },
  data : () => {
    return {
      selectedExercise : 0,
    }
  },
  methods: {
    onExerciseSelect() {
      if(this.active !== true) this.selectedExercise = this.exercise.id
      else this.selectedExercise = null;
      this.$emit('exerciseSelected', this.selectedExercise);
    },

  }
}
</script>

<style scoped>

</style>