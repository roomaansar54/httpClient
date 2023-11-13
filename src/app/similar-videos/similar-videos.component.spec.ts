import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarVideosComponent } from './similar-videos.component';

describe('SimilarVideosComponent', () => {
  let component: SimilarVideosComponent;
  let fixture: ComponentFixture<SimilarVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarVideosComponent]
    });
    fixture = TestBed.createComponent(SimilarVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
