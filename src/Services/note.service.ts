import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  BaseUrl='https://sticky-note-fe.vercel.app/';
  constructor(private _HttpClient:HttpClient) { }

  addNote(formData:object):Observable<any>
  {
    return this._HttpClient.post(`${this.BaseUrl}addNote`,formData);
  }
  getUserNotes(data:any):Observable<any>
  {
    return this._HttpClient.post(`${this.BaseUrl}getUserNotes`,data);
  }
  deleteNote(data:any):Observable<any>
  {
    return this._HttpClient.delete(`${this.BaseUrl}deleteNote`,data);
  }
  updateNote(data:any):Observable<any>
  {
    return this._HttpClient.put(`${this.BaseUrl}updateNote`,data);
  }
}
