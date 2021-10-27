import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GithubApiService } from '../../services/github-api.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit {
  page$: BehaviorSubject<any>;

  constructor(private githubApiService: GithubApiService) {
    this.page$ = githubApiService.page$;
  }
  ngOnInit(): void {
    this.githubApiService.page$.subscribe(value => console.log(value))
  }

}
