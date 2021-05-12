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
                            v=>/.+@.+\..+/.test(v) || 'Email must have the form: example@domain.example']"
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
                      <v-form v-model="valid2">
                        <v-text-field hint="*Required" label="Full Name" v-model="name" name="Name" :rules="[v=> !!v||'Full name is required']" prepend-icon="mdi-account" type="text" color="purple accent-9"/>
                        <v-text-field :rules="[v=>!!v||'Email is required',
                                       v=>/.+@.+\..+/.test(v) || 'Email must have the form: example@domain.example']"
                                      label="Email"
                                      name="Email"
                                      hint="*Required"
                                      prepend-icon="mdi-email"
                                      v-model="email_signup"
                                      type="text"
                                      color="purple accent-9"/>
                        <v-text-field id="password"
                                      label="Password"
                                      hint="*Required"
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
                      <v-btn rounded class="mb-7 white--text" color="purple accent-9" :dark="valid2" :disabled="!valid2" @click="step++">NEXT</v-btn>
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
                      <v-form>
                        <v-select class="ml-12 mr-12"
                                  :items="items"
                                  v-model="sex"
                                  label="Sex"></v-select>
                        <v-text-field class="ml-12 mr-12"
                                      label="Age"
                                      value="0"
                                      v-model.number="age"
                                      name="Age"
                                      :rules="[v => (/^[1-9]\d*$/.test(v))  || 'age must be a positive number']"
                                      color="purple accent-9"/>
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn rounded class="mb-7 mr-7" color="purple accent-9" dark @click="step--" >BACK</v-btn>
                      <v-btn class="mb-7 white--text" rounded color="purple accent-9"  @click="step++">NEXT</v-btn>
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
                      <v-form>
                        <v-text-field class="ml-12 mr-12"  v-model.number="weight" value="0" label="Weight" name="Weight" :rules="[
                          v => (/^[1-9]\d*$/.test(v))  || 'Weight must be a positive number',
                          ]" suffix="Kg" prepend-icon="mdi-weight" color="purple accent-9"/>

                        <v-text-field class="ml-12 mr-12" label="Height" v-model.number="height" value="0" name="Height" :rules="[
                          v => (/^[1-9]\d*$/.test(v))  || 'Height must be a positive number',
                          ]" suffix="cm" prepend-icon="mdi-ruler" color="purple accent-9"/>
                      </v-form>
                    </v-card-text>
                    <div class="text-center ">
                      <v-btn rounded class="mb-7 mr-7" color="purple accent-9" dark @click="step--" >BACK</v-btn>
                      <v-btn rounded class="mb-7 white--text" color="purple accent-9" @click="handleSignUp">FINISH</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div >
                      <v-img src="../assets/gymphoto2.jpg" min-height="400" ></v-img>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="5">
                <v-row class="fill-height">
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h4 class="text-center display-2 purple--text text--accent-9 mb-5">Please enter the confirmation code that was sent to your email</h4>
                      <v-form v-model="valid2">
                        <v-text-field class="ml-12 mr-12"  disabled v-model="email_signup" label="email" name="email" type="text" color="purple accent-9"/>
                        <v-text-field class="ml-12 mr-12"  v-model="code" label="Code" name="Code" :rules="[
                          v => !!v ||'Code is Required',
                          ]" type="text" color="purple accent-9"/>
                      </v-form>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded class="mb-7 mr-3 white--text" color="purple accent-9" @click="resendCode">RESEND VERIFICATION CODE</v-btn>
                      <v-btn rounded class="mb-7 white--text" color="purple accent-9" :disabled="!valid2" @click="confirmRegister">CONFIRM</v-btn>
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
      <v-snackbar v-model="cycleRegisterSuccess.visible" :color="cycleRegisterSuccess.color" :multi-line="cycleRegisterSuccess.mode === 'multi-line'" :timeout="cycleRegisterSuccess.timeout" :top="cycleRegisterSuccess.position === 'top'">
        <v-layout align-center pr-4>
          <v-icon class="pr-3" dark large>{{ cycleRegisterSuccess.icon }}</v-icon>
          <v-layout column>
            <div>
              <strong>{{ cycleRegisterSuccess.title }}</strong>
            </div>
            <div>{{ cycleRegisterSuccess.text }}</div>
          </v-layout>
        </v-layout>
        <v-btn v-if="cycleRegisterSuccess.timeout === 0" icon @click="cycleRegisterSuccess.visible = false">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-snackbar>
    <v-snackbar v-model="cycleFail.visible" :color="cycleFail.color" :multi-line="cycleFail.mode === 'multi-line'" :timeout="cycleFail.timeout" :top="cycleFail.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ cycleFail.icon }}</v-icon>
      <v-layout column>
        <div>
          <strong>{{ cycleFail.title }}</strong>
        </div>
        <div>{{ cycleFail.text }}</div>
      </v-layout>
    </v-layout>
    <v-btn v-if="cycleFail.timeout === 0" icon @click="cycleFail.visible = false">
      <v-icon>clear</v-icon>
    </v-btn>
  </v-snackbar>
  </v-container>
</template>

<script>

import {UserApi, Credentials,Verification,} from "../api/user";
export default {
  name: "Login",
  data: () => {
    return{
      step: 1,
      show1: false,
      show2: false,
      valid: false,
      valid2: false,
      code:'',
      items: [{text:'Man',value:'male'},{ text:'Woman',value:'female'},{ text:'Other',value:'other'}],
      sex:null,
      age:null,
      weight:null,
      height:null,
      name: '',
      email_login: '',
      password_login: '',
      email_signup:'',
      password_signup:'',
      cycleRegisterSuccess: {
        color: "success",
        icon: "mdi-check-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 3000,
        title: "Success",
        text: "Registration successful, please log-in.",
        visible: false
      },
      cycleFail: {
        color:"red",
        icon: "mdi-close-circle",
        mode: "multi-line",
        position: "bot",
        timeout: 3000,
        title: "Error",
        text: "",
        visible: false
      },
    }
  },
  props:{
    source:String
  },
  methods: {
     packageData() {
        let data={
          username:this.email_signup,
          email:this.email_signup,
          password:this.password_signup,
          firstName:this.name
        }
        let metadata= {};
        if(this.sex!=null) {
          data.gender=this.sex;
        }
        if(this.age!=null) {
          data.birthdate=this.age;
        }
        if(this.weight!=null) {
          metadata.weight=this.weight;
        }
        if(this.height!=null) {
          metadata.height=this.height;
        }
        data.metadata=metadata;
        return data;
     },
    async handleSignIn() {
        try{
          const credentials = new Credentials(this.email_login, this.password_login);
          await UserApi.login(credentials, null);
          await this.$router.push('/community-routines');
        }catch (e) {
         this.cycleFail.text=e.details;
         this.cycleFail.visible = !this.cycleFail.visible;
        }
    },
    async handleSignUp() {
        try{
          await UserApi.register(this.packageData());
          this.step++;
        }catch (e) {
          this.cycleFail.text=e.details;
          this.cycleFail.visible = !this.cycleFail.visible;
        }
    },
    async confirmRegister(){
        try{
          const credentials = new Verification(this.email_signup,this.code);
          await UserApi.verifyCode(credentials);
          this.step = 1;
          this.cycleRegisterSuccess.visible = !this.cycleRegisterSuccess.visible;
        }catch(e){
          this.cycleFail.text=e.details;
          this.cycleFail.visible = !this.cycleFail.visible;
        }
    },
    async resendCode() {
        await UserApi.resendVerificationCode(this.email_signup);
    }
  }
}
</script>

<style scoped>

</style>