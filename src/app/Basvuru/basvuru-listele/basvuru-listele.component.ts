import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Basvuru } from 'src/Models/Basvuru';
import { BasvuruService } from 'src/Services/basvuru.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basvuru-listele',
  templateUrl: './basvuru-listele.component.html',
  styleUrls: ['./basvuru-listele.component.css'],
})
export class BasvuruListeleComponent implements OnInit {
  constructor(
    private basvuruSevis: BasvuruService,
  ) {}

  dtOptions = {};
  dtTrigger: Subject<Basvuru> = new Subject<Basvuru>();

  basvurular: Basvuru[] = [];
  kayitSayi: number = 10;
  sayfa: number = 1;
  pageCount: number = 1;

  basvuru: Basvuru[] = [];

  form = new FormBuilder().group({
      searchInput :new FormControl('')
    });

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Brt',
      pagingType: 'full_numbers',
      buttons: ['excel'],
      responsive: true
    };

    this.basvuruSevis.GetSearchAndFilter(0, this.kayitSayi, "-1").subscribe((data) => {
      this.basvurular = data;

      this.dtTrigger.next();
    });
    this.basvuruSevis.Count().subscribe((count) => {
      this.pageCount = count;
    });
  }

  sayfaGetir(skipDeger: number, takeDeger: number | any, event?: number) {
    this.sayfa = event ? event : 1;
    this.kayitSayi = takeDeger;
    let input:string = this.form.controls['searchInput'].value;
    input = input.length == 0 ? "-1" : input;
    this.basvuruSevis.GetSearchAndFilter(skipDeger, takeDeger, input).subscribe((data) => {
      this.basvurular = data;
    });
  }

  Search() {
    const input = this.form.controls['searchInput'].value;
    if(input)
    {
      this.basvuruSevis.GetSearchAndFilter(0, this.kayitSayi, input).subscribe((data) => {
        this.basvuru = data;

        this.basvuruSevis.FilterCount(input).subscribe((data) => {
          this.pageCount = data;
        });
        this.basvuruSevis.Count().subscribe((count) => {
          this.pageCount = count;
        });
      });
    } 
  }

  Sil(id: number) {
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
              .GetirBasvuru(0, this.kayitSayi)
              .subscribe((data) => {
                this.basvurular = data;
              });
          });
        });
      }
    });
  }
}