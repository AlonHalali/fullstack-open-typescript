const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0) throw new Error('Height must be positive number!');
  if (weight <= 0) throw new Error('Weight must be positive number!');
  const heightMeter = height / 100;
  const bmi = weight / (heightMeter * heightMeter);

  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  if (bmi < 17.0) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25.0) return 'Normal range';
  if (bmi < 30.0) return 'Overweight (Pre-obese)';
  if (bmi < 35.0) return 'Obese (Class I)';
  if (bmi < 40.0) return 'Obese (Class II)';

  return 'Obese (Class III)';
};

try {
  console.log(calculateBmi(180, 74));
} catch (error) {
  if (error instanceof Error) console.error(error);
}
