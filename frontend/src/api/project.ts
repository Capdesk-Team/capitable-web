import client from "api/client"

export const getProject = () => {
  return client.get('projects')
};

export const getDetail = (id: number) => {
  return client.get(`projects/${id}`)
};
// Todo:paramの定義
export const newProject = (params) => {
  return client.post('/projects', params)
};
// Todo:paramの定義
export const updateProject = (id: number, params) => {
  return client.patch(`/projects/${id}`, params )
};
  