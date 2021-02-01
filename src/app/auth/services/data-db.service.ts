import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { MessageI } from 'src/app/models/mesagge.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private contactCollection: AngularFirestoreCollection<MessageI>;

  constructor(afs: AngularFirestore) {
    this.contactCollection = afs.collection<MessageI>('contacts');
    
  }

  saveMessage(newContact: MessageI): void {
    this.contactCollection.add(newContact);
  }


}