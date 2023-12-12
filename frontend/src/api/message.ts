import client from "api/client"
import { Message } from "interfaces/message"

export const createMessage = (data: Message) => {
  return client.post("messages", data)
}