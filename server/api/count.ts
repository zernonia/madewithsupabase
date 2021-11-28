let counter = 0
export default () => {
  counter++
  return JSON.stringify(counter)
}
