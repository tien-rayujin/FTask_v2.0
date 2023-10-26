export interface LecturerModel {
  [key: string]: any

  id: string
  email?: string
  normalizedEmail?: string
  emailConfirmed: boolean
  phoneNumber?: string
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd?: Date
  lockoutEnabled: boolean
  filePath?: string
  displayName?: string
  department?: DepartmentModel
  departmentHead?: LecturerModel
  createdBy: string
  createdAt: Date | string
}

export interface UserModel {
  [key: string]: any

  id: string
  email?: string
  normalizedEmail?: string
  emailConfirmed: boolean
  phoneNumber?: string
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd?: Date
  lockoutEnabled: boolean
  filePath?: string
  displayName?: string
  roles: Array<string>
  createdBy: string
  createdAt: Date | string
}

export interface TaskModel {
  [key: string]: any

  taskId: number
  taskTitle: string
  taskContent: string
  startDate: Date | string
  endDate: Date | string
  taskLevel: number
  taskStatus: number
  location: string
  semester: SemesterModel
  department: DepartmentModel
  subject: SubjectModel
  createdBy: LecturerModel
  createdAt: Date | string
}

export interface SubjectModel {
  [key: string]: any

  subjectId: number
  subjectName: string
  subjectCode: string
  department: DepartmentModel
  status: boolean
  createdBy: string
  createdAt: Date | string
}

export interface SemesterModel {
  [key: string]: any

  semesterId: number
  semesterCode: string
  startDate: Date | string
  endDate: Date | string
  createdBy: string
  createdAt: Date | string
}

export interface DepartmentModel {
  [key: string]: any

  departmentId: number
  departmentName: string
  departmentCode: string
  departmentHead?: LecturerModel
  createdBy: string
  createdAt: Date | string
}
