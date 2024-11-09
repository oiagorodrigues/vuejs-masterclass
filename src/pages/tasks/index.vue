<script setup lang="ts">
import { columns } from '@/utils/table/tasks'
import {
  fetchTasksWithProjectsQuery,
  type TaskWithProjects,
} from '@/utils/queries/tasks'

usePageStore().page.title = 'My tasks'

const fetchTasks = async () => {
  const { data, error } = await fetchTasksWithProjectsQuery()

  if (error) {
    console.error(error)
    return [] as TaskWithProjects[]
  }

  return data
}

const tasks = await fetchTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
