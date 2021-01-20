import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundAddWithdrawModal } from './fund-add-withdraw.modal';

describe('FundAddWithdrawModal', () => {
  let component: FundAddWithdrawModal;
  let fixture: ComponentFixture<FundAddWithdrawModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundAddWithdrawModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundAddWithdrawModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
