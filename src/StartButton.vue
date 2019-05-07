<template>
  <button><slot></slot></button>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
button {
  background-color: var(--brainstorm-accent-fg);
  color: var(--brainstorm-accent-fg-2);
  border-radius: 5px;
  border: 0;
  font-family: inherit;
  font-weight: 600;
  font-size: 18px;
  height: 50px;
  width: 110px;
  cursor: pointer;
  outline: none;
}
button:hover {
  opacity: .9;
}
</style>
