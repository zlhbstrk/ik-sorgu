import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Basvuru } from 'src/Models/Basvuru';
import { BasvuruService } from 'src/Services/basvuru.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-basvuru-listele',
  templateUrl: './basvuru-listele.component.html',
  styleUrls: ['./basvuru-listele.component.css'],
})
export class BasvuruListeleComponent implements OnInit {
  constructor(
    private basvuruSevis: BasvuruService,public datepipe: DatePipe
  ) {}

  basvurular: any[] = [];
  kayitSayi: number = 10;
  sayfa: number = 1;
  pageCount: number = 1;

  basvuru: Basvuru[] = [];

  form = new FormBuilder().group({
      searchInput :new FormControl('')
    });

  ngOnInit(): void {
    this.basvuruSevis.GetirBasvuru().subscribe((data) => {
      this.basvurular = data;
    });
  }

  Search() {
    const input = this.form.controls['searchInput'].value;
    if(input && input != '')
    {
      this.basvuruSevis.GetSearch(input).subscribe((data) => {
        this.basvurular = data;
      });
    } else{
      this.basvuruSevis.GetirBasvuru().subscribe((data) => {
        this.basvurular = data;
      });
    }
  }

  Sil(id: string) {
    Swal.fire({
      title: 'Silmek istediğinize emin misiniz?',
      text: 'Silinen kayıt geri getirilemez!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.basvuruSevis.Sil(id).subscribe(() => {
          Swal.fire(
            'Silindi!',
            'Silme işlemi başarıyla tamamlandı.',
            'success'
          ).then(() => {
            this.basvuruSevis
              .GetirBasvuru()
              .subscribe((data) => {
                this.basvurular = data;
              });
          });
        });
      }
    });
  }
}