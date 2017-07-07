import { Component, OnInit, EventEmitter } from '@angular/core';
import { Ng2Cable, Broadcaster }    from 'ng2-cable';
import { ConversationService }      from '../services/conversation-service';
import { Conversation, Message }    from '../models/conversation';
import { User }    from '../models/user';
import * as $      from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private conversations: Conversation[] = [];
  private users: User[] = [];
  private current_user: User;

  constructor(private ng2cable: Ng2Cable, private broadcaster: Broadcaster, private conversationService: ConversationService) {
    this.getUser();
  }

  ngOnInit() {
    this.createConsumer();
  }

  createConsumer(){
    this.ng2cable.subscribe('ws://localhost:3000/cable/?token=' + this.current_user.token  +
      '&client=' + this.current_user.client, 'ConversationChannel');
    this.broadcaster.on<string>('ConversationChannel').subscribe(
      message => {
        if(message['message'] == 'list_user'){
          this.users = message['data'];
          console.log('vo day ')
        }
        console.log('message', message);
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
      this.conversationService.create({recipient_id: id}).then(
        (res) => {
          this.conversations.push(res);
        },
        (error) => {
          alert(JSON.parse(error['_body']).error);
        }
      )
    }
  }
}
