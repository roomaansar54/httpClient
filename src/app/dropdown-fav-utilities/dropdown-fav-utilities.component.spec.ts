import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFavUtilitiesComponent } from './dropdown-fav-utilities.component';

describe('DropdownFavUtilitiesComponent', () => {
  let component: DropdownFavUtilitiesComponent;
  let fixture: ComponentFixture<DropdownFavUtilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownFavUtilitiesComponent]
    });
    fixture = TestBed.createComponent(DropdownFavUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
