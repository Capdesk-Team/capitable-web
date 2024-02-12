import { User } from "./user"
import { Message } from "./message"

// チャットルーム
export interface ChatRoom {
  chatRoom: {
    id: number
  },
  otherUser: User,
  lastMessage: Message
}