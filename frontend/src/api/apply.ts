import client from "api/client"
import Cookies from "js-cookie"
import { Apply } from 'interfaces/apply'

export const getApply = (id: string) => {
  return client.get(`/projects/${id}/apply`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }) 
};

export const showApplyUser = (id: string) => {
  return client.get(`/projects/${id}/apply/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })
};

export const createApply = (data: Apply, id: string) => {
  return client.post(`/projects/${id}/apply`, data)
};