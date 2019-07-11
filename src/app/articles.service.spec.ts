import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import { IArticle } from './iarticle';

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

  it('removeArticle', fakeAsync(() => {
    const articleIdToRemove = 1;
    articlesService.removeArticle(articleIdToRemove);
    let foundArticle: IArticle;
    articlesService.articles$.subscribe((data) => {
      foundArticle = data.find(a => a.id === 1);
    });
    tick(2000);
    expect(foundArticle).toBeUndefined();
  }));

  it('createArticle', fakeAsync(() => {
    const newArticle: IArticle = {
      title: 'New Article',
      text: 'New Article Text'
    };

    const expectedArticle: IArticle = {
      ...newArticle,
      id: 4
    };

    articlesService.createArticle$(newArticle)
      .subscribe(article => {
        expect(article).toEqual(expectedArticle);
      });

    articlesService.articles$.subscribe(articles => {
      const foundArticle = articles.find(a => a.id === expectedArticle.id);
      expect(foundArticle).toEqual(expectedArticle);
    });
    tick(2000);
  }));

  it('articles$', fakeAsync(() => {
    const articlesStream = articlesService.articles$;
    articlesStream.subscribe(articles => {
      expect(articles instanceof Array).toBeTruthy();
    });
    tick(2000);
  }));
});
