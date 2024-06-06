import { Component } from '@angular/core';

interface ResourceLink {
  name: string;
  url: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  resourceLinks: ResourceLink[] = [
    { name: 'Ambasada Romaniei in SUA', url: 'https://washington.mae.ro/' },
    { name: 'American Romanian Cultural Society', url: 'www.arcsproject.org' },
    { name: 'Biserica Sfintii Trei Ierarhi', url: 'http://www.ortodox.org/'}
  ];

}
