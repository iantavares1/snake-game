export const getRandomPosition = (max) => {
  const random = () => Math.floor(Math.random() * max)
  let x = random()
  let y = random()

  x = x % 2 === 0 ? x : x - 1
  y = y % 2 === 0 ? y : y - 1

  return { x, y }
}
