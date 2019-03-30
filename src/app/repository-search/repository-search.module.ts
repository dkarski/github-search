import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { RepositoriesComponent } from './repositories/repositories.component';

const ROUTES: Routes = [
  {
    path: '',
    component: RepositoriesComponent,
  },
];

@NgModule({
  declarations: [RepositoriesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RepositorySearch {}
