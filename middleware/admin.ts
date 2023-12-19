/* eslint-disable no-alert */
export default defineNuxtRouteMiddleware(() => {
  const password = useState<string | undefined>('password', undefined)
  const localStoragePassword = useSessionStorage('password', '')
  if (process.server) {
    password.value = process.env.ADMIN_PASSWORD!
  }
  else if (!localStoragePassword.value) {
    const input = prompt('Enter password')
    if (input !== password.value) {
      alert('Incorrect password')
      throw new Error('Incorrect password')
    }
    else {
      localStoragePassword.value = input
    }
  }
})
