import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Project } from '../../project';
import { ProjectService } from '../../project.service';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { Location } from '@angular/common';
import { FilterPipe } from '../../filter.pipe';
import { FindusernamePipe } from '../../findusername.pipe'; 
import { Observable } from 'rxjs/Observable';
import {debounceTime, map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  constructor(private router: Router, private flashMessagesService: FlashMessagesService,
     private userService: UserService, private projectService: ProjectService,
    private location: Location) { }

    projectObj = new Project();
    submitted = false;
    sortval : any ;
    message: string;
    projectList: Project[];
    getCheckID  : any;
    starting_date:any = {};
    ending_date:any = {};

  search:any;
  formatter:any;
  selectedParent:{_id:string, first_name:string} = null;
  clickedItem:string;
  usersResult:{_id:string, first_name:string}[];
  
  ngOnInit() {
    this.getProjects(this.sortval);
    this.ngBootstrapTypeahead();
    this.getUser();
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


  ngBootstrapTypeahead(){
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
      : this.usersResult.filter(tr => tr.first_name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
    this.formatter = (x: {first_name: string}) => {
      return x.first_name;
    };  
   }



  selectedItem(item){
    this.clickedItem=item.item._id;
    console.log('here we go');
    console.log(this.clickedItem);
  }

 
 addProject() {
   /* this.projectObj.start_date = new Date(this.projectObj.start_date);
    this.projectObj.start_date.toISOString().substring(0, 10);

    this.projectObj.end_date = new Date(this.projectObj.end_date);
    this.projectObj.end_date.toISOString().substring(0, 10); */

   this.projectService.saveProject(this.projectObj).subscribe(
      success => {
      this.flashMessagesService.show('Project added succesfully', 
      { cssClass: 'alert-success', timeout: 3000 });
        }, error => {
      this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }); 

      this.ngOnInit();
 } 

 updateProject() {
  this.submitted = true;
 
  this.projectService.updateProject(this.getCheckID,this.projectObj)
  .subscribe(
    
    success => {
      this.flashMessagesService.show('Project update succesfully', 
      { cssClass: 'alert-success', timeout: 3000 });
      }, error => {
      this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
   );
   location.reload();
}

deleteProject(id) {
  this.submitted = true;
  this.projectService.deleteProject(id)
  .subscribe(
    
    success => {
      this.flashMessagesService.show('Project deleted succesfully', 
      { cssClass: 'alert-success', timeout: 3000 });
      }, error => {
      this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
  );
  location.reload();
}

 findbyID(id)
 { 
   this.getCheckID = id;
     // this.projectObj.end_date = new Date(`${this.ending_date.year}/${this.ending_date.month}/${this.ending_date.day}`);
  // this.projectObj.start_date = new Date(`${this.starting_date.year}/${this.starting_date.month}/${this.starting_date.day}`);
  this.projectService.getProjectsById(id)
      .subscribe(project => this.projectObj = project);
 }

 getProjects(val) 
 {
  this.sortval = val;
    if(this.sortval) 
    {
          return this.projectService.getSortedProjectsList(this.sortval)
        .subscribe(
        projectList => {
        console.log(projectList);
        this.projectList = projectList;
        });
    }
    else
    {   return this.projectService.getProjectsList()
        .subscribe(
        projectList => {
        console.log(projectList);
        this.projectList = projectList;
        });
    }
}
}
