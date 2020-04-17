import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';
import 'firebase/firestore';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<User>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
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

  getUser(): Observable<User> {
    return this.user;
  }

  signUp(form): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(form.email, form.password).then(async data => {
      await this.afs.collection<User>('users').doc<User>(data.user.uid).set({
        name: form.name,
        surname: form.surname
      });
    });
  }

  logIn(email, password): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async googleLogIn() {
    const data = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    await this.afs.collection<User>('users').doc<User>(data.user.uid).set({
      name: data.user.displayName
    }, {merge: true});
  }

  logOut(): Promise<any> {
    return this.afAuth.signOut();
  }
}
