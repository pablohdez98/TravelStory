import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Trip} from './trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private afs: AngularFirestore, private afSt: AngularFireStorage) { }

  async uploadTrip(form, image) {
    const selectedCountries = form.countries.map(data => data.country);
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const filePath = `${userId}/${form.title}-${Date.now()}/${image.name}`;
    await this.afSt.upload(filePath, image);
    await this.afs.collection('trips').add({
      idUser: userId,
      title: form.title,
      countries: selectedCountries,
      initDate: moment(form.initDate).format('YYYY-MM-DD'),
      endDate: moment(form.endDate).format('YYYY-MM-DD'),
      description: form.description,
      image: filePath,
      meanRate: 0,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  async deleteTrip(idTrip) {
    await this.afs.collection('trips').doc(idTrip).delete();
  }

  getTrips(startWith, fieldPath = null, value = null, opStr = null): Observable<Promise<Trip>[]> {
    let search: Observable<DocumentChangeAction<Trip>[]>;
    if (startWith) {
      search = this.afs.collection<Trip>('trips', ref => ref.where('title', '>=', value)
        .where('title', '<', `${value}\uf8ff`)).snapshotChanges();
    } else {
      if (fieldPath && opStr && value) {
        search = this.afs.collection<Trip>('trips', ref => ref.where(fieldPath, opStr, value)).snapshotChanges();
      } else {
        search = this.afs.collection<Trip>('trips').snapshotChanges();
      }
    }
    return search.pipe(
      map(actions => actions.map(async a => {
        const data = a.payload.doc.data();
        data.image = await this.getImage(data.image);
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getImage(path): Promise<string> {
    const ref = this.afSt.ref(path);
    return ref.getDownloadURL().pipe(take(1)).toPromise();
  }

  getOneTrip(idTrip): Observable<Promise<Trip>> {
    return this.afs.collection<Trip>('trips').doc<Trip>(idTrip).valueChanges().pipe(
      map(async data => {
        if (data) {
          data.image = await this.getImage(data.image);
        }
        return data;
      })
    );
  }
}
