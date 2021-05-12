<template>
  <div class="my-6 mx-15">
    <v-sheet
        class="rounded-lg pb-5 p-relative"
        color="#6F2DBD"
        elevation="15"
        width="100%"
    >
      <h2 class="text-left ml-5 pt-5 d-inline-block white--text">
        <v-icon large color="white" class="pr-3 mb-1" >mdi-account-group</v-icon>COMMUNITY ROUTINES
      </h2>
      <v-container fill-height>
        <v-layout row wrap align-center>
          <v-row class="justify-space-between">
            <v-col>
              <v-flex class="text-left">
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
            </v-col>
            <v-col>
              <v-flex class="text-right">
                <v-select
                    :items="orderItems"
                    v-on:change="orderRoutines"
                    v-model="orderBy"
                    item-color="primary"
                    dark
                    label="ORDER BY"
                    class="sort-by-px mt-5 d-inline-block white--text"
                    color="white"
                    dense
                    outlined
                />
              </v-flex>
            </v-col>
          </v-row>
          <Routines v-bind:routines="routines" v-bind:showLoadMore="showLoadMore" :getRoutines="getRoutines"/>
        </v-layout>
      </v-container>


    </v-sheet>
  </div>
</template>

<script>

import {RoutineApi} from "@/api/routine";
import Routines from "@/components/Routines";

export default {
  name: "CommunityRoutines",
  data: () => {
    return {
      routines: [],
      sortBy: null,
      searchTerm: null,
      searchFilter: ['AUTHOR', 'NAME'],
      orderItems: [
        {text: 'NAME', value: 'name'},
        {text: 'DATE', value: 'date'},
        {text: 'DIFFICULTY', value: 'difficulty'},
        {text: 'CATEGORY', value: 'categoryId'},
        {text: 'AUTHOR', value: 'userId'}
      ],
      orderBy: 'name',
      filteredRoutines: [],
      model: null,
      page: 0,
      showLoadMore: false,
      pageSize: 3
    }
  },
  created() {
    this.routines = [];
    this.page = 0;
    this.getRoutines();
  },
  methods: {
    getRoutines() {
      RoutineApi.get({page: this.page, size: this.pageSize, orderBy: this.orderBy}).then((results) => {
        this.showLoadMore = !results.isLastPage;
        for (let i = 0; i < results.content.length; i++) {
          const result = results.content[i];
          console.log(result);
          this.routines.push({
            id: result.id,
            title: result.name,
            target: result.category.name,
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
    },
    orderRoutines() {
      this.routines = [];
      this.page = 0;
      this.getRoutines();
    }
  },
  components: {
    Routines/*,
    RoutinePreviewCard*/
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

.p-relative {
  position: relative;
}

.loadMoreBtn {
  position: absolute;
  right: 0;
  bottom: 0
}

</style>