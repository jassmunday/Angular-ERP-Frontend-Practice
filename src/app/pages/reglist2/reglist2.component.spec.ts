import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reglist2Component } from './reglist2.component';

describe('Reglist2Component', () => {
  let component: Reglist2Component;
  let fixture: ComponentFixture<Reglist2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reglist2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reglist2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
