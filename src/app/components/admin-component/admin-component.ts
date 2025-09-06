import { ChangeDetectionStrategy, Component } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-admin-component',
  imports: [],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  
}