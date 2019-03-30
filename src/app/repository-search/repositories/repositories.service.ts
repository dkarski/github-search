import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import {
  RepositoriesApiService,
  RepositoriesQueryParams,
} from '../services/repositories-api.service';
import { Subject } from 'rxjs';
import { Repository } from './repository.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  repositories$: Subject<Repository[]> = new Subject();

  constructor(private repositoriesApiService: RepositoriesApiService) {}

  fetchRepositories(repositoriesQueryParams: RepositoriesQueryParams): void {
    this.repositoriesApiService
      .getRepositories(repositoriesQueryParams)
      .pipe(tap(repositories => this.repositories$.next(repositories)))
      .subscribe();
  }
}
