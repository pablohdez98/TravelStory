import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    usersCollection: AngularFirestoreCollection;
    users: Observable <any>;

    constructor(private afs: AngularFirestore, private fauth: AngularFireAuth) {
        this.usersCollection = this.afs.collection('users');
        this.users = this.usersCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map((c: any) => {
                    const data = c.payload.doc.data();
                    const id = c.payload.doc.id;
                    return {id, ...data};
                });
            })
        );
    }
    getUsers(): Observable<any> {
        return this.users;
    }

    signUp(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}
