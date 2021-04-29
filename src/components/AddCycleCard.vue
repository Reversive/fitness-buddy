<template>
  <v-container>
    <v-card
        class="rounded-lg text-center"
        elevation="8"
        width="100%"
        color="#A663CC"
    ><v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col ><v-icon color="white" size="55" class="ml-5" @click="$emit('addCyclePressed')">mdi-plus-circle</v-icon></v-col>
      </v-row>
    </v-container></v-card>
  </v-container>
</template>

<script>
export default {
  name: "AddCycleCard",
  props : {
  },
  methods: {
  },
  data: function () {
    return {
      amountOfCards : 0,
    }
  }

}
</script>

<style scoped>

</style>