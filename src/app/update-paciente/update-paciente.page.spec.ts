import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePacientePage } from './update-paciente.page';

describe('UpdatePacientePage', () => {
  let component: UpdatePacientePage;
  let fixture: ComponentFixture<UpdatePacientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
