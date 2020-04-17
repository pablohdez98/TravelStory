import { Injectable } from '@angular/core';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Rate} from './rate';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private afs: AngularFirestore) { }
  getRates(idTrip): Observable<Rate[]> {
    return this.afs.collection('trips').doc(idTrip).collection<Rate>('rates').valueChanges();
  }
  async createRate(form): Promise<any> {
    const idUser = JSON.parse(localStorage.getItem('user')).id;
    const trip = await this.afs.collection('trips').doc<any>(form.idTrip).valueChanges().pipe(
      take(1)).toPromise();
    await this.afs.collection('trips').doc<any>(form.idTrip).update({
      totalStars: trip.totalStars + Number(form.rate),
    });
    return this.afs.collection('trips').doc(form.idTrip).collection<Rate>('rates').add( {
      idUser,
      ratePoints: form.rate,
      comment: form.comment
    });
  }
  checkComments(idTrip, userId): Observable<Rate[]> {
    return this.afs.collection('trips').doc(idTrip).collection<Rate>('rates', ref => ref.where('idUser', '==', userId)).valueChanges();
  }
}
