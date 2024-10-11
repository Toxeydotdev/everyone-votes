import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrivatePollComponent } from './create-private-poll.component';

describe('CreatePrivatePollComponent', () => {
  let component: CreatePrivatePollComponent;
  let fixture: ComponentFixture<CreatePrivatePollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePrivatePollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePrivatePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
