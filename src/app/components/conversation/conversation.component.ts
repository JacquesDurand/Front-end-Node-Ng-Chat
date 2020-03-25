import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from 'src/app/services/conversation.service';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationModel } from 'src/app/models/conversation.model';
import { MessageModel } from 'src/app/models/message.model';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class ConversationComponent implements OnInit {

  user2Id: number;
  connectedUserId: number;
  previousmessages: MessageModel[] = [];
  actualConversation: ConversationModel;
  message: MessageModel = new MessageModel('');
  typing: boolean = false;
  otherIsTyping: boolean= false;

  constructor(private route: ActivatedRoute, private conversationService: ConversationService, private messageService: MessageService
    , private authService: AuthService, private chatService: ChatServiceService) { }

  ngOnInit(): void {
    // On recupere les deux utilisateurs qui souhaitent chatter.
    this.route.paramMap.subscribe(param => {
      this.user2Id = parseInt(param.get('id'));
      this.authService.userSubject.subscribe(
        user => {
          this.connectedUserId = user.id;
          //On cherche ou on crée la conversation entre les utilisateurs
          let conversation = new ConversationModel(this.connectedUserId, this.user2Id);
          this.findCreateConvFromService(conversation);
        }
      )
    });

    this.chatService.getMessages().subscribe(
      (message: MessageModel) => {
        this.previousmessages.push(message);
      }
    );

    this.chatService.receiveTyping().subscribe(
      ()=> {
        this.otherIsTyping = true ;
      }
    );

    this.chatService.receiveNotTyping().subscribe(
      ()=> {
        this.otherIsTyping = false ;
      }
    )

  }


  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messageService.createMessage(this.message).subscribe(
      (message: MessageModel) => {
        console.log('message enregistré', message);

      }
    );
    this.message.setContent('');
  }

  //On va chercher les derniers messages d'une conversation

  getMessagesFromService(conversation: ConversationModel) {
    this.messageService.getLastMessages(conversation).subscribe(
      (messages: MessageModel[]) => {
        this.previousmessages = messages;
        this.previousmessages.reverse();
      },
      (error: Error) => {
        console.log(error);

      }
    )

  }

  // On trouve ou crée une conversation entre deux utilisateurs

  findCreateConvFromService(conversation: ConversationModel) {
    this.conversationService.createConversation(conversation).subscribe(
      (conv: ConversationModel) => {
        this.actualConversation = conv;
        this.message.setConversation(this.actualConversation);

        this.getMessagesFromService(conv);
        this.chatService.createRoom(conv);
        this.chatService.getRoom();
      }
      ,
      (error: Error) => {
        console.log(error);

      }
    )
  }

  // On voit si l'utilisateur est entrain de taper ou non

  updateTyping() {

    if (!this.typing) {
      this.typing = true;
      this.chatService.sendTyping();
    }
    let lastTypingTime = (new Date()).getTime();

    setTimeout(() => {
      var typingTimer = (new Date()).getTime();
      var timeDiff = typingTimer - lastTypingTime;
      if (timeDiff >= 4000 && this.typing) {
        this.chatService.sendStopTyping();
        this.typing = false;
      }
    }, 4000);
  }


}
