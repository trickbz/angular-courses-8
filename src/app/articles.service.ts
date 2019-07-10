import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { IArticle } from './iarticle';

let idCounter = 0;

const articles: IArticle[] = [
  {
    id: ++idCounter,
    title: 'The first article',
    text: 'Some text for the first article.',
  },
  {
    id: ++idCounter,
    title: 'The second article',
    text: 'Some text for the second article.',
  },
  {
    id: ++idCounter,
    title: 'The third article',
    text: 'Some text for the third article.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {

  private _articles$ = new BehaviorSubject<IArticle[]>([...articles]);

  constructor() { }

  createArticle$(article: IArticle): Observable<IArticle> {
    article = { ...article, id: ++idCounter };

    articles.push(article);

    this._articles$.next([...articles]);

    return of(article)
      .pipe(
        delay(2000),
      );
  }

  removeArticle(articleId: number): void {
    articles.splice(articles.findIndex(({ id }) => articleId === id), 1);

    this._articles$.next([...articles]);
  }

  get articles$(): Observable<IArticle[]> {
    return this._articles$
      .asObservable()
      .pipe(
        delay(2000),
      );
  }

}
