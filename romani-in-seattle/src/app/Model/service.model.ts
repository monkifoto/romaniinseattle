import { formatUrl } from "../utils/url.utils";

export class Service {
  [x: string]: any;
  Name: string='';
  Service_Type!: string;
  Phone_Number: string ='';
  Email: string='';
  Description: string='';
  Website: string='';
  Facebook: string='';
  Instagram: string='';
  Community_Sponsor!: boolean;
  Date_Created: string ='';
  Date_Updated: string='';
  Image:string='';
  Approved: boolean = false;
  OpenHour: string ='';
  CloseHour: string = '';
  Hours: {
    Luni?: { open: string, close: string };
    Marti?: { open: string, close: string };
    Miercuri?: { open: string, close: string };
    Joi?: { open: string, close: string };
    Vineri?: { open: string, close: string };
    Sambata?: { open: string, close: string };
    Duminica?: { open: string, close: string };
  } = {};
  Service_Type_ID: string = '';
}
export interface ServiceExt extends ServiceWithId {
  getFormattedWebsite(): string;
  getFormattedFacebook(): string;
  getFormattedInstagram(): string;
}
export class ServiceWithId extends Service{
  id:string ='';
}
