import { User }   from './user';

export class Conversation{
  recipient: User;
  sender: User;
  id: number;
  messages: ChatMessage[];
}

export class ChatMessage{
  id: number;
  user: User;
  body: string;
  conversation_id: number;
}

export class MessagePost{
  id: number;
  message: {
    user_id: number;
    body: string;
  }
  conversation_id: number;
}
