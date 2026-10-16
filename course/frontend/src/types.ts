// Types

// Header
export interface HeaderProps {
  name: string;
}

// Content
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}
interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: 'basic';
}
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}
interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: 'background';
}
interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: 'special';
}
export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
export interface ContentProps {
  parts: CoursePart[];
}

// Total
export interface TotalProps {
  total: number;
}
