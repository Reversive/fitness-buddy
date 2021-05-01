<template>
  <v-container class="profile mt-10">
    <v-card elevation="24">
      <v-btn class="grey--text rounded-pill profile-edit-button" @click="toggleEdit">{{ btnText }}</v-btn>
      <v-row class="pa-6" justify="center">
        <v-card class="rounded-circle">
          <v-img src="profile-placeholder.png" alt="Profile picture" width="128px" height="128px" contain/>
        </v-card>
      </v-row>
      <v-card-title v-bind:class="{hidden: isEditing}">{{ name }}</v-card-title>
      <div class="centered" v-bind:class="{hidden: !isEditing}" >
        <div class="input-div">
          <v-text-field v-bind:disabled="!isEditing" v-bind:value="name" label="name"/>
        </div>
      </div>
      <v-card-text class="grey--text" v-bind:class="{hidden: isEditing}">{{ email }}</v-card-text>
      <div class="centered" v-bind:class="{hidden: !isEditing}" >
        <div class="input-div">
          <v-text-field v-bind:disabled="!isEditing" v-bind:value="email" label="email"/>
        </div>
      </div>
      <v-card-text class="grey--text" v-bind:class="{hidden: isEditing}">{{ gender }}</v-card-text>
      <div class="centered" v-bind:class="{hidden: !isEditing}" >
        <div class="input-div">
          <v-text-field v-bind:disabled="!isEditing" v-bind:value="gender" label="gender"/>
        </div>
      </div>
      <v-row cols="12" class="mt-6" justify="space-between">
        <v-col cols="3">
          <span class="grey--text">Age</span><br>
          <span v-bind:class="{hidden: isEditing}">{{ age }}</span>
          <div class="centered" v-bind:class="{hidden: !isEditing}" >
            <div class="input-div">
              <v-text-field v-bind:disabled="!isEditing" v-bind:value="age" type="number" single-line dense/>
            </div>
          </div>
        </v-col>
        <v-col cols="3">
          <span class="grey--text">Height</span><br>
          <span v-bind:class="{hidden: isEditing}">{{ height }}cm</span>
          <div class="centered" v-bind:class="{hidden: !isEditing}" >
            <div class="input-div">
              <v-text-field v-bind:disabled="!isEditing" v-bind:value="height" type="number" suffix="cm" single-line dense/>
            </div>
          </div>
        </v-col>
        <v-col cols="3">
          <span class="grey--text">Weight</span><br>
          <span v-bind:class="{hidden: isEditing}">{{ weight }}kg</span>
          <div class="centered" v-bind:class="{hidden: !isEditing}" >
            <div class="input-div">
              <v-text-field v-bind:disabled="!isEditing" v-bind:value="weight" type="number" suffix="kg" single-line dense/>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'Profile',
  components: [],
  data() {
    return {
      name: 'Nicolas Gutierrez',
      email: 'nico.gutierrez@gmail.com',
      gender: 'MALE',
      age: 20,
      height: 180,
      weight: 90,
      isEditing: false,
      btnText: 'EDIT PROFILE'
    }
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
      this.changeButtonText();
      this.saveProfile();
    },
    saveProfile() {
      // Update info
    },
    cancelEdit() {
      this.isEditing = false;
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

.profile-edit-button {
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
