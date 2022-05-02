export const movePosition = (
  arr: any[],
  fromIndex: number,
  toIndex: number
) => {
  if (!arr) return
  var element = arr[fromIndex]
  arr.splice(fromIndex, 1)
  arr.splice(toIndex, 0, element)
}
