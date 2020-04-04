import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    usersCollection: AngularFirestoreCollection;
    users: Observable <any>;
    user: Observable<User>;

    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
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
}
