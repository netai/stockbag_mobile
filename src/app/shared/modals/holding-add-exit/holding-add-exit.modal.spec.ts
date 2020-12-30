import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HoldingAddExitModal } from './holding-add-exit.modal';

describe('HoldingAddExitModal', () => {
  let component: HoldingAddExitModal;
  let fixture: ComponentFixture<HoldingAddExitModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingAddExitModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HoldingAddExitModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
