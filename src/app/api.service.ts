import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
  ) { }

  addStudent(data:any){
    return this.http.post('http://localhost/ionic/backend/create.php',data)
  }

  addSesion(id:any,data:any,){
    return this.http.post('http://localhost/ionic/backend/sesion.php?id='+id,data)
  }

  addPay(id:any,data:any,){
    return this.http.post('http://localhost/ionic/backend/pay.php?id='+id,data)
  }

  getPacientes(){
    return this.http.get('http://localhost/ionic/backend/getStudents.php')
  }
  deletePaciente(id:any){
    return this.http.delete('http://localhost/ionic/backend/delete.php?id='+id)
  }
  getPaciente(id:any){
    return this.http.get('http://localhost/ionic/backend/getSingleStudent.php?id='+id)
  }
  update(id:any,data:any){
    return this.http.put('http://localhost/ionic/backend/update.php?id='+id,data)
  }
  getDetalles(id:any){
    return this.http.get('http://localhost/ionic/backend/getDetalles.php?id='+id)
 }
 getPagos(id:any){
  return this.http.get('http://localhost/ionic/backend/getPagos.php?id='+id)
}
getSesiones(id:any){
  return this.http.get('http://localhost/ionic/backend/getSesiones.php?id='+id)
}
}