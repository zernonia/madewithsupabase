import type { Database } from './database'

export * from './database'
export type Project = Database['public']['Views']['products_view']['Row']

export type ProjectForm = Omit<
  Database['public']['Tables']['products']['Row'],
  'id' | 'created_at' | 'approved'
>
export type NonNullableProjectForm = {
  [K in keyof ProjectForm]-?: NonNullable<ProjectForm[K]>
} & {
  team_info: {
    handler: string
    email: string
  }[]
}
