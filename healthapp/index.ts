import express from 'express'
const app = express()

app.use(express.json())

import { isNotNumber } from "./utils.ts"
import { calculateBmi } from './bmiCalculator.ts'
import { calculateExercise } from './exerciseCalculator.ts'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const params = req.query
  
  const weight = Number(params.weight)
  const height = Number(params.height)

  if(isNotNumber(weight) || isNotNumber(height)) {
    res.json('malformatted parameters')
    return
  }

  const bmi = calculateBmi(height, weight)

  const result = {
    weight : weight,
    height : height,
    bmi: bmi,
  }

  res.json(result)
})

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body

  if(!daily_exercises || target === undefined) {
    return res.status(400).json({ error : "parameters missing" })
  }

  if(Array.isArray(daily_exercises)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!daily_exercises.map((a:any) => isNotNumber(a)).every((b:any) => b === false) || isNotNumber(target)) {
      return res.status(400).json({ error : "malformatted parameters" })
    }
  } else {
    return res.status(400).json({ error : "malformatted parameters" })
  }

  const exercises = daily_exercises.map(Number)
  const targetNumber = Number(target)

  const result = calculateExercise(exercises, targetNumber)

  return res.json(result)
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})