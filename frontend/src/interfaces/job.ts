export interface Job {
  name: string
  presidentName: string
  email: string
  phoneNumber: string
  prefecture: number
  zipCode: string
  addressCity: string
  addressStreet: string
  addressBuilding: string
  projects: string
  solveProblems: string
  serviceLink: string
  round: number
  industry: number
  image: string
  cultureImage: string
  productImage: string
  establishmentYear: Date
  members: number
}

export interface JobOrganization {
  name: string
  presidentName: string
  email: string
  phoneNumber: string
  prefecture: number
  zipCode: string
  addressCity: string
  addressStreet: string
  addressBuilding: string
  projects: string
  solveProblems: string
  serviceLink: string
  round: number
  industry: number
  image: string
  cultureImage: string
  productImage: string
  establishmentYear: Date
  members: number
  organization: {
    id: number
    name: string
    presidentName: string
    email: string
    phoneNumber: string
    prefecture: number
    zipCode: string
    addressCity: string
    addressStreet: string
    addressBuilding: string
    projects: string
    solveProblems: string
    serviceLink: string
    round: number
    industry: number
    image: {
      url: string
    },
    cultureImage: {
      url: string
    },
    productImage: {
      url: string
    },
    establishmentYear: Date
    members: number
  }
}

export interface CreateJobData extends FormData {
  append(name: keyof Job, value: String | Blob, fileName?: string): any
}

export interface getJobsList {
  id: number
  uuid: string
  title: string 
  content: string 
  seekPerson: string
  requiredApply: string
  welcomeApply: string
  notSolved: string
  developmentEnv: string
  workEnv: string
  process: string
  employmentSystem: number
  position: string
  salarySystem: string
}