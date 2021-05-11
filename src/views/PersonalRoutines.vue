<template>
  <div class="my-6 mx-15">
    <v-sheet
        class="rounded-lg pb-5"
        color="#6F2DBD"
        elevation="15"
        width="100%">
      <h2 class="text-left ml-5 pt-5 d-inline-block" style="color: white">
        <v-icon large color="white" class="pr-3 mb-1" >mdi-clipboard-account-outline</v-icon>MY ROUTINES
      </h2>
      <v-container fill-height>
        <v-row class="justify-space-between">
          <RoutinePreviewCard v-for="routine in routines" :key="routine.id" :routine="routine" @onDeleteRoutine="deleteRoutine"/>
        </v-row>
      </v-container>
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
    </v-sheet>
  </div>
</template>

<script>
import RoutinePreviewCard from "../components/RoutinePreviewCard";
import {UserApi} from "@/api/user";
import {RoutineApi} from "@/api/routine";

export default {
  props: ['query'],
  name: "PersonalRoutines",
  data: () => {
    return {
      routines: [],
      successSnackbar: {
        color: "success",
        icon: "mdi-check-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 3500,
        title: "Success",
        text: null,
        visible: false
      }
    }
  },
  methods: {
    async deleteRoutine(routineId) {
      let deleteResponse = RoutineApi.delete(routineId);
      await deleteResponse.then(() => {
        let index = this.routines.findIndex(r => r.id === routineId);
        this.routines.splice(index, 1);
      });
      this.successSnackbar.text = "Success deleting routine.";
      this.successSnackbar.visible = true;
    }
  },
  mounted() {
    if(this.query === 'edit') {
      this.successSnackbar.text = "Success editing routine.";
      this.successSnackbar.visible = true;
    } else if(this.query === 'create') {
      this.successSnackbar.text = "Success creating a routine.";
      this.successSnackbar.visible = true;
    }
    UserApi.getRoutines().then((results) => {
      for (let i = 0; i < results.content.length; i++) {
        const result = results.content[i];
        this.routines.push({
          id: result.id,
          title: result.name,
          target: result.category.name.toLowerCase(),
          difficulty: result.difficulty,
          link: '/profile'
        });
      }
    }).catch((e) => {
      console.log(e);
      this.$router.push('/login');
    });
  },
  components: {RoutinePreviewCard}
}
</script>

<style scoped>

</style>