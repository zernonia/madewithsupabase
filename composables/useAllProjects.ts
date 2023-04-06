import type { Project } from "~~/types"

export const useAllProjects = () => {
  const allProjects = useState<Project[]>("all-projects", () => [])

  const upsertProjects = (projects: Project[]) => {
    for (const project of projects) {
      if (allProjects.value.indexOf(project) === -1) {
        allProjects.value.push(project)
      }
    }
  }

  return {
    allProjects,
    upsertProjects,
  }
}
