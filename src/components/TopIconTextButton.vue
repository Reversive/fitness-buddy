<template>
  <v-btn
      text
      :class="{'text-none': true }"
      @click="$router.push(payload.route)"
  >
    <v-col
        cols="12"
    >
      <v-row
          width="100%"
          style="place-content: center;"
      >
        <v-icon
            color="white"
        >
          {{ payload.icon }}
        </v-icon>
      </v-row>
      <v-row
          style="place-content: center"
      >
      <span
          class="body-1"
          style="color: white"
      >
        {{ payload.caption }}
      </span>
      </v-row>
    </v-col>
  </v-btn>
</template>

<script>
export default {
  name: "TopIconTextButton",
  props: {
    payload: Object
  }
}
</script>

<style scoped>

</style>