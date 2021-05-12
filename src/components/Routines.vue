<template>
  <div class="p-relative fullWidth">
    <v-row class="justify-start mb-10">
      <v-col v-for="routine in routines" :key="routine.id" :routine="routine" cols="3">
        <RoutinePreviewCard :routine="routine" @onDeleteRoutine="deleteRoutine"/>
      </v-col>
    </v-row>
    <v-btn v-if="showLoadMore" v-on:click="getRoutines" class="loadMoreBtn">Load More</v-btn>
  </div>
</template>
<script>
import RoutinePreviewCard from "@/components/RoutinePreviewCard";
export default {
  name: "Routines",
  props: ['routines', 'showLoadMore' , 'getRoutines', 'deleteRoutine'],
  components: {RoutinePreviewCard}
}
</script>

<style scoped>
.p-relative {
  position: relative;
}

.loadMoreBtn {
  position: absolute;
  right: 0;
  bottom: 0
}

.fullWidth {
  width: 100%;
}
</style>