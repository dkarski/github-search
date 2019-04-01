import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contributor } from '../repository-details/contributor.model';

@Injectable({
  providedIn: 'root',
})
export class ContributorsService {
  constructor(private httpClient: HttpClient) {}

  getContributors(fullName: string): Observable<Contributor[]> {
    const url = `https://api.github.com/repos/${fullName}/contributors`;
    return this.httpClient
      .get<ContributorResponse[]>(url)
      .pipe(map(response => mapToViewContributors(response)));
  }
}

function mapToViewContributors(contributors: ContributorResponse[]): Contributor[] {
  return contributors.map(({ login, avatar_url }) => {
    return {
      login,
      avatarUrl: avatar_url,
    };
  });
}

interface ContributorResponse {
  login: string;
  avatar_url: string;
}
