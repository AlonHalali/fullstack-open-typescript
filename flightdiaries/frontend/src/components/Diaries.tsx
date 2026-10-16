import Diary from './Diary';
import type { DiariesProps } from '../types';

const Diaries = ({ diaries }: DiariesProps) => (
  <div>
    <h1>Flight Diaries</h1>
    {diaries.map((d) => (
      <Diary key={d.id} diary={d} />
    ))}
  </div>
);

export default Diaries;
