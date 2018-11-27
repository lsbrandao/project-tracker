import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';
import * as fromProjects from '../projects.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['customerName', 'jobId', 'paperFile', 'claimNumber', 'policyNumber', 'phoneNumber',
   'dateReceived', 'adress', 'insuranceCompany', 'status'];
  dataSource =  new MatTableDataSource<Project>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private projectsServices: ProjectsService,
    private store: Store<fromProjects.State>) { }

  ngOnInit() {
    this.store.select(fromProjects.getProjects)
    .subscribe(projects => this.dataSource.data = projects);
    this.projectsServices.fetchProjects();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
