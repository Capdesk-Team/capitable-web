import client from "api/client"
import Cookies from "js-cookie"
import { Apply } from 'interfaces/apply'

export const getApply = (id: number) => {
  return client.get(`/jobs/${id}/apply`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }) 
};

export const showApplyUser = (id: number) => {
  return client.get(`/jobs/${id}/apply/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })
};

export const createApply = (data: Apply, id: number) => {
  return client.post(`/jobs/${id}/apply`, data)
};