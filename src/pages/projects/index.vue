<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { fetchProjectsQuery, type Project } from '@/utils/queries/projects'
import { columns } from '@/utils/table/projects'

usePageStore().page.title = 'My projects'

const fetchProject = async () => {
  const { data, error } = await fetchProjectsQuery()

  if (error) {
    console.error(error)
    return [] as Project[]
  }

  return data
}

const projects = await fetchProject()
</script>

<template>
  <DataTable v-if="projects" :data="projects" :columns="columns">
    <template #cell-name="{ cell }">
      <RouterLink
        :to="`/projects/${cell.row.original.slug}`"
        class="hover:underline"
      >
        {{ cell.getValue() }}
      </RouterLink>
    </template>
  </DataTable>
</template>

<style scoped></style>
