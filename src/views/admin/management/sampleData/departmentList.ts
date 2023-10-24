import type { DepartmentModel } from '../manageModel'
//   Id: string
//   name: string
//   code: string
//   lecturerHead_Id: string
//   lecturerHead_name: string
const departmentList: DepartmentModel[] = [
  {
    departmentId: 1,
    departmentName: 'kinh tế 1',
    departmentCode: 'MARK103',
    departmentHead: {
      id: '422a6948-9868-4a69-e375-08dbc25fd71b',
      email: null,
      normalizedEmail: null,
      emailConfirmed: false,
      phoneNumber: '00009992211',
      phoneNumberConfirmed: false,
      twoFactorEnabled: false,
      lockoutEnd: null,
      lockoutEnabled: false,
      filePath: null,
      displayName: 'teredew',
      createdBy: 'Undefined',
      createdAt: '0001-01-01T00:00:00',
    },
    createdBy: 'Undefined',
    createdAt: '0001-01-01T00:00:00',
  },
  {
    departmentId: 6,
    departmentName: 'string',
    departmentCode: 'string',
    departmentHead: null,
    createdBy: 'Undefined',
    createdAt: '0001-01-01T00:00:00',
  },
  {
    departmentId: 7,
    departmentName: 'string1',
    departmentCode: 'string1',
    departmentHead: null,
    createdBy: 'Undefined',
    createdAt: '0001-01-01T00:00:00',
  },
  {
    departmentId: 9,
    departmentName: 'Security Information',
    departmentCode: 'SE2122',
    departmentHead: {
      id: '2509c552-2442-4988-6687-08dbc5b99d3a',
      email: null,
      normalizedEmail: null,
      emailConfirmed: false,
      phoneNumber: null,
      phoneNumberConfirmed: false,
      twoFactorEnabled: false,
      lockoutEnd: null,
      lockoutEnabled: true,
      filePath:
        'https://res.cloudinary.com/dd9f1tyca/image/upload/v1697945242/gkio53xo0bywpx3rfsyj.png',
      displayName: 'aloootest',
      createdBy: 'Undefined',
      createdAt: '0001-01-01T00:00:00',
    },
    createdBy: '358678c8-a1f7-42e4-b83e-08dbc25fd46c',
    createdAt: '2023-10-20T20:06:00.7775884',
  },
  {
    departmentId: 10,
    departmentName: 'testttt',
    departmentCode: 'string111',
    departmentHead: null,
    createdBy: 'Unauthenticated User',
    createdAt: '2023-10-20T21:44:42.319932',
  },
]

export default departmentList
