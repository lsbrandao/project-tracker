import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { ProjectsService } from '../../projects.service';
import { MatDialog } from '@angular/material';
import { EditProjectComponent } from './edit-project.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit {
  @Input() project;
  @Input() i;

  constructor(private projectsService: ProjectsService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
  }

  onEdit(i) {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      data: this.project
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.projectsService.editProject(result, i);
        console.log(result);
      }
    });
  }

  onDelete(i) {
    this.projectsService.deleteProject(i);
  }

  onUpdate(i) {
    this.router.navigate(['/projects/edit', i]);
  }

  onStatusUpdate(project, i, status) {
    project.status = status;
    this.projectsService.editProject(project, i);
  }
}
