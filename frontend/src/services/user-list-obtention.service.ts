import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler} from "@angular/common/http";

function ObtainUserList(http: HttpClient, callback: any) {
  const url = "http://localhost:3000";
  return new Promise<string>(() => setTimeout(()=>http.get<string>(url).subscribe(callback, (error: string) => { console.error(error); }), 4000));
}

@Injectable({
  providedIn: 'root'
})
export class UserListObtentionService {
  constructor(private http: HttpClient) {}
  async ObtainUserList(callback: any) {
    return await ObtainUserList(this.http, callback);
  }
}
