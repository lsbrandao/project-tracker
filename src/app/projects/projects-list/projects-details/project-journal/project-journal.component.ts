import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProjectsService } from '../../../projects.service';
import { JournalComment } from './journal-comment.model';
import { Project } from '../../../project.model';
import * as fromProjects from '../../../projects.reducer';
import * as Projects from '../../../projects.actions';

@Component({
  selector: 'app-project-journal',
  templateUrl: './project-journal.component.html',
  styleUrls: ['./project-journal.component.css']
})
export class ProjectJournalComponent implements OnInit {
  selectedId: string;
  selectedProject$: Observable<Project>;
  selectedProjectComments$: Observable<JournalComment[]>;

  constructor(private projectsService: ProjectsService,
              private route: ActivatedRoute,
              private store: Store<fromProjects.State>) {
              }

  ngOnInit() {
    this.selectedId = this.route.snapshot.paramMap.get('id');
    this.projectsService.fetchProjects();
    this.store.dispatch(new Projects.SelectProject(this.selectedId));
    this.selectedProject$ = this.store.select(fromProjects.getSelectedProject);
    this.selectedProjectComments$ = this.store.select(fromProjects.getSelectedProjectComments);
  }

  onSubmit(form: NgForm) {
    this.projectsService.updateJournalComments(form.value, this.selectedId);
    form.reset();
  }
}
