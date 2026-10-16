interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => (
  <>
    {parts.map((part, i) => (
      <p key={i}>
        {part.name} {part.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;
