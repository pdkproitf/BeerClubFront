import { Component, OnInit, Input, Output, EventEmitter }      from '@angular/core';
import { Conversation, ChatMessage, MessagePost }     from '../models/conversation';
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

  _conversation: Conversation = new Conversation();;
  messages: ChatMessage[] = [];
  // show notification
  msgs: Message[] = [];
  private current_user: User;

  @Input()
  set conversation(data: Conversation){
    this._conversation = data;
    this.messages = data.messages || [];
  }

  @Input()
  set changeAction(data: number){
    if(this._conversation) this.scrollMessageView(this._conversation.id)
  }

  @Output() closeChat = new EventEmitter<number>();

  constructor(private conversationService: ConversationService) { }

  ngOnInit() {
    this.getUser();
  }

  closeConversation(){
    this.closeChat.emit(this._conversation.id);
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
    this.conversationService.createMessage(this.createMessagePost(text)).then(
      (res) => {
        this.messages.push(res);
        this.scrollMessageView(res['conversation_id']);
      },
      (error) => {
        this.noticeMessage(JSON.parse(error['_body']).error)
      }
    )
  }

  createMessagePost(text: string){
    var msPost = new MessagePost();
    msPost.conversation_id = this._conversation.id;
    msPost.message = {
      user_id: this.current_user.id,
      body: text
    }
    return msPost;
  }

  scrollMessageView(conversation_id: number){
    var conversation = $('#convention-'+ conversation_id);
    conversation.find('.panel-body').show();
    var messages_list = conversation.find('.messages-list');
    if(messages_list[0]){
      var height = messages_list[0].scrollHeight;
      messages_list.scrollTop(height + 100);
    }
  }

  // using for trap key input to text
  submit(event){
    if(event.code == 'Enter'){
      var text = $('textarea').val() + '';
      this.createMessage(text);
      $('textarea').val('');
    }
  }

  ngAfterViewChecked() {
    this.scrollMessageView(this._conversation.id);
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
