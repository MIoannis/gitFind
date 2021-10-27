import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubApiService } from '../../../services/github-api.service';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit {
  page$: BehaviorSubject<any>;
  componentDestroyed$ = new Subject();
  form = new FormGroup({
    search: new FormControl(''),
    order: new FormControl(''),
    sort: new FormControl('')
  });

  isLoading$ = new BehaviorSubject(false);

  sortItems = [
    {
      value: 'stars',
      viewValue: 'Stars'
    },
    {
      value: 'forks',
      viewValue: 'Forks'
    },
    {
      value: 'help-wanted-issues',
      viewValue: 'Help wanted issue'
    },
    {
      value: 'updated',
      viewValue: 'Updated'
    },
  ]
  orderItems = [
    {
      value: 'asc',
      viewValue: 'ASC'
    },
    {
      value: 'desc',
      viewValue: 'DESC'
    }
  ]

  constructor(private githubApiService: GithubApiService) {
    this.page$ = githubApiService.page$;
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.componentDestroyed$),
      debounceTime(300)
    )
      .subscribe(
        value => {
          this.isLoading$.next(true);

          const params = {
            q: value.search,
            sort: value.sort,
            order: value.order,
            page: 1,
            per_page: 30
          }
          this.githubApiService.getRepos(params)
            .pipe(finalize(() => this.isLoading$.next(false)))
            .subscribe(response => this.page$.next(response));
        }
      )
  }

  changePage(pagination: any): void {
    const formValue = this.form.value;
    const params = {
      q: formValue.search,
      sort: formValue.sort,
      order: formValue.order,
      page: pagination.pageIndex,
      per_page: pagination.pageSize
    }

    this.isLoading$.next(true);

    this.githubApiService.getRepos(params)
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe(response => this.page$.next(response));
  }

  reset(): void {
    this.form.reset({}, { emitEvent: false });
  }
}
