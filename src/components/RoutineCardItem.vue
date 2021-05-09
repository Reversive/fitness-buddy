<template>
  <v-row class="my-1" align="center" no-gutters>
    <v-col cols="3" class="text-center">
      <v-icon class="purple--text text--darken-4">{{ icon }}</v-icon>
    </v-col>
    <v-col cols="8">{{ text }}</v-col>
  </v-row>
</template>

<script>
export default {
  name: "RoutineCardItem",
  props: ['icon', 'text']
}
</script>

<style scoped>

</style>