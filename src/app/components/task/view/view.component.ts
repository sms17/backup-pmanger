import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs';
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
import { FindprojectnamePipe } from '../../../findprojectname.pipe'; 
import { FindusernamePipe } from '../../../findusername.pipe'; 

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  tasks:Task[];
  tasksResult : any;
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  
  constructor(private taskService:TaskService, 
    private userService: UserService, 
    private projectService: ProjectService, 
    private router: Router) { }

    public model: any;
    clickedItem:string;

    taskObj = new Task();
    searchProject:any;
    formatterProject:any;
    selectedProject:{_id:string, project:string} = null;
    clickedItemProject:string;
   // projectsResult:{_id:string, project:string}[];
  
   usersResult : any;
   projectsResult : any;
   getprojectValue : any;
   sortval : any ;

  ngOnInit() {
    this.getProjects();
    this.getUser();
    this.TypeaheadProjectSearch();
  }

  TypeaheadProjectSearch()
  {
    this.searchProject = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.focus$),
      merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
      map(term => (term === '' ? this.projectsResult
        : this.projectsResult.filter(
          v => v.project.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );

    this.formatterProject = (x: {project: string}) => x.project;
  }

  selectedItem(item){
    this.clickedItem=item.item;
    console.log(item);
  }

  reset()
  {
    window.location.reload();
  }
  

  findTaskBySortProject(sortid,pid) 
  {
    this.sortval = sortid;
   console.log('this.sorval' +this.sortval);
   console.log('not this.sorval' +this.sortval);
      if(this.sortval) 
      {
            return this.taskService.getTasksBySortProjectId(sortid,pid)
          .subscribe(
            tasksResult => {
          console.log(tasksResult);
          this.tasksResult = tasksResult;
          });
      }
      else
      {    this.taskService.getTasksBySortProjectId('start_date',pid).subscribe(
          tasksResult => {
        console.log(tasksResult);
        this.tasksResult = tasksResult;
        });
      }
  }

  findAllTasks()
  {
     return this.taskService.getTasksList().subscribe(
      tasksResult => {
    console.log(tasksResult);
    this.tasksResult = tasksResult;
    });
  }

  getUser()
  {
    return this.userService.getUsersList()
    .subscribe(
      (data: any) => {
        this.usersResult = data;
        console.log('user :' + this.usersResult);
      });
  }

  getProjects()
  {
    return this.projectService.getProjectsList()
    .subscribe(
     (data: any) => {
       this.projectsResult = data;
       console.log('pro :'+this.projectsResult);
     });
  }

}
