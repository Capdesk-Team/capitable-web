export interface Message {
  chatRoomId: number | undefined
  userId: number | undefined
  content: string
  createdAt?: Date
}