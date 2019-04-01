import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material';

import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';

const ROUTES: Routes = [
  {
    path: '',
    component: RepositoriesComponent,
  },
  {
    path: 'details/:fullName',
    component: RepositoryDetailsComponent,
  },
];

@NgModule({
  declarations: [RepositoriesComponent, RepositoryDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    LazyLoadImageModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class RepositorySearch {}
