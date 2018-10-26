import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {debounceTime,distinctUntilChanged, map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Task } from '../../../task';
import { TaskService } from '../../../task.service';
import { Project } from '../../../project';
import { ProjectService } from '../../../project.service';
import { User } from '../../../user';
import { UserService } from '../../../user.service';
import { Location } from '@angular/common';
import { FilterPipe } from '../../../filter.pipe';
import { FindtasknamePipe } from '../../../findtaskname.pipe'; 
//import format from 'date-fns/format';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(
    private flashMessagesService : FlashMessagesService,
    private taskService:TaskService, 
    private userService: UserService, 
    private projectService: ProjectService, 
    private router: Router) { }


  // Project
  //taskObj = new Task();
  taskObj: Task = new Task();
  userObj = new User();
  projectObj = new Project();
  sortval : any ;
  getCheckID  : any;
 

  search:any;
  formatter:any;
  selectedParent:{_id:string, first_name:string} = null;
  clickedItem:string;
  usersResult:{_id:string, first_name:string}[];


  searchProject:any;
  formatterProject:any;
  selectedProject:{_id:string, project:string} = null;
  clickedItemProject:string;
  projectsResult:{_id:string, project:string}[];


  searchTask:any;
  formatterTask:any;
  selectedTask:{_id:string, task:string} = null;
  clickedItemTask:string;
  tasksResult:{_id:string, task:string}[];

  setDate : any;
  start_date:any ;
  end_date:any ;
  
ngOnInit() {
  this.getProjects();
  this.getUser();
  this.getTasks();
  this.TypeaheadUserSearch();
  this.TypeaheadProjectSearch();
  this.TypeaheadTaskSearch();
 
  this.setDate = new Date();
  //this.taskObj.start_date = (this.setDate.getMonth()+1)+'/'+this.setDate.getDate()+'/'+this.setDate.getFullYear();
  //this.taskObj.end_date = (this.setDate.getMonth()+1)+'/'+(this.setDate.getDate()+1)+'/'+this.setDate.getFullYear();
}

 getTasks(){
    return this.taskService.getTasksList()
    .subscribe(
     (data: any) => {
       this.tasksResult = data;
       console.log(this.tasksResult);
     });
  }

  addTask(){
    alert(this.taskObj.start_date);
    alert(this.taskObj.end_date); /*

    this.taskService.saveTask(this.taskObj).subscribe(
        success => {
        this.flashMessagesService.show('Task added succesfully', 
        { cssClass: 'alert-success', timeout: 3000 });
        this.ngOnInit();
        }, error => {
        this.flashMessagesService.show('Something went wrong', 
        { cssClass: 'alert-danger', timeout: 3000 });
        }); 

        this.router.navigate(['/viewtask']);*/
  }

  TypeaheadTaskSearch(){
    this.searchTask= (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.tasksResult.filter(v => v.task.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    this.formatterTask = (x: {task: string}) => x.task;

   }
  
   TypeaheadProjectSearch(){
    this.searchProject= (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.projectsResult.filter(v => v.project.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    this.formatterProject = (x: {project: string}) => x.project;

  }

   TypeaheadUserSearch(){
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
      : this.usersResult.filter(tr => tr.first_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
    
    this.formatter = (x: {first_name: string}) => x.first_name;
  }


  getUser()
  {
    return this.userService.getUsersList()
    .subscribe(
      (data: any) => {
        this.usersResult = data;
        console.log(this.usersResult);
      });
  }

  getProjects()
  {
    return this.projectService.getProjectsList()
    .subscribe(
     (data: any) => {
       this.projectsResult = data;
       console.log(this.projectsResult);
     });
  }



}
