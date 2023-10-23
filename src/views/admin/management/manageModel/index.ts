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
  name: string
  email: string
  phone: string
  status: string
}

export interface TaskModel {
  title: string
  description: string
  due_date: string
  priority: string
  type: string
  created_at: string
  created_by: string
  status: string
}

export interface SubjectModel {
  Id: string
  name: string
  code: string
  department: string
  status: string
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
