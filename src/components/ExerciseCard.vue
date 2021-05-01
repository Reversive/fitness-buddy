<template>
  <v-card
      color="#6F2DBD"
      class="ma-4 rounded-lg"
      elevation="10"
      height="225"
      width="225"
  >

    <v-card-text class="text-center white--text">
      <h3>{{exerciseInfo.exercise.name}}</h3>
    </v-card-text>
    <v-img :src="exerciseInfo.exercise.image" contain height="70px"> </v-img>
    <div>
      <v-row class="mt-2 mx-1">
        <v-col><h4 class="white--text">Duration</h4></v-col>
        <v-col><h4 class="white--text">Repetitions</h4></v-col>
      </v-row>
      <v-row class="text-center" dense>
        <v-col>
          <h4 class="white--text" v-if="exerciseInfo.duration !== 0">{{ exerciseInfo.duration }} sec.</h4>
          <h4 class="white--text" v-else>-</h4>
        </v-col>
        <v-col>
          <h4 class="white--text mr-2" v-if="exerciseInfo.repetitions !== 0">{{ exerciseInfo.repetitions }}</h4>
          <h4 class="white--text mr-2" v-else>-</h4>
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
  }
}
</script>

<style scoped>

</style>