<template>
  <v-card>

    <div
        class="white--text title-bg">
      <h2 class="d-inline-block ma-4">EDIT EXERCISE</h2>
      <span class="float-right d-inline-block">
        <v-btn
            depressed
            color="error"
            class="my-4 mr-4 font-weight-bold"
            @click="handleDeleteExercise"
        >
      DELETE
    </v-btn>
      <v-btn
          depressed
          color="success"
          class="my-4 mr-2 font-weight-bold"
          @click="handleSaveExercise"
      >
      SAVE
    </v-btn></span>
    </div>

    <v-form v-model="valid">
      <v-container>
        <v-text-field
            v-model="duration"
            :rules="numberRule"
            label="DURATION"
            required
        ></v-text-field>


        <v-text-field
            v-model="repetitions"
            :rules="numberRule"
            label="REPETITIONS"
            required
        ></v-text-field>


      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "EditExerciseDialog",
  props: {
    exerciseInfo : Object
  },
  data: () => {
    return {
      duration : 0,
      repetitions : 0,
      valid : false,
      numberRule: [
        v => Number.isInteger(Number(v)) || "The value must be an integer number"
      ],
    }
  },
  methods: {
    handleSaveExercise() {
      this.$emit('updateExercise', this.repetitions, this.duration, this.exerciseInfo.id);
    },
    async handleDeleteExercise() {
      const result = await this.$confirm('Do you really want to delete this exercise?', { title: 'WARNING' })
      if(result) {
        this.$emit('deleteExercise', this.exerciseInfo.id);
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