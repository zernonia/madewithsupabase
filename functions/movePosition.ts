export function movePosition(arr: any[],
  fromIndex: number,
  toIndex: number) {
  if (!arr)
    return
  const element = arr[fromIndex]
  arr.splice(fromIndex, 1)
  arr.splice(toIndex, 0, element)
}
