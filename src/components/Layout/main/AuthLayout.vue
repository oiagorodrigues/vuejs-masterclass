<script setup lang="ts">
const { page } = storeToRefs(usePageStore())
</script>

<template>
  <Sidebar />

  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />

    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center gap-4">
        <h1 class="text-lg font-semibold md:text-2xl">
          {{ page.title }}
        </h1>
      </div>
      <slot />
    </main>
  </div>
</template>
