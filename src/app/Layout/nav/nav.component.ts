import { Component, OnInit } from '@angular/core';
import { KullaniciService } from 'src/Services/kullanici.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private kullaniciServis: KullaniciService) { }

  isAdmin:boolean = true;
  kulAdi:string = "";

  ngOnInit(): void {
    this.kulAdi = this.kullaniciServis.kulAdi();  
  }
}
