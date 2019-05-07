<template>
  <div class="mode-box" :class="{ active }">
    <slot name="left"></slot>
    <div class="mode-display">
      <div class="mode-name">{{ title }}</div>
      <div class="mode-count">{{ display }}</div>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    display: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
.mode-box {
  display: flex;
  align-items: center;
}
.mode-box:not(.active) {
  pointer-events: none;
  opacity: .5;
}
.mode-box .mode-display {
  margin-left: 10px;
  margin-right: 10px;
}
.mode-box .mode-display .mode-name,
.mode-box .mode-display .mode-count {
  font-weight: 600;
  text-align: center;
}
.mode-box .mode-display .mode-name {
  font-size: 12px;
  margin-bottom: 2px;
}
.mode-box .mode-display .mode-count {
  font-size: 18px;
}
</style>
