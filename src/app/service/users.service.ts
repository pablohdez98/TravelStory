import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';
import {AngularFireStorage} from '@angular/fire/storage';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: Observable <any>;
  user: Observable<User>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth,
              private afSt: AngularFireStorage) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.user.subscribe(data => console.log(data));
  }
  getUser(): Observable<any> {
    return this.user;
  }

  signUp(email, password): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(data => {
      this.afs.collection('users').doc<User>(data.user.uid).set({
        name: 'name',
        surname: 'apellidos'
      });
    });
  }

  logIn(email, password): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logOut(): Promise<any> {
    return this.afAuth.signOut();
  }

  uploadTrip(form, image) {
    const selectedCountries = form.countries.map(data => data.country);
    this.afAuth.authState.subscribe(user => {
      const filePath = `${user.uid}/${form.title}/${Date.now()}`;
      this.afSt.upload(filePath, image);
      this.afs.collection('trips').add({
        idUser: user.uid,
        title: form.title,
        countries: selectedCountries,
        initDate: moment(form.initDate).format('YYYY-MM-DD'),
        endDate: moment(form.endDate).format('YYYY-MM-DD'),
        description: form.description,
        image: filePath
      });
    });
  }
  getTrips(): Observable<any> {
    return this.afAuth.authState.pipe(
        switchMap(user => {
          return this.afs.collection('trips', ref => ref.where('idUser', '==', user.uid)).snapshotChanges().pipe(
              map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              })));
        })
    );
  }
  getImage(path): Observable<any> {
    const ref = this.afSt.ref(path);
    return ref.getDownloadURL();
  }
}
