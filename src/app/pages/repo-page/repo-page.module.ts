import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoPageComponent } from './repo-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TimePipeModule } from '../../components/pipes/time-pipe.module';

const routes: Routes = [
  { path: ':login/:name', component: RepoPageComponent }
];

@NgModule({
  declarations: [RepoPageComponent],
  imports: [
    CommonModule,
    TimePipeModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class RepoPageModule { }
