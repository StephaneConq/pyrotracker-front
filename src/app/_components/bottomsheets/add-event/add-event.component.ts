import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import * as _moment from 'moment';
import {ApiService} from "../../../_services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsersService} from "../../../_services/users.service";
import {User} from "../../../_models/user";
import {MatSelectionList} from "@angular/material/list";
import {FirestoreService} from "../../../_services/firestore.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @ViewChild('selectedUsers') selectedUsersList: MatSelectionList;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: {date: Date},
    private _bottomSheetRef: MatBottomSheetRef<AddEventComponent>,
    private apiService: ApiService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private changeDetection: ChangeDetectorRef,
    private firestoreService: FirestoreService
    ) { }

  dateModel = null;
  hourModel = null;
  title = '';
  users: User[] = [];
  recurrentEvents = [];
  recurrentEventModel = '';

  ngOnInit(): void {
    if (this.data.date) {
      this.dateModel = _moment(this.data.date.getTime());
      this.hourModel = this.data.date.toLocaleTimeString();
    } else {
      this.dateModel = _moment(new Date().getTime());
      this.hourModel = new Date().toLocaleTimeString();
    }
    this.usersService.usersBS.subscribe(users => {
      this.users = [...users];
      this.changeDetection.detectChanges();
    });
    this.firestoreService.recurrentEvents.subscribe((events) => {
      this.recurrentEvents = events;
      this.changeDetection.detectChanges();
    });
  }

  create(eventTitle = null) {
    const payload = {
      title: eventTitle ? eventTitle : this.title
    };
    let date = this.dateModel.format('YYYY-MM-DD');
    if (this.hourModel) {
      date = date + ' ' + this.hourModel;
    }
    payload['date'] = _moment(date).toISOString();
    this.apiService.insert('events', payload).subscribe(() => {
      this.snackBar.open('Évènement créé', 'Fermer', {duration: 2000});
      this._bottomSheetRef.dismiss();
    });
    if (this.selectedUsersList.selectedOptions.selected.length > 0) {
      this.apiService.createCalendarEvent({
        guests: this.selectedUsersList.selectedOptions.selected.map(o => o.value.email).join(','),
        startDate: payload['date'],
        endDate: payload['date'],
        title: payload['title']
      }).subscribe();
    }
  }

  deleteRecurrentEvent(id) {
    this.apiService.delete('recurrent', id).subscribe(() => {
      this.snackBar.open('Évènement supprimé', 'Fermer', {duration: 2000});
    })
  }

  createRecurrentEvent(name) {
    this.apiService.insert('recurrent', {name}).subscribe(() => {
      this.recurrentEventModel = '';
      this.snackBar.open('Évènement créé', 'Fermer', {duration: 2000});
    });
  }
}
