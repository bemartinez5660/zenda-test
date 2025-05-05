import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersFooterComponent } from './characters-footer.component';

describe('CharactersFooterComponent', () => {
  let component: CharactersFooterComponent;
  let fixture: ComponentFixture<CharactersFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
