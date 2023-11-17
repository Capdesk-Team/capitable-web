import client from "api/client"
// import { UpdateUserFormData} from "interfaces/index"

import Cookies from "js-cookie"

export const getUsers = () => {
  return client.get("users", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}

// id指定でユーザー情報を個別に取得
export const getUser = (id: number | undefined) => {
  return client.get(`users/${id}`)
}

// ユーザー情報を更新
export const updateUser = (id: number | undefined | null) => {
  return client.put(`users/${id}`)
}
