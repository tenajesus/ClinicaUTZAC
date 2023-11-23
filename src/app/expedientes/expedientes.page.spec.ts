import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedientesPage } from './expedientes.page';

describe('ExpedientesPage', () => {
  let component: ExpedientesPage;
  let fixture: ComponentFixture<ExpedientesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExpedientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
