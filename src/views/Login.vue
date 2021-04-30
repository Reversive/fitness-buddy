<template>
    <v-app>
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
              <v-card class="elevation-12">
                <v-window v-model="step">
                  <v-window-item id="Log in" :value="1">
                    <v-row>
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1 class="text-center display-2 purple--text text--accent-9">Sign in</h1>
                          <v-form>
                            <v-text-field
                                label="Email"
                                name="Email"
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
                          <v-btn class="mb-7" rounded color="purple accent-9" dark>SIGN IN</v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12" md="4" class="purple accent-9">
                        <v-card-text class="white--text mt-12">
                          <h1 class="text-center display-1">Hello, Friend!</h1>
                          <h5
                              class="text-center"
                          >Enter your personal details and start journey with us</h5>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-window-item>
                  <v-window-item id="Register" :value="2">
                    <v-row class="fill-height">
                      <v-col cols="12" md="4" class="purple accent-9">
                        <v-card-text class="white--text mt-12">
                          <h1 class="text-center display-1">Welcome Back!</h1>
                          <h5
                              class="text-center"
                          >To keep connected with us please login with your personnel info</h5>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1 class="text-center display-2 purple--text text--accent-9">Create Account</h1>
                          <v-form v-model="valid">
                            <v-text-field label="Full Name" name="Name" :rules="[v=> !!v||'Full name is required']" prepend-icon="mdi-account" type="text" color="purple accent-9"/>
                            <v-text-field :rules="[v=>!!v||'Email is required',
                                           v=>/.+@.+\..+/.test(v) || 'E-mail must be valid']"
                                          label="Email"
                                          name="Email"
                                          prepend-icon="mdi-email"
                                          type="text"
                                          color="purple accent-9"/>
                            <v-text-field id="password"
                                          label="Password"
                                          name="password"
                                          prepend-icon="mdi-lock"
                                          :rules="[v=>!!v||'Password is required']"
                                          :type="show2 ? 'text' : 'password'"
                                          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                          @click:append="show2 = !show2"
                                          color="purple accent-9"/>
                          </v-form>
                        </v-card-text>
                        <div class="text-center ">
                          <v-btn rounded class="mb-7" color="purple accent-9" dark >SIGN UP</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-window-item>
                </v-window>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return{
      step:1,
      show1: false,
      show2:false,
      valid: false,
    }
  },
  props:{
    source:String
  }
}
</script>

<style scoped>

</style>