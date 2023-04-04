import type { Projects } from "~~/database.types"

export const useAllProjects = () => {
  const allProjects = useState<Projects>("all-projects", () => [])

  const upsertProjects = (projects: Projects) => {
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
