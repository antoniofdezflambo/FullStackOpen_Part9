import { isNotNumber } from "./utils.ts"

const calculateExercise = (dayHours: number[], target: number)  => {
  const periodLength = dayHours.length
  const trainingDays = dayHours.filter(a => a !== 0).length
  const average = periodLength > 0 ? dayHours.reduce((a, b) => a + b, 0) / periodLength : 0
  const success = average >= target

  const develop = target > 0 ? average / target : 0
  let ratingDescription = ''
  let rating = 0

  if(develop < 0.25) {
    rating = 0
    ratingDescription = 'Very poor progress. You need to put in significantly more effort.'
  } else if(develop < 0.5) {
    rating = 1
    ratingDescription = 'Below expectations. Keep pushing to reach your baseline.'
  } else if(develop < 1) {
    rating = 2
    ratingDescription = 'Not too bad but could be better.'
  } else if(develop >= 1) {
    rating = 3
    ratingDescription = 'Target reached. Well done.'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,  
  }
}

const hours: number[] = process.argv.slice(3).map(Number)
const target: number = Number(process.argv[2])

if(hours.map(a => isNotNumber(a)).every(b => b === false)) {
  const result = calculateExercise(hours, target)
  console.log(result)
} else {
  console.error('All arguments must be Numbers.')
}