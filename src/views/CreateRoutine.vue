<template>

  <div class="my-6 mx-15">
    <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        fixed
        bottom
        right
        color="primary"
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
    <h2 class="text-left pt-2 " style="color: white">
      <v-icon large color="white" class="pr-3 mb-1" >mdi-clipboard-text</v-icon>ROUTINE CREATION
    </h2>

    <v-text-field
        label="Routine Name"
        class="mt-2 text--white"
        color="white"
        outlined
        clearable
        hide-details
    />
    </v-container>
    <div v-for="cycle_type in cycleTypes" :key="cycle_type.name" class="mt-0">
      <CCycleCardTitle :text="cycle_type.name" :icon="cycle_type.icon" />
      <div v-for="c in cycles" :key="c.cycle.order" >
        <CCycleCard   v-if="c.cycle.type === cycle_type"
                      :cycle="c.cycle"
                      :identifier="routineIdentifier"
                      v-on:cycleTrashClicked="removeSection"
                      />
      </div>
      <CAddCycleCard @addCyclePressed="addCycle(cycle_type)"/>
    </div>

    <v-container class="mt-2">

    <h2 class="white--text d-inline-block">
    Select category:
    </h2>
    <v-autocomplete
        :items="categories"
        v-model="selectedCategories"
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
          @click:close="deleteChip(item, selectedCategories)"
          class="white--text"
      >{{ item }}</v-chip>
    </template></v-autocomplete>

    <span class="pl-2 float-right mr-5">
        <h2 class="white--text text-right d-inline-block">
          Select Difficulty:
        </h2>
        <v-autocomplete
            :items="difficulties"
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
  </div>

</template>

<script>
import CycleCard from "../components/CycleCard";
import AddCycleCard from "../components/AddCycleCard";
import CycleCardTitle from "../components/CycleCardTitle";
export default {
  name: "CreateRoutine",
  components: {
    CCycleCard : CycleCard,
    CAddCycleCard : AddCycleCard,
    CCycleCardTitle : CycleCardTitle,
  },
  data : function () {
    return {
      categories : ['Muscle Definition', 'Muscle Gain', 'Weight Loss'],
      selectedCategories: [],
      cycleTypes: [{ name: 'WARMUP', icon: 'mdi-run' },{ name: 'EXERCISE', icon: 'mdi-dumbbell' }, { name: 'COOLDOWN', icon: 'mdi-water'}],
      cycles : [],
      routineIdentifier: 0,
      fab: false,
      routine: {},
      difficulties: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],
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
        repetitions: 0,
        position: 0
      };
      let index = this.cycles.reverse().findIndex(c => c.cycle.type === cycle_type);
      this.cycles.splice(index, 0, ({cycle: cycle, exists: false}));
      this.cycles.reverse();
      this.sortCycles();
    },
    sortCycles() {
      this.cycles.forEach((c, i) => c.cycle.order = i + 1);
    },
    removeSection(order) {
      let index = this.cycles.findIndex(c => c.cycle.order === order);
      this.cycles.splice(index, 1);
    },
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
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