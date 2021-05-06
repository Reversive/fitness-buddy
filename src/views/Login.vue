<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 font-weight-bold purple--text text--accent-9">SIGN IN</h1>
                      <v-form v-model="valid">
                        <v-text-field
                            label="Email"
                            name="Email"
                            v-model="email_login"
                            :rules="[v=>!!v||'Email is required',
                            v=>/.+@.+\..+/.test(v) || 'E-mail must be valid']"
                            prepend-icon="mdi-email"
                            type="text"
                            color="purple accent-9"
                        />
                        <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            v-model="password_login"
                            prepend-icon="mdi-lock"
                            color="purple accent-9"
                            :rules="[v=> !!v||'Password is required']"
                            :type="show1 ? 'text' : 'password'"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="show1 = !show1"
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn class="mb-7 white--text" rounded color="purple accent-9" :disabled="!valid" @click="handleSignIn">SIGN IN</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="purple accent-9">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">HELLO, FRIEND!</h1>
                      <h5
                          class="text-center text-uppercase"
                      >Enter your personal details and start the journey with us.</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="purple accent-9">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1 text-uppercase">Welcome Back!</h1>
                      <h5
                          class="text-center text-uppercase"
                      >To keep connected with us please login with your personnel info</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 purple--text text--accent-9 text-uppercase font-weight-bold">Create Account</h1>
                      <v-form v-model="valid3">
                        <v-text-field label="Full Name" v-model="name" name="Name" :rules="[v=> !!v||'Full name is required']" prepend-icon="mdi-account" type="text" color="purple accent-9"/>
                        <v-text-field :rules="[v=>!!v||'Email is required',
                                       v=>/.+@.+\..+/.test(v) || 'E-mail must be valid']"
                                      label="Email"
                                      name="Email"
                                      prepend-icon="mdi-email"
                                      v-model="email_signup"
                                      type="text"
                                      color="purple accent-9"/>
                        <v-text-field id="password"
                                      label="Password"
                                      name="password"
                                      prepend-icon="mdi-lock"
                                      v-model="password_signup"
                                      :rules="[v=>!!v||'Password is required']"
                                      :type="show2 ? 'text' : 'password'"
                                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                      @click:append="show2 = !show2"
                                      color="purple accent-9"/>
                      </v-form>
                    </v-card-text>
                    <div class="text-center ">
                      <v-btn rounded class="mb-7 white--text" color="purple accent-9" :dark="valid3" :disabled="!valid3" @click="step++">NEXT</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="3">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h2 class="text-center display-2 purple--text text--accent-9 mb-5">Just a few more steps</h2>
                      <h4 class="text-center purple--text text--accent-9">Optimize your workout plan by answering this questions</h4>
                      <v-form v-model="valid2">
                        <v-select class="ml-12 mr-12"
                                  :items="items"
                                  v-model="sex"
                                  :rules="[v=>!!v|| 'Sex is required']"
                                  label="Sex"></v-select>
                        <v-text-field class="ml-12 mr-12"
                                      label="Age"
                                      v-model="age"
                                      name="Age"
                                      :rules="[v => !!v ||'Age is Required',v => (/^[1-9]\d*$/.test(v))  || 'age must be a positive number',]"
                                      type="text"
                                      color="purple accent-9"/>
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn rounded class="mb-7 mr-7" color="purple accent-9" dark @click="step--" >BACK</v-btn>
                      <v-btn class="mb-7 white--text" rounded color="purple accent-9" :disabled="!valid2" @click="step++">NEXT</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div >
                      <v-img src="../assets/gym-workout-1600.jpg" min-height="400" ></v-img>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="4">
                <v-row class="fill-height">
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h2 class="text-center display-2 purple--text text--accent-9 mb-5">Just a few more steps</h2>
                      <h4 class="text-center purple--text text--accent-9">Optimize your workout plan by answering this questions</h4>
                      <v-form v-model="valid2">
                        <v-text-field class="ml-12 mr-12"  v-model="weight" label="Weight" name="Weight" :rules="[
                          v => !!v ||'Weight is Required',
                          v => (/^[1-9]\d*$/.test(v))  || 'Weight must be a positive number',
                          ]" type="text" suffix="Kg" prepend-icon="mdi-weight" color="purple accent-9"/>

                        <v-text-field class="ml-12 mr-12" label="Height" v-model="height" name="Height" :rules="[
                          v => !!v ||'Height is Required',
                          v => (/^[1-9]\d*$/.test(v))  || 'Height must be a positive number',
                          ]" type="text" suffix="cm" prepend-icon="mdi-ruler" color="purple accent-9"/>
                      </v-form>
                    </v-card-text>
                    <div class="text-center ">
                      <v-btn rounded class="mb-7 mr-7" color="purple accent-9" dark @click="step--" >BACK</v-btn>
                      <v-btn rounded class="mb-7 white--text" color="purple accent-9" :disabled="!valid2" @click="handleSignUp">FINISH</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div >
                      <v-img src="../assets/gymphoto2.jpg" min-height="400" ></v-img>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>

import {UserApi, Credentials, SignUpCredentials,} from "../api/user";
import {Api} from "../api/api";
export default {
  name: "Login",
  data: () => {
    return{
      step: 1,
      show1: false,
      show2: false,
      valid: false,
      valid2: false,
      valid3: false,
      items: ["Man", "Woman", "Other"],
      name: '',
      email_login: '',
      password_login: '',
      email_signup:'',
      password_signup:'',
      sex: '',
      age: 0,
      weight: 0,
      height: 0,
    }
  },
  props:{
    source:String
  },
  methods: {
    async handleSignIn() {
      const credentials = new Credentials(this.email_login, this.password_login);
      await UserApi.login(credentials, null);
      // checkear si devuelve token y guardarlo o lo q sea..
      if(Api.token) {
        await this.$router.push('/community-routines');
      }

    },
    handleSignUp() {
      const credentials = new SignUpCredentials(this.email_signup,this.email_signup,this.password_signup);
      UserApi.register(credentials);
    }
  }
}
</script>

<style scoped>

</style>