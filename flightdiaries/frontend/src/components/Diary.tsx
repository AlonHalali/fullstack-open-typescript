import type { DiaryProps } from '../types';

const Diary = ({ diary }: DiaryProps) => (
  <div>
    <strong>{diary.date}</strong>
    <br />
    visibility: {diary.visibility}
    <br />
    weather: {diary.weather}
    <br />
    {diary.comment && (
      <>
        comment: {diary.comment} <br />
      </>
    )}
    <br />
  </div>
);

export default Diary;
