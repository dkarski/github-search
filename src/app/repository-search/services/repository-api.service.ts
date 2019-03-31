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

function mapToViewRepository({ name }: RepositoryResponse): RepositoryDetails {
  return {
    name,
  };
}

interface RepositoryResponse {
  name: string;
}
