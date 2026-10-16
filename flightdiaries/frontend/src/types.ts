import { z } from 'zod';

export const NewEntrySchema = z.object({
  weather: z.string(),
  visibility: z.string(),
  date: z.iso.date(),
  comment: z.string().optional(),
});

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: string;
}

// Props
export interface DiaryFormProps {
  addDiary: (diaryToAdd: NewDiaryEntry) => Promise<boolean>;
}

export interface DiaryProps {
  diary: DiaryEntry;
}

export interface DiariesProps {
  diaries: DiaryEntry[];
}
