// 応募してきたユーザー一覧
export interface ApplyUsers {
  id: number
  userId: number
  jobId: number
  user: {
    id: number
    name: string
    techSkill: string
    portfolioUrl: string
    career: string
    nextCareer: string
    githubUrl: string
  }
}

//応募してきたユーザーを個別で表示
export interface ShowApplyUser {
  id: number 
  userId: number
  jobId: number
}

// プロジェクトへの応募
export interface Apply {
  id?: number
  userId: number | undefined
  jobId: number
}