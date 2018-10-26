import { BrowserModule } from '@angular/platform-browser';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';;
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Componenets
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { AddComponent } from './components/task/add/add.component';
import { ViewComponent } from './components/task/view/view.component';
import { UpdateComponent } from './components/task/update/update.component';
// Load datepicker



import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { FilterPipe} from './filter.pipe';
import { FindprojectnamePipe } from './findprojectname.pipe'; 
import { FindtasknamePipe } from './findtaskname.pipe'; 
import { FindusernamePipe } from './findusername.pipe'; 
import { FlashMessagesModule } from 'angular2-flash-messages';

// Addind Routes
import { RouterModule, Routes } from '@angular/router';
const routes:Routes = [
  {path: 'user', component: UserComponent},
  { path: 'project',component: ProjectComponent},
  { path: 'addtask',component: AddComponent},
  { path: 'viewtask',component: ViewComponent},
  { path: 'updatetask/:id',component: UpdateComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    AddComponent,
    ViewComponent,
    UpdateComponent,
    FilterPipe,
    FindtasknamePipe,
    FindusernamePipe,
    FindprojectnamePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxTypeaheadModule,
    NgDatepickerModule
  ],
  providers: [],
    schemas : [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
