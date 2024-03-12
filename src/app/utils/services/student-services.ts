import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { Observable } from 'rxjs';
import { Student } from '../../types/Student';

@Injectable({providedIn: 'root'})
export class StudentServices {
constructor(private http: HttpClient) {

}
getAll(): any {
    return this.http.get<Student>('api/students')
}
}