import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {
  CalendarEvent
} from 'angular-calendar';
import {UsersService} from "../../../_services/users.service";
import {FirestoreService} from "../../../_services/firestore.service";
import {ApiService} from "../../../_services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {event: CalendarEvent},
    private _bottomSheetRef: MatBottomSheetRef<EventDetailsComponent>,
    private usersService: UsersService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  close() {
    this._bottomSheetRef.dismiss();
  }

  delete() {
    this.apiService.delete('events', this.data.event.id).subscribe(() => {
      this.snackBar.open('Évènement supprimé', 'Fermer', {duration: 2000});
      this._bottomSheetRef.dismiss();
    })
  }

  get users() {
    return this.usersService.usersBS.getValue();
  }

  findUser(email) {
    return this.users.find(u => u.email === email);
  }

}
