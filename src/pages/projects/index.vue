<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
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
</script>

<template>
  <RouterLink to="/">Home</RouterLink>

  <section>
    <h2>Projects</h2>

    <table style="width: 100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.name }}</td>
          <td>
            {{ project.status === 'in-progress' ? 'In Progress' : 'Completed' }}
          </td>
          <td style="text-align: center">
            <RouterLink :to="`/projects/${project.id}`">View</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
