import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Basvuru } from 'src/Models/Basvuru';
import { BasvuruService } from 'src/Services/basvuru.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basvuru-ekle',
  templateUrl: './basvuru-ekle.component.html',
  styleUrls: ['./basvuru-ekle.component.css']
})
export class BasvuruEkleComponent implements OnInit {

  constructor(private basvuruServis:BasvuruService, private router: Router) { }

  model!:Basvuru;

  form = new FormGroup({
    IlId: new FormControl(null, [Validators.required]),
    IlceId: new FormControl(null, [Validators.required]),
    MahalleId: new FormControl(null, [Validators.required]),
    Ada: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    Parsel: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    Nitelik: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    Adres: new FormControl(null, [Validators.required, Validators.maxLength(100)])
  });
  
  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.valid) {
      this.model = this.form.value;
      this.model.AktifMi = true;
      this.basvuruServis.Ekle(this.model).subscribe((data) => {
        if(data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'Başvuru ekle işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          }).then(()=>{
            this.form.reset();
          });
          this.router.navigate(['/basvurulistele']);
        }
      });
    }
  }
}
