export class Job {
  Title:string ='';
  Company_Name: string ='';
  Contact_Name: string = '';
  Phone_Number: string ='';
  Email: string='';
  Job_Description: string='';
  Location: string='';
  Website: string='';
  Filled:boolean = false;
  Date_Created: string = '';
}

export class JobWithId extends Job{
  id:string ='';
}
