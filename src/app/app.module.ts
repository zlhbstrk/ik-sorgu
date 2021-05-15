import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Layout/nav/nav.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { KullaniciEkleComponent } from './Kullanici/kullanici-ekle/kullanici-ekle.component';
import { BasvuruEkleComponent } from './Basvuru/basvuru-ekle/basvuru-ekle.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { KullaniciListeleComponent } from './Kullanici/kullanici-listele/kullanici-listele.component';
import { BasvuruListeleComponent } from './Basvuru/basvuru-listele/basvuru-listele.component';
import { LogListeleComponent } from './Log/log-listele/log-listele.component';
import { KullaniciDuzenleComponent } from './Kullanici/kullanici-duzenle/kullanici-duzenle.component';
import { LoginComponent } from './Login/login/login.component';
import { KullaniciService } from 'src/Services/kullanici.service';
import { LoginGuard } from './Login/login/login.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgSearchPipe } from 'ng-search-pipe';
import { SifreDuzenleComponent } from './Sifre/sifre-duzenle/sifre-duzenle.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    KullaniciEkleComponent,
    BasvuruEkleComponent,
    KullaniciListeleComponent,
    BasvuruListeleComponent,
    LogListeleComponent,
    KullaniciDuzenleComponent,
    LoginComponent,
    SifreDuzenleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    HttpClientModule,
    RouterModule,
    DataTablesModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgSearchPipe,
    FormsModule
  ],
  providers: [KullaniciService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
