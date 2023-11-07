import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AdminLayout from '@/layout/AdminLayout.vue'
import AuthLayout from '@/layout/AuthLayout.vue'
import RouterByPass from '@/layout/RouterByPass.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'dashboard' },
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'signin',
        path: 'signin',
        component: () => import('../views/auth/Signin.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../views/auth/Signup.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    name: 'admin',
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, isAdmin: true },
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../views/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'task',
        path: 'task',
        component: RouterByPass,
        children: [
          {
            name: 'taskList',
            path: 'taskList',
            component: () => import('../views/admin/management/ManageTask.vue'),
          },
          {
            name: 'taskDetail',
            path: 'taskDetail/:task_id',
            component: () =>
              import('../views/admin/management/ManageTaskDetail.vue'),
          },
          {
            name: 'taskCreate',
            path: 'taskCreate',
            component: () => import('../views/admin/management/TaskCreate.vue'),
          },
        ],
      },
      {
        name: 'manageLecturer',
        path: 'lecturer',
        component: () => import('../views/admin/management/ManageLecturer.vue'),
      },
      {
        name: 'manageUser',
        path: 'user',
        component: () => import('../views/admin/management/ManageUser.vue'),
      },
      {
        name: 'manageSubject',
        path: 'subject',
        component: () => import('../views/admin/management/ManageSubject.vue'),
      },
      {
        name: 'manageSemester',
        path: 'semester',
        component: () => import('../views/admin/management/ManageSemester.vue'),
      },
      {
        name: 'manageDepartment',
        path: 'department',
        component: () =>
          import('../views/admin/management/ManageDepartment.vue'),
      },
      {
        name: 'manageRole',
        path: 'role',
        component: () => import('../views/admin/management/ManageRole.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      document.querySelector('.app-layout__page')?.scroll(0, 0)
    }
  },
  routes,
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject,
    )
  })
}

import { useUserStore } from '@/stores/user-store'
let userStore: any = undefined

router.beforeEach(async (to, from, next) => {
  if (userStore == undefined) {
    userStore = useUserStore()
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      //  && userStore.isAuthenticated
      // user already signIn
      if (
        to.matched.some((record) => record.meta.isAdmin)
        // && UserStore.user.role?.toLocaleLowerCase() == 'admin'
      ) {
        // perform action to check if user role is Admin
        next()
      } else {
        // is normal user
        next()
      }
    } else {
      alert('You dont have access to this page')
      next({ name: 'signin' })
    }
  } else {
    next()
  }
})

export default router
