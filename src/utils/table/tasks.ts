import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import type { TaskWithProjects } from '../queries/tasks'

export const columns: ColumnDef<TaskWithProjects>[] = [
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
    accessorKey: 'projects',
    header: 'Projects',
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects.slug}`,
              class: 'hover:underline',
            },
            () => row.original.projects?.name
          )
        : null
    },
  },
  {
    accessorKey: 'collaborators',
    header: 'Collaborators',
  },
]
