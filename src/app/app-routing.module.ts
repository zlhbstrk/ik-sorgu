import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KullaniciDuzenleComponent } from './Kullanici/kullanici-duzenle/kullanici-duzenle.component';
import { KullaniciEkleComponent } from './Kullanici/kullanici-ekle/kullanici-ekle.component';
import { KullaniciListeleComponent } from './Kullanici/kullanici-listele/kullanici-listele.component';
import { LogListeleComponent } from './Log/log-listele/log-listele.component';
import { LoginComponent } from './Login/login/login.component';
import { LoginGuard } from './Login/login/login.guard';
import { SifreDuzenleComponent } from './Sifre/sifre-duzenle/sifre-duzenle.component';
import { BasvuruEkleComponent } from './Basvuru/basvuru-ekle/basvuru-ekle.component';
import { BasvuruListeleComponent } from './Basvuru/basvuru-listele/basvuru-listele.component';

const routes: Routes = [
  { path: 'kullaniciekle', component: KullaniciEkleComponent, canActivate:[LoginGuard]},
  { path: 'basvuruekle', component: BasvuruEkleComponent, canActivate:[LoginGuard]},
  { path: 'kullanicilistele', component: KullaniciListeleComponent, canActivate:[LoginGuard]},
  { path: 'basvurulistele', component: BasvuruListeleComponent, canActivate:[LoginGuard]},
  { path: 'loglistele', component: LogListeleComponent, canActivate:[LoginGuard]},
  { path: 'kullaniciduzenle/:id', component: KullaniciDuzenleComponent, canActivate:[LoginGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'sifreduzenle', component: SifreDuzenleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}