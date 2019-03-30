import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from '../repositories/repository.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoriesApiService {
  constructor(private httpClient: HttpClient) {}

  getRepositories(repositoriesQueryParams: RepositoriesQueryParams): Observable<Repository[]> {
    const url = `https://api.github.com/search/repositories${parseToStringQuery(
      repositoriesQueryParams,
    )}`;
    return this.httpClient
      .get<RepositoriesResponse>(url)
      .pipe(map(response => mapToViewRepositories(response.items)));
  }
}

function parseToStringQuery(query: RepositoriesQueryParams): string {
  return query
    .replace(/ +(?= )/g, '')
    .split(' ')
    .reduce((prev, key) => `${prev}${key}+`, `?q=`);
}

function mapToViewRepositories(results: Items[]): Repository[] {
  return results.map(({ name }) => {
    return {
      name,
    };
  });
}

export type RepositoriesQueryParams = string;

interface RepositoriesResponse {
  items: Items[];
}

interface Items {
  name: string;
}
