import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private projecsService: ProjectsService) {}

    signup(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, authData.password
        ).then(result => {
            this.authSuccessfully();
        }).catch(error => {
            console.log(error);
        });
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, authData.password
        ).then(result => {
            this.authSuccessfully();
        }).catch(error => {
            console.log(error);
        });
    }

    logout() {
        this.projecsService.subs.unsubscribe();
        this.afAuth.auth.signOut();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    isAuth() {
        return this.isAuthenticated;
    }

    authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/projects/projects-list']);
    }
}
