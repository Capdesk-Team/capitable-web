import client from "api/client"
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

// 法人詳細取得
export const showOrganization = (id: number) => {
  return client.get(`organizations/${id}`)
};
