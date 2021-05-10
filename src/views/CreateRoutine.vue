<template>

  <div class="my-6 mx-15">
    <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        fixed
        bottom
        elevation="10"
        right
        dark
        color="#6F2DBD"
        @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
    <v-sheet
        class="rounded-lg pb-5"
        color="#6F2DBD"
        elevation="15"
        width="100%"
    >
    <v-container>
    <h2 class="text-left pt-2 d-inline-block" style="color: white">
      <v-icon large color="white" class="pr-3 mb-1" >mdi-clipboard-text</v-icon>ROUTINE CREATION
    </h2>

    <v-text-field
        v-model="routine.name"
        label="Routine Name"
        class="mt-2 text--white"
        color="white"
        outlined
        clearable
        hide-details
    />
    </v-container>
      <v-container class="mt-2">

        <h3 class="white--text d-inline-block">
          SELECT CATEGORY:
        </h3>
        <v-autocomplete
            :items="types.categories"
            v-model="routine.category"
            class="white--text d-inline-block ml-2"
            full-width
            deletable-chips
            hide-details
            hide-no-data
            hide-selected
            outlined
            single-line
        ></v-autocomplete>

        <span class="pl-2 float-right mr-5 ">
        <h3 class="white--text text-right d-inline-block">
          SELECT DIFFICULTY:
        </h3>
        <v-autocomplete
            :items="types.difficulties"
            v-model="routine.difficulty"
            class="white--text d-inline-block ml-2"
            full-width
            hide-details
            hide-no-data
            hide-selected
            outlined
            single-line
        />
    </span>
      </v-container>
    <div v-for="cycle_type in types.cycleTypes" :key="cycle_type.name" class="mt-0">
      <CCycleCardTitle :text="cycle_type.name" :icon="cycle_type.icon" />
      <div v-for="c in routine.cycles" :key="c.cycle.order" >
        <CCycleCard   v-if="c.cycle.type === cycle_type"
                      :identifier="c.cycle.order"
                      v-on:cycleTrashClicked="removeSection"
                      />
      </div>
      <CAddCycleCard @addCyclePressed="addCycle(cycle_type)"/>
    </div>
    <v-container class="mb-5">
      <span class="float-right d-inline-block">
          <v-btn
              depressed
              color="error"
              @click="handleCancelClick"
              class="font-weight-bold mr-5 rounded-pill"
          >
            CANCEL
          </v-btn>
          <v-btn
              depressed
              color="success"
              class="font-weight-bold rounded-pill"
              @click="handleRoutineCreation"
          >
            CREATE ROUTINE
          </v-btn>
      </span>

    </v-container>

    </v-sheet>
    <v-snackbar v-model="successSnackbar.visible" :color="successSnackbar.color" :multi-line="successSnackbar.mode === 'multi-line'" :timeout="successSnackbar.timeout" :top="successSnackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ successSnackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ successSnackbar.title }}</strong>
          </div>
          <div>{{ successSnackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="successSnackbar.timeout === 0" icon @click="successSnackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="missingFieldSnackbar.visible" :color="missingFieldSnackbar.color" :multi-line="missingFieldSnackbar.mode === 'multi-line'" :timeout="missingFieldSnackbar.timeout" :top="missingFieldSnackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ missingFieldSnackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ missingFieldSnackbar.title }}</strong>
          </div>
          <div>{{ missingFieldSnackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="missingFieldSnackbar.timeout === 0" icon @click="missingFieldSnackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
  </div>

</template>

<script>
import CycleCard from "../components/CycleCard";
import AddCycleCard from "../components/AddCycleCard";
import CycleCardTitle from "../components/CycleCardTitle";
import RoutineStore from "../stores/routineStore"
import ExerciseStore from "../stores/exerciseStore";
import TypeStore from "../stores/typeStore";
import {CategoryApi, Category} from "../api/category";
import {Routine, RoutineApi} from "../api/routine";
import {Cycle, CycleApi} from "../api/cycle";
import {ExerciseApi, Exercise, Image} from "../api/exercise";
import {CycleExerciseApi, CycleExercise} from "../api/cycleExercise";


export default {
  name: "CreateRoutine",
  components: {
    CCycleCard : CycleCard,
    CAddCycleCard : AddCycleCard,
    CCycleCardTitle : CycleCardTitle,
  },
  data : function () {
    return {
      routineIdentifier: 0,
      types : TypeStore,
      fab: false,
      routine: RoutineStore,
      successSnackbar: {
        color: "success",
        icon: "mdi-check-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 3500,
        title: "Success",
        text: null,
        visible: false
      },
      missingFieldSnackbar: {
        color: "error",
        icon: "mdi-close-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 4500,
        title: "Error",
        text: null,
        visible: false
      },
      cycleNumber: 1,
    }
  },
  destroyed() {
    RoutineStore.clearRoutine();
  },
  async mounted() {
    CategoryApi.get().then(response => {
      if(response.totalCount === 0) {
        TypeStore.categories.forEach(e => {
          let category = new Category(e.text, "");
          let response = CategoryApi.add(category);
          e.id = response.id;
        });
      } else {
        TypeStore.categories.forEach(e => {
          let idx = response.content.findIndex(c => c.name === e.text);
          e.id = response.content[idx].id;
        });
      }
    }).catch(() => {
      console.error('Something went wrong setting up categories');
    });

    ExerciseApi.get().then(response => {
      if(response.totalCount === 0) {
        ExerciseStore.exercises.forEach(e => {
          let exercisePayload = new Exercise(e.name, "", "exercise");
          let exerciseResponse = ExerciseApi.add(exercisePayload);
          exerciseResponse.then(exercise => {
            e.id = exercise.id;
            let image = new Image(e.image);
            ExerciseApi.addImage(e.id, image);
          });

        });
      } else {
        response.content.forEach(e => {
          let exerciseImageResponse = ExerciseApi.getImage(e.id);
          exerciseImageResponse.then(image => {
            let currentImage = image.content[0].url;
            let idx = ExerciseStore.exercises.findIndex(ex => ex.name === e.name);
            if(idx === -1) {
              ExerciseStore.exercises.push({id: e.id, name: e.name, image: currentImage });
            } else {
              ExerciseStore.exercises[idx].id = e.id;
            }
          });

        });
      }
    }).catch(() => {
      console.error('Something went wrong setting up exercises');
    });

  },
  methods : {
    addCycle(cycle_type) {
      let cycle = {
        name: "NEW CYCLE",
        type: cycle_type,
        position: 0,
        order: this.cycleNumber++,
        repetitions: 1,
        exercises: []
      };
      let index = this.routine.cycles.reverse().findIndex(c => c.cycle.type === cycle_type);
      this.routine.cycles.splice(index, 0, ({cycle: cycle, exists: false}));
      this.routine.cycles.reverse();
    },
    removeSection(order) {
      this.successSnackbar.text = "Cycle deleted successfully.";
      this.successSnackbar.visible = true;
      let index = this.routine.cycles.findIndex(c => c.cycle.order === order);
      this.routine.cycles.splice(index, 1);
    },
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    getRoutineCategory() {
      let categoryIdx = TypeStore.categories.findIndex(e => e.text === this.routine.category);
      return TypeStore.categories[categoryIdx];
    },
    printError() {
      this.missingFieldSnackbar.text = this.missingFieldSnackbar.text.slice(0, this.missingFieldSnackbar.text.length - 2);
      this.missingFieldSnackbar.visible = !this.missingFieldSnackbar.visible;
    },
    async handleRoutineCreation() {
      if(this.isRoutineFieldMissing()) {
        this.printError();
        return;
      }
      let category = this.getRoutineCategory();
      let routinePayload = new Routine(this.routine.name, "", true, this.routine.difficulty.toLowerCase(), category.id);
      let routineResponse = RoutineApi.add(routinePayload);
      await routineResponse.then(routine => {
        this.routine.cycles.forEach(c => {
            let cyclePayload = new Cycle(c.cycle.name, "", c.cycle.type.name.toLowerCase(), c.cycle.order, parseInt(c.cycle.repetitions));
            let cycleResponse = CycleApi.add(routine.id, cyclePayload);
            cycleResponse.then(cycle => {
              c.cycle.exercises.forEach(e => {
                let exercisePayload = new CycleExercise(e.order, parseInt(e.duration), parseInt(e.repetitions));
                let exerciseResponse = CycleExerciseApi.add(cycle.id, e.exercise.id, exercisePayload);
                exerciseResponse.then(exercises => console.log(exercises));
              });
            }).catch((e) => {
              console.error(e);
            });
        });
      }).catch(() => {
        console.error('Something went wrong setting up the routine');
      });
      this.successSnackbar.visible = true;
      this.successSnackbar.text = "Routine created successfully";
      await this.routine.clearRoutine();
    },
    isRoutineFieldMissing() {
      this.missingFieldSnackbar.text = "Please fill ";
      let isMissing = false;
      if(this.routine.name === null) {
        this.missingFieldSnackbar.text += "routine name, ";
        isMissing = true;
      }
      if(this.routine.difficulty === null) {
        this.missingFieldSnackbar.text += "routine difficulty, ";
        isMissing = true;
      }
      if(this.routine.category === null) {
        this.missingFieldSnackbar.text += "routine category, ";
        isMissing = true;
      }

      for(let i = 0; i < this.routine.cycles.length; i++) {
        let cycle = this.routine.cycles[i].cycle;
        if(cycle.repetitions === "" || cycle.repetitions === null) {
          this.missingFieldSnackbar.text += `cycle ${i + 1} repetitions, `;
          isMissing = true;
        }
        if(cycle.name === null) {
          this.missingFieldSnackbar.text += `cycle ${i + 1} name, `;
          isMissing = true;
        }
      }
      return isMissing;
    },
    async handleCancelClick() {
      const result = await this.$confirm('Do you really want to exit?', { title: 'WARNING' })
      if (result) {
        await this.$router.push('/personal-routines');
      }

    }
  }

}
</script>

<style scoped>
 /deep/ .v-text-field{
  width: 25vw;
}
  .v-text-field--outlined >>> fieldset {
    border-color: rgba(255,255, 255, 1);
  }
  .v-text-field--outlined >>> label {
    color: white;
  }
  .v-text-field--outlined >>> input {
    color: white;
  }


</style>