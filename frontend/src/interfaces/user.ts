export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface UpdateParams {
  id: number
  uuid: String
  name: string
  image: string
  techSkill: string
  githubUrl: string
  facebookUrl: string
  portfolioUrl: string
  career: string
  nextCareer: string
  position: number
}
  
export interface User {
  id: number
  uid: string
  uuid: string
  provider: string
  email: string
  name: string
  image: {
    url: string
  }
  techSkill: string
  githubUrl: string
  facebookUrl: string
  portfolioUrl: string
  career: string
  nextCareer: string
  nickname?: string
  allowPasswordChange: boolean
}