import { User }   from './user';

export class Conversation{
  recipient: User;
  sender: User;
  id: number;
  messages: Message[];
}

export class Message{
  id: number;
  user: User;
  body: string;
  conversation_id: number;
}
