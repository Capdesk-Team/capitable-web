export interface Project {
  userId: string
  id: string
  companyName: string
  title: string
  content: string
  image: string
  techStack: number
  serviceUrl: string
  seekPerson: string
  vision: string
  localtion: string
  work: string
  developmentEnv: string
}

export interface CrateProjectData extends FormData {
  append(name: keyof Project, value: String | Blob, fileName?: string): any
}

export interface getProjectList {
  id: string
  companyName: string
  title: string
  content: string
  image: {
    url: string
  },
  techStack: number,
  serviceUrl: string,
  userId: string,
  user: {
    name: string
    email: string
  }
}