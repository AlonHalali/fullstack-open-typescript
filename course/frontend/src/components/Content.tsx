import Part from './Part';
import type { ContentProps } from '../types';

const Content = ({ parts }: ContentProps) => (
  <>
    {parts.map((part, i) => (
      <Part key={i} part={part} />
    ))}
  </>
);

export default Content;
