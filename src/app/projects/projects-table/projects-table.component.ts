import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['customerName', 'jobId', 'paperFile', 'claimNumber', 'policyNumber', 'phoneNumber',
   'dateReceived', 'adress', 'insuranceCompany', 'status'];
  dataSource =  new MatTableDataSource<Project>();
  projectsSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private projectsServices: ProjectsService) { }

  ngOnInit() {
    this.projectsSubscription = this.projectsServices.projectsChanged.subscribe(
      (projects: Project[]) => {
        this.dataSource.data = projects;
      }
    );
    this.projectsServices.fetchProjects();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
}
