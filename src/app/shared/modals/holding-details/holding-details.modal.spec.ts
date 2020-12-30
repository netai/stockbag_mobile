import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HoldingDetailsModal } from './holding-details.modal';

describe('HoldingDetailsModal', () => {
  let component: HoldingDetailsModal;
  let fixture: ComponentFixture<HoldingDetailsModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingDetailsModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HoldingDetailsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
