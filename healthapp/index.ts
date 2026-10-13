import express from 'express';

import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import { isNumber } from './utils.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log('bmi:', req.query.weight, req.query.height);

  if (
    !req.query.height ||
    !isNumber(req.query.height) ||
    !req.query.weight ||
    !isNumber(req.query.weight)
  )
    return res.status(400).send({ error: 'malformatted parameters' });

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    const bmi: string = calculateBmi(height, weight);
    return res.json({
      weight,
      height,
      bmi,
    });
  } catch {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises)
    return res.status(400).json({ error: 'parameters missing' });

  if (
    !isNumber(target) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((item) => !isNumber(item))
  )
    return res.status(400).json({ error: 'malformatted parameters' });

  return res.json(
    calculateExercises(daily_exercises as number[], Number(target)),
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
