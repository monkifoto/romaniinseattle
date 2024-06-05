// src/app/add-job/add-job.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from 'src/app/Services/jobs.service';
import { Job } from 'src/app/Model/job.model';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private jobsService: JobsService) {
    this.jobForm = this.fb.group({
      Title: ['', Validators.required],
      Company_Name: ['', Validators.required],
      Contact_Name: ['', Validators.required],
      Phone_Number: ['', Validators.required],
      Location: ['', Validators.required],
      Website: ['', Validators.required],
      Job_Description: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.jobForm.valid) {
      const newJob = this.jobForm.value;

      this.jobsService.addJob(newJob).then(() => {
        console.log('Job added successfully');
        this.jobForm.reset();
      }).catch(error => {
        console.error('Error adding job: ', error);
      });
    }
  }
}
