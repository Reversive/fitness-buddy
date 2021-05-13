<template>
  <div class="my-6 mx-15">
    <v-sheet
        class="rounded-lg pb-5 p-relative"
        color="#6F2DBD"
        elevation="15"
        width="100%">
        <h2 class="text-left ml-5 pt-5 white--text d-inline-block">
          <v-icon large color="white" class="pr-3 mb-1" >mdi-clipboard-account-outline</v-icon>MY ROUTINES
        </h2>
      <v-overlay v-bind:value="loading" absolute opacity="0.5">
        <v-progress-circular indeterminate size="64"/>
      </v-overlay>
      <v-btn class="rounded-pill createBtn font-weight-bold" color="success" @click="$router.push('/create-routine')">CREATE ROUTINE</v-btn>
      <Routines v-bind:routines="routines" v-bind:showLoadMore="showLoadMore" :getRoutines="getRoutines" :deleteRoutine="deleteRoutine" :mine="true"/>
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
import {UserApi} from "@/api/user";
import {RoutineApi} from "@/api/routine";
import Routines from "@/components/Routines";

export default {
  props: ['query'],
  name: "PersonalRoutines",
  data: () => {
    return {
      routines: [],
      pageSize: 8,
      page: 0,
      showLoadMore: false,
      loading: true,
      successSnackbar: {
        color: "success",
        icon: "mdi-check-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 3500,
        title: "Success",
        text: null,
        visible: false,
      }
    }
  },
  methods: {
    async deleteRoutine(routineId) {
      const result = await this.$confirm('Do you really want to delete this routine?', { title: 'WARNING' })
      if(result) {
      let deleteResponse = RoutineApi.delete(routineId);
      await deleteResponse.then(() => {
        let index = this.routines.findIndex(r => r.id === routineId);
        this.routines.splice(index, 1);
      });
        this.successSnackbar.text = "Success deleting routine.";
        this.successSnackbar.visible = true;
      }
    },
    getRoutines() {
      this.loading = true;
      UserApi.getRoutines({page: this.page, size: this.pageSize}).then((results) => {
        this.showLoadMore = !results.isLastPage;
        for (let i = 0; i < results.content.length; i++) {
          const result = results.content[i];
          this.routines.push({
            id: result.id,
            title: result.name,
            target: result.category.name,
            rating: result.averageRating,
            difficulty: result.difficulty,
            link: '/profile'
          });
        }
        this.loading = false;
        this.page++;
      }).catch((e) => {
        console.log(e);
        this.$router.push('/login');
      });
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
    this.page = 0;
    this.routines = [];
    this.getRoutines();
  },
  components: {Routines/*, RoutinePreviewCard*/}
}
</script>

<style scoped>
.createBtn {
  position: absolute;
  right: 20px;
  top: 20px
}

.p-relative {
  position: relative;
}


</style>