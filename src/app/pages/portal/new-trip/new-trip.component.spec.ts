import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTripComponent } from './new-trip.component';

describe('NewTripComponent', () => {
  let component: NewTripComponent;
  let fixture: ComponentFixture<NewTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTripComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
