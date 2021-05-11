<template>
  <div class="my-6 mx-15">
    <v-sheet
        class="rounded-lg pb-5"
        color="#6F2DBD"
        elevation="15"
        width="100%"
    >
      <h2 class="text-left ml-5 pt-5 d-inline-block" style="color: white">
        <v-icon large color="white" class="pr-3 mb-1" >mdi-account-group</v-icon>COMMUNITY ROUTINES
      </h2>
      <v-container fill-height>
        <v-layout row wrap align-center style="position: relative">
          <v-flex class="text-left ml-5">
            <v-select
                :items="searchFilter"
                v-model="sortBy"
                item-color="primary"
                dark
                label="SEARCH BY"
                class="sort-by-px mt-5 d-inline-block white--text"
                color="white"
                dense
                outlined
            />
            <span>
              <v-text-field
                  class="d-inline-block ml-3 search-bar"
                  dark
                  label="SEARCH"
                  v-model="searchTerm"
                  append-icon="mdi-magnify"
                  out
                  color="white"
                  />
            </span>
          </v-flex>
          <v-row class="justify-space-between fullWidth mb-10">
            <RoutinePreviewCard v-for="routine in routines" :key="routine.id" :routine="routine"/>
          </v-row>
          <v-btn v-if="showLoadMore" v-on:click="getRoutines" style="position: absolute; right: 0; bottom: 0">Load More</v-btn>
        </v-layout>
      </v-container>


    </v-sheet>
  </div>
</template>

<script>

import {RoutineApi} from "@/api/routine";
import RoutinePreviewCard from "@/components/RoutinePreviewCard";

export default {
  name: "CommunityRoutines",
  data: () => {
    return {
      routines: [],
      sortBy: null,
      searchTerm: null,
      searchFilter: ['AUTHOR', 'NAME'],
      filteredRoutines: [],
      model: null,
      page: 0,
      showLoadMore: false,
      pageSize: 13
    }
  },
  created() {
    this.routines = [];
    this.page = 0;
    this.getRoutines();
  },
  methods: {
    getRoutines() {
      RoutineApi.get({page: this.page, size: this.pageSize}).then((results) => {
        this.showLoadMore = !(results.content.length === 0 || results.content.length < this.pageSize);
        for (let i = 0; i < results.content.length; i++) {
          const result = results.content[i];
          console.log(result);
          this.routines.push({
            id: result.id,
            title: result.name,
            target: result.category.name.toLowerCase(),
            difficulty: result.difficulty,
            link: '/profile',
            username: result.user.username
          });
        }
        this.page++;
      }).catch((e) => {
        console.log(e);
        this.$router.push('/login');
      });
    }
  },
  components: {
    RoutinePreviewCard
  }
}
</script>

<style scoped>
.sort-by-px {
  width: 150px;
}

.search-bar {
  width: 400px;
}

.fullWidth {
  width: 100%;
}



</style>