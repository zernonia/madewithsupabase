export function useRouteModal() {
  return useState('route-modal', () => ({
    isOpen: false,
    path: '',
  }))
}
