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
  Image:string='';
  Approved: boolean = false;

}
export interface ServiceExt extends ServiceWithId {
  getFormattedWebsite(): string;
  getFormattedFacebook(): string;
  getFormattedInstagram(): string;
}
export class ServiceWithId extends Service{
  id:string ='';
}
