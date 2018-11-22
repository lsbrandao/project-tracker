import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectsSubscription: Subscription;

  constructor(private router: Router,
              private projectsService: ProjectsService) {
               }

  ngOnInit() {
    this.projectsService.fetchProjects();
    this.projectsSubscription = this.projectsService.projectsChanged.subscribe(projects => {
      this.projects = projects;
    });
  }

  onPanelClose() {
    this.router.navigate(['/projects/projects-list']);
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
}

