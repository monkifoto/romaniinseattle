export class Service {
  Name: string='';
  Service_Type!: string;
  Phone_Number: string ='';
  Email: string='';
  Description: string='';
  Website: string='';
  Community_Sponsor!: boolean;
}

export class ServiceWithId extends Service{
  id:string ='';
}
