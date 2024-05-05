import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-single-info',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './single-info.component.html',
  styleUrl: './single-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleInfoComponent {
  @Input() color: any;
  @Input() title: any;
  @Input() text: any;
 }
