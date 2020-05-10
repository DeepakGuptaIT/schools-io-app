import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopicListPage } from './topic-list.page';

describe('TopicListPage', () => {
  let component: TopicListPage;
  let fixture: ComponentFixture<TopicListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopicListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
