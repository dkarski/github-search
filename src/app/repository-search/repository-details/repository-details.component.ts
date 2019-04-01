import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RepositoryDetailsService } from './repository-details.service';
import { RepositoryDetails } from './repository-details.model';
import { Contributor } from './contributor.model';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss'],
})
export class RepositoryDetailsComponent implements OnInit {
  repositoryDetailsLoading = true;
  repositoryDetails$: Observable<
    RepositoryDetails
  > = this.repositoryDetailsService.repositoryDetails$.pipe(
    tap(() => (this.repositoryDetailsLoading = false)),
    tap(({ name }) => this.title.setTitle(name)),
  );
  contributors$: Observable<Contributor[]> = this.repositoryDetailsService.contributors$;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private location: Location,
    private repositoryDetailsService: RepositoryDetailsService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.repositoryDetailsService.fetchRepositoryDetailsViewData(params.fullName),
    );
  }

  onBackClick() {
    this.location.back();
  }
}
