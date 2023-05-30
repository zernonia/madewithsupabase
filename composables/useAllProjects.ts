import type { Project } from '~~/types'

export function useAllProjects() {
  const allProjects = useState<Project[]>('all-projects', () => [])

  const upsertProjects = (projects: Project[]) => {
    for (const project of projects) {
      if (!allProjects.value.includes(project))
        allProjects.value.push(project)
    }
  }

  return {
    allProjects,
    upsertProjects,
  }
}
