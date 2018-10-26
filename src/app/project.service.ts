import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  private projectUrl = 'http://localhost:4000/projects';  // URL to web api

  saveProject (project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl+'/saveProject', project);
  }
  
  getProjectsList (): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl+'/projectList')
  }

  getSortedProjectsList (val): Observable<Project[]> {
    const url = `${this.projectUrl}/sortProject/${val}`;
    return this.http.get<Project[]>(url)
  }

  getProjectsById(id: number): Observable<Project> {
    const url = `${this.projectUrl}/getProject/${id}`;
    return this.http.get<Project>(url);
  }
 
  deleteProject (id: number): Observable<Project> {
     const url = `${this.projectUrl}/deleteProject/${id}`;
     return this.http.delete<Project>(url);
  }
 
  updateProject (id: number, project: Project): Observable<any> {
    const url = `${this.projectUrl}/updateProject/${id}`;
    
    return this.http.put(url, project);
  }
}
