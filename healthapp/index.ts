import express from 'express'
const app = express()

import { isNotNumber } from "./utils.ts"
import { calculateBmi } from './bmiCalculator.ts'

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})