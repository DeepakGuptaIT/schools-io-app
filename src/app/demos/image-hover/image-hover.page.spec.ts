import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageHoverPage } from './image-hover.page';

describe('ImageHoverPage', () => {
  let component: ImageHoverPage;
  let fixture: ComponentFixture<ImageHoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageHoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageHoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
