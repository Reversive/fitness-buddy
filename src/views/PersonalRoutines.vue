<template>
  <div class="my-6 mx-15">
    <v-sheet
        class="rounded-lg pb-5"
        color="#6F2DBD"
        elevation="15"
        width="100%"
    >
      <h2 class="text-left ml-5 pt-5 d-inline-block" style="color: white">
        <v-icon large color="white" class="pr-3 mb-1" >mdi-clipboard-account-outline</v-icon>MY ROUTINES
      </h2>
      <v-container fill-height>
        <v-row class="justify-space-between">
          <RoutinePreviewCard :routine="routine"/>
          <RoutinePreviewCard :routine="routine"/>
          <RoutinePreviewCard :routine="routine"/>
          <RoutinePreviewCard :routine="routine"/>
          <RoutinePreviewCard :routine="routine"/>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import RoutinePreviewCard from "@/components/RoutinePreviewCard";

export default {
  name: "PersonalRoutines",
  data: () => {
    return {
      routine: {
        title: 'Personal Routine 1',
        target: 'Weight loss',
        duration: '50 minutes',
        muscleGroups: 'Legs, core',
        link: '/profile'
      }
    }
  },
  components: {RoutinePreviewCard}
}
</script>

<style scoped>

</style>