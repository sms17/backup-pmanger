import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {debounceTime, distinctUntilChanged, filter, map, merge} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
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
import { FindusernamePipe } from '../../../findusername.pipe';
import { FindprojectnamePipe } from '../../../findprojectname.pipe'; 
//import format from 'date-fns/format';

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
    starting_date:any = {};
    ending_date:any = {};
   // usersResult:{start_date, end_date}[];
    start_date : any;
    end_date : any;
    s : any;

    clickedItem:string;

    public model: any = "Alabama";

  search:any;
  formatter:any;
  selectedParent:{_id:string, first_name:string} = null;
  usersResult:{_id:string, first_name:string}[];


  searchProject:any;
  formatterProject:any;
  selectedProject:{_id:string, project:string} = null;
  clickedItemProject:string;
  //projectsResult:{_id:string, project:string}[];
  projectsResult : any;

  searchTask:any;
  formatterTask:any;
  selectedTask:{_id:string, task:string} = null;
  clickedItemTask:string;
  //tasksResult:{_id:string, task:string}[];

  ngOnInit() {
    this.getProjects();
    this.getUser();
   // this.tasksResult.user ="Shirdhik";
    this.TypeaheadUserSearch();
    this.TypeaheadProjectSearch();
   
    this.getTaskById(this.val);
    //this.convertDate();
    //this.tasksResult.start_date =new Date(this.tasksResult.start_date).toISOString().substring(0, 10);
   //this.tasksResult.end_date =new Date(this.tasksResult.end_date).toISOString().substring(0, 10);
  
    //this.tasksResult.start_date = (this.tasksResult.start_date.getMonth()+1)+'/'+this.tasksResult.start_date.getDate()+'/'+this.tasksResult.start_date.getFullYear();
    //this.tasksResult.end_date = (this.tasksResult.end_date.getMonth()+1)+'/'+(this.tasksResult.end_date.getDate()+1)+'/'+this.tasksResult.end_date.getFullYear();
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

   TypeaheadProjectSearch(){
     this.searchProject = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => (term === '' ? this.projectsResult
        : this.projectsResult.filter(
          v => v.project.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

    
    //this.formatterProject = (x: {project: string}) => x.project;
    this.formatterProject = (x: {project: string}) => {
       return x.project;
    };  
  }


   TypeaheadUserSearch(){
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
      : this.usersResult.filter(tr => tr.first_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
    
    this.formatter = (x: {first_name: string}) => x.first_name;
   /* 
    this.search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));*/
  }

  updateTask(id){

      this.taskService.updateTask(id,this.tasksResult).subscribe(
          success => {
          this.flashMessagesService.show('Task updated succesfully', 
          { cssClass: 'alert-success', timeout: 3000 });
          this.ngOnInit();
          }, error => {
          this.flashMessagesService.show('Something went wrong', 
          { cssClass: 'alert-danger', timeout: 3000 });
          }); 
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

  selectedItem(item){ alert(item);
    this.tasksResult.project=item.item._id;
    console.log('here we go');
    console.log(this.clickedItem);
  }

  getTaskById(val)
  { 
    this.route.params.subscribe(params => {
      this.taskService.getTasksById(params['id']).subscribe(
        res => {
          this.tasksResult = res;
      /*
          if(this.tasksResult.start_date)
          this.tasksResult.start_date = this.tasksResult.start_date.slice(0,10).split("-").reverse().join("/");

          if(this.tasksResult.end_date)
          this.tasksResult.end_date = this.tasksResult.end_date.slice(0,10).split("-").reverse().join("/");

          console.log(" task RES :" + this.tasksResult); */
          }
      );
    });
  }

}
