import { type TaskModel } from '../manageModel'

const taskList: TaskModel[] = [
  {
    title: 'Change EXE course examination system',
    description: 'Prepare document and presentation slide for course EXE',
    due_date: '2023-10-30',
    priority: 'high',
    type: 'subject',
    created_at: '2023-10-20',
    created_by: 'Jhony Jeffery',
    status: 'Todo',
  },
  {
    title: 'Revise CS101 Curriculum',
    description: 'Update course materials and create a new syllabus for CS101',
    due_date: '2023-11-15',
    priority: 'medium',
    type: 'subject',
    created_at: '2023-10-22',
    created_by: 'Alice Smith',
    status: 'InProgress',
  },
  {
    title: 'Faculty Meeting',
    description: 'Attend the monthly department meeting',
    due_date: '2023-11-05',
    priority: 'low',
    type: 'department',
    created_at: '2023-10-25',
    created_by: 'Robert Johnson',
    status: 'Todo',
  },
  {
    title: 'Prepare for Fall Semester',
    description:
      'Get ready for the upcoming semester, order textbooks, and set up classrooms',
    due_date: '2023-11-01',
    priority: 'high',
    type: 'semester',
    created_at: '2023-10-28',
    created_by: 'Emily Davis',
    status: 'InProgress',
  },
  {
    title: 'Research New Teaching Methods',
    description:
      'Investigate innovative teaching techniques for improved student engagement',
    due_date: '2023-11-30',
    priority: 'medium',
    type: 'department',
    created_at: '2023-11-02',
    created_by: 'John Adams',
    status: 'InProgress',
  },
  {
    title: 'Create Exam Schedule',
    description:
      'Prepare and publish the exam schedule for the upcoming semester',
    due_date: '2023-12-05',
    priority: 'high',
    type: 'semester',
    created_at: '2023-11-05',
    created_by: 'Olivia Harris',
    status: 'Todo',
  },
  {
    title: 'Recruit Guest Lecturers',
    description:
      'Invite industry experts for guest lectures in various subjects',
    due_date: '2023-11-25',
    priority: 'medium',
    type: 'subject',
    created_at: '2023-11-08',
    created_by: 'William Brown',
    status: 'Done',
  },
  {
    title: 'Review Student Feedback',
    description:
      'Analyze and address feedback from students regarding course content',
    due_date: '2023-12-10',
    priority: 'low',
    type: 'subject',
    created_at: '2023-11-11',
    created_by: 'Sophia Wilson',
    status: 'Done',
  },
  {
    title: 'Update Academic Calendar',
    description:
      'Revise the academic calendar for the next year, including holidays and breaks',
    due_date: '2023-12-20',
    priority: 'high',
    type: 'semester',
    created_at: '2023-11-14',
    created_by: 'Daniel White',
    status: 'Todo',
  },
  {
    title: 'Plan Faculty Training',
    description:
      'Organize training sessions for faculty development and skills enhancement',
    due_date: '2023-12-15',
    priority: 'medium',
    type: 'department',
    created_at: '2023-11-17',
    created_by: 'Ava Johnson',
    status: 'Todo',
  },
  {
    title: 'Curriculum Review Meeting',
    description:
      'Conduct a meeting to discuss curriculum improvements and changes',
    due_date: '2023-12-05',
    priority: 'low',
    type: 'department',
    created_at: '2023-11-20',
    created_by: 'James Miller',
    status: 'Todo',
  },
  {
    title: 'Semester Evaluation',
    description:
      'Evaluate the overall performance and outcomes of the current semester',
    due_date: '2023-12-30',
    priority: 'high',
    type: 'semester',
    created_at: '2023-11-23',
    created_by: 'Lily Turner',
    status: 'Done',
  },
  {
    title: 'Subject Materials Review',
    description:
      'Review and update course materials for accuracy and relevance',
    due_date: '2023-12-10',
    priority: 'medium',
    type: 'subject',
    created_at: '2023-11-26',
    created_by: 'Noah Parker',
    status: 'InProgress',
  },
  {
    title: 'Semester Enrollment Planning',
    description:
      'Plan for student enrollment and class scheduling for the upcoming semester',
    due_date: '2023-12-15',
    priority: 'low',
    type: 'semester',
    created_at: '2023-11-29',
    created_by: 'Ella Davis',
    status: 'InProgress',
  },
  {
    title: 'Faculty Recruitment',
    description:
      'Begin the recruitment process for new faculty positions in the department',
    due_date: '2023-12-31',
    priority: 'high',
    type: 'department',
    created_at: '2023-12-02',
    created_by: 'Jack Brown',
    status: 'Done',
  },
  // Add more entries as needed...
]

export default taskList
