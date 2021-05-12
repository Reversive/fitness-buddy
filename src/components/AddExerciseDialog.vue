<template>

  <v-card>
    <div
        class="white--text cycle-footer-bg">
      <h2 class="d-inline-block ma-4">EXERCISE LIBRARY</h2>
      <span class="float-right d-inline-block">
        <v-btn
          depressed
          color="success"
          class="ma-4 font-weight-bold rounded-pill"
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
        <CExercisePreviewCard :exercise="exercise" :active="active" @exerciseSelected="[toggle($event), setSelectedExercise($event)]" />
      </v-slide-item>
      <v-slide-item>
        <CCreateExerciseCard v-on:createExerciseResult="handleCreateExerciseResult"/>
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
      <span class="pl-2 mt-4 float-right mr-5" v-if="!isRestExercise">
        <h3 class="d-inline-block mr-2">EXERCISE REPETITIONS:</h3>
        <v-text-field
          class="reps d-inline-block"
          outlined
          disabled
          v-model="repetitions"
          hide-details
          single-line
        />
      </span>
    </div>

    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" :multi-line="snackbar.mode === 'multi-line'" :timeout="snackbar.timeout" :top="snackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="snackbar.timeout === 0" icon @click="snackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>

    <v-snackbar v-model="errorSnackbar.visible" :color="errorSnackbar.color" :multi-line="errorSnackbar.mode === 'multi-line'" :timeout="errorSnackbar.timeout" :top="errorSnackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ errorSnackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ errorSnackbar.title }}</strong>
          </div>
          <div>{{ errorSnackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="errorSnackbar.timeout === 0" icon @click="errorSnackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>

  </v-card>
</template>

<script>
import ExercisePreviewCard from "./ExercisePreviewCard";
import ExerciseStore from "../stores/exerciseStore";
import CreateExerciseCard from "./CreateExerciseCard";

export default {
  name: "AddExerciseDialog",
  data: () => {
    return {
      model : null,
      snackbar : {
        color: "success",
        icon: "mdi-check-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 3500,
        title: "Success",
        text: "Exercise created successfully.",
        visible: false
      },
      errorSnackbar: {
        color: "error",
        icon: "mdi-close-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 4000,
        title: "Error",
        text: "Please select an exercise and input either the exercise duration or the amount of repetitions.",
        visible: false
      },
      exerciseStore: ExerciseStore,
      selectedExercise: null,
      duration : 0,
      repetitions: 0,
      isRestExercise: false,
    }
  },
  components: {
    CExercisePreviewCard : ExercisePreviewCard,
    CCreateExerciseCard : CreateExerciseCard,

  },
  methods: {
    addExerciseClicked() {
      if(!this.areRequirementsMet()) {
        this.errorSnackbar.visible = true;
        return null;
      }
      let currentExerciseIndex = this.exerciseStore.exercises.findIndex(e => e.id === this.selectedExercise);
      let currentExercise = this.exerciseStore.exercises[currentExerciseIndex];
      let payload = { duration: this.duration, repetitions: this.repetitions, exercise: currentExercise};
      this.$emit('exerciseAddedSuccessfully', payload);
      this.$emit('close-dialog');
      this.duration = 0;
      this.repetitions = 0;
      this.selectedExercise = null;
    },
    setSelectedExercise(selection) {
      this.selectedExercise = selection;
      let currentExerciseIndex = this.exerciseStore.exercises.findIndex(e => e.id === this.selectedExercise);
      let currentExercise = this.exerciseStore.exercises[currentExerciseIndex];
      this.isRestExercise = currentExercise.type === 'REST';
      return this.selectedExercise;
    },
    isExerciseSelected() {
      return this.selectedExercise !== null;
    },
    areRequirementsMet() {
      return this.isExerciseSelected() && (this.repetitions !== 0 || this.duration !== 0);
    },
    handleCreateExerciseResult(cancel) {
      if(cancel !== true) this.snackbar.visible = true;
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