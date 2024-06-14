export class Event {

  Poster_Image:string ='';

  Name:string ='';
  Contact: string ='';
  Phone_Number:string ='';

  Description: string ='';
  Location:string ='';
  Date:string ='';
  Time: string =''
  Price:string ='';

  Website?:string ='';
  Facebook?:string ='';
  Instagram?:string ='';

  Date_Created: string = '';
  Expired: boolean = false;
  ApprovedDate: string ='';

  Community_Sponsor: boolean = false;
  Approved: boolean = true;
  id?: string;
}
