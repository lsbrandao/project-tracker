import { Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';
import * as fromProjects from '../projects.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    private store: Store<fromProjects.State>
    ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.projects$ = this.store.select(fromProjects.getProjects);
    this.projectsService.fetchProjects();
    // this.projectsSubscription = this.projectsService.projectsChanged.subscribe(projects => {
    //   this.projects = projects;
    // });
  }

  onPanelClose() {
    this.router.navigate(['/projects/projects-list']);
  }
}

