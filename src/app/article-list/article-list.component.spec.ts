import {async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListComponent } from './article-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ArticlesService } from '../articles.service';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let articlesService: ArticlesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleListComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        ArticlesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    articlesService = TestBed.get(ArticlesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show articles', () => {
    spyOnProperty(component, 'articles').and.returnValue([
      { title: 'title 1', text: 'text 1', id: 1 },
      { title: 'title 2', text: 'text 2', id: 2 }
    ]);
    fixture.detectChanges();
    const articles = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(articles.length).toEqual(2);
    articles.forEach((a, idx) => {
      expect(a.nativeElement.textContent).toContain(idx + 1);
    });
  });

  it('should show a spinner when needed', () => {
    const spy = spyOnProperty(component, 'isLoading').and.returnValue(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.fa-spinner'))).toBeFalsy();

    spy.and.returnValue(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.fa-spinner'))).toBeTruthy();
  });

  it('should display a new article alert', () => {
    const spy = spyOnProperty(component, 'hasNewArticle').and.returnValue(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.alert-success'))).toBeFalsy();

    spy.and.returnValue(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.alert-success'))).toBeTruthy();
  });

  it('should call removeArticle method of articles service to remove an article', () => {
    const spy = spyOn(articlesService, 'removeArticle');
    component.removeArticle(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
