import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  page$ = new BehaviorSubject<any>(null);
  repo$ = new BehaviorSubject(null);

  constructor(private api: ApiService) { }

  getRepos(searchState: any): Observable<any> {
    return this.api.get('search/repositories', searchState)
  }

  getRepo(params: any): Observable<any> {
    return this.api.get(`repos/${params.owner}/${params.repo}`)
  }
}
