<template>
  <div
    class="toggle-switch"
    :class="{ active: value }"
    @click="handleClick"
  >
    <div
      class="handle"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="css" scoped>
.toggle-switch {
  height: 30px;
  width: 65px;
  background-color: var(--brainstorm-accent-fg);
  border-radius: 15px;
  position: relative;
  cursor: pointer;
}
.toggle-switch .handle {
  height: 26px;
  width: 26px;
  border-radius: 13px;
  background-color: var(--brainstorm-accent-fg-2);
  position: absolute;
  left: 2px;
  top: 2px;
  transition: transform .1s ease;
  will-change: transform;
}
.toggle-switch.active .handle {
  transform: translateX(35px);
}
</style>
