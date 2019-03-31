import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepositoryDetails } from '../repository-details/repository-details.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoryApiService {
  constructor(private httpClient: HttpClient) {}

  getRepository(fullName: string): Observable<RepositoryDetails> {
    const url = `https://api.github.com/repos/${fullName}`;
    return this.httpClient
      .get<RepositoryResponse>(url)
      .pipe(map(response => mapToViewRepository(response)));
  }
}

function mapToViewRepository({
  name,
  description,
  forks_count,
  stargazers_count,
  subscribers_count,
  html_url,
  homepage,
  owner,
}: RepositoryResponse): RepositoryDetails {
  return {
    name,
    description,
    forksCount: forks_count,
    stargazersCount: stargazers_count,
    subscribersCount: subscribers_count,
    htmlUrl: html_url,
    homepageUrl: homepage,
    ownerLogin: owner.login,
  };
}

interface RepositoryResponse {
  name: string;
  description: string;
  stargazers_count: number;
  subscribers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string;
  owner: Owner;
}

interface Owner {
  login: string;
}
