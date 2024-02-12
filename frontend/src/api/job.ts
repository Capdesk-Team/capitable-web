import client from "api/client"

// 求人を取得
export const showJob = (id: number) => {
  return client.get(`jobs/${id}`)
};

// 求人を作成
export const createJob = (data: any) => {
  return client.post('jobs', data)
}

// 求人一覧を取得
export const getJobs = () => {
  return client.get('jobs')
}
