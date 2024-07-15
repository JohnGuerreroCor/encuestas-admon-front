import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligatorioComponent } from './obligatorio.component';

describe('ObligatorioComponent', () => {
  let component: ObligatorioComponent;
  let fixture: ComponentFixture<ObligatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObligatorioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObligatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
