export const getRandomPosition = (max) => {
  const random = () => Math.floor(Math.random() * max)
  let x = random() + 1
  let y = random() + 1

  if (x % 2 === 1) {
    x += 1
  }

  if (y % 2 === 1) {
    y += 1
  }

  return { x, y }
}
