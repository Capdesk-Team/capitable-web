import { User } from "./user"
import { Message } from "./message"

// チャットルーム
export interface ChatRoom {
  chatRoom: {
    id: string
  },
  otherUser: User,
  lastMessage: Message
}