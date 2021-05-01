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
                                                                      @click="$emit('cycleTrashClicked', cycle.order)">
        <v-icon color="error" x-large>mdi-trash-can</v-icon>
      </v-btn></span></div>
    <v-slide-group
        class="pt-4 pl-4 pr-4 pb-0"
        active-class="success"
        show-arrows
    >
      <!-- Iterar sobre ejercicios creados -->
      <v-slide-item
          v-for="n in 0"
          :key="n"
         >
        <CExerciseCard/>
      </v-slide-item>
      <v-slide-item>
        <CAddExerciseCard v-on:addExerciseSuccess="snackbar.visible = true"/>
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
  </v-container>

</template>

<script>
import AddExerciseCard from "./AddExerciseCard";
import ExerciseCard from "./ExerciseCard"
export default {

  name: "CycleCard",
  data: () => {
    return {
      cycleExercises : [],
      numbers: 0,
      snackbar : {
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
    cycle: Object,
    identifier: Number,
  },
  components: {
    CAddExerciseCard : AddExerciseCard,
    CExerciseCard : ExerciseCard
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

.cycle-footer-bg {
  background-color: #6F2DBD;
}


</style>