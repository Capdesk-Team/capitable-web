import client from "api/client"
import { Like } from "interfaces/like"

import Cookies from "js-cookie"

// 全てのいいね情報（自分から、相手から両方）を取得
export const getLikes = () => {
  return client.get("likes", { 
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })
}

// プロジェクトに対してのいいねを作成
export const createJobLike= (data: Like, id: string) => {
  return client.post(`jobs/${id}/likes`, data)
}


// ユーザーに対してのいいねを作成
export const createUserLike= (data: Like) => {
  return client.post("likes", data)
}
