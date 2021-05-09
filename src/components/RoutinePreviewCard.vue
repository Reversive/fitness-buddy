<template>
  <v-card width="21%" elevation="0" class="purple--text text--darken-4 my-4" @click="$router.push(routine.link)">
    <v-btn fab x-small elevation="0" color="white" style="position: absolute; top: 4px; right: 0">
      <v-icon class="purple--text text--darken-4 big-text">mdi-export-variant</v-icon>
    </v-btn>
    <v-row class="py-2 px-4" style="border-bottom: 1px solid rgba(0,0,0,0.2)" no-gutters align="center">
      <v-col cols="11" class="font-weight-bold">{{ routine.title }}</v-col>
    </v-row>
    <div class="pa-2">
      <RoutineCardItem icon="mdi-bullseye" :text="routine.target"/>
      <RoutineCardItem icon="mdi-timer-outline" :text="routine.duration"/>
      <RoutineCardItem icon="mdi-kettlebell" :text="routine.muscleGroups"/>
    </div>
  </v-card>
</template>

<script>
import RoutineCardItem from "@/components/RoutineCardItem";

export default {
  name: "RoutinePreviewCard",
  props: {
    routine : Object
  },
  components: {RoutineCardItem}
}
</script>

<style scoped>
.big-text {
  font-size: 1.4rem;
}
</style>