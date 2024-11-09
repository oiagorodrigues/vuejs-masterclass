import type { QueryData } from '@supabase/supabase-js'

export const fetchProjectsQuery = async () => {
  return await supabase.from('projects').select('*')
}

export type Project = QueryData<ReturnType<typeof fetchProjectsQuery>>[number]
