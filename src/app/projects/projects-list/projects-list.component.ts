import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';
import { UIService } from '../../shared/ui.shared';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectsSubscription: Subscription;
  isLoading = true;
  isLoadingSubs: Subscription;

  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    private uiService: UIService) {
    }

  ngOnInit() {
    this.isLoadingSubs = this.uiService.loadingStateChanged.subscribe(isLoadingStatus => {
      this.isLoading = isLoadingStatus;
    });
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
    this.isLoadingSubs.unsubscribe();
  }
}

