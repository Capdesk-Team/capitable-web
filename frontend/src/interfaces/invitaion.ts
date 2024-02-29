export interface Invitation {
  id?: number
  userId: number | undefined
  organizationId: number
  email: string
}