import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

// -- Load Observal
import { Observable } from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, filter, map, merge} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FlashMessagesService } from 'angular2-flash-messages';

// -- Load Service
import { Task } from '../../../task';
import { TaskService } from '../../../task.service';
import { Project } from '../../../project';
import { ProjectService } from '../../../project.service';
import { User } from '../../../user';
import { UserService } from '../../../user.service';
import { Location } from '@angular/common';

// Load Pipe
import { FilterPipe } from '../../../filter.pipe';
import { FindtasknamePipe } from '../../../findtaskname.pipe'; 
import { FindusernamePipe } from '../../../findusername.pipe';
import { FindprojectnamePipe } from '../../../findprojectname.pipe'; 


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;
 

  constructor(
    private route: ActivatedRoute,
    private flashMessagesService : FlashMessagesService,
    private taskService:TaskService, 
    private userService: UserService, 
    private projectService: ProjectService, 
    private router: Router) { }

    tasksResult = new Task();
    val : any;
    searchTask:any;
    formatterTask:any;
    selectedTask:{_id:string, task:string} = null;
    clickedItemTask:string;

    // Project
    searchProject:any;
    formatterProject:any;
    selectedProject:{_id:string, project:string} = null;
    clickedItemProject:string;
    projectsResult : any;

    // User
    search:any;
    formatter:any;
    selectedParent:{_id:string, first_name:string} = null;
    usersResult:{_id:string, first_name:string}[];



  ngOnInit() 
  {
    this.getProjects();
    this.getUser();
    this.TypeaheadUserSearch();
    this.TypeaheadProjectSearch();
    this.getTaskById(this.val);
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

   TypeaheadProjectSearch()
   {
        this.searchProject = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => (term === '' ? this.projectsResult
        : this.projectsResult.filter(
        v => v.project.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
        this.formatterProject = (x: {project: string}) => {
        return x.project;
        };  
  }


   TypeaheadUserSearch()
   {
        this.search = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        map(term => term === '' ? []
        : this.usersResult.filter(tr => tr.first_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        );
        this.formatter = (x: {first_name: string}) => x.first_name;
  }

  updateTask(id)
  {

    //alert(this.tasksResult.start_date);
    //alert(this.tasksResult.end_date);
    
      this.taskService.updateTask(id,this.tasksResult).subscribe(
          success => {
          this.flashMessagesService.show('Task updated succesfully', 
          { cssClass: 'alert-success', timeout: 3000 });
          
          }, error => {
          this.flashMessagesService.show('Something went wrong', 
          { cssClass: 'alert-danger', timeout: 3000 });
          }); /**/

          this.router.navigate(['/viewtask']);
    }

  findbyID(id)
  { 
   // return this.userService.retriveUsersById(id).subscribe(user => this.tasksResult.user = user);
  }
  
  getUser()
  {
    return this.userService.getUsersList()
    .subscribe(
      (data: any) => {
        this.usersResult = data;
        console.log('usr: '+this.usersResult);
      });
  }

  getTaskById(val)
  { 
    this.route.params.subscribe(params => {
      this.taskService.getTasksById(params['id']).subscribe(
        res => {
          this.tasksResult = res;

        /*  
          this.tasksResult.start_date = new Date(this.tasksResult.start_date);
          this.tasksResult.end_date = new Date(this.tasksResult.end_date);
          
            if(this.tasksResult.start_date)
          this.tasksResult.start_date = this.tasksResult.start_date.slice(0,10).split("-").reverse().join("/");

          if(this.tasksResult.end_date)
          this.tasksResult.end_date = this.tasksResult.end_date.slice(0,10).split("-").reverse().join("/");

          */
      
          if(this.tasksResult.start_date)
          this.tasksResult.start_date = this.tasksResult.start_date;

          if(this.tasksResult.end_date)
          this.tasksResult.end_date = this.tasksResult.end_date;

          console.log(" task RES :" + this.tasksResult); 
          }
      );
    });
  }

}
