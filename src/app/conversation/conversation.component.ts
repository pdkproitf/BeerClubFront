import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Conversation, Message }    from '../models/conversation';
import { User }    from '../models/user';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  _conversation: Conversation;
  messages: Message[];

  @Input()
  set conversation(data: Conversation){
    this._conversation = data;
    this.messages = data.messages;
  }

  @Input()
  set receiveMessage(data: Message){
    this.messages.push(data);
  }

  @Output() sendMs = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {}

  closeConversation(){
    console.log('close ', this._conversation.id);
  }

  createMessage(text: string){
    var ms = new Message();
    var sender = new User();
    sender.id = 10;
    sender.email = "jozugu@hotmail.com";
    this.conversation.sender = sender;

    ms.user = sender;
    ms.body = text;
    ms.conversation_id = this.conversation.id;
    this.sendMs.emit(ms);
  }
}
