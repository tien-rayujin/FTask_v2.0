export interface LecturerModel {
  name: string
  email: string
  phone: string
  department: string
  subject: string
  status: string
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
