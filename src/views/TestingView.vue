<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item id="SexAndAge" :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h2 class="text-center display-2 purple--text text--accent-9 mb-5">Just a few more steps</h2>
                        <h4 class="text-center purple--text text--accent-9">Optimize your workout plan by answering this questions</h4>
                        <v-form v-model="valid">
                          <v-select class="ml-12 mr-12"
                                    :items="items"
                                    :rules="[v=>!!v|| 'Sex is required']"
                                    label="Sex"></v-select>
                          <v-text-field class="ml-12 mr-12"
                                        label="Age"
                                        name="Age"
                                        :rules="[v => !!v ||'Age is Required',v => (/^[1-9]\d*$/.test(v))  || 'age must be a positive number',]"
                                        type="text"
                                        color="purple accent-9"/>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn class="mb-7" rounded color="purple accent-9" dark @click="step++">NEXT</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4">
                      <div >
                        <v-img src="./../assets/gym-workout-1600.jpg" min-height="400" ></v-img>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item id="HeightAndWeight" :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h2 class="text-center display-2 purple--text text--accent-9 mb-5">Just a few more steps</h2>
                        <h4 class="text-center purple--text text--accent-9">Optimize your workout plan by answering this questions</h4>
                        <v-form v-model="valid">
                          <v-text-field class="ml-12 mr-12" label="Weight" name="Weight" :rules="[
                          v => !!v ||'Weight is Required',
                          v => (/^[1-9]\d*$/.test(v))  || 'Weight must be a positive number',
                          ]" type="text" suffix="Kg" prepend-icon="mdi-weight" color="purple accent-9"/>

                          <v-text-field class="ml-12 mr-12" label="Height" name="Height" :rules="[
                          v => !!v ||'Height is Required',
                          v => (/^[1-9]\d*$/.test(v))  || 'Height must be a positive number',
                          ]" type="text" suffix="cm" prepend-icon="mdi-ruler" color="purple accent-9"/>
                        </v-form>
                      </v-card-text>
                      <div class="text-center ">
                        <v-btn rounded class="mb-7 mr-7" color="purple accent-9" dark @click="step--" >BACK</v-btn>
                        <v-btn rounded class="mb-7" color="purple accent-9" dark @step="step++">FINISH</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4">
                      <div >
                        <v-img src="./../assets/gymphoto2.jpg" min-height="400" ></v-img>
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
  name: "TestingView",
  data: () => {
    return{
      step:1,
      valid: true,
      items: ["Man", "Woman", "Other"],
    }
  },
  props:{
    source:String
  }
}
</script>

<style scoped>

</style>