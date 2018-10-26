import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { Location } from '@angular/common';
import { FilterPipe } from '../../filter.pipe';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,
    private location: Location,
    private flashMessagesService: FlashMessagesService, 
    private router: Router) { }

    user = new User();
    submitted = false;
    sortval : any ;
    message: string;
    userList: User[];
    getCheckID  : any;

  ngOnInit() {
    this.getUsers(this.sortval);
    
  }

  pageRefresh() {
    location.reload();
 }

 adduser() {
   this.submitted = true;
   this.userService.saveUser(this.user)
   .subscribe( success => {
    this.flashMessagesService.show('User added succesfully', 
    { cssClass: 'alert-success', timeout: 3000 });
    }, error => {
    this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
    });
    location.reload();
 }

 updateUser() {
  this.submitted = true;
  this.userService.updateUser(this.getCheckID,this.user)
  .subscribe( success => {
    this.flashMessagesService.show('User updated succesfully', 
    { cssClass: 'alert-success', timeout: 3000 }); 
    }, error => {
    this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
    });
    location.reload();
}

deleteUser(id) {
  this.submitted = true;
  this.userService.deleteUser(id)
  .subscribe( success => {
    this.flashMessagesService.show('User deleted succesfully', 
    { cssClass: 'alert-success', timeout: 3000 });
    }, error => {
    this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
    });
    location.reload();
}

 findbyID(id)
 { 
   this.getCheckID = id;
     this.userService.getUsersById(id)
      .subscribe(user => this.user = user);
 }

 getUsers(val) 
 {
  this.sortval = val;
    if(this.sortval) 
    {
          return this.userService.getSortedUsersList(this.sortval)
        .subscribe(
        userList => {
        console.log(userList);
        this.userList = userList;
        });
    }
    else
    {
        return this.userService.getUsersList()
        .subscribe(
        userList => {
        console.log(userList);
        this.userList = userList;
        });
    }
}

 
}
