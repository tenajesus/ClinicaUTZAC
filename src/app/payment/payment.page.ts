import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';




@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pagos : any = [];
  searchedPago : any;

  constructor(
  private http:HttpClient,
  private router : Router,
  private alertController : AlertController
  ) { }

  ngOnInit() {

      this.getPagos().subscribe(res => {
      console.log("Res",res)
      this.pagos = res;
      this.searchedPago = this.pagos;
    })

  }

  getPagos(){
    return this.http.get("http://localhost/ionic/backend/getPayments.php")
    .pipe(
      map((res:any) => {
      return res;
    })
    )
  }

  searchPago(event: any){
    const text = event.target.value;
    this.searchedPago = this.pagos;
    if(text && text.trim() != ''){
      this.searchedPago = this.searchedPago.filter((paciente:any) =>{
        return (paciente.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

  goToHome(){
    this.router.navigate(['/'])
  }

  async verInfo(importe:any,fechaPago:any,recibo:any) {

    const alert = await this.alertController.create({
    header: 'Recibo de Pago: '+recibo,
    subHeader:'Importe: $'+importe,
    message: 'Fecha de Pago: '+fechaPago,
    
    buttons: ['OK'],
  });

  alert.present();
  }

}


