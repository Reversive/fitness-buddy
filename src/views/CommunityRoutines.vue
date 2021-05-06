<template>
  <div class="my-6 mx-15">
    <v-sheet
        class="rounded-lg pb-5"
        color="#6F2DBD"
        elevation="15"
        width="100%"
    >
      <h2 class="text-left ml-5 pt-5 d-inline-block" style="color: white">
        <v-icon large color="white" class="pr-3 mb-1" >mdi-clipboard-text</v-icon>COMMUNITY ROUTINES
      </h2>
      <v-container fill-height>
        <v-layout row wrap align-center>
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
              ></v-text-field>
        </span>
        </v-flex>
        </v-layout>
      </v-container>


    </v-sheet>
  </div>
</template>

<script>

export default {
  name: "CommunityRoutines",
  data: () => {
    return {
      sortBy: null,
      searchTerm: null,
      searchFilter: ['AUTHOR', 'NAME'],
      filteredRoutines: [],
      model: null
    }
  },
  components: {
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



</style>