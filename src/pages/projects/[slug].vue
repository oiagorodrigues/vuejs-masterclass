<script setup lang="ts">
const route = useRoute('/projects/[slug]')
</script>

<template>
  <div>
    <h1>Project {{ route.params?.slug }}</h1>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
</template>

<style scoped></style>
