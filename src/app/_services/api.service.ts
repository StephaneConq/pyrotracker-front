import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CalendarEventOut} from "../_models/calendar-event-out";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  insert(collection, body) {
    return this.http.post(`/${collection}`, body);
  }

  getUsers() {
    return this.http.get('/users');
  }

  delete(collection, id) {
    return this.http.delete(`/${collection}/${id}`);
  }

  createCalendarEvent(payload: CalendarEventOut) {
    return this.http.post('/calendar', payload);
  }
}
