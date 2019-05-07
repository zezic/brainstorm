<template>
  <div class="dropdown">
    <slot></slot>
    <div class="menu" :class="{ active }">
      <div
        class="item"
        v-for="item in items"
        :key="item.title"
        @click='select(item)'
        :class="{ active: item === value }"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="click-catcher" @click.self='toggle()'></div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Object
    }
  },
  data: () => ({
    active: false
  }),
  methods: {
    toggle () {
      this.active = !this.active
    },
    select (item) {
      this.$emit('select', item)
      this.toggle()
    },
    handleDocumentClick (e) {
      const elements = e.path || (e.composedPath && e.composedPath())
      elements && elements.length > 0 && elements.unshift(e.target)
      if (this.$el.contains(e.target)) { return }
      if (this.active) { this.toggle() }
    }
  },
  mounted () {
    document.addEventListener('click', this.handleDocumentClick)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleDocumentClick)
  }
}
</script>

<style lang="css" scoped>
.dropdown {
  position: relative;
  cursor: pointer;
}
.dropdown .click-catcher {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.dropdown .menu {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 160px;
  background-color: var(--brainstorm-bg);
  border-radius: 5px;
  padding: 10px 0;
  margin-left: -80px;
  margin-top: 10px;
  box-shadow: 0 10px 20px 0 rgba(62, 85, 105, .15);
  cursor: default;
}
.dropdown .menu::before {
  display: block;
  content: ' ';
  position: absolute;
  left: 50%;
  top: -6px;
  margin-left: -6px;
  width: 12px;
  height: 12px;
  background-color: var(--brainstorm-bg);
  transform: rotate(45deg);
}
.dropdown .menu:not(.active) {
  display: none;
}
.dropdown .menu .item {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  padding: 7px;
  cursor: pointer;
  opacity: .5;
}
.dropdown .menu .item.active,
.dropdown .menu .item:hover {
  opacity: 1;
}
</style>
