<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const tasks = ref<Tables<'tasks'>[] | null>()

;(async () => {
  const { data, error } = await supabase.from('tasks').select('*')

  if (error) {
    console.error(error)
    return
  }

  tasks.value = data
})()
</script>

<template>
  <RouterLink to="/">Home</RouterLink>

  <section>
    <h2>Tasks</h2>

    <table style="width: 100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>
            {{ task.status === 'in-progress' ? 'In Progress' : 'Completed' }}
          </td>
          <td style="text-align: center">
            <RouterLink :to="`/tasks/${task.id}`">View</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
