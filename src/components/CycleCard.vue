<template>
  <v-container>
  <v-card
      class="rounded-lg"
      elevation="8"
      width="100%"
      color="white"
  >
    <div class="mx-5 pt-1"><span class="float-right"><v-btn class="ml-5" icon
                                                                      x-large
                                                                      @click="deleteCycleCard">
        <v-icon color="error" x-large>mdi-trash-can</v-icon>
      </v-btn></span></div>
    <v-slide-group
        class="pt-4 pl-4 pr-4 pb-0"
        active-class="success"
        show-arrows
    >

      <v-slide-item
          v-for="exercise in exercises"
          :key="exercise.id"
         >
        <CExerciseCard :exercise-info="exercise" @click.native="handleEditExercise(exercise)" class="clickable-cursor" :key="exercise.id"/>
      </v-slide-item>
      <v-slide-item>
        <CAddExerciseCard v-on:addExerciseSuccess="addExerciseToCycleArray"/>
      </v-slide-item>
    </v-slide-group>
    <div class="white--text cycle-footer-bg">
      <h3 class="d-inline-block ml-3">CYCLE NAME:</h3>
      <v-text-field
          class="pa-4 d-inline-block mb-0"
          clearable
          flat
          hide-details
          outlined
      />
      <span class="pl-2 mt-4 float-right mr-5">
      <h3 class="d-inline-block mr-2">CYCLE REPETITIONS:</h3>
      <v-text-field
          class="reps d-inline-block"
          outlined
          hide-details
          single-line
      />
    </span>
    </div>
  </v-card>
    <v-snackbar v-model="exerciseSuccessSnackbar.visible" :color="exerciseSuccessSnackbar.color" :multi-line="exerciseSuccessSnackbar.mode === 'multi-line'" :timeout="exerciseSuccessSnackbar.timeout" :top="exerciseSuccessSnackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ exerciseSuccessSnackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ exerciseSuccessSnackbar.title }}</strong>
          </div>
          <div>{{ exerciseSuccessSnackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="exerciseSuccessSnackbar.timeout === 0" icon @click="exerciseSuccessSnackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>

    <v-dialog
        v-model="editDialog"
        width="500"
    >
      <CEditExerciseDialog v-on:deleteExercise="deleteExercise" v-on:updateExercise="updateExercise" :key="counter"/>
    </v-dialog>

  </v-container>



</template>

<script>
import AddExerciseCard from "./AddExerciseCard";
import ExerciseCard from "./ExerciseCard"
import RoutineStore from "../stores/routineStore";
import EditExerciseDialog from "./EditExerciseDialog";
import EditStore from "../stores/editStore";
export default {
  name: "CycleCard",
  data: () => {
    return {
      exercises : [],
      editDialog: false,
      counter: 0,
      exerciseSuccessSnackbar : {
        color: "success",
        icon: "mdi-check-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 3500,
        title: "Success",
        text: "Exercise added successfully.",
        visible: false
      }
    }
  },
  props: {
    identifier: Number,
  },
  components: {
    CAddExerciseCard : AddExerciseCard,
    CExerciseCard : ExerciseCard,
    CEditExerciseDialog : EditExerciseDialog
  },
  methods: {
    addExerciseToCycleArray(payload) {
      this.exerciseSuccessSnackbar.visible = true;
      this.exercises = this.getCycleExercises();
      this.getCycleExercises().push(payload);
    },
    async deleteCycleCard() {
      const result = await this.$confirm('Do you really want to delete this cycle?', { title: 'WARNING' })
      if(result) {
        this.$emit('cycleTrashClicked', this.identifier);
      }

    },
    getCycleExercises() {
      let index = RoutineStore.cycles.findIndex(c => c.cycle.order === this.identifier);
      return RoutineStore.cycles[index].cycle.exercises;
    },
    deleteExercise() {
      this.editDialog = false;
      let exercises = this.getCycleExercises();
      let idx = exercises.findIndex(e => e.id === EditStore.currentExercise.id);
      exercises.splice(idx, 1);
    },
    updateExercise() {
      this.editDialog = false;
      let idx = this.getCycleExercises().findIndex(e => e.id === EditStore.currentExercise.id);

      this.getCycleExercises()[idx].duration = EditStore.currentExercise.duration;
      this.getCycleExercises()[idx].repetitions = EditStore.currentExercise.repetitions;
      console.log(this.getCycleExercises()[idx]);
    },
    handleEditExercise(exercise) {
      this.counter++;
      EditStore.currentExercise = exercise;
      this.editDialog = true;
    }
  },
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

.cycle-footer-bg {
  background-color: #6F2DBD;
}

.clickable-cursor {
  cursor: pointer;
}


</style>