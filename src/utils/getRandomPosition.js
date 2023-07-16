import { BOX_SIZE, ELEMENT_SIZE } from '../settings/constants'

export const getRandomPosition = () => {
  const randomNumber = () =>
    Math.floor(Math.random() * (BOX_SIZE - 2 * ELEMENT_SIZE))

  let x = randomNumber() + 1
  let y = randomNumber() + 1

  if (x % 2 === 1) x += 1

  if (y % 2 === 1) y += 1

  return { x, y }
}
