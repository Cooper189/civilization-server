import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBuildindsComponent } from './list-of-buildinds.component';

describe('ListOfBuildindsComponent', () => {
  let component: ListOfBuildindsComponent;
  let fixture: ComponentFixture<ListOfBuildindsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfBuildindsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBuildindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
