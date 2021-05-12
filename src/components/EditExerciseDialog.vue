<template>
  <v-card>
    <div
        class="white--text title-bg">
      <h2 class="d-inline-block ma-4 text-uppercase">EDIT CYCLE EXERCISE</h2>
      <span class="float-right d-inline-block">
      <v-btn
          depressed
          color="success"
          class="my-4 mr-2 font-weight-bold"
          @click="handleSaveExercise"
      >
      SAVE
    </v-btn></span>
    </div>

    <v-form v-model="valid" ref="form">
      <v-container>
        <v-text-field
            v-model="duration"
            :rules="numberRule"
            label="DURATION"
            ref="dur"
            required
        ></v-text-field>


        <v-text-field
            v-model="repetitions"
            :rules="numberRule"
            label="REPETITIONS"
            ref="reps"
            required
        ></v-text-field>


      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import EditStore from "../stores/editStore";
export default {
  name: "EditExerciseDialog",
  data: () => {
    return {
      duration : EditStore.currentExercise.duration,
      repetitions : EditStore.currentExercise.repetitions,
      valid : false,
      numberRule: [
        v => Number.isInteger(Number(v)) || "The value must be an integer number"
      ],
    }
  },
  methods: {
    handleSaveExercise() {
      EditStore.currentExercise.duration = this.duration;
      EditStore.currentExercise.repetitions = this.repetitions;
      this.$emit('updateExercise');
    },
    async handleDeleteExercise() {
      const result = await this.$confirm('Do you really want to delete this exercise?', { title: 'WARNING' })
      if(result) {
        this.$emit('deleteExercise');
      }
    }
  }
}
</script>

<style scoped>

.title-bg {
  background-color: #6F2DBD;
}

</style>