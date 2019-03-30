import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesComponent } from './repositories/repositories.component';

const ROUTES: Routes = [
  {
    path: '',
    component: RepositoriesComponent,
  },
];

@NgModule({
  declarations: [RepositoriesComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class RepositorySearch {}
