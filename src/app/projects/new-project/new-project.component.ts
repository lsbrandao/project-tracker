import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  newProjectForm = this.formBuilder.group({
    customerName: ['', Validators.required],
    jobId: ['', Validators.required],
    paperFile: [''],
    claimNumber: [''],
    policyNumber: [''],
    phoneNumber: [''],
    dateReceived: [new Date],
    adress: [''],
    insuranceCompany: ['']
  });

  insuranceCompanies = [
    'CAA',
    'Economical',
    'RSA',
    'Intact',
    'Travelers',
    'Unica',
    'Wawanessa',
    'The Guarantee',
    'Gore',
    'RC Adjuster',
    'Claims Pro',
    'Coachman'
];

  constructor(private formBuilder: FormBuilder,
              private projectsService: ProjectsService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.projectsService.addProject({
      customerName: this.newProjectForm.value.customerName,
      jobId: this.newProjectForm.value.jobId,
      paperFile: this.newProjectForm.value.paperFile,
      claimNumber: this.newProjectForm.value.claimNumber,
      policyNumber: this.newProjectForm.value.policyNumber,
      phoneNumber: this.newProjectForm.value.phoneNumber,
      dateReceived: this.newProjectForm.value.dateReceived,
      adress: this.newProjectForm.value.adress,
      insuranceCompany: this.newProjectForm.value.insuranceCompany,
      status: 'In Progress',
      journalComments: [{
        comment: 'Received',
        date: this.newProjectForm.value.dateReceived
      }]
    });
    this.newProjectForm.reset({dateReceived: new Date});
    this.router.navigate(['/projects/projects-list']);
  }

}
