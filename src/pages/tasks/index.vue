<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { ColumnDef } from '@tanstack/vue-table'

import { supabase } from '@/lib/supabaseClient'

import type { Tables } from '../../../database/types'

const tasks = ref<Tables<'tasks'>[] | null>([])

;(async () => {
  const { data, error } = await supabase.from('tasks').select('*')

  if (error) {
    console.error(error)
    return
  }

  tasks.value = data
})()

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return h(
        RouterLink,
        { to: `/tasks/${row.original.id}`, class: 'hover:underline' },
        () => row.getValue('name')
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'due_date',
    header: 'Due date',
  },
  {
    accessorKey: 'project_id',
    header: 'Project id',
  },
  {
    accessorKey: 'collaborators',
    header: 'Collaborators',
  },
]
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
