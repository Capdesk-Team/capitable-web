export interface Message {
  chatRoomId: string | undefined
  userId: number | undefined
  content: string
  createdAt?: Date
}