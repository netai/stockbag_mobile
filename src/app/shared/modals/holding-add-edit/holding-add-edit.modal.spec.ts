import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HoldingAddEditModal } from './holding-add-edit.modal';

describe('HoldingAddEditModal', () => {
  let component: HoldingAddEditModal;
  let fixture: ComponentFixture<HoldingAddEditModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingAddEditModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HoldingAddEditModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
