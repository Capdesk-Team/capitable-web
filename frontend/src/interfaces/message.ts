export interface Message {
  chatRoomId: string | undefined
  userId: string | undefined
  content: string
  createdAt?: Date
}