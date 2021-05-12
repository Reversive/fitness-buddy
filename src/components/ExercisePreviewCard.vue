<template>
  <v-card
      :color="active ? undefined : '#6F2DBD'"
      class="ma-4 rounded-lg"
      elevation="10"
      height="160"
      width="180"
      @click="onExerciseSelect"
  >
    <div  class="mt-1 ">
      <v-btn icon class="ml-1" style="float:left;" @click.stop="editLibraryExercise" v-if="exercise.builtIn === false">
        <v-icon color="white">mdi-pencil</v-icon>
      </v-btn>

        <v-btn icon class="mr-1" style="float:right;" @click.stop="deleteLibraryExercise"  v-if="exercise.builtIn === false">
          <v-icon color="error">mdi-trash-can</v-icon>
        </v-btn>
      </div>
    <v-card-text class="text-center white--text">
      <h3 class="ml-5" v-if="exercise.builtIn === false">{{exercise.name}}</h3>
      <h3 v-if="exercise.builtIn === true">{{exercise.name}}</h3>
    </v-card-text>
    <v-img :src="exercise.image" contain height="70px"> </v-img>
    <v-dialog
        v-model="dialog"
        max-width="400px"
        persistent
    >
      <CCreateExerciseDialog @close-edit-dialog="dialog=false" :isEdit="true" :exerciseCache="exercise"/>
    </v-dialog>
  </v-card>

  
</template>

<script>
import CreateExerciseDialog from "./CreateExerciseDialog";
import {ExerciseApi} from "../api/exercise";
import ExerciseStore from "../stores/exerciseStore";
import RoutineStore from "../stores/routineStore";
export default {
  name: "ExercisePreviewCard",
  props: {
    exercise: Object,
    active: Boolean
  },
  data : () => {
    return {
      selectedExercise : 0,
      dialog: false
    }
  },
  components: {
    CCreateExerciseDialog : CreateExerciseDialog
  },
  methods: {
    onExerciseSelect() {
      if(this.active !== true) this.selectedExercise = this.exercise.id
      else this.selectedExercise = null;
      this.$emit('exerciseSelected', this.selectedExercise);
    },

    editLibraryExercise() {
      this.dialog = true;
    },
    async deleteLibraryExercise() {
      const result = await this.$confirm('Do you really want to delete this exercise from the library?', { title: 'WARNING' })
      if(result) {
        let deleteResponse = ExerciseApi.deleteExercise(this.exercise.id);
        deleteResponse.then(() => {
          RoutineStore.cycles.forEach(c => {
            let idx = c.cycle.exercises.findIndex(e => e.exercise.id === this.exercise.id);
            if(idx >= 0) c.cycle.exercises.splice(idx, 1);
          });
          let idx = ExerciseStore.exercises.findIndex(e => e.id === this.exercise.id);
          ExerciseStore.exercises.splice(idx, 1);
        });
      }
    }

  }
}
</script>

<style scoped>

</style>