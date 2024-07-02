import { formatUrl } from "../utils/url.utils";

export class Event {
  [x: string]: any;
  Poster_Image:string ='';

  Name:string ='';
  Contact: string ='';
  Phone_Number:string ='';

  Description: string ='';
  Location:string ='';
  Event_Date:string ='';
  Time: string =''
  Price:string ='';

  Website?:string ='';
  Facebook?:string ='';
  Instagram?:string ='';

  Date_Created: string = '';
  Date_Updated: string ='';
  Expired: boolean = false;
  ApprovedDate: string ='';

  Community_Sponsor: boolean = false;
  Approved: boolean = true;

}

export class EventWithId extends Event{
  id:string ='';
}

