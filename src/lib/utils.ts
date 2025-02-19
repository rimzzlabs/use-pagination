export function toInt(n?: string | number | null, defaultValue = 0) {
  let number = parseFloat(String(n))
  if (isNaN(number)) return defaultValue

  return number
}

export function makeArray<B>(fn: (n: number) => B) {
  return (n = 0) => Array.from(Array(n)).map((_, index) => fn(index))
}
