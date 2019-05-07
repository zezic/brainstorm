<template>
  <div class="title-input">
    <input v-model='localValue' type='text' placeholder='Type Title Here...' :style='{ fontFamily: font }'>
  </div>
</template>

<script>
import TextInputMixin from './TextInputMixin'

export default {
  mixins: [TextInputMixin]
}
</script>

<style lang="css" scoped>
.title-input {
  box-shadow: inset 0 -1px rgba(0, 0, 0, .1);
}
.title-input input {
  border: 0;
  font-size: 18px;
  padding: 20px 30px;
  background-color: transparent;
  color: var(--brainstorm-fg);
  width: 100%;
  outline: none;
}
</style>
