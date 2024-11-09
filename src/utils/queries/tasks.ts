import type { QueryData } from '@supabase/supabase-js'

export const fetchTasksWithProjectsQuery = async () => {
  return await supabase.from('tasks').select(`
      *,
      projects (
        id,
        name,
        slug
      )
    `)
}

export type TaskWithProjects = QueryData<
  ReturnType<typeof fetchTasksWithProjectsQuery>
>[number]

export const getTaskQuery = async (id: string) => {
  return await supabase
    .from('tasks')
    .select(
      `
        *,
        projects (
          id,
          name,
          slug
        )
      `
    )
    .eq('id', id)
    .single()
}

export type SingleTaskWithProjects = QueryData<ReturnType<typeof getTaskQuery>>
