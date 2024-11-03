<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { ColumnDef } from '@tanstack/vue-table'

import { supabase } from '@/lib/supabaseClient'
import DataTable from '@/components/ui/data-table/DataTable.vue'

import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>()

;(async () => {
  const { data, error } = await supabase.from('projects').select('*')

  if (error) {
    console.error(error)
    return
  }

  projects.value = data
})()

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return h(
        RouterLink,
        { to: `/projects/${row.original.slug}`, class: 'hover:underline' },
        row.original.name
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'collaborators',
    header: 'Collaborators',
  },
]
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
