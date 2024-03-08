import client from "api/client"
import Cookies from "js-cookie"

// ユーザー一覧を取得
export const getUsers = () => {
  return client.get("users", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })
}

// id指定でユーザー情報を個別に取得
export const getUser = (uuid: string) => {
  return client.get(`users/${uuid}`)
}

// ユーザー情報を更新
export const updateUser = (uuid: string, data: any) => {
  return client.put(`users/${uuid}`, data)
}

//ユーザーが作成したプロジェクトを作成
export const getOwnJob = (id: number | undefined) => {
  return client.get(`users/${id}`, { 
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })
}