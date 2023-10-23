export interface LecturerModel {
  name: string
  email: string
  phone: string
  department: string
  subject: string
  status: string
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
  // taskLecturers: Array<LecturerModel>
  // attachments: Array<string>
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
  Id: string
  name: string
  code: string
  startDate: string
  endDate: string
}

export interface DepartmentModel {
  Id: string
  name: string
  code: string
  lecturerHead_Id: string
  lecturerHead_name: string
}
