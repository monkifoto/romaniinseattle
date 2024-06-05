import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/Services/jobs.service';
import { Job, JobWithId } from 'src/app/Model/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: JobWithId[] = [];
  constructor(private jobsService: JobsService,private router: Router) { }

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  navigateToAddJob(): void {
    this.router.navigate(['/add-job']);
  }
}
