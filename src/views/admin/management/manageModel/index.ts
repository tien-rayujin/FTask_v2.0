export interface LecturerModel {
  id: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  phoneNumber: string
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: Date
  lockoutEnabled: boolean
  filePath: string
  displayName: string
  department: DepartmentModel
  departmentHead: LecturerModel
  createdBy: string
  createdAt: Date
}

export interface UserModel {
  id: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  phoneNumber: string
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: Date
  lockoutEnabled: boolean
  filePath: string
  displayName: string
  roles: Array<string>
  createdBy: string
  createdAt: Date
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
  createdAt: string
}

export interface SemesterModel {
  semesterId: string
  semesterCode: string
  startDate: string
  endDate: string
  createdBy: string
  createdAt: Date
}

export interface DepartmentModel {
  departmentId: string
  departmentName: string
  departmentCode: string
  departmentHead: LecturerModel
  createdBy: string
  createdAt: Date
}
