import { BOX_SIZE, ELEMENT_SIZE } from '../settings/constants'

export const getRandomPosition = () => {
  const randomNumber = () =>
    Math.floor(
      Math.floor(Math.random() * (BOX_SIZE - ELEMENT_SIZE)) / ELEMENT_SIZE,
    ) * ELEMENT_SIZE

  const x = randomNumber()
  const y = randomNumber()

  return { x, y }
}
