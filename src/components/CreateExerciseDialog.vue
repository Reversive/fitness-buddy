<template>
  <div>
  <v-card>
    <v-card-title class="headline white--text font-weight-bold" style="background-color: #6F2DBD" v-if="!isEdit">
      CREATE EXERCISE
    </v-card-title>
    <v-card-title class="headline white--text font-weight-bold" style="background-color: #6F2DBD" v-if="isEdit">
      EDIT EXERCISE
    </v-card-title>

    <v-form v-model="valid">
      <v-container>
            <v-text-field
                v-model="exerciseName"
                v-if="!isEdit"
                :rules="nameRules"
                label="EXERCISE TITLE"
                required
            />
            <v-text-field
                v-model="exerciseCache.name"
                v-if="isEdit"
                :rules="nameRules"
                label="EXERCISE TITLE"
                required
            />
            <v-select :items="['EXERCISE', 'REST']"
                       label="EXERCISE TYPE"
                       v-if="!isEdit"
                       v-model="exerciseType"/>
          <v-select :items="['EXERCISE', 'REST']"
                  label="EXERCISE TYPE"
                  v-if="isEdit"
                  v-model="exerciseCache.type"/>

            <v-textarea
                v-model="exerciseDetail"
                :rules="nameRules"
                v-if="!isEdit"
                maxlength="50"
                single-line
                counter
                label="EXERCISE DETAIL"
                required
            />
            <v-textarea
                v-model="exerciseCache.detail"
                v-if="isEdit"
                :rules="nameRules"
                maxlength="50"
                single-line
                counter
                label="EXERCISE DETAIL"
                required
            />
            <v-text-field
                v-model="imageLink"
                v-if="!isEdit"
                :rules="nameRules"
                label="IMAGE LINK"
                required
            />
            <v-text-field
                v-model="exerciseCache.image"
                v-if="isEdit"
                :rules="nameRules"
                label="IMAGE LINK"
                required
            />

            <v-img v-if="!isEdit" :src="imageLink" contain height="200"/>
            <v-img v-if="isEdit" :src="exerciseCache.image" contain height="200"/>

            <v-text-field
                v-model="videoLink"
                :rules="nameRules"
                v-if="!isEdit"
                label="VIDEO LINK"
                @input="parseUrl"
                required
            />
            <v-text-field
                v-model="exerciseCache.video"
                v-if="isEdit"
                :rules="nameRules"
                label="VIDEO LINK"
                required
            />
      </v-container>
      <div class="text-center">
        <iframe :src=parsedURL height="200" width="340" allowfullscreen></iframe>
      </div>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          class="font-weight-bold"
          text
          @click="cancelExerciseAction"
      >
        Cancel
      </v-btn>
      <v-btn
          color="primary"
          class="font-weight-bold"
          text
          v-if="!this.isEdit"
          :disabled="!valid"
          @click="createExercise"
      >
        Create
      </v-btn>
      <v-btn
          color="primary"
          class="font-weight-bold"
          text
          v-if="this.isEdit"
          :disabled="!valid"
          @click="editExercise"
      >
        Save
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
  props: {
    isEdit: Boolean,
    exerciseCache: Object
  },
  mounted() {
    if(this.isEdit) {
      this.bDetail = this.exerciseCache.detail;
      this.bName = this.exerciseCache.name;
      this.bImage = this.exerciseCache.image;
      this.bVideo = this.exerciseCache.video;
      this.bType = this.exerciseCache.type;
      this.parseUrl();
    }
  },
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
    bName: null,
    bDetail: null,
    bVideo: null,
    bImage: null,
    bType: null,

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
          type: this.exerciseType,
          builtIn: false};
        this.exerciseLibrary.push(renderExercise);
        this.$emit('close-create-exercise-dialog', false);
        this.exerciseName = '';
        this.imageLink = '';
        this.videoLink = '';
        this.exerciseDetail = '';
        this.parsedURL = '';
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
      let videoId;
      if(this.isEdit) {
        videoId = getId(this.exerciseCache.video);
      } else {
        videoId = getId(this.videoLink);
      }
      this.parsedURL="https://www.youtube.com/embed/" + videoId;
    },
    async editExercise() {
      let exercisePayload = new Exercise(this.exerciseCache.name, this.exerciseCache.detail, this.exerciseCache.type.toLowerCase());
      let editExerciseResponse = ExerciseApi.update(this.exerciseCache.id, exercisePayload);
      await editExerciseResponse.then(() => {
        let imagePayload = new Image(this.exerciseCache.image);
        let videoPayload = new Video(this.exerciseCache.video);
        ExerciseApi.updateImage(this.exerciseCache.id, imagePayload);
        ExerciseApi.updateVideo(this.exerciseCache.id, videoPayload);
      });
      this.$emit('close-edit-dialog');
    },
    cancelExerciseAction() {
      if(!this.isEdit) this.$emit('close-create-exercise-dialog', true);
      else {
        this.exerciseCache.detail = this.bDetail;
        this.exerciseCache.name = this.bName ;
        this.exerciseCache.image = this.bImage;
        this.exerciseCache.video = this.bVideo;
        this.exerciseCache.type = this.bType;
        this.$emit('close-edit-dialog');
      }
    }
  }
}
</script>

<style scoped>

</style>