import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FundPage } from './fund.page';

describe('FundPage', () => {
  let component: FundPage;
  let fixture: ComponentFixture<FundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
