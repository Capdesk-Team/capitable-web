// 応募してきたユーザー一覧
export interface ApplyUsers {
  id: string
  userId: string
  projectId: string
  user: {
    id: string
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
  id: string 
  userId: string
  projectId: string
}

// プロジェクトへの応募
export interface Apply {
  id?: string
  userId: string | undefined
  projectId: string
}