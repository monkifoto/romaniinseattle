export class ErrorModel {
  [x: string]: any;
  message: string ='';
  context: string ='';
  stack: string='';
  timestamp : Date = new Date();
  id : string ='';

}

