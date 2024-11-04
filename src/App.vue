<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <RouterView>
      <template #default="{ Component, route }">
        <Suspense v-if="Component" :timeout="0">
          <Component :is="Component" :key="route.name" />

          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </AuthLayout>
</template>
