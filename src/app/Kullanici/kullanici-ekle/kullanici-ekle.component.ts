import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Kullanici } from 'src/Models/Kullanici';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kullanici-ekle',
  templateUrl: './kullanici-ekle.component.html',
  styleUrls: ['./kullanici-ekle.component.css']
})
export class KullaniciEkleComponent implements OnInit {

  constructor(private kullaniciServis:KullaniciService, private router: Router) { }

  model!:Kullanici;

  form = new FormGroup({
    Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    Email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(50)]),
    Password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%*?&.+/-])[A-Za-z0-9@#$!%*?&.+/-]{8,20}$"), Validators.minLength(8)]),
  });

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.valid) {
      this.model = this.form.value;
      this.kullaniciServis.Ekle(this.model).subscribe((data) => {
        console.log(data);
        if(data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'Kullanıcı ekle işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          }).then(()=>{
            this.form.reset();
          });
          this.router.navigate(['/kullanicilistele']);
        }
      });
    }
  }
}
