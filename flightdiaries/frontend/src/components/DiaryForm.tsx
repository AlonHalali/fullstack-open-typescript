import { useState } from 'react';

import type { NewDiaryEntry, DiaryFormProps } from '../types';

const DiaryForm = ({ addDiary }: DiaryFormProps) => {
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diaryToAdd: NewDiaryEntry = comment.trim()
      ? {
          weather,
          visibility,
          date,
          comment,
        }
      : { weather, visibility, date };

    const result = await addDiary(diaryToAdd);
    if (result) {
      setWeather('');
      setVisibility('');
      setDate('');
      setComment('');
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Weather
            <input
              type="text"
              value={weather}
              onChange={(event) => {
                setWeather(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Visibility
            <input
              type="text"
              value={visibility}
              onChange={(event) => {
                setVisibility(event.target.value);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            Date
            <input
              type="text"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Comment
            <input
              type="text"
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default DiaryForm;
