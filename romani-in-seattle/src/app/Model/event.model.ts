import { formatUrl } from "../utils/url.utils";
import firebase from 'firebase/compat/app';
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

  Date_Created: Date = new Date();
  Date_Updated: Date = new Date();
  Expired: boolean = false;
  ApprovedDate: Date = new Date();

  Community_Sponsor: boolean = false;
  Approved: boolean = true;

}

export class EventWithId extends Event{
  id:string ='';
}

