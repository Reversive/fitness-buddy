<template>

  <v-card>
    <div
        class="white--text cycle-footer-bg">
      <h2 class="d-inline-block ma-4">EXERCISE LIBRARY</h2>
      <span class="float-right d-inline-block">
        <v-btn
          depressed
          color="success"
          class="ma-4 font-weight-bold"
          @click="addExerciseClicked"
      >
      ADD TO CYCLE
    </v-btn></span>
    </div>
    <v-slide-group
      class="pa-4"
      v-model="model"
      active-class="success"
      show-arrows>
      <v-slide-item
        v-for="exercise in exerciseStore.exercises"
        :key="exercise.id"
        v-slot:default="{ active, toggle }" >
        <CExercisePreviewCard :exercise="exercise" :active="active" @exerciseSelected="[toggle($event), setSelectedExercise($event)]"/>
      </v-slide-item>
      <v-slide-item>
        <CCreateExerciseCard/>
      </v-slide-item>
    </v-slide-group>

    <div class="white--text cycle-footer-bg" >
        <h3 class="d-inline-block ml-3">EXERCISE DURATION:</h3>
        <v-text-field
            class="pa-4 d-inline-block mb-0 dur"
            outlined
            v-model="duration"
            hide-details
            single-line
        /><div class="text-h7 d-inline-block font-weight-bold">SECONDS</div>
      <span class="pl-2 mt-4 float-right mr-5">
        <h3 class="d-inline-block mr-2">EXERCISE REPETITIONS:</h3>
        <v-text-field
          class="reps d-inline-block"
          outlined
          v-model="repetitions"
          hide-details
          single-line
        />
      </span>
    </div>



  </v-card>
</template>

<script>
import ExercisePreviewCard from "./ExercisePreviewCard";
import ExerciseStore from "../stores/exerciseStore";
import CreateExerciseCard from "./CreateExerciseCard";

export default {
  name: "AddExercisePopup",
  data: () => {
    return {
      model : null,
      customModel : null,
      successExerciseMessage : 'Exercise created successfully',
      exerciseStore: ExerciseStore,
      selectedExercise: null,
      duration : 0,
      repetitions: 0 }
      },
  components: {
    CExercisePreviewCard : ExercisePreviewCard,
    CCreateExerciseCard : CreateExerciseCard,

  },
  methods: {
    addExerciseClicked() {
      if(this.selectedExercise == null) return null;
      if(this.duration === 0 && this.repetitions === 0) return null;
      let currentExercise = this.exerciseStore.exercises[this.selectedExercise];
      let payload = { duration: this.duration, repetitions: this.repetitions, exercise: currentExercise};
      this.$emit('addExerciseClicked', payload);
      this.$emit('close-dialog');
    },
    setSelectedExercise(selection) {
      this.selectedExercise = selection;
    }
  }
}
</script>

<style scoped>

.v-text-field--outlined >>> fieldset {
  border-color: white!important;
}
.v-text-field--outlined >>> label {
  color: white!important;
}
.v-text-field--outlined >>> input {
  color: white!important;
}

.reps {
  width: 45px!important;
}

.dur {
  width: 90px!important;
}

.cycle-footer-bg {
  background-color: #6F2DBD;
}

</style>