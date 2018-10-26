import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  private tasksUrl = 'http://localhost:4000/tasks';  // URL to web api

  saveTask (task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl+'/saveTask', task);
  }
  
  getTasksList (): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl+'/TaskList')
  }

  getSortedTasksList (val): Observable<Task[]> {
    const url = `${this.tasksUrl}/sortTask/${val}`;
    return this.http.get<Task[]>(url)
  }

  getTasksById(id): Observable<Task> {
    const url = `${this.tasksUrl}/getTaskById/${id}`;
    return this.http.get<Task>(url);
  }
  
  getTasksByProjectId(id): Observable<Task> {
    const url = `${this.tasksUrl}/getTaskByProject/${id}`;
    return this.http.get<Task>(url);
  }

  getTasksBySortProjectId(sort: any,id :any): Observable<Task[]> {
    console.log('sort' + sort);
    console.log('id -' + id);
    const url = `${this.tasksUrl}/getTaskBySortedProject/${sort}/${id}`;
    return this.http.get<Task[]>(url);
  }

  deleteTask (id: number): Observable<Task> {
     const url = `${this.tasksUrl}/deleteTask/${id}`;
     return this.http.delete<Task>(url);
  }
 
  updateTask (id: number, task: Task): Observable<any> {
    const url = `${this.tasksUrl}/updateTask/${id}`;
    
    return this.http.put(url, task);
  }
}
