import express from 'express';

import { calculateBmi } from './bmiCalculator.ts';
import { isNumber } from './utils.ts';

const app = express();

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
    return res.send({ error: 'malformatted parameters' });

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
    return res.send({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
