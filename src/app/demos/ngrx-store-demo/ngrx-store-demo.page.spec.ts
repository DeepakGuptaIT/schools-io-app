import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NgrxStoreDemoPage } from './ngrx-store-demo.page';

describe('NgrxStoreDemoPage', () => {
  let component: NgrxStoreDemoPage;
  let fixture: ComponentFixture<NgrxStoreDemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxStoreDemoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NgrxStoreDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
