import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {

  private _form: FormGroup;
  private _isLoading = false;

  constructor(
    private _router: Router,
    private _articlesService: ArticlesService,
    private _formBuilderService: FormBuilder,
  ) { }

  ngOnInit() {
    this._form = this._formBuilderService.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    console.log('submitted');
    this._isLoading = true;
    this._articlesService.createArticle$(this.form.value)
      .subscribe(() => {
        this._router.navigate(['/list'], { queryParams: { new: true } });
      });
  }

  get form(): FormGroup {
    return this._form;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

}
