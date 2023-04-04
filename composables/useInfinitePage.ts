import type { Projects } from "@/database.types"

export const useInfinitePage = (key: string) => {
  const count = useState(`${key}-count`, () => 0)
  const page = useState(`${key}-page`, () => 0)
  const projects = useState<Projects>(`${key}-data`, () => [])

  return {
    count,
    page,
    projects,
  }
}
