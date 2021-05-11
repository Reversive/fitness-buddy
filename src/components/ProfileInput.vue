<template>
  <div class="centered" v-if="editing" >
    <div class="input-div">
      <v-text-field :value="input_value"
                    v-bind:label="single?'':input_label" :type="input_type"
                    v-on:keyup.native="$emit('change', $event.target.value)"
                    v-on:mouseup.native="$emit('change', $event.target.value)"
                    :single-line="single" :dense="single" dark/>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProfileInput",
  model: {
    prop: 'input_value',
    event: 'change'
  },
  props: ['input_value', 'editing', 'input_type', 'input_label', 'single']
}
</script>

<style scoped>

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