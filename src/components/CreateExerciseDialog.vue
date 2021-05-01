<template>
  <div>
  <v-card>
    <v-card-title class="headline white--text font-weight-bold" style="background-color: #6F2DBD">
      CREATE EXERCISE
    </v-card-title>

    <v-form v-model="valid">
      <v-container>
            <v-text-field
                v-model="exerciseName"
                :rules="nameRules"
                label="Exercise Title"
                required
            ></v-text-field>


            <v-text-field
                v-model="imageLink"
                :rules="exerciseImageLink"
                label="Image Link"
                required
            ></v-text-field>

      </v-container>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          class="font-weight-bold"
          text
          @click="$emit('close-create-exercise-dialog', true)"
      >
        Cancel
      </v-btn>
      <v-btn
          color="primary"
          class="font-weight-bold"
          text
          :disabled="!valid"
          @click="createExercise"
      >
        Create
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
import ExerciseStore from "../stores/exerciseStore";
export default {
  name: "CreateExerciseDialog",
  data: () => ({
    valid: false,
    snackbar: false,
    text: 'Lorem ipsum dolor sit amet',
    vertical: true,
    exerciseLibrary: ExerciseStore.exercises,
    exerciseName: '',
    nameRules: [
      v => !!v || 'Exercise name is required',
    ],
    imageLink: '',
    exerciseImageLink: [
      v => !!v || 'Image Link is required',
    ],
  }),
  methods: {
    createExercise() {
      const newExerciseId = this.exerciseLibrary.length;
      let newExercise = {id: newExerciseId, name: this.exerciseName, image: this.imageLink};
      this.exerciseLibrary.push(newExercise);
      this.$emit('close-create-exercise-dialog', false);
      this.exerciseName = '';
      this.imageLink = '';
    }
  }
}
</script>

<style scoped>

</style>