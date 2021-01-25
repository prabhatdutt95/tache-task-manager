import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = new HttpHeaders({AuthToken: "KY871GBcUnRrN1yo8LXTuHdcoEPsbJcW"})
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.request('get', "https://devza.com/tests/tasks/listusers", {headers: this.httpOptions})
  }
  getTasks(): Observable<any> {
    // return this.http.request('get', "https://devza.com/tests/tasks/list", {headers: this.httpOptions});
    return this.http.get('https://600dccf63bb1d100179de460.mockapi.io/api/tasks');
  }
  createTask(taskDetails): Observable<any> {
    // return this.http.request('post', "https://devza.com/tests/tasks/create", {body: taskDetails, headers: this.httpOptions});
    return this.http.request('post', "https://600dccf63bb1d100179de460.mockapi.io/api/tasks", {body: taskDetails});
  }
  deleteTask(id): Observable<any> {
    // return this.http.request('get', "https://devza.com/tests/tasks/delete", {headers: this.httpOptions});
    return this.http.delete('https://600dccf63bb1d100179de460.mockapi.io/api/tasks/' + id);
  }
  updateTask(taskDetails: any): Observable<any> {
    // return this.http.request('post', "https://devza.com/tests/tasks/create", {body: taskDetails, headers: this.httpOptions});
    return this.http.request('put', "https://600dccf63bb1d100179de460.mockapi.io/api/tasks/" + taskDetails.id, {body: taskDetails});
  }
}
