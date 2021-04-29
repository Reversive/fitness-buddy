<template>
  <v-container class="mb-0 pb-0">
  <h2 class="text-left">
    <v-icon large color="white" class="pr-1" >{{icon}}</v-icon>
    {{ text + ' ' + 'CYCLES'}}
  </h2>
  </v-container>
</template>

<script>
export default {
  name: "CycleCardTitle",
  props: {
    text: String,
    icon: String
  }
}
</script>

<style scoped>
 h2 {
   color: white;
 }
</style>