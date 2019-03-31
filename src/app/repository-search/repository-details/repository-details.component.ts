import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RepositoryDetailsService } from './repository-details.service';
import { RepositoryDetails } from './repository-details.model';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss'],
})
export class RepositoryDetailsComponent implements OnInit {
  repositoryDetails$: Observable<
    RepositoryDetails
  > = this.repositoryDetailsService.repositoryDetails$.pipe(
    tap(repositories => console.log(repositories)),
  );

  constructor(
    private route: ActivatedRoute,
    private repositoryDetailsService: RepositoryDetailsService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.repositoryDetailsService.fetchRepositoryDetailsViewData(params.fullName),
    );
  }
}
