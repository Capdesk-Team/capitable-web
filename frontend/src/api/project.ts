import client from "api/client"

export const getProject = () => {
  return client.get('projects')
};

export const getDetail = (id: number) => {
  return client.get(`projects/${id}`)
};  