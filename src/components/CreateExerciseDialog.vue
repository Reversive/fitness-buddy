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
                label="EXERCISE TITLE"
                required
            />
            <v-select :items="['EXERCISE', 'REST']"
                       label="EXERCISE TYPE"
                       v-model="exerciseType"/>
            <v-textarea
                v-model="exerciseDetail"
                :rules="nameRules"
                maxlength="50"
                single-line
                counter
                label="EXERCISE DETAIL"
                required
            />
            <v-text-field
                v-model="imageLink"
                :rules="nameRules"
                label="IMAGE LINK"
                required
            />
            <v-text-field
                v-model="videoLink"
                :rules="nameRules"
                label="VIDEO LINK"
                @input="parseUrl"
                required
            />
      </v-container>
      <div class="text-center">
        <iframe id="videoPreview" :src=parsedURL height="200" width="340" allowfullscreen></iframe>
      </div>
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
    parsedURL:'',
    exerciseType: '',
    imageLink: '',
    nameRules: [
      v => !!v || 'This field is required',
    ],

  }),
  methods: {
    createExercise() {
      let apiExercise = new Exercise(this.exerciseName, this.exerciseDetail, this.exerciseType.toLowerCase());
      let apiResponse = ExerciseApi.add(apiExercise);
      apiResponse.then(exercise => {
        let image = new Image(this.imageLink);
        ExerciseApi.addImage(exercise.id, image);
        let video = new Video(this.videoLink);
        ExerciseApi.addVideo(exercise.id, video);
        let renderExercise = {
          id: exercise.id,
          name: this.exerciseName,
          image: this.imageLink,
          video: this.videoLink,
          detail: this.exerciseDetail,
          type: this.exerciseType};
        this.exerciseLibrary.push(renderExercise);
        this.$emit('close-create-exercise-dialog', false);
        this.exerciseName = '';
        this.imageLink = '';
      }).catch( () => {
        console.error("Something went wrong creating exercise");
      });

    },
    parseUrl(){
      function getId(url){
        let ID;
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
          ID = url[2].split(/[^0-9a-z_-]/i);
          ID = ID[0];
        }
        else {
          ID = url;
        }
        return ID;
      }
      let videoId=getId(this.videoLink);
      this.parsedURL="https://www.youtube.com/embed/"+videoId;
    }
  }
}
</script>

<style scoped>

</style>