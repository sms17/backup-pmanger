// Define imports starts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { User } from '../../user';
import { UserService } from '../../user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let comp: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [{ provide: UserService }]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(UserComponent);
      comp = fixture.componentInstance; // UserComponent test instance
      fixture.detectChanges();
  });
  }));

   it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have one user`, async(() => {
    expect(comp.userList.length).toEqual(1);
  }));
  

});
