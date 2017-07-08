import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Conversation, ChatMessage, MessagePost }    from '../models/conversation';
import { ConversationService }      from '../services/conversation-service';
import { Message }                  from 'primeng/primeng';
import { User }                     from '../models/user';
import * as $      from 'jquery';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  _conversation: Conversation;
  messages: ChatMessage[] = [];
  // show notification
  msgs: Message[] = [];
  private current_user: User;

  @Input()
  set conversation(data: Conversation){
    this._conversation = data;
    this.messages = data.messages || [];
    console.log('conversation', data)
  }

  @Input()
  set receiveMessage(data: ChatMessage){
    if(data) this.messages.push(data);
  }

  constructor(private conversationService: ConversationService) { }

  ngOnInit() {
    this.getUser();
  }

  closeConversation(){
    console.log('close ', this._conversation.id);
  }

  getUser() {
    this.current_user = new User();
    if (localStorage.getItem('user') != null) {
      let userInfo = localStorage.getItem('user');
      let userObj = JSON.parse(userInfo);
      this.current_user = userObj;
    }
  }

  createMessage(text: string){
    this.conversationService.createMessage(this.getMessagePost(text)).then(
      (res) => {
        this.messages.push(res);
        this.scrollMessageView(res);
      },
      (error) => {
        this.noticeMessage(JSON.parse(error['_body']).error)
      }
    )
  }

  getMessagePost(text: string){
    var msPost = new MessagePost();
    msPost.conversation_id = this._conversation.id;
    msPost.message = {
      user_id: this.current_user.id,
      body: text
    }
    return msPost;
  }

  scrollMessageView(res: Conversation){
    var conversation = $('#convention-'+res['conversation_id']);
    conversation.find('.panel-body').show();
    var messages_list = conversation.find('.messages-list');
    var height = messages_list[0].scrollHeight;
    messages_list.scrollTop(height);
  }

  // using for trap key input to text
  submit(event){
    if(event.code == 'Enter'){
      this.createMessage($('textarea').val() + '');
      $('textarea').val('');
    }
  }

  noticeMessage(content: string, status: number = 1){
    this.msgs = [];
    switch(status){
      case 0:{
        this.msgs.push({severity: 'success', summary: 'Success Message', detail: content});
        break;
      };
      case 1:{
        this.msgs.push({severity: 'error', summary: 'Error Messages', detail: content});
      }
    }
  }
}
