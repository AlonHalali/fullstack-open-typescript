import { useState } from 'react';

import type { NewDiaryEntry, DiaryFormProps, NotificationT } from '../types';
import Notification from './Notification';

const DiaryForm = ({ addDiary }: DiaryFormProps) => {
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [notification, setNotification] = useState<NotificationT | null>(null);

  const notifyWith = (message: string, isError: boolean = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 5000);
  };

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
    if (result === '') {
      setWeather('');
      setVisibility('');
      setDate('');
      setComment('');
    } else {
      notifyWith(result, true);
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <Notification notification={notification} />
      <form onSubmit={handleSubmit}>
        <div>
          <strong>Weather:</strong>
          <br />
          {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w.charAt(0).toUpperCase() + w.slice(1)}
            </label>
          ))}
        </div>

        <div>
          <strong>Visibility:</strong>
          <br />
          {['great', 'good', 'ok', 'poor'].map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </label>
          ))}
        </div>

        <div>
          <label>
            <strong>Date:</strong>
            <br />
            <input
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </label>
          <br />
        </div>

        <div>
          <label>
            <strong>Comment:</strong>
            <br />
            <input
              type="text"
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
            <br />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
