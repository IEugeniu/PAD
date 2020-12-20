import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SongDto } from '../models/SongDto';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  readonly APIUrl = "https://localhost:44318/api/songs";
  formData: SongDto;

  constructor(private http: HttpClient) { }

  getSongs(): Observable<SongDto[]> {
    return this.http.get<SongDto[]>(this.APIUrl);
  }

  addSong(song: SongDto) {
    return this.http.post(this.APIUrl, song);
  }

  updateSong(id: string, song: SongDto) {
    return this.http.put(this.APIUrl + '/' + id, song);
  }

  deleteSong(id: string) {
    return this.http.delete(this.APIUrl + "/" + id);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
