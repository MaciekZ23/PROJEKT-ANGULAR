import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  constructor(private http: HttpClient) {}
  
  getUsers()
  {
    return this.http.get<any>('https://reqres.in/api/users').pipe(map(res => res.data)
    );
  }
}
