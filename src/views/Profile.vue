<template>
  <v-container class="profile my-6">
    <v-card elevation="24" color="#6F2DBD">
      <v-overlay v-bind:value="loading" absolute opacity="0.5">
        <v-progress-circular indeterminate size="64"/>
      </v-overlay>
      <div class="profile-edit-buttons">
        <v-btn class="red white--text rounded-pill mr-3" v-bind:class="{hidden: !isEditing}" @click="cancelEdit">CANCEL</v-btn>
        <v-btn class="grey--text rounded-pill" @click="toggleEdit">{{ btnText }}</v-btn>
      </div>
      <v-row class="pa-6" justify="center">
        <v-card class="rounded-circle">
          <v-img src="profile-placeholder.png" alt="Profile picture" width="128px" height="128px" contain/>
        </v-card>
      </v-row>
      <v-card-title class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ name }}</v-card-title>
      <ProfileInput v-model="name" v-bind:editing="isEditing" input_label="name"/>
      <v-card-text class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ email }}</v-card-text>
      <v-card-text class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ replaceNull(gender) }}</v-card-text>
      <div class="centered" v-bind:class="{hidden: !isEditing}">
        <div class="input-div">
          <v-select :items="genders" v-on:change="updateGender" v-bind:value="gender" v-bind:disabled="!isEditing" single-line dense dark/>
        </div>
      </div>
      <v-row cols="12" class="mt-6" justify="space-between">
        <v-col cols="3">
          <span class="white--text font-weight-bold text-uppercase">Age</span><br>
          <span class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ replaceNull(age) }}</span>
          <ProfileInput v-model="age" v-bind:editing="isEditing" input_type="number" :single="true"/>
        </v-col>
        <v-col cols="3">
          <span class="white--text font-weight-bold text-uppercase">Height</span><br>
          <span class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ replaceNull(height) }}cm</span>
          <ProfileInput v-model="height" v-bind:editing="isEditing" input_type="number" :single="true"/>
        </v-col>
        <v-col cols="3">
          <span class="white--text font-weight-bold text-uppercase">Weight</span><br>
          <span class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ replaceNull(weight) }}kg</span>
          <ProfileInput v-model="weight" v-bind:editing="isEditing" input_type="number" :single="true"/>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import ProfileInput from "@/components/ProfileInput";
import {Api} from "@/api/api";

export default {
  name: 'Profile',
  components: {
    ProfileInput: ProfileInput
  },
  data: function () {
    return {
      name: null,
      email: null,
      gender: null,
      age: null,
      height: null,
      weight: null,
      metadata: null,
      isEditing: false,
      loading: true,
      btnText: 'EDIT PROFILE',
      genders: [{text: 'male', value: 'male'}, {text: 'female', value: 'female'}, {text: 'other', value: 'other'}]
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    async toggleEdit() {
      if(this.isEditing) {
        const result = await this.$confirm('Do you really want to save changes?', { title: 'WARNING' })
        if(result) {
          this.isEditing = !this.isEditing;
          await this.saveProfile();
          await this.fetchData();
        }
      } else {
        this.isEditing = !this.isEditing;
      }
      this.changeButtonText();
    },
    async cancelEdit() {
      const result = await this.$confirm('Do you really want to cancel edits?', { title: 'WARNING' });
      if (result) {
        this.isEditing = false;
        await this.fetchData();
        this.changeButtonText();
      }
    },
    async saveProfile() {
      this.loading = true;
      this.metadata.height = parseInt(this.height);
      this.metadata.weight = parseInt(this.weight);
      const data = {
        firstName: this.name,
        birthdate: parseInt(this.age),
        gender: this.gender,
        metadata: this.metadata
      };
      await Api.put(Api.baseUrl+'/users/current', true, data, null);
      this.loading = false;
    },
    async fetchData() {
      this.loading = true;
      const result = await Api.get(Api.baseUrl+'/users/current', true, null);
      console.log(result);
      const {firstName, email, gender, birthdate, metadata} = result;
      this.name = firstName;
      this.email = email;
      this.gender = gender;
      this.age = birthdate;
      this.metadata = metadata?metadata:{};
      if (metadata != null) {
        this.height = metadata.height;
        this.weight = metadata.weight;
      }
      this.loading = false;
    },
    changeButtonText() {
      if (this.isEditing)
        this.btnText = 'SAVE CHANGES'
      else
        this.btnText = 'EDIT PROFILE'
    },
    updateGender(event) {
      this.gender = event;
    },
    replaceNull(str) {
      return str?str:' - ';
    }
  }
}
</script>
<style scoped>

.hidden {
  display: none !important;
}

.centered {
  display: flex;
  justify-content: center;
  align-content: center;
  align-self: center;
  width: 100%;
}

.input-div {
  width: 40%;
}

.profile-edit-buttons {
  position: absolute;
  right: 20px;
  top: 20px;
}

div.v-card__text, span {
  padding: 2px;
  width: 100%;
  text-align: center;
}

div.v-card__title {
  justify-content: center;
  padding: 2px;
}

div.col {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>
