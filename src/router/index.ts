import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layout/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'dashboard' },
    },
    {
      name: 'admin',
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../views/Test.vue'),
        },
        {
          name: 'manageLecturer',
          path: 'lecturer',
          component: () =>
            import('../views/admin/management/ManageLecturer.vue'),
        },
        {
          name: 'manageUser',
          path: 'user',
          component: () => import('../views/admin/management/ManageUser.vue'),
        },
        {
          name: 'manageSubject',
          path: 'subject',
          component: () =>
            import('../views/admin/management/ManageSubject.vue'),
        },
        {
          name: 'manageSemester',
          path: 'semester',
          component: () =>
            import('../views/admin/management/ManageSemester.vue'),
        },
        {
          name: 'manageDepartment',
          path: 'department',
          component: () =>
            import('../views/admin/management/ManageDepartment.vue'),
        },
      ],
    },
  ],
})

export default router
