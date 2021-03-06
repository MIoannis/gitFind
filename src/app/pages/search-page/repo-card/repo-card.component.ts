import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoCardComponent {
  @Input() card: any;
}
