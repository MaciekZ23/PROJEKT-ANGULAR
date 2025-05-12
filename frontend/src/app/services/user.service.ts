import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'x-api-key': 'reqres-free-v1'
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      map(res => res.data)
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user, { headers: this.getHeaders() });
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
