import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import { IArticle } from './iarticle';

const delay = 2000;

describe('ArticlesService', () => {
  let articlesService: ArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticlesService
      ]
    });

    articlesService = TestBed.get(ArticlesService);
  });

  it('should be created', () => {
    expect(articlesService).toBeTruthy();
  });

  it('should remove an article', fakeAsync(() => {
    const articleIdToRemove = 1;
    articlesService.removeArticle(articleIdToRemove);
    let foundArticle: IArticle;
    articlesService.articles$.subscribe((data) => {
      foundArticle = data.find(a => a.id === 1);
    });
    tick(delay);
    expect(foundArticle).toBeUndefined();
  }));

  it('should create article', fakeAsync(() => {
    const newArticle: IArticle = {
      title: 'title input value',
      text: 'text input value'
    };

    const expectedArticle: IArticle = {
      ...newArticle
    };

    articlesService.createArticle$(newArticle)
      .subscribe(article => {
        expectedArticle.id = article.id;
        expect(article).toEqual(expectedArticle);
      });

    articlesService.articles$.subscribe(articles => {
      const foundArticle = articles.find(a => a.id === expectedArticle.id);
      expect(foundArticle).toEqual(expectedArticle);
    });
    tick(delay);
  }));

  it('should return articles', fakeAsync(() => {
    const articlesStream = articlesService.articles$;
    articlesStream.subscribe(articles => {
      expect(articles instanceof Array).toBeTruthy();
      expect(articles.length).toBeTruthy();
    });
    tick(delay);
  }));
});
