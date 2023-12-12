import client from "api/client"
import { CrateProjectData } from "interfaces/project";

export const getProject = () => {
  return client.get('projects')
};

export const getDetail = (id: string) => {
  return client.get(`projects/${id}`)
};

export const createProject = (data: CrateProjectData) => {
  return client.post('projects', data)
}