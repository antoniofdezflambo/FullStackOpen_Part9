import { isNotNumber } from './utils.ts';

export const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight/((height/100)**2)
  let range = ''

  if(bmi < 16)
      range = 'Underweight (Severe thinness)'
  if(bmi >= 16 && bmi < 17) // 16-17
      range = 'Underweight (Moderate thinness)'
  if(bmi >= 17 && bmi < 18.5) // 17-18.5
      range = 'Underweight (Mild thinness)'
  if(bmi >= 18.5 && bmi < 25) // 18.5-25
      range = 'Normal range'
  if(bmi >= 25 && bmi < 30) // 25-30
      range = 'Overweight (Pre-obese)'
  if(bmi >= 30 && bmi < 35) // 30-35
      range = 'Obese (Class I)'
  if(bmi >= 35 && bmi < 40) // 35-40
      range = 'Obese (Class II)'
  if(bmi >= 40) // >= 40
      range = 'Obese (Class III)'

  return range
}

if (process.argv[1] === import.meta.filename) {
    const a: number = Number(process.argv[2])
    const b: number = Number(process.argv[3])

    if(isNotNumber(a) || isNotNumber(b))
        console.error('Both 2 arguments must be Numbers.')
    else
        console.log(calculateBmi(a, b))
}