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
    <v-container style="position: relative">
      <h2 v-if="!isEditing() && !isDetail()" class="text-left pt-2 d-inline-block" style="color: white">
        <v-icon large color="white" class="pr-3 mb-1" >mdi-clipboard-text</v-icon>CREATE ROUTINE
      </h2>
      <h2 v-if="isEditing()" class="text-left pt-2 d-inline-block" style="color: white">
        <v-icon large color="white" class="pr-3 mb-1" >mdi-pencil</v-icon>EDIT ROUTINE
      </h2>
      <h2 v-if="isDetail()" class="text-left pt-2 d-inline-block" style="color: white">
        <v-icon large color="white" class="pr-3 mb-1" >mdi-clipboard-search-outline</v-icon>ROUTINE DETAIL
      </h2>
      <v-btn v-if="isDetail()" class="rounded-pill" style="position: absolute; top: 20px; right: 10px" @click="copyLink">
        SHARE
        <input type="hidden" id="linkInput"/>
      </v-btn>

    <v-text-field
        v-model="routine.name"
        label="Routine Name"
        class="mt-2 text--white"
        color="white"
        v-if="!isDetail()"
        outlined
        clearable
        hide-details
    />
    <v-text-field
        v-model="routine.name"
        label="Routine Name"
        class="mt-2 text--white"
        color="white"
        v-if="isDetail()"
        outlined
        readonly
        hide-details
    />

    </v-container>
      <v-container class="mt-2">
        <v-overlay v-bind:value="loading" absolute opacity="0.5">
          <v-progress-circular indeterminate size="64"/>
        </v-overlay>

        <h3 v-if="!isDetail()" class="white--text d-inline-block">
          SELECT CATEGORY:
        </h3>
        <h3 v-if="isDetail()" class="white--text d-inline-block">
          CATEGORY:
        </h3>
        <v-autocomplete
            :items="types.categories"
            item-text="name"
            v-model="routine.category"
            v-if="!isDetail()"
            class="white--text d-inline-block ml-2 text-uppercase"
            full-width
            deletable-chips
            hide-details
            hide-no-data
            hide-selected
            outlined
            single-line
        />
        <v-text-field
            v-model="routine.category"
            class="white--text d-inline-block ml-2 text-uppercase"
            color="white"
            v-if="isDetail()"
            outlined
            readonly
            hide-details
        />

        <span class="pl-2 float-right mr-5 ">
          <h3 v-if="!isDetail()" class="white--text d-inline-block">
            SELECT DIFFICULTY:
          </h3>
          <h3 v-if="isDetail()" class="white--text d-inline-block">
            DIFFICULTY:
          </h3>
          <v-autocomplete
              :items="types.difficulties"
              v-model="routine.difficulty"
              class="white--text d-inline-block ml-2 text-uppercase"
              full-width
              v-if="!isDetail()"
              hide-details
              hide-no-data
              hide-selected
              outlined
              single-line
          />
          <v-text-field
              v-model="routine.difficulty"
              class="white--text d-inline-block ml-2 text-uppercase"
              color="white"
              v-if="isDetail()"
              outlined
              readonly
              hide-details
          />
        </span>
      </v-container>
      <v-container v-if="!isDetail()">
        <span class="float-right">
          <v-switch
              v-model="routine.isPublic"
              color="white"
              class="mr-5"
              inset
          >
           <template v-slot:label>
             <span style="color: white" class="font-weight-bold text-uppercase">PUBLISH ROUTINE</span>
           </template>
          </v-switch>
        </span>
      </v-container>
    <div v-for="cycle_type in types.cycleTypes" :key="cycle_type.name" class="mt-0">
      <CCycleCardTitle :text="cycle_type.name" :icon="cycle_type.icon" />
      <div v-for="c in routine.cycles" :key="c.cycle.order" >
        <CCycleCard   v-if="c.cycle.type === cycle_type"
                      :identifier="c.cycle.order"
                      :cache-exercises="c.cycle.exercises"
                      :isDetail="isDetail()"
                      v-on:cycleTrashClicked="removeSection"
                      />
      </div>
      <CAddCycleCard v-if="!isDetail() && cycle_type.name === 'EXERCISE'" @addCyclePressed="addCycle(cycle_type)"/>
    </div>
    <v-container class="mb-5">
      <span class="float-right d-inline-block">
          <v-btn
              depressed
              color="error"
              v-if="!isDetail()"
              @click="handleCancelClick"
              class="font-weight-bold mr-5 rounded-pill"
          >
            CANCEL
          </v-btn>
          <v-btn
              v-if="!isEditing() && !isDetail()"
              depressed
              color="success"
              class="font-weight-bold rounded-pill"
              @click="handleRoutineCreation(false)"
          >
            CREATE ROUTINE
          </v-btn>

        <v-btn
            v-if="isEditing()"
            depressed
            color="success"
            class="font-weight-bold rounded-pill"
            @click="handleRoutineCreation(true)"
        >
            SAVE CHANGES
          </v-btn>
      </span>
      <v-container v-if="isDetail()" class="text-center mb-0 pb-0">
        <h2 class="font-weight-bold white--text">
          RATE THIS ROUTINE
        </h2>
        <v-rating
            empty-icon="mdi-star-outline"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            v-model="score"
            v-on:input="rateRoutine"
            color="white"
            background-color="white"
            v-if="isDetail()"
            hover
            length="5"
            size="32"
            :value="score"
        />
      </v-container>

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
    <v-snackbar v-model="successRatingSnackbar.visible" :color="successRatingSnackbar.color" :multi-line="successRatingSnackbar.mode === 'multi-line'" :timeout="successRatingSnackbar.timeout" :top="successRatingSnackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ successRatingSnackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ successRatingSnackbar.title }}</strong>
          </div>
          <div>{{ successRatingSnackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="successRatingSnackbar.timeout === 0" icon @click="successRatingSnackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="successSharingSnackbar.visible" :color="successSharingSnackbar.color" :multi-line="successSharingSnackbar.mode === 'multi-line'" :timeout="successSharingSnackbar.timeout" :top="successSharingSnackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ successSharingSnackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ successSharingSnackbar.title }}</strong>
          </div>
          <div>{{ successSharingSnackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="successSharingSnackbar.timeout === 0" icon @click="successSharingSnackbar.visible = false">
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
import {CategoryApi, Category} from "@/api/category";
import {Routine, RoutineApi} from "@/api/routine";
import {Cycle, CycleApi} from "@/api/cycle";
import {ExerciseApi, Exercise, Image, Video} from "@/api/exercise";
import {CycleExerciseApi, CycleExercise} from "@/api/cycleExercise";
import {Api} from "@/api/api";


export default {
  name: "CreateRoutine",
  components: {
    CCycleCard : CycleCard,
    CAddCycleCard : AddCycleCard,
    CCycleCardTitle : CycleCardTitle,
  },
  props: ['query'],
  data : function () {
    return {
      routineId: undefined,
      loading: true,
      types : TypeStore,
      fab: false,
      routine: RoutineStore,
      score: 0,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length >= 3 || 'Min 3 characters'
      },
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
      successRatingSnackbar: {
        color: "success",
        icon: "mdi-check-circle",
        mode: "single-line",
        position: "bot",
        timeout: 3500,
        title: "Success",
        text: "Rating sent",
        visible: false
      },
      successSharingSnackbar: {
        color: "success",
        icon: "mdi-check-circle",
        mode: "single-line",
        position: "bot",
        timeout: 3500,
        title: "Success",
        text: "Link copied to clipboard",
        visible: false
      },
      cycleNumber: 1,
    }
  },
  destroyed() {
    RoutineStore.clearRoutine();
  },
  async mounted() {
    this.loading = true;
    RoutineStore.clearRoutine();
    this.routineId = this.query;
    await this.getCategories().then(() => {
      ExerciseStore.exercises = ExerciseStore.exercises.slice(0, ExerciseStore.baseExercisesLength);
      this.getExercises(0).then(() => this.loading = false);
    });

    if(!this.isEditing() && !this.isDetail()) {
      for(let i = 0; i < 3; i++) {
        let localCycle = {
          name: "NEW CYCLE",
          type: TypeStore.cycleTypes[i],
          order: this.cycleNumber++,
          repetitions: 1,
          exercises: []
        };
        this.routine.cycles.push({cycle: localCycle});
      }
    }

    if(this.isEditing() || this.isDetail()) {
      await this.fillRoutineData();
    }
  },
  methods : {
    addCycle(cycle_type) {
      let cycle = {
        name: "NEW CYCLE",
        type: cycle_type,
        order: this.cycleNumber++,
        repetitions: 1,
        exercises: []
      };
      let index = this.routine.cycles.reverse().findIndex(c => c.cycle.type === cycle_type);
      this.routine.cycles.splice(index, 0, ({cycle: cycle, exists: false}));
      this.routine.cycles.reverse();
    },
    getCategories() {
      return new Promise(resolve => {
        CategoryApi.get().then(response => {
          if(response.totalCount === 0) {
            TypeStore.categories.forEach(e => {
              let categoryPayload = new Category(e.name, "");
              let categoryResponse = CategoryApi.add(categoryPayload);
              categoryResponse.then(category => {
                e.id = category.id;
              });

            });
          } else {
            TypeStore.categories.forEach(e => {
              let idx = response.content.findIndex(c => c.name === e.name);
              e.id = response.content[idx].id;
            });
          }
          resolve();
        }).catch(() => {
          console.error('Something went wrong setting up categories');
          resolve();
        });
      });
    },
    getExercises(page) {
      return new Promise(resolve => {
        ExerciseApi.get({page: page}).then(response => {
          if(response.totalCount === 0) {
            ExerciseStore.exercises.forEach(e => {
              let exercisePayload = new Exercise(e.name, e.detail, e.type.toLowerCase());
              let exerciseResponse = ExerciseApi.add(exercisePayload);
              exerciseResponse.then(exercise => {
                e.id = exercise.id;
                let image = new Image(e.image);
                ExerciseApi.addImage(e.id, image);
                let video = new Video(e.video);
                ExerciseApi.addVideo(e.id, video);
              });
            });
            resolve();
          } else {
            response.content.forEach(e => {
              let exerciseImageResponse = ExerciseApi.getImage(e.id);
              exerciseImageResponse.then(image => {
                let currentImage = image.content[0].url;
                let exerciseVideoResponse = ExerciseApi.getVideos(e.id);
                exerciseVideoResponse.then(video => {
                  let currentVideo = video.content[0].url;
                  let idx = ExerciseStore.exercises.findIndex(ex => ex.name === e.name);
                  if(idx === -1) {
                    ExerciseStore.exercises.push({id: e.id, name: e.name, image: currentImage, video: currentVideo, detail: e.detail, type: e.type.toUpperCase(), builtIn: false});
                  } else {
                    ExerciseStore.exercises[idx].id = e.id;
                  }
                });
              });
            });
            if (!response.isLastPage) {
              this.getExercises(page + 1).then(resolve);
            } else {
              resolve();
            }
          }
        }).catch(() => {
          console.error('Something went wrong setting up exercises');
          resolve();
        });
      });
    },
    getCycleTypeObject(type) {
      let idx = TypeStore.cycleTypes.findIndex(c => c.name === type.toUpperCase());
      return TypeStore.cycleTypes[idx];
    },
    isEditing() {
      return this.$router.currentRoute.name === 'edit';
    },
    isDetail() {
      return this.$router.currentRoute.name === 'detail';
    },
    async fillRoutineData() {
      this.loading = true;
      let routineResponse = RoutineApi.getById(this.routineId);
      await routineResponse.then(routine => {
        this.routine.category = routine.category.name;
        this.routine.difficulty = routine.difficulty.toUpperCase();
        this.routine.name = routine.name;
        this.routine.isPublic = routine.isPublic;
        let cyclesResponse = CycleApi.getCycles(this.routineId);
        let maxIdentifier = -1;
        cyclesResponse.then(cycles => {
          cycles.content.forEach(cycle => {
            if (cycle.order > maxIdentifier) {
              maxIdentifier = cycle.order;
            }
            let localCycle = {
              name: cycle.name,
              type: this.getCycleTypeObject(cycle.type),
              order: cycle.order,
              repetitions: cycle.repetitions,
              exercises: []};
            let exercisesResponse = CycleExerciseApi.getExercises(cycle.id);
            exercisesResponse.then(exercises => {
              exercises.content.forEach(wrapper => {
                let localExercise = {
                  exercise: {
                    id: wrapper.exercise.id,
                    name: wrapper.exercise.name,
                    detail: wrapper.exercise.detail,
                    image: "",
                    video: ""},
                  duration: wrapper.duration,
                  repetitions: wrapper.repetitions
                };
                let exerciseImageResponse = ExerciseApi.getImage(wrapper.exercise.id);
                exerciseImageResponse.then(response => {
                  localExercise.exercise.image = response.content[0].url;
                });
                let exerciseVideoResponse = ExerciseApi.getVideos(wrapper.exercise.id);
                exerciseVideoResponse.then(response => {
                  localExercise.exercise.video = response.content[0].url;
                });
                localCycle.exercises.push(localExercise);
              });
            });
          this.addLocalCycle(localCycle);
          });
          this.cycleNumber = maxIdentifier + 1;
          this.loading = false;
        }).catch(() => {
          console.error("Error retrieving cycles data");
          this.loading = false;
        });
      }).catch(() => {
        console.error("Error retrieving routine data");
        this.loading = false;
      });
    },
    addLocalCycle(localCycle) {
      let index = this.routine.cycles.reverse().findIndex(c => c.cycle.type === localCycle.type);
      this.routine.cycles.splice(index, 0, ({cycle: localCycle, exists: false}));
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
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    getRoutineCategory() {
      let categoryIdx = TypeStore.categories.findIndex(e => e.name === this.routine.category);
      return TypeStore.categories[categoryIdx];
    },
    printError() {
      this.missingFieldSnackbar.text = this.missingFieldSnackbar.text.slice(0, this.missingFieldSnackbar.text.length - 2);
      this.missingFieldSnackbar.visible = !this.missingFieldSnackbar.visible;
    },
    async handleRoutineCreation(isEditing) {
      if(this.isRoutineFieldMissing()) {
        if(this.routine.name !== null) {
          if(this.routine.name.length < 3) {
            this.missingFieldSnackbar.text = "Routine name must have at least 3 characters.";
            this.missingFieldSnackbar.visible = !this.missingFieldSnackbar.visible;
          }
        } else {
          this.printError();
        }
        return;
      }
      if(this.areCyclesEmpty()) {
        this.missingFieldSnackbar.text = "All cycles must have at least one exercise.";
        this.missingFieldSnackbar.visible = !this.missingFieldSnackbar.visible;
        return;
      }
      this.loading = true;
      if(isEditing) {
        let deleteResponse = RoutineApi.delete(this.query);
        deleteResponse.then(() => console.log('success'));
      }
      let category = this.getRoutineCategory(isEditing);
      let routinePayload = new Routine(this.routine.name, "", this.routine.isPublic, this.routine.difficulty.toLowerCase(), category.id);
      let routineResponse = RoutineApi.add(routinePayload);
      await routineResponse.then(routine => {
        this.routine.cycles.forEach(c => {
            let cyclePayload = new Cycle(c.cycle.name, "", c.cycle.type.name.toLowerCase(), c.cycle.order, parseInt(c.cycle.repetitions));
            let cycleResponse = CycleApi.add(routine.id, cyclePayload);
            cycleResponse.then(cycle => {
              c.cycle.exercises.forEach((e, i) => {
                e.order = i + 1;
                let exercisePayload = new CycleExercise(e.order, parseInt(e.duration), parseInt(e.repetitions));
                let exerciseResponse = CycleExerciseApi.add(cycle.id, e.exercise.id, exercisePayload);
                exerciseResponse.then(() => console.log("exercise success"));
              });
            }).catch((e) => {
              console.error(e);
            });
        });
        this.loading = false;
      }).catch(() => {
        console.error('Something went wrong setting up the routine');
        this.loading = false;
      });
      if(isEditing) await this.$router.push({ path: '/personal-routines', query: { q: 'edit' } });
      else await this.$router.push({ path: '/personal-routines', query: { q: 'create' } });
    },
    areCyclesEmpty() {
      let cycles = this.routine.cycles;
      let found = false;
      for(let i = 0; i < cycles.length && !found; i++) {
        let cycle = cycles[i].cycle;
        if(cycle.exercises.length === 0) found = true;
      }
      return found;
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
    },
    copyLink() {
      if (!this.isDetail())
        return;

      let input = document.querySelector('#linkInput');
      input.setAttribute('value', window.location.href);
      input.setAttribute('type', 'text');
      input.select()

      try {
        const success = document.execCommand('copy');
        if (success) {
          this.successSharingSnackbar.visible = true;
        } else {
          alert("Oops, unable to copy");
        }
      } catch (err) {
        alert('Oops, unable to copy');
      }

      /* unselect the range */
      input.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
    },
    rateRoutine() {
      if (!this.isDetail())
        return;

      this.loading = true;

      Api.post(Api.baseUrl+'/reviews/'+this.routineId, true, {
        score: this.score,
        review: ''
      }, null).then((response) => {
        console.log(response);
        this.successRatingSnackbar.visible = true;
        this.loading = false;
      }).catch((e) => {
        console.log(e);
        this.loading = false;
      });
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