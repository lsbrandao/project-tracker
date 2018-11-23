import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProjectsService } from '../projects/projects.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private projecsService: ProjectsService,
        private snackBar: MatSnackBar
        ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/projects/projects-list']);
            } else {
                this.projecsService.unsub();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }

    signup(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, authData.password
        ).then(result => {
            console.log(result);
        }).catch(error => {
            this.snackBar.open(error.message, null, {
                duration: 5000
            });
        });
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, authData.password
        ).then(result => {
            console.log(result);
        }).catch(error => {
            this.snackBar.open(error.message, null, {
                duration: 5000
            });
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }

}
