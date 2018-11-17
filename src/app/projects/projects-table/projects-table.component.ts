import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';

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

  constructor(private projectsServices: ProjectsService) { }

  ngOnInit() {
    this.dataSource.data = this.projectsServices.getProjects();
    this.projectsServices.projectsChanged.subscribe(projects => {
      this.dataSource.data = projects;
    });
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
