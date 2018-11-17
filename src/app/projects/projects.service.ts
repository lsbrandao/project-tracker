import { Project } from './project.model';
import { Subject } from 'rxjs';
import { JournalComment } from './projects-details/project-journal/journal-comment.model';

export class ProjectsService {
    projectsChanged = new Subject<Project[]>();
    journalCommentsChanged = new Subject<JournalComment[]>();
    private newProjects: Project[] = [];
    singleProject;

    private projects: Project[] = [{
        customerName: 'Test',
        jobId: '12345',
        paperFile: '2018-12345',
        claimNumber: '1234567',
        policyNumber: '1239846',
        phoneNumber: '(XXX) XXX-XXX',
        dateReceived: new Date('November 14, 2018'),
        adress: '101 Erskine ave',
        insuranceCompany: 'caa',
        status: 'In Progress',
        journalComments: [{
            comment: 'Called insurance company',
            date: new Date('November 14, 2018')
        }]
    },
    {
        customerName: 'Test2',
        jobId: '67890',
        paperFile: '2018-12345',
        claimNumber: '1234567',
        policyNumber: '1239846',
        phoneNumber: '(XXX) XXX-XXX',
        dateReceived: new Date('November 13, 2018'),
        adress: '101 Erskine ave',
        insuranceCompany: 'caa',
        status: 'In Progress',
        journalComments: [{
            comment: 'Talked to customer',
            date: new Date('November 15, 2018')
        }]
    }];

    addProject(project: Project) {
        this.projects.push(project);
        this.newProjects = this.projects.slice();
        this.projectsChanged.next(this.newProjects);
    }

    deleteProject(index: number) {
        this.projects.splice(index, 1);
        this.newProjects = this.projects.slice();
        this.projectsChanged.next(this.newProjects);
    }

    editProject(project: Project, i: number) {
        const updatedProjects = this.projects.slice();
        updatedProjects[i] = project;
        this.newProjects = updatedProjects.slice();
        this.projectsChanged.next(this.newProjects);
    }

    addJournalComments (comments: JournalComment, i: number) {
        const updatedProjects = this.projects.slice();
        const project = updatedProjects[i];
        project.journalComments.push(comments);
        this.journalCommentsChanged.next(project.journalComments);
    }

    getProject(index: number) {
        this.singleProject = this.projects.slice();
        return this.singleProject[index];
    }

    getProjects() {
        return this.projects.slice();
    }

    getNewProjects() {
        return this.newProjects.slice();
    }
}

