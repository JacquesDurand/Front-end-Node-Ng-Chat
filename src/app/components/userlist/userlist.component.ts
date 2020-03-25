import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationModel } from 'src/app/models/conversation.model';
import { ConversationService } from 'src/app/services/conversation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  userList: UserModel[] = [];
  connectedUser: UserModel;
  newConversation: ConversationModel;
  logged: boolean;

  constructor(private userService: UsersService, private authService: AuthService,
    private conversationService: ConversationService, private router: Router) { }

  ngOnInit(): void {
    //On récupere l'utilisateur connecte
    this.authService.userSubject.subscribe(
      (user: UserModel) => {
        if (user) {
          this.logged = true;
        }
        else {
          this.logged = false;
        }
        this.connectedUser = user;
      }
    );
    //On recupere la liste des utilisateurs et on la filtre sur l'utilisateur connecte
    this.userService.getAllUsers().subscribe(
      (users: UserModel[]) => {
        this.userList = users.filter(user => user.id !== this.connectedUser.id);
      }
    );
  }

  // findCreateConvFromService(userId: number) {
  //   this.conversationService.createConversation(new ConversationModel(this.connectedUser.id, userId)).subscribe(
  //     (conversation: ConversationModel) => {
  //       this.newConversation = conversation;
  //       this.router.navigate(['/chat', this.newConversation.id])
  //     }
  //   )
  // }

}


