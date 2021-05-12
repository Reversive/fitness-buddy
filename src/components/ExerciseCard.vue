<template>
  <v-card
      color="#6F2DBD"
      class="ma-4 rounded-lg"
      elevation="10"
      height="225"
      width="225"
      @click="editExerciseClicked"
  >

    <v-card-text class="white--text mb-1 pt-0 pr-1">
      <div class="d-inline-block" style="float: right">
        <v-btn icon @click.stop="deleteExerciseClicked">
          <v-icon color="error" size="27">mdi-trash-can</v-icon>
        </v-btn>
      </div>
      <h3 class="text-center pt-3 pl-6 text-uppercase mt-2">{{exerciseInfo.exercise.name}}</h3>
    </v-card-text>
    <v-img :src="exerciseInfo.exercise.image" contain height="70px"> </v-img>
    <div>
      <v-row class="mt-4 mx-1">
        <v-col><h5 class="white--text text-uppercase">Duration</h5></v-col>
        <v-col><h5 class="white--text text-uppercase">Repetitions</h5></v-col>
      </v-row>
      <v-row class="text-center" dense>
        <v-col>
          <h5 class="white--text text-uppercase" v-if="exerciseInfo.duration !== 0">{{ exerciseInfo.duration }} sec.</h5>
          <h5 class="white--text text-uppercase" v-else>-</h5>
        </v-col>
        <v-col>
          <h5 class="white--text mr-2 text-uppercase" v-if="exerciseInfo.repetitions !== 0">{{ exerciseInfo.repetitions }}</h5>
          <h5 class="white--text mr-2 text-uppercase" v-else>-</h5>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ExerciseCard",
  props: {
    exerciseInfo : Object
  },
  methods: {
    deleteExerciseClicked() {
      this.$emit('deleteExerciseClicked');
    },
    editExerciseClicked() {
      this.$emit('editExerciseClicked');
    }
  }
}
</script>

<style scoped>

</style>