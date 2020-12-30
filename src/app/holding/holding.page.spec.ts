import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HoldingPage } from './holding.page';

describe('HoldingPage', () => {
  let component: HoldingPage;
  let fixture: ComponentFixture<HoldingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HoldingPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HoldingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
