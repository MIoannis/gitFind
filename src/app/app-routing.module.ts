import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/search-page/search-page.module')
      .then(m => m.SearchPageModule)
  },
  {
    path: 'repo',
    loadChildren: () => import('./pages/repo-page/repo-page.module')
      .then(m => m.RepoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
