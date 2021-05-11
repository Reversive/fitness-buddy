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
            />
            <v-textarea
                v-model="exerciseDetail"
                :rules="nameRules"
                maxlength="50"
                single-line
                counter
                label="Exercise Detail"
                required
            />
            <v-text-field
                v-model="imageLink"
                :rules="nameRules"
                label="Image Link"
                required
            />
            <v-text-field
                v-model="videoLink"
                :rules="nameRules"
                label="Video Link"
                required
            />
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
import {ExerciseApi, Exercise, Image, Video} from "../api/exercise";
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
    exerciseDetail: '',
    videoLink: '',
    imageLink: '',
    nameRules: [
      v => !!v || 'This field is required',
    ],

  }),
  methods: {
    createExercise() {
      let apiExercise = new Exercise(this.exerciseName, this.exerciseDetail, "exercise");
      let apiResponse = ExerciseApi.add(apiExercise);
      apiResponse.then(exercise => {
        let image = new Image(this.imageLink);
        ExerciseApi.addImage(exercise.id, image);
        let video = new Video(this.videoLink);
        ExerciseApi.addVideo(exercise.id, video);
        let renderExercise = {id: exercise.id, name: this.exerciseName, image: this.imageLink, video: this.videoLink};
        this.exerciseLibrary.push(renderExercise);
        this.$emit('close-create-exercise-dialog', false);
        this.exerciseName = '';
        this.imageLink = '';
      }).catch( () => {
        console.error("Something went wrong creating exercise");
      });

    }
  }
}
</script>

<style scoped>

</style>