import type { SemesterModel } from '../manageModel'

const semesterList: SemesterModel[] = [
  {
    Id: '1',
    code: 'SP22',
    name: 'Spring 2022',
    startDate: '2022-01-01',
    endDate: '2022-04-30',
  },
  {
    Id: '2',
    code: 'SU22',
    name: 'Summer 2022',
    startDate: '2022-05-01',
    endDate: '2022-08-30',
  },
  {
    Id: '3',
    code: 'FA22',
    name: 'Fall 2022',
    startDate: '2022-09-01',
    endDate: '2022-12-30',
  },
  {
    Id: '4',
    code: 'W22',
    name: 'Winter 2022',
    startDate: '2022-12-01',
    endDate: '2023-02-28',
  },
  {
    Id: '5',
    code: 'SU2X',
    name: 'Summer Extension 2022',
    startDate: '2022-07-01',
    endDate: '2022-09-30',
  },
  {
    Id: '6',
    code: 'FA2X',
    name: 'Fall Extension 2022',
    startDate: '2022-10-01',
    endDate: '2022-12-31',
  },
  {
    Id: '7',
    code: 'SP23',
    name: 'Spring 2023',
    startDate: '2023-01-01',
    endDate: '2023-04-30',
  },
  {
    Id: '8',
    code: 'SU23',
    name: 'Summer 2023',
    startDate: '2023-05-01',
    endDate: '2023-08-30',
  },
  {
    Id: '9',
    code: 'FA23',
    name: 'Fall 2023',
    startDate: '2023-09-01',
    endDate: '2023-12-30',
  },
  {
    Id: '10',
    code: 'W23',
    name: 'Winter 2023',
    startDate: '2023-12-01',
    endDate: '2024-02-29',
  },
]
export default semesterList
