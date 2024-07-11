import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Nuevo Paciente', url: '/registro', icon: 'bag-add' },
    { title: 'Pacientes', url: '/pacientes', icon: 'body' },
    { title: 'Consultar Pagos', url: '/payment', icon: 'wallet' },
    { title: 'Seguimiento', url: '/seguimiento', icon: 'calendar-number' },
    { title: 'Estadísticas', url: '/estadistica', icon: 'trending-up' },
    { title: 'Análisis de Datos', url: '/datos', icon: 'bar-chart' },
    { title: 'Dashboard', url: '/dash', icon: 'analytics' },
    { title: 'Expendientes', url: '/expedientes', icon: 'folder' },
    { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
