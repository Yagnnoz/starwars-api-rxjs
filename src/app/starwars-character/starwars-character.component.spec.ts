import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarwarsCharacterComponent } from './starwars-character.component';

describe('StarwarsCharacterComponent', () => {
  let component: StarwarsCharacterComponent;
  let fixture: ComponentFixture<StarwarsCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarwarsCharacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarwarsCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
