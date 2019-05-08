<template>
  <div class="brainstorm-toolbar">
    <div class="toolbar-title">Brainstormer</div>
    <div class="toolbar-content">
      <div class="slot left"><slot name='left'></slot></div>
      <div class="slot middle"><slot name='middle'></slot></div>
      <div class="slot right"><slot name='right'></slot></div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style scoped>
.brainstorm-toolbar {
  border-radius: 10px 10px 0 0;
  background-color: var(--brainstorm-accent-bg);
  color: var(--brainstorm-accent-fg);
  box-shadow: inset 0 -1px rgba(0, 0, 0, .1);
}
.brainstorm-toolbar .toolbar-title {
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  box-shadow: inset 0 -1px rgba(0, 0, 0, .1);
  padding: 20px;
}
.brainstorm-toolbar .toolbar-content {
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.brainstorm-toolbar .slot {
  display: flex;
  align-items: center;
}
.brainstorm-toolbar .slot.left,
.brainstorm-toolbar .slot.right {
  flex-grow: 1;
  flex-basis: 0;
}
.brainstorm-toolbar .slot.right {
  display: flex;
  justify-content: flex-end;
}
</style>
