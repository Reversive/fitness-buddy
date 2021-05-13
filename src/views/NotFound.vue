<template>
  <v-container class="my-6">
    <v-card elevation="24" color="#6F2DBD">
      <v-row>
        <v-col class="text-center white--text">
          <h1 class="mb-6">The page you are looking for was not found</h1>
          <span>
            Do you want to go back to <v-btn text plain depressed :ripple="false" class="white--text my-0 py-0" height="auto" @click="redirect">
              Community Routines
            </v-btn>
          </span>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import router from "@/router/router";

export default {
name: "NotFound",
  methods: {
    redirect() {
      router.push('/community-routines');
    }
  }
}
</script>

<style scoped>
</style>