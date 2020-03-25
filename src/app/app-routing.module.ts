import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserlistComponent } from './components/userlist/userlist.component';
import { ConversationComponent } from './components/conversation/conversation.component';


const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'userlist',
    component: UserlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:id',
    component: ConversationComponent,
    canActivate : [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
