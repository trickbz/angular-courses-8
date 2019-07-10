import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleCreateComponent } from './article-create/article-create.component';

const routes: Routes = [
  {
    path: 'list',
    component: ArticleListComponent,
  },
  {
    path: 'create',
    component: ArticleCreateComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
