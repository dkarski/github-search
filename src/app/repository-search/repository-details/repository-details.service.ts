import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/operators';
import { RepositoryDetails } from './repository-details.model';
import { RepositoryApiService } from '../services/repository-api.service';

@Injectable({
  providedIn: 'root',
})
export class RepositoryDetailsService {
  repositoryDetails$: Subject<RepositoryDetails> = new Subject();

  constructor(private router: Router, private repositoryApiService: RepositoryApiService) {}

  fetchRepositoryDetailsViewData(fullName: any): void {
    this.repositoryApiService
      .getRepository(fullName)
      .pipe(
        tap(beerDetails => this.repositoryDetails$.next(beerDetails)),
        catchError(() => this.router.navigate(['./'])),
      )
      .subscribe();
  }
}
