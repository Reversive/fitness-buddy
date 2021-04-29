<template>

  <v-card
      color="#6F2DBD"
      class="ma-4 rounded-lg justify-center text-center"
      elevation="10"
      height="225"
      width="225"
  > <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-dialog max-width="60%">
            <template v-slot:activator="{on}">
              <v-btn icon
                     v-on="on"
                     class="white--text"
              >
                <v-icon class="mr-2" color="white" size="30">mdi-plus-circle</v-icon><h3>ADD EXERCISE</h3>
              </v-btn>
            </template>
            <CExerciseDialog/>

          </v-dialog>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import AddExerciseDialog from "./AddExerciseDialog";

export default {
name: "AddExerciseCard",
  components: {
  CExerciseDialog : AddExerciseDialog,
  }
}
</script>

<style scoped>

.v-btn::before {
  background-color: transparent;
}

</style>