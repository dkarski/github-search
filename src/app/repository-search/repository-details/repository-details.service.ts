import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/operators';
import { zip } from 'rxjs/internal/observable/zip';
import { RepositoryDetails } from './repository-details.model';
import { Contributor } from './contributor.model';
import { RepositoryApiService } from '../services/repository-api.service';
import { ContributorsService } from '../services/contributors.service';

@Injectable({
  providedIn: 'root',
})
export class RepositoryDetailsService {
  repositoryDetails$: Subject<RepositoryDetails> = new Subject();
  contributors$: Subject<Contributor[]> = new Subject();

  constructor(
    private router: Router,
    private repositoryApiService: RepositoryApiService,
    private contributorsService: ContributorsService,
  ) {}

  fetchRepositoryDetailsViewData(fullName: any): void {
    const getRepository$ = this.repositoryApiService.getRepository(fullName);
    const getContributors$ = this.contributorsService.getContributors(fullName);

    zip(getRepository$, getContributors$)
      .pipe(
        tap(([repositoryDetails, contributors]) => {
          this.repositoryDetails$.next(repositoryDetails);
          this.contributors$.next(contributors);
        }),
        catchError(() => this.router.navigate(['./'])),
      )
      .subscribe();
  }
}
