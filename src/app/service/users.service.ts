import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';
import {AngularFireStorage} from '@angular/fire/storage';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: Observable<User>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth,
              private afSt: AngularFireStorage) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).snapshotChanges().pipe(
              map(a => {
                const data = a.payload.data();
                const id = a.payload.id;
                return { id, ...data };
              })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  getUser(): Observable<any> {
    return this.user;
  }

  signUp(form): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(form.email, form.password).then(async data => {
      await this.afs.collection('users').doc<User>(data.user.uid).set({
        name: form.name,
        surname: form.surname
      });
    });
  }

  logIn(email, password): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logOut(): Promise<any> {
    return this.afAuth.signOut();
  }

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
      totalStars: 0,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  getTrips(startWith, fieldPath = null, value = null, opStr = null): Observable<Promise<any>[]> {
    let search: Observable<any>;
    if (startWith) {
      search = this.afs.collection('trips', ref => ref.where('title', '>=', value)
        .where('title', '<', `${value}\uf8ff`)).snapshotChanges();
    } else {
      if (fieldPath && opStr && value) {
        search = this.afs.collection('trips', ref => ref.where(fieldPath, opStr, value)).snapshotChanges();
      } else {
        search = this.afs.collection('trips').snapshotChanges();
      }
    }
    return search.pipe(
        map(actions => actions.map(async a => {
          const data = a.payload.doc.data();
          data.countries = data.countries.join(', ');
          data.image = await this.getImage(data.image);
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
  }
  getImage(path): Promise<any> {
    const ref = this.afSt.ref(path);
    return ref.getDownloadURL().pipe(take(1)).toPromise();
  }

  getOneTrip(idTrip): Observable<Promise<any>> {
    return this.afs.collection('trips').doc<any>(idTrip).valueChanges().pipe(
      map(async data => {
        data.countries = data.countries.join(', ');
        data.image = await this.getImage(data.image);
        return data;
      })
    );
  }

  getRates(idTrip): Observable<any> {
    return this.afs.collection('trips').doc(idTrip).collection('rates').valueChanges();
  }

  checkComments(idTrip, userId): Observable<any> {
    return this.afs.collection('trips').doc(idTrip).collection('rates', ref => ref.where('idUser', '==', userId)).valueChanges();
  }

  async createRate(form): Promise<any> {
    const idUser = JSON.parse(localStorage.getItem('user')).id;
    const trip = await this.afs.collection('trips').doc<any>(form.idTrip).valueChanges().pipe(
      take(1)).toPromise();
    await this.afs.collection('trips').doc<any>(form.idTrip).update({
      totalStars: trip.totalStars + Number(form.rate),
    });
    return this.afs.collection('trips').doc(form.idTrip).collection('rates').add( {
      idUser,
      rate: form.rate,
      comment: form.comment
    });
  }
}
