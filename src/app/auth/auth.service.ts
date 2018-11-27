import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { ProjectsService } from '../projects/projects.service';
import { UIService } from '../shared/ui.shared';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private projecsService: ProjectsService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
        ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch( new Auth.SetAuthenticated);
                this.router.navigate(['/projects/projects-list']);
            } else {
                this.projecsService.unsub();
                this.store.dispatch( new Auth.SetUnauthenticated);
                this.router.navigate(['']);
            }
        });
    }

    signup(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, authData.password
        ).then(result => {
            this.store.dispatch(new UI.StopLoading);
        }).catch(error => {
            this.store.dispatch(new UI.StopLoading);
            this.uiService.openSnackBar(error.message, null, 5000);
        });
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, authData.password
        ).then(result => {
            this.store.dispatch(new UI.StopLoading);
        }).catch(error => {
            this.store.dispatch(new UI.StopLoading);
            this.uiService.openSnackBar(error.message, null, 5000);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}
