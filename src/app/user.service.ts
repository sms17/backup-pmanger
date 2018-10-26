import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private usersUrl = 'http://localhost:4000/users';  // URL to web api

  saveUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl+'/saveUser', user);
  }
  
  getUsersList (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl+'/userList')
  }

  getSortedUsersList (val): Observable<User[]> {
    const url = `${this.usersUrl}/sortUser/${val}`;
    return this.http.get<User[]>(url)
  }

  getUsersById(id): Observable<User> {
    const url = `${this.usersUrl}/getUser/${id}`;
    return this.http.get<User>(url);
  }


  deleteUser (id: number): Observable<User> {
     const url = `${this.usersUrl}/deleteUser/${id}`;
     return this.http.delete<User>(url);
  }
 
  updateUser (id: number, user: User): Observable<any> {
    const url = `${this.usersUrl}/updateUser/${id}`;
    
    return this.http.put(url, user);
  }
}
