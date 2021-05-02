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
      <div>
        <h2 class="text-left pt-2 d-inline-block" style="color: white">
          <v-icon large color="white" class="pr-3 mb-1" >mdi-clipboard-text</v-icon>ROUTINE CREATION
        </h2>
        <span class="float-right d-inline-block mt-1">
          <v-btn
              depressed
              color="error"
              @click="handleCancelClick"
              class="font-weight-bold mr-5"
          >
      CANCEL
    </v-btn>
          <v-btn
              depressed
              color="success"
              class="font-weight-bold"
              @click="handleRoutineCreation"
          >
      CREATE ROUTINE
    </v-btn>
        </span>
      </div>

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

    <v-container class="mt-2">

    <h3 class="white--text d-inline-block">
    SELECT CATEGORY:
    </h3>
    <v-autocomplete
        :items="types.categories"
        v-model="routine.categories"
        class="white--text d-inline-block ml-2"
        chips
        full-width
        deletable-chips
        hide-details
        hide-no-data
        hide-selected
        outlined
        multiple
        single-line
    ><template #selection="{ item }">
      <v-chip
          close
          color="#A663CC"
          @click:close="deleteChip(item, routine.categories)"
          class="white--text text-uppercase"
      >{{ item }}</v-chip>
    </template></v-autocomplete>

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
    </v-sheet>
    <v-snackbar v-model="cycleSuccessDeleteSnackbar.visible" :color="cycleSuccessDeleteSnackbar.color" :multi-line="cycleSuccessDeleteSnackbar.mode === 'multi-line'" :timeout="cycleSuccessDeleteSnackbar.timeout" :top="cycleSuccessDeleteSnackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ cycleSuccessDeleteSnackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ cycleSuccessDeleteSnackbar.title }}</strong>
          </div>
          <div>{{ cycleSuccessDeleteSnackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="cycleSuccessDeleteSnackbar.timeout === 0" icon @click="cycleSuccessDeleteSnackbar.visible = false">
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
import TypeStore from "../stores/typeStore";
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
      cycleSuccessDeleteSnackbar: {
        color: "success",
        icon: "mdi-check-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 3500,
        title: "Success",
        text: "Cycle deleted successfully.",
        visible: false
      }
    }
  },
  methods : {
    deleteChip(item, array) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[parseInt(i, 10)] === item) {
          array.splice(i, 1);
        }
      }
    },
    addCycle(cycle_type) {
      let cycle = {
        name: "NEW SECTION",
        type: cycle_type,
        position: 0,
        exercises: []
      };
      let index = this.routine.cycles.reverse().findIndex(c => c.cycle.type === cycle_type);
      this.routine.cycles.splice(index, 0, ({cycle: cycle, exists: false}));
      this.routine.cycles.reverse();
      this.sortCycles();
    },
    sortCycles() {
      this.routine.cycles.forEach((c, i) => c.cycle.order = i);
    },
    removeSection(order) {
      this.cycleSuccessDeleteSnackbar.visible = true;
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
    handleRoutineCreation() {
      console.log("To-do..");
    },
    async handleCancelClick() {
      const result = await this.$confirm('Do you really want to exit?', { title: 'WARNING' })
      if (result) {
        await this.$router.push('/personal-routines');
        RoutineStore.clearRoutine();
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