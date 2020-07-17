import {Component, OnInit} from '@angular/core';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';
import {Subject} from 'rxjs';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import {CustomDateProvider} from "../../_provider/custom-date.provider";
import {FirestoreService} from "../../_services/firestore.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AddEventComponent} from "../bottomsheets/add-event/add-event.component";
import {EventDetailsComponent} from "../bottomsheets/event-details/event-details.component";
import {ApiService} from "../../_services/api.service";


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateProvider,
    },
  ],
})
export class HomeComponent implements OnInit {

  startDay = DAYS_OF_WEEK.MONDAY;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  selectedDate = null;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  firestoreEvents = [];

  activeDayIsOpen: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private bottomSheet: MatBottomSheet,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.firestoreService.events.subscribe((events: any[]) => {
      this.events = [...events].map(e => {
        return {
          id: e.id,
          meta: e,
          title: e.title,
          start: new Date(e.date),
          // end: endOfDay(new Date()),
          color: colors.red,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        };
      })
    });
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
    this.setSelectedDate(date);
  }

  setSelectedDate(date: Date) {
    this.selectedDate = date;
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('event clicked', action);
    console.log('event clicked', event);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openCreateBottomSheet() {
    this.bottomSheet.open(AddEventComponent, {
      data: {
        date: this.selectedDate
      }
    });
  }

  openEventDetails(event: CalendarEvent) {
    this.bottomSheet.open(EventDetailsComponent, {
      data: {
        event: event
      }
    });
  }

}
