export interface INavigationRoutes {
  name: string
  displayName: string
  meta: { icon: string }
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
      },
    },
    {
      name: 'manageLecturer',
      displayName: 'Lecturer',
      meta: {
        icon: 'fa-solid fa-user-tie',
      },
    },
    {
      name: 'manageSubject',
      displayName: 'Subject',
      meta: {
        icon: 'fa-solid fa-book',
      },
    },
    {
      name: 'manageSemester',
      displayName: 'Semester',
      meta: {
        icon: 'fa-solid fa-calendar-days',
      },
    },
    {
      name: 'manageDepartment',
      displayName: 'Department',
      meta: {
        icon: 'fa-solid fa-building',
      },
    },
    {
      name: 'manageDepartment',
      displayName: 'User',
      meta: {
        icon: 'fa-solid fa-user',
      },
    },
  ] as INavigationRoutes[],
}
