import axios from 'axios';
import type { NewDiaryEntry, DiaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAll = () =>
  axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);

const create = (object: NewDiaryEntry) =>
  axios.post<DiaryEntry>(baseUrl, object).then((response) => response.data);

export default { getAll, create };
