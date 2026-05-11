export const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms))

export const randomDelay = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
