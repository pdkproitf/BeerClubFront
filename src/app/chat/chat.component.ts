import { Component, OnInit, EventEmitter } from '@angular/core';
import { Ng2Cable, Broadcaster }    from 'ng2-cable';
import { ConversationService }      from '../services/conversation-service';
import { Conversation, ChatMessage }    from '../models/conversation';
import { User }    from '../models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private conversations: Conversation[] = [];
  private users: User[] = [];
  private current_user: User;
  // using to active message sennd to conversation
  private count: number = 0;
  private url = 'ws://localhost:3000/cable/';

  constructor(private ng2cable: Ng2Cable, private broadcaster: Broadcaster, private conversationService: ConversationService) {
    this.getUser();
  }

  ngOnInit() {
    this.createConsumer();
  }

  createConsumer(){
    this.ng2cable.subscribe(this.url + '?token=' + this.current_user.token  +
      '&client=' + this.current_user.client, 'ConversationChannel');
    this.broadcaster.on<string>('ConversationChannel').subscribe(
      message => {
        switch(message['message']){
          case 'list_user':{
            this.users = message['data'];
            break;
          }
          case 'broadcast':{
            this.processServerBroadcast(message['data'])
            break;
          }
        }
        console.log('get boastcast', message);
      }
    );
  }

  getUser() {
    this.current_user = new User();
    if (localStorage.getItem('user') != null) {
      let userInfo = localStorage.getItem('user');
      let userObj = JSON.parse(userInfo);
      this.current_user = userObj;
    }
  }

  createConversation(id: number){
    var index = this.conversations.findIndex(x => x.recipient.id == id);
    if(index == -1){
      this.conversationService.getConversation({recipient_id: id}).then(
        (res) => {
          this.conversations.push(res);
        },
        (error) => {
          alert(JSON.parse(error['_body']).error);
        }
      )
    }
  }

  processServerBroadcast(message: ChatMessage){
    var index = this.conversations.findIndex(x => x.id == message.conversation_id)
    if(index != -1){
      for(let conversation of this.conversations){
        if(conversation.id == message.conversation_id){
          conversation.messages.push(message);
        }
      }
    }else{
      this.createConversation(message.user.id)
    }
    this.count = this.count + 1;
    console.log(this.count)
  }

  deleteConversation(id: number){
    var index = this.conversations.findIndex(x => x.id == id);
    this.conversations.splice(index, 1);
  }
}
