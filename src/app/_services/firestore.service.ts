import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  get events() {
    return this.firestore.collection('events').valueChanges({idField: 'id'});
  }

  get recurrentEvents() {
    return this.firestore.collection('recurrent').valueChanges({idField: 'id'});
  }

}
