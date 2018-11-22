import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project.model';
import { JournalComment } from './projects-list/projects-details/project-journal/journal-comment.model';

@Injectable()
export class ProjectsService {
    private projects: Project[] = [];
    private newProjects: Project[] = [];
    projectsChanged = new Subject<Project[]>();
    journalCommentsChanged = new Subject<JournalComment[]>();

    constructor(private db: AngularFirestore) {}

    fetchProjects() {
        this.db.collection('projects')
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
            this.projects = projects;
            this.projectsChanged.next([...this.projects]);
        });
    }

    addProject(project: Project) {
        this.addDataToDatabase(project);
    }

    deleteProject(index: number) {
        this.projects.splice(index, 1);
        this.newProjects = this.projects.slice();
        this.projectsChanged.next(this.newProjects);
    }

    editProject(project: Project, i: number) {
        const updatedProjects = this.projects.slice();
        updatedProjects[i] = {
            ...updatedProjects[i],
            ...project
        };
        this.newProjects = updatedProjects.slice();
        this.projectsChanged.next(this.newProjects);
    }

    addJournalComments (comments: JournalComment, i: number) {
        const updatedProjects = this.projects.slice();
        const project = updatedProjects[i];
        project.journalComments.push(comments);
        this.journalCommentsChanged.next(project.journalComments);
    }

    getProjects() {
        return this.projects.slice();
    }

    private addDataToDatabase(project: Project) {
        this.db.collection('projects').add(project);
    }
}

