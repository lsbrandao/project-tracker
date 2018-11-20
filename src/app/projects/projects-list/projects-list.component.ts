import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../project.model';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../projects.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { EditProjectComponent } from '../projects-list/projects-details/edit-project.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectsSubscription: Subscription;
  openJournal = false;

  constructor(private projectsService: ProjectsService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.projects = this.projectsService.getProjects();
    this.projectsSubscription = this.projectsService.projectsChanged.subscribe(projects => {
      this.projects = projects;
    });
  }

  onPanelClose() {
    this.router.navigate(['/projects/projects-list']);
    this.openJournal = false;
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
  }
}

