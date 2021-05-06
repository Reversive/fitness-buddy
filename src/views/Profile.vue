<template>
  <v-container class="profile my-6">
    <v-card elevation="24" color="#6F2DBD">
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
      <ProfileInput v-bind:input_value="name" v-bind:editing="isEditing" input_label="name"/>
      <v-card-text class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ email }}</v-card-text>
      <ProfileInput v-bind:input_value="email" v-bind:editing="isEditing" input_label="email"/>
      <v-card-text class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ gender }}</v-card-text>
      <ProfileInput v-bind:input_value="gender" v-bind:editing="isEditing" input_label="gender"/>
      <v-row cols="12" class="mt-6" justify="space-between">
        <v-col cols="3">
          <span class="white--text font-weight-bold text-uppercase">Age</span><br>
          <span class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ age }}</span>
          <ProfileInput v-bind:input_value="age" v-bind:editing="isEditing" input_type="number" :single="true"/>
        </v-col>
        <v-col cols="3">
          <span class="white--text font-weight-bold text-uppercase">Height</span><br>
          <span class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ height }}cm</span>
          <ProfileInput v-bind:input_value="height" v-bind:editing="isEditing" input_type="number" :single="true"/>
        </v-col>
        <v-col cols="3">
          <span class="white--text font-weight-bold text-uppercase">Weight</span><br>
          <span class="white--text font-weight-bold text-uppercase" v-bind:class="{hidden: isEditing}">{{ weight }}kg</span>
          <ProfileInput v-bind:input_value="weight" v-bind:editing="isEditing" input_type="number" :single="true"/>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import profileStore from "@/stores/profileStore";
import ProfileInput from "@/components/ProfileInput";

export default {
  name: 'Profile',
  components: {
    ProfileInput: ProfileInput
  },
  data: function () {
    return {
      name: profileStore.name,
      email: profileStore.email,
      gender: profileStore.gender,
      age: profileStore.age,
      height: profileStore.height,
      weight: profileStore.weight,
      isEditing: false,
      btnText: 'EDIT PROFILE'
    }
  },
  methods: {
    async toggleEdit() {
      if(this.isEditing) {
        const result = await this.$confirm('Do you really want to save changes?', { title: 'WARNING' })
        if(result) {
          this.isEditing = !this.isEditing;
          this.saveProfile();
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
        this.changeButtonText();
      }
    },
    saveProfile() {
      // Update info
    },
    changeButtonText() {
      if (this.isEditing)
        this.btnText = 'SAVE CHANGES'
      else
        this.btnText = 'EDIT PROFILE'
    }
  }
}
</script>
<style scoped>

.hidden {
  display: none !important;
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
