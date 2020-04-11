import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicAnimationPage } from './ionic-animation.page';

describe('IonicAnimationPage', () => {
  let component: IonicAnimationPage;
  let fixture: ComponentFixture<IonicAnimationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicAnimationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicAnimationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
