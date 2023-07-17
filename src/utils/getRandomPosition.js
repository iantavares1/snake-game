import { BOX_SIZE, ELEMENT_SIZE } from '../settings/constants'

export const getRandomPosition = () => {
  const randomNumber = () =>
    Math.floor(Math.random() * (BOX_SIZE - ELEMENT_SIZE + 1))
  let x = randomNumber()
  let y = randomNumber()

  if (x % 2 === 1) x += 1
  if (y % 2 === 1) y += 1

  return { x, y }
}
