export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

 type TAcademicSemesterCodeMapper = {
  [key : string] : string;
}

export const academicSemesterCodeMapper : TAcademicSemesterCodeMapper = {
  Autumn : "01",
  Summer : "02",
  Fall : "03",
}
