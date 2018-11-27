import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project.model';
import { JournalComment } from './projects-list/projects-details/project-journal/journal-comment.model';
import { UIService } from '../shared/ui.shared';
import * as firebase from 'firebase/app';
import * as fromProject from './projects.reducer';
import * as UI from '../shared/ui.actions';
import * as Projects from './projects.actions';

@Injectable()
export class ProjectsService {
    private projects: Project[] = [];
    projectsChanged = new Subject<Project[]>();
    journalCommentsChanged = new Subject<JournalComment[]>();
    subs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromProject.State>
        ) {}

    fetchProjects() {
        this.store.dispatch( new UI.StartLoading );
        this.subs.push(this.db.collection('projects')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data() as Project
              };
            });
          })
        ).subscribe(projects => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Projects.SetProjects(projects));
        }, error => {
            this.store.dispatch( new UI.StopLoading );
            this.uiService.openSnackBar('Fetching projects failed, please try again later', null, 3000);
        }));
    }

    unsub() {
        this.subs.forEach(sub => {
            sub.unsubscribe();
        });
    }

    addProject(project: Project) {
        this.db.collection('projects').add(project);
    }

    deleteProject(selectedId: string) {
        this.db.doc('projects/' + selectedId).delete();
    }

    editProject(project: Project, selectedId: string) {
        this.db.doc('projects/' + selectedId).update(project);
    }

    updateJournalComments (comments: JournalComment, selectedId: string) {
        this.db.collection('projects').doc(selectedId).update({
            journalComments: firebase.firestore.FieldValue.arrayUnion(comments)
        });
        this.fetchProjects();
    }

    getProjects() {
        this.store.select(fromProject.getProjects);
        // return this.projects.slice();
    }
}

