import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { GithubApiService } from '../../services/github-api.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-repo-page',
  templateUrl: './repo-page.component.html',
  styleUrls: ['./repo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoPageComponent implements OnInit, OnDestroy {
  repo$: BehaviorSubject<any>;

  constructor(
    private githubApiService: GithubApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.repo$ = githubApiService.repo$;
  }

  ngOnInit(): void {
    this.githubApiService.getRepo({
      owner: this.activatedRoute.snapshot.params.login,
      repo: this.activatedRoute.snapshot.params.name
    })
      .subscribe(value => {
        console.log(value);
        this.repo$.next(value)
      })
  }

  ngOnDestroy(): void {
    this.repo$.next(null);
  }
}
