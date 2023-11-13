import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlaylistComponent } from './single-playlist.component';

describe('SinglePlaylistComponent', () => {
  let component: SinglePlaylistComponent;
  let fixture: ComponentFixture<SinglePlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePlaylistComponent]
    });
    fixture = TestBed.createComponent(SinglePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
