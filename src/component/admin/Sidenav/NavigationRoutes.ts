export interface INavigationRoutes {
  name: string
  displayName: string
  meta: { icon: string; color?: string }
  children?: INavigationRoutes[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'Dashboard',
      meta: {
        icon: 'fa-solid fa-house',
        color: 'text-[#5e72e4]',
      },
    },
    {
      name: 'dashboard',
      displayName: 'Task',
      meta: {
        icon: 'fa-solid fa-list-check',
        color: 'text-blue-500',
      },
    },
    {
      name: 'manageLecturer',
      displayName: 'Lecturer',
      meta: {
        icon: 'fa-solid fa-user-tie',
        color: 'text-black',
      },
    },
    {
      name: 'manageSubject',
      displayName: 'Subject',
      meta: {
        icon: 'fa-solid fa-book',
        color: 'text-red-500',
      },
    },
    {
      name: 'manageSemester',
      displayName: 'Semester',
      meta: {
        icon: 'fa-solid fa-calendar-days',
        color: 'text-green-500',
      },
    },
    {
      name: 'manageDepartment',
      displayName: 'Department',
      meta: {
        icon: 'fa-solid fa-building',
        color: 'text-gray-500',
      },
    },
    {
      name: 'manageUser',
      displayName: 'User',
      meta: {
        icon: 'fa-solid fa-user',
        color: 'text-black',
      },
    },
  ] as INavigationRoutes[],
}
