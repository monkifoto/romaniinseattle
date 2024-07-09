export class Offers {
  [x: string]: any;
  Title:string='';
  Company_Name: string='';
  Contact_Name: string ='';
  Phone_Number: string='';
  Email: string='';
  Description: string='';
  Price: string='';
  Location: string='';
  Website: string='';
  Facebook: string='';
  Instagram: string='';
  Filled!:boolean;
  Date_Created: string ='';
  Date_Updated: string='';
  Images: string[] = [];
  OfferType: string='';
  Community_Sponsor!: boolean;
  Approved!: boolean;
  ApprovedDate: string='';
}

export interface OffersWithId extends Offers{
  id:string;
}
