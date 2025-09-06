import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-component',
  imports: [],
  templateUrl: './user-component.html',
  styleUrl: './user-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {

}
