import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import { ArticleCreateComponent } from './article-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {routes} from '../app-routing.module';
import { ArticleListComponent } from '../article-list/article-list.component';

describe('ArticleCreateComponent', () => {
  let component: ArticleCreateComponent;
  let fixture: ComponentFixture<ArticleCreateComponent>;
  let submitButton: DebugElement;
  let titleInput: DebugElement;
  let textInput: DebugElement;
  let form: DebugElement;
  let spinner: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCreateComponent, ArticleListComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCreateComponent);
    component = fixture.componentInstance;
    submitButton = fixture.debugElement.query(By.css('button'));
    titleInput = fixture.debugElement.query(By.css('input'));
    textInput = fixture.debugElement.query(By.css('textarea'));
    form = fixture.debugElement.query(By.css('form'));
    spinner = fixture.debugElement.query(By.css('.fa-spinner'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit btn should be enabled when form is valid', () => {
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    titleInput.nativeElement.value = 'title input value';
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    textInput.nativeElement.value = 'text input value';
    textInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should navigate list?new=true', fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
    titleInput.nativeElement.value = 'title input value';
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    textInput.nativeElement.value = 'text input value';
    textInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);
    tick(2000);
    expect(location.path()).toEqual('/list?new=true');
  })));

  it('spinner should be shown when articles are being submitting', fakeAsync(() => {
    expect(spinner).toBeFalsy();
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    spinner = fixture.debugElement.query(By.css('.fa-spinner'));
    tick(2000);
    expect(spinner).toBeTruthy();
  }));
});
