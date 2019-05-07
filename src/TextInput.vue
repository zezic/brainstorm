<template>
  <div class="text-input">
    <textarea
      v-model='localValue'
      rows='12'
      placeholder='Start Typing Here...'
      :style='{ fontFamily: font }'
      :readonly='lock'
      ref='textarea'
    ></textarea>
  </div>
</template>

<script>
import TextInputMixin from './TextInputMixin'

export default {
  mixins: [TextInputMixin],
  props: {
    lock: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    lock (locked) {
      if (!locked) {
        this.$refs.textarea.focus()
      }
    }
  }
}
</script>

<style lang="css" scoped>
.text-input {
}
.text-input textarea {
  border: 0;
  font-size: 18px;
  padding: 20px 30px;
  background-color: transparent;
  color: var(--brainstorm-fg);
  resize: none;
  border-radius: 0 0 10px 10px;
  width: 100%;
  outline: none;
}
</style>
