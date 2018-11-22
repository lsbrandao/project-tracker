import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectsDetailsComponent } from '../../projects-details/projects-details.component';

@Component({
    selector: 'app-edit-projec',
    templateUrl: './edit-project.component.html'
})
export class EditProjectComponent implements OnInit {
    editedForm = this.formBuilder.group({
        customerName: [this.passedData.customerName],
        jobId: [this.passedData.jobId],
        paperFile: [this.passedData.paperFile],
        claimNumber: [this.passedData.claimNumber],
        policyNumber: [this.passedData.policyNumber],
        phoneNumber: [this.passedData.phoneNumber],
        dateReceived: [this.passedData.dateReceived],
        adress: [this.passedData.adress],
        insuranceCompany: [this.passedData.insuranceCompany]
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
                  @Inject(MAT_DIALOG_DATA) public passedData: any,
                  public dialogRef: MatDialogRef<ProjectsDetailsComponent>) { }

      ngOnInit() {
      }

      onSubmit() {
        this.dialogRef.close(this.editedForm.value);
      }
}
