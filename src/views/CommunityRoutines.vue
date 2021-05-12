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
                    v-model="searchBy"
                    v-on:change="resetSearch"
                    item-color="primary"
                    dark
                    label="SEARCH BY"
                    class="sort-by-px mt-5 d-inline-block white--text"
                    color="white"
                    dense
                    outlined
                />
                <span v-if="searchBy === 'search' || searchBy === 'userId'">
                  <v-text-field
                      id="searchInput"
                      class="d-inline-block ml-3 search-bar"
                      dark
                      label="SEARCH"
                      v-model="searchTerm"
                      v-on:keyup="validateSearch"
                      v-on:keyup.enter.prevent="searchRoutines"
                      v-on:click:append="searchRoutines"
                      v-bind:error-messages="errorMessages"
                      append-icon="mdi-magnify"
                      out
                      color="white"
                      />
                </span>
                <span v-if="searchBy === 'categoryId'">
                  <v-select
                      :items="categories"
                      v-model="searchTerm"
                      item-color="primary"
                      v-on:change="searchRoutines"
                      dark
                      label="SELECT"
                      class="sort-by-px mt-5 ml-3 d-inline-block white--text"
                      color="white"
                      dense
                      outlined
                  />
                </span>
                <span v-if="searchBy === 'difficulty'">
                  <v-select
                      :items="difficulties"
                      v-model="searchTerm"
                      item-color="primary"
                      v-on:change="searchRoutines"
                      dark
                      label="SELECT"
                      class="sort-by-px mt-5 ml-3 d-inline-block white--text"
                      color="white"
                      dense
                      outlined
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
import {Api} from "@/api/api";

export default {
  name: "CommunityRoutines",
  data: () => {
    return {
      routines: [],
      searchBy: null,
      searchTerm: null,
      searchFilter: [
        {text: 'CLEAR', value: 'none'},
        {text: 'NAME', value: 'search'},
        {text: 'AUTHOR', value: 'userId'},
        {text: 'DIFFICULTY', value: 'difficulty'},
        {text: 'CATEGORY', value: 'categoryId'}
      ],
      difficulties: [
        {text: 'ROOKIE', value: 'rookie'},
        {text: 'BEGINNER', value: 'beginner'},
        {text: 'INTERMEDIATE', value: 'intermediate'},
        {text: 'ADVANCED', value: 'advanced'},
        {text: 'EXPERT', value: 'expert'}
      ],
      author: null,
      search: false,
      orderItems: [
        {text: 'NAME', value: 'name'},
        {text: 'DATE', value: 'date'},
        {text: 'DIFFICULTY', value: 'difficulty'},
        {text: 'CATEGORY', value: 'categoryId'},
        {text: 'AUTHOR', value: 'userId'}
      ],
      errorMessages: undefined,
      orderBy: 'name',
      categories: [],
      filteredRoutines: [],
      model: null,
      page: 0,
      showLoadMore: false,
      pageSize: 3
    }
  },
  mounted() {
    Api.get(Api.baseUrl+'/categories', false, null).then((results) => {
      this.categories = results.content.map((category) => {return {text: category.name, value: category.id}});
      this.routines = [];
      this.page = 0;
      this.search = false;
      this.getRoutines();
    }).catch((e) => {
      alert("Unable to retireve categories with error: " + e.message);
    });
  },
  methods: {
    resetAndGet() {
      this.page = 0;
      this.routines = [];
      this.getRoutines();
    },
    getRoutines() {
      let req = {page: this.page, size: this.pageSize, orderBy: this.orderBy};
      if (this.search) {
        req[this.searchBy] = this.searchTerm;
        if (this.searchBy === 'userId' && this.author) {
          req[this.searchBy] = this.author;
        }
      }
      RoutineApi.get(req).then((results) => {
        if (this.searchBy === 'search' && results.content.length === 0) {
          this.errorMessages = 'No routines found for given routine name';
        }
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
      this.resetAndGet();
    },
    searchRoutines() {
      console.log(this.searchBy);
      this.author = null;
      if (!this.searchBy || this.searchBy === 'none' || this.searchBy.length === 0) {
        this.search = false;
        this.searchTerm = null;
        return;
      }

      if ((this.searchBy === 'search' || this.searchBy === 'userId') && this.searchTerm && this.searchTerm.length < 3) {
        this.search = false;
        return;
      }

      if (this.searchBy === 'userId') {
        const url = Api.baseUrl + '/users?' + new URLSearchParams({search: this.searchTerm});
        console.log(url);
        Api.get(url, true, null).then((result) => {
          if (result.totalCount === 0) {
            this.errorMessages = 'No users found for given username';
            return;
          }

          this.author = result.content[0].id;
          this.search = true;
          this.resetAndGet();
        }).catch((e) => {
          console.log(e);
        });
        this.search = false;
        return;
      }

      this.search = true;
      this.resetAndGet();
    },
    resetSearch() {
      this.search = false;
      this.searchTerm = null;
      this.errorMessages = undefined;
      this.resetAndGet();
    },
    validateSearch(e) {
      const text = e.target.value;
      if (text.length < 3) {
        this.errorMessages = 'Please insert at least three characters';
        return;
      }
      this.errorMessages = undefined;
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