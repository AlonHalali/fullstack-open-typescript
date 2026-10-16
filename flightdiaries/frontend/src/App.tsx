import { useState, useEffect } from 'react';
import axios from 'axios';

import type { NewDiaryEntry, DiaryEntry } from './types';
import DiaryService from './services/diaryService';
import diaryService from './services/diaryService';
import DiaryForm from './components/DiaryForm';
import Diaries from './components/Diaries';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    DiaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const addDiary = async (diaryToAdd: NewDiaryEntry): Promise<boolean> => {
    try {
      const returnedDiary = await diaryService.create(diaryToAdd);
      setDiaries(diaries.concat(returnedDiary));
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        console.error(error.response.data);
      return false;
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
