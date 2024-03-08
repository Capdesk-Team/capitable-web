export interface getOrganizationsList {
  id: number
  uuid: string
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
  members: number,
  users: {
    id: number;
    image: string
    name: string;
    role: number;
  }[];
  jobs: {
    title: string
  }[],
  title:string
  
} 

export interface CreateOrganization {
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
  image: string
  cultureImage: string
  productImage: string
  establishmentYear: Date
  members: number
}
  
export interface CreateOrganizationData extends FormData {
  append(name: keyof CreateOrganization, value: String | Blob, fileName?: string): any
}
  