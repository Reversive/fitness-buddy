<template>
  <v-card width="21%" elevation="0" class="purple--text text--darken-4 my-4" @click="expandDetails">
    <div v-if="!routine.username" class="editBtn">
      <v-btn fab x-small elevation="0" color="transparent" @click.stop="editRoutine">
        <v-icon class="purple--text text--darken-4 big-text">mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab x-small elevation="0" color="transparent" @click.stop="deleteRoutine">
        <v-icon class="red--text big-text">mdi-trash-can-outline</v-icon>
      </v-btn>
    </div>
    <v-row class="py-2 px-4 headerRow" no-gutters align="center">
      <v-col :cols="routine.username?8:12" class="font-weight-bold">{{ routine.title }}</v-col>
    </v-row>
    <div class="pa-2" :class="{'pb-6': routine.username, 'pb-4': !routine.username}">
      <RoutineCardItem icon="mdi-bullseye" :text="routine.target"/>
      <RoutineCardItem icon="mdi-speedometer" :text="routine.difficulty"/>
    </div>
    <!--<v-btn @click="expandDetails">More Details</v-btn>-->
    <span v-if="routine.username" class="username">by: {{routine.username}}</span>
  </v-card>
</template>

<script>
import RoutineCardItem from "@/components/RoutineCardItem";

export default {
  name: "RoutinePreviewCard",
  props: {
    routine : Object
  },
  methods: {
    deleteRoutine() {
      this.$emit('onDeleteRoutine', this.routine.id);
    },
    editRoutine() {
      this.$router.push({ path: '/edit-routine', query: { id: this.routine.id } });
    },
    expandDetails() {
      this.$router.push({ path: '/routine-detail', query: { id: this.routine.id } });
    }
  },
  components: {RoutineCardItem}
}
</script>

<style scoped>
.big-text {
  font-size: 1.4rem;
}
.editBtn {
  position: absolute;
  top: 4px;
  right: 0;
}
.headerRow {
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
.username {
  font-size: 0.85rem;
  position: absolute;
  bottom: 4px;
  right: 6px;
}
</style>