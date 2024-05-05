import { CommonModule  } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SingleInfoComponent } from './single-info/single-info.component';

export interface UserInfo {
  name: {
    title: string,
    first: string,
    last: string,
  },
  gender: string,
  age: number,
  phone: string,
  email: string,
  pictures: {
    thumbnail: string,
    medium: string,
    large: string,
  },
  location: {
    city: string,
    state: string,
    country: string,
  }
}

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, MatCardModule, SingleInfoComponent],
  templateUrl: `./user-info.component.html`,
  styleUrl: './user-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
  @Input() shown: any; 
  displayedUserInfo: any;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  setDisplayedUserInfo(newInfo: any) {
    this.displayedUserInfo = newInfo;
    this.changeDetectorRef.detectChanges();
  }
 }
