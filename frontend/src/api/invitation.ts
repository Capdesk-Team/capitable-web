import client from "api/client"

// 招待を作成
export const newInvitationUsers = (id: number, data: any) => {
  return client.post(`organizations/${id}/invitations`, data)
}