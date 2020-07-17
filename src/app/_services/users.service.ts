import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {map} from "rxjs/operators";
import {User} from "../_models/user";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersBS = new BehaviorSubject<User[]>([]);

  constructor(
    private apiService: ApiService
  ) {
    this.apiService.getUsers().pipe(map(users => {
      this.usersBS.next(users['users']);
      return users['users'];
    })).subscribe();
  }

}
