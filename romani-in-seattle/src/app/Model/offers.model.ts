export interface Offers {
  [x: string]: any;
  Title:string;
  Company_Name: string;
  Contact_Name: string ;
  Phone_Number: string;
  Email: string;
  Description: string;
  Price: string;
  Location: string;
  Website: string;
  Facebook: string;
  Instagram: string;
  Filled:boolean;
  Date_Created: string ;
  Image1: string;
  Image2: string;
  Image3: string;
  Image4: string;
  Image5: string;
  OfferType: string;
  id?:string;
  Community_Sponsor: boolean;
  Approved: boolean;
  ApprovedDate: string;
}

export interface OffersWithId {
  Title:string;
  Company_Name: string;
  Contact_Name: string ;
  Phone_Number: string;
  Email: string;
  Description: string;
  Price: string;
  Location: string;
  Website: string;
  Facebook: string;
  Instagram: string;
  Filled:boolean;
  Date_Created: string ;
  Image1: string;
  Image2: string;
  Image3: string;
  Image4: string;
  Image5: string;
  OfferType: string;
  id?:string;
  Community_Sponsor:boolean;
  Approved: boolean;
  ApprovedDate: string;
}
