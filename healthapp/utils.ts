interface BmiValues {
  weight: number;
  height: number;
}

interface ExercisesValues {
  exercisesHours: number[];
  target: number;
}

export const isNumber = (argument: unknown): boolean =>
  !isNaN(Number(argument));

export const getBMIArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNumber(args[2]) && isNumber(args[3]))
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };

  throw new Error('To check your BMI, you need numerical data, you fatso.');
};

export const getExercisesArguments = (args: string[]): ExercisesValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let target: number;
  if (isNumber(args[2])) {
    target = Number(args[2]);
  } else throw new Error("You coward—you're afraid to set a numerical target.");

  let exercisesHours: number[] = [];

  for (let i: number = 3; i < args.length; i++) {
    if (!isNumber(args[i]))
      throw new Error(
        `What you entered at position ${i + 1} isn't a number, you moron.`,
      );

    exercisesHours.push(Number(args[i]));
  }

  return {
    exercisesHours,
    target,
  };
};
