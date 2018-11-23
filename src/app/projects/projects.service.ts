import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project.model';
import { JournalComment } from './projects-list/projects-details/project-journal/journal-comment.model';
import * as firebase from 'firebase/app';
import { UIService } from '../shared/ui.shared';

@Injectable()
export class ProjectsService {
    private projects: Project[] = [];
    projectsChanged = new Subject<Project[]>();
    journalCommentsChanged = new Subject<JournalComment[]>();
    subs: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService: UIService) {}

    fetchProjects() {
        this.uiService.loadingStateChanged.next(true);
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
            this.uiService.loadingStateChanged.next(false);
            this.projects = projects;
            this.projectsChanged.next([...this.projects]);
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
        // this.projects.splice(index, 1);
        // this.newProjects = this.projects.slice();
        // this.projectsChanged.next(this.newProjects);

    }

    updateProject(project: Project, selectedId: string) {
        this.db.doc('projects/' + selectedId).update(project);
        // const updatedProjects = this.projects.slice();
        // updatedProjects[i] = {
        //     ...updatedProjects[i],
        //     ...project
        // };
        // this.newProjects = updatedProjects.slice();
        // this.projectsChanged.next(this.newProjects);
    }

    updateJournalComments (comments: JournalComment, selectedId: string) {
        this.db.collection('projects').doc(selectedId).update({
            journalComments: firebase.firestore.FieldValue.arrayUnion(comments)
        });
        this.fetchProjects();
        // const updatedProjects = this.projects.slice();
        // const project = updatedProjects[i];
        // project.journalComments.push(comments);
        // this.journalCommentsChanged.next(project.journalComments);
    }

    getProjects() {
        return this.projects.slice();
    }
}

