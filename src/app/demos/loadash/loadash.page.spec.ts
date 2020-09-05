import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadashPage } from './loadash.page';

describe('LoadashPage', () => {
  let component: LoadashPage;
  let fixture: ComponentFixture<LoadashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
