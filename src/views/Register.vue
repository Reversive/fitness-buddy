<template>
  <div class="justify-center" id="Register card">
    <v-card width="700" height="550">
      <v-card-title class="justify-center"><h1>Register</h1></v-card-title>
      <v-form  v-model="valid" class="px-4">
        <v-col cols="7"><v-text-field
            v-model="name"
            label="Full Name*"
            :rules="nameRules"
            required
            outlined
        ></v-text-field></v-col>
        <v-row>
          <v-col cols="3">
            <v-select
                :items="items"
                label="Sex"
                outlined
            ></v-select>
          </v-col>
          <v-col cols="2"><v-text-field v-model.number="ageInput" :rules="ageRules" label="Age" required outlined></v-text-field></v-col>
          <v-col cols="3"><v-text-field v-model.number="weightInput" :rules="weightRules" suffix="kg" label="Weight" required outlined></v-text-field></v-col>
          <v-col cols="3"><v-text-field v-model.number="measureInput" :rules="measureRules" suffix="cm" label="Height" required outlined></v-text-field></v-col>
        </v-row>
        <v-col cols="7">
          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail*"
              required
              outlined
          ></v-text-field>
          <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="pswRules"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              outlined
              label="Password*"
              @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
        <div class="justify-center"><v-btn class="success justify-center"  large> Register</v-btn></div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: () => {
    return {
      name: "",
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters',
      ],
      email: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      items: ["Man", "Woman", "Other"],
      show1: false,
      rules: [v => !!v || 'Required.'],
      valid: true,
      password:"",
      pswRules:[v => !!v || 'Password is required'],
      ageInput:"",
      ageRules:[
          v => !!v ||"Age is Required",
          v => (/^[1-9]\d*$/.test(v))  || "age must be a number",
          v => v<110 || "age can't be that high",
      ],
      weightInput:"",
      weightRules:[
        v => (/^[1-9]\d*$/.test(v))  || "Weight must be a positive number",
        v => v<180 || "Weight can't be that high",
      ],
      measureInput:"",
      measureRules:[
        v => (/^[1-9]\d*$/.test(v))  || "Height must be a positive number",
        v => v<300 || "Height can't be that high",
      ],
    }
  }
}
</script>

<style scoped>

</style>