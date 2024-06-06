export class Offers {
  Title:string ='';
  Company_Name: string ='';
  Contact_Name: string = '';
  Phone_Number: string ='';
  Email: string='';
  Description: string='';
  Location: string='';
  Website: string='';
  Filled:boolean = false;
  Date_Created: string = '';
  Image1: string = '';
  Image2: string = '';
  Image3: string = '';
  Image4: string = '';
  Image5: string = '';
}

export class OffersWithId extends Offers{
  id:string ='';
}
