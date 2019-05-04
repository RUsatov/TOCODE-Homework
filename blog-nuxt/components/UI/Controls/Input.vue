<template>
  <div class="control">
    <label><slot /></label>
    <input
      :value="value"
      :type="type"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>