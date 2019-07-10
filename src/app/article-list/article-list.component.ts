import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { IArticle } from '../iarticle';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit, OnDestroy {

  private _articles: IArticle[] = [];
  private _isLoading = true;
  private _hasNewArticle = false;
  private _articlesSubscription: Subscription;
  private _queryParamsSubscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _articlesService: ArticlesService,
  ) { }

  ngOnInit() {
    this._queryParamsSubscription = this._activatedRoute.queryParams
      .subscribe((queryParams: { [key: string]: string }) => {
        this._hasNewArticle = !!queryParams.new;
      });

    this._articlesSubscription = this._articlesService.articles$
      .subscribe((articles: IArticle[]) => {
        this._isLoading = false;

        this._articles = articles;
      });
  }

  ngOnDestroy(): void {
    this._articlesSubscription.unsubscribe();
    this._queryParamsSubscription.unsubscribe();
  }

  removeArticle(id: number): void {
    this._isLoading = true;

    this._articlesService.removeArticle(id);
  }

  get articles(): IArticle[] {
    return this._articles;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get hasNewArticle(): boolean {
    return this._hasNewArticle;
  }

}
