import { getExercisesArguments } from './utils.ts';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exercisesHours: number[],
  targetAvg: number,
): Result => {
  const periodLength: number = exercisesHours.length;
  if (periodLength === 0)
    throw new Error("Don't show up with an empty workout plan, you weakling.");

  let totalHours: number = 0;
  let trainingDays = 0;
  exercisesHours.forEach((hour) => {
    if (hour > 0) trainingDays++;
    totalHours += hour;
  });
  const actualAvg: number = totalHours / periodLength;

  let rating: number;
  let ratingDescription: string;
  const rate: number = actualAvg / targetAvg;

  if (rate < 0.9) {
    rating = 1;
    ratingDescription =
      "You didn't reach the goal! Maybe not next time, either.";
  } else if (rate < 1.1) {
    rating = 2;
    ratingDescription = "Does exactly what's needed and nothing more! Average.";
  } else {
    rating = 3;
    ratingDescription =
      "You went above and beyond the goal—well done! There's no chance you'll do it again.";
  }

  return {
    periodLength,
    trainingDays,
    success: actualAvg >= targetAvg,
    rating,
    ratingDescription,
    target: targetAvg,
    average: actualAvg,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, exercisesHours } = getExercisesArguments(process.argv);
    console.log(calculateExercises(exercisesHours, target));
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
