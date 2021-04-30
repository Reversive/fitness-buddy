<template>
  <v-container>
    <v-card
        class="rounded-lg text-center"
        elevation="8"
        width="100%"
        color="white"
    ><v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col >
          <v-btn icon
                 @click="$emit('addCyclePressed')"
                 class="font-weight-bold green--text"
          >
            <v-icon color="success" size="30" class="mr-2" >mdi-plus-circle</v-icon><h3>ADD CYCLE</h3>
          </v-btn>
        </v-col>
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
.v-btn::before {
  background-color: transparent;
}

</style>