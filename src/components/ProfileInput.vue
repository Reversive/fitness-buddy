<template>
  <div class="centered" v-bind:class="{hidden: !editing}" >
    <div class="input-div">
      <v-text-field v-bind:disabled="!editing" :value="input_value" v-bind:label="single?'':input_label" :type="input_type" :single-line="single" :dense="single" dark/>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProfileInput",
  props: ['input_value', 'editing', 'input_type', 'input_label', 'single']
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
</style>