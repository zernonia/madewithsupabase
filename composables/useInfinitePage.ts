import type { Project } from "@/types"

export const useInfinitePage = (key: string) => {
  const count = useState(`${key}-count`, () => 0)
  const page = useState(`${key}-page`, () => 0)
  const projects = useState<Project[]>(`${key}-data`, () => [])

  return {
    count,
    page,
    projects,
  }
}
