export interface LecturerModel {
  id: string
  email: string | null
  normalizedEmail: string | null
  emailConfirmed: boolean
  phoneNumber: string | null
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: Date | null
  lockoutEnabled: boolean
  filePath?: string
  displayName: string | null
  department?: DepartmentModel | null
  departmentHead?: LecturerModel | null
  createdBy: string
  createdAt: Date | string
}

export interface UserModel {
  id: string
  email: string | null
  normalizedEmail: string | null
  emailConfirmed: boolean
  phoneNumber: string | null
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: Date | null
  lockoutEnabled: boolean
  filePath: string | null
  displayName: string | null
  roles: Array<string>
  createdBy: string
  createdAt: Date | string
}

export interface TaskModel {
  taskId: number
  taskTitle: string
  taskContent: string
  startDate: Date
  endDate: Date
  taskLevel: number
  taskStatus: number
  location: string
  semester: SemesterModel
  department: DepartmentModel
  subject: SubjectModel
  createdBy: LecturerModel
  createdAt: Date
}

export interface SubjectModel {
  subjectId: number
  subjectName: string
  subjectCode: string
  department: DepartmentModel
  status: string
  createdBy: string
  createdAt: Date | string
}

export interface SemesterModel {
  semesterId: number
  semesterCode: string
  startDate: string
  endDate: string
  createdBy: string
  createdAt: Date | string
}

export interface DepartmentModel {
  departmentId: number
  departmentName: string
  departmentCode: string
  departmentHead: LecturerModel | null
  createdBy: string
  createdAt: Date | string
}
