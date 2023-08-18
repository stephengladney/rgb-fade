type RGB = [number, number, number]

export function gradient(color1: RGB, color2: RGB, length: number) {
  const [red1, green1, blue1] = color1
  const [red2, green2, blue2] = color2

  const result = [color1]

  // Determine if finish is higher or lower than start
  const isRedDecreasing = red2 - red1 < 0
  const isGreenDecreasing = green2 - green1 < 0
  const isBlueDecreasing = blue2 - blue1 < 0

  // Get absolute difference between start and finish
  const redDiff = Math.abs(red2 - red1)
  const greenDiff = Math.abs(green2 - green1)
  const blueDiff = Math.abs(blue2 - blue1)

  // Calculate the step amount and round down (use Math.ceil for negative numbers)
  const redStep = isRedDecreasing
    ? Math.ceil((red2 - red1) / (length - 1))
    : Math.floor((red2 - red1) / (length - 1))
  const greenStep = isGreenDecreasing
    ? Math.ceil((green2 - green1) / (length - 1))
    : Math.floor((green2 - green1) / (length - 1))
  const blueStep = isBlueDecreasing
    ? Math.ceil((blue2 - blue1) / (length - 1))
    : Math.floor((blue2 - blue1) / (length - 1))

  // Calculate the remainder left from applying steps rounded down
  const redRemainder = redDiff % redStep
  const greenRemainder = greenDiff % greenStep
  const blueRemainder = blueDiff % blueStep

  // Calculate how often to add a 1/-1 bump to a step to cover the remainder
  const redInterval =
    redStep !== 0 ? Math.floor((length - 1) / redRemainder) : 0
  const greenInterval =
    greenStep !== 0 ? Math.floor((length - 1) / greenRemainder) : 0
  const blueInterval =
    blueStep !== 0 ? Math.floor((length - 1) / blueRemainder) : 0

  // Set bumps as positive or negative
  const redBump = isRedDecreasing ? -1 : 1
  const greenBump = isGreenDecreasing ? -1 : 1
  const blueBump = isBlueDecreasing ? -1 : 1

  // Accumulate bumps added
  let redAdded = 0
  let greenAdded = 0
  let blueAdded = 0

  // Remember previous color value. Initial value is color1
  let lastRed = red1
  let lastGreen = green1
  let lastBlue = blue1

  for (let i = 2; i <= length; i++) {
    // Add a bump if on an interval and haven't fulfilled remainder
    const isAddingRed = i % redInterval === 0 && redAdded < redRemainder
    const isAddingGreen = i % greenInterval === 0 && greenAdded < greenRemainder
    const isAddingBlue = i % blueInterval === 0 && blueAdded < blueRemainder

    if (isAddingRed) redAdded++
    if (isAddingGreen) greenAdded++
    if (isAddingBlue) blueAdded++

    const newRed = lastRed + redStep + (isAddingRed ? redBump : 0)
    const newGreen = lastGreen + greenStep + (isAddingGreen ? greenBump : 0)
    const newBlue = lastBlue + blueStep + (isAddingBlue ? blueBump : 0)

    result.push([newRed, newGreen, newBlue])

    lastRed = newRed
    lastGreen = newGreen
    lastBlue = newBlue
  }

  return result
}
