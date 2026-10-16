import { useState, useEffect } from 'react';
import axios from 'axios';

import type { NewDiaryEntry, DiaryEntry } from './types';
import diaryService from './services/diaryService';
import DiaryForm from './components/DiaryForm';
import Diaries from './components/Diaries';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const addDiary = async (diaryToAdd: NewDiaryEntry): Promise<string> => {
    try {
      const returnedDiary = await diaryService.create(diaryToAdd);
      setDiaries(diaries.concat(returnedDiary));
      return '';
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response?.data?.error?.[0]?.message || error.message;
      }
      return 'Unknown error';
    }
  };

  return (
    <div>
      <DiaryForm addDiary={addDiary} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
