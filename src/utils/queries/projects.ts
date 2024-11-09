import type { QueryData } from '@supabase/supabase-js'

export const fetchProjectsQuery = async () => {
  return await supabase.from('projects').select('*')
}

export type Project = QueryData<ReturnType<typeof fetchProjectsQuery>>[number]

export const getProjectQuery = async (slug: string) => {
  return await supabase
    .from('projects')
    .select(
      `
        *,
        tasks (
          id,
          name,
          status,
          due_date
        )
      `
    )
    .eq('slug', slug)
    .single()
}

export type ProjectWithTasks = QueryData<ReturnType<typeof getProjectQuery>>
