import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any = {};
  profileImage = '../../assets/img/default.jpeg';
  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  signup(data) {
    console.log(data);
  }

  login(data) {
    if (!data) { return; }
    this.userService.signin(data)
      .then(res => {
        console.log(res);
        //
      });
  }

  previewImage(e) {
    console.log(e.target.value);
    // this.profileImage = e.target.value;
  }

}
