<template>
  <div class="document-list-view">
    <div class="view-container">
      <h1>文档列表</h1>
      <p>这里将显示所有文档</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: 实现文档列表功能
</script>

<style scoped>
.document-list-view {
  width: 100%;
  height: 100%;
  padding: 24px;
}

.view-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: var(--text-color);
  margin-bottom: 16px;
}

p {
  color: var(--text-secondary);
}
</style>
