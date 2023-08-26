import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { first } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  users:any[] | undefined;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
      this._authService.getAllUsers()
          .subscribe(users => this.users = users);
  }

  deleteUser(id: string) {
      const user = this.users!.find(x => x.id === id);
      user.isDeleting = true;
      this._authService.deleteUser(id)
          .pipe(first())
          .subscribe(() => this.users = this.users!.filter(x => x.id !== id));

  }
  // deleteUsers(user:User):void{
  //   this.users=this.users.filter(h=>h!==user);
  //   this._authService.deleteUser(<any>user.id).subscribe();
  // }
}
