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

  list(collection) {
    return this.http.get(`/${collection}`);
  }

  update(collection, id, payload) {
    return this.http.patch(`/${collection}/${id}`, payload);
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
