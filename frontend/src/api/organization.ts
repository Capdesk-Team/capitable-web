import client from "api/client"
import Cookies from "js-cookie"
// Intefaces
import { CreateOrganizationData } from "interfaces/organization";

// 法人作成
export const createOrganization = (data: CreateOrganizationData) => {
  return client.post('organizations', data)
}

// 法人取得
export const getOrganizations = () => {
  return client.get('organizations')
};

// 法人詳細取得 getルーティング
export const showOrganization = (id: number) => {
  return client.get(`organizations/${id}`)
};

// 法人に所属しているユーザー一覧を取得
export const getOrganizationUsers = (id: string) => {
  return client.get(`organizations/${id}/users`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }) 
};

