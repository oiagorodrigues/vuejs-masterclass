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
