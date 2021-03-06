import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Kullanici } from 'src/Models/Kullanici';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private kullaniciServis: KullaniciService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  model!: Kullanici;
  form!: FormGroup;
  returnUrl!: string;

  ngOnInit(): void {
    this.girisForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  girisForm() {
    this.form = new FormGroup({
      Email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        Validators.maxLength(50),
      ]),
      Sifre: new FormControl(null, [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%*?&.+/-])[A-Za-z0-9@#$!%*?&.+/-]{8,20}$"),
        Validators.minLength(8),
      ]),
    });
  }

  login() {
    this.kullaniciServis
      .Login(
        this.form.controls['Email'].value,
        this.form.controls['Sifre'].value
      );
  }
}