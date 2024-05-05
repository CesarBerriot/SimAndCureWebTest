import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserInfoComponent } from '../user-info/user-info.component'
import { RouterModule, Router } from '@angular/router';
import { UserListObtentionService } from '../../services/user-list-obtention.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, UserInfoComponent, RouterModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: `./user-list.component.html`,
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit { 
  @ViewChild('userInfo') userInfoComponent: any;
  @ViewChild('paginator') paginator: any;
  showSelectedUserInfo = false;
  fetchedData = null;
  simpleUserList : any[] = [];
  matListDataSource: any = new MatTableDataSource();
  columnIDs: string[] = [
    'thumbnail',
    'firstname',
    'lastname',
    'email',
  ];
  columnLabels: string[] = [
    'Picture',
    'First Name',
    'Last Name',
    'E-Mail Address',
  ];
  constructor(public router: Router, private userListObtentionService: UserListObtentionService, private changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.userListObtentionService.ObtainUserList((result: any) => {
      this.fetchedData = result;
      this.changeDetectorRef.detectChanges();
      this.refreshSimpleUserList();
      this.refreshMatListDataSource();
      this.changeDetectorRef.detectChanges();
    })
  }
  rowClicked(user: any) {
    if(this.fetchedData == null)
      return;
    this.userInfoComponent.setDisplayedUserInfo(this.fetchedData['userList'][this.simpleUserList.indexOf(user)]);
    this.showSelectedUserInfo = true;
    this.changeDetectorRef.detectChanges();
  }
  selectedPageChanged(event: PageEvent) {
    this.changeDetectorRef.detectChanges();
    this.refreshMatListDataSource();
    this.changeDetectorRef.detectChanges();
  }
  refreshSimpleUserList() {
    if(this.fetchedData == null) {
      console.error("user list mat list data source refresh called prior to server data fetch");
      return;
    }
    this.simpleUserList = [];
    for (let i = 0; i < this.fetchedData['userList']['length']; i++)
      this.simpleUserList.push({
      thumbnail: this.fetchedData['userList'][i]['pictures']['thumbnail'],
      firstname: this.fetchedData['userList'][i]['name']['first'],
      lastname: this.fetchedData['userList'][i]['name']['last'],
      email: this.fetchedData['userList'][i]['email'],
    });
  }
  refreshMatListDataSource() {
    let firstPageItemIndex = this.paginator.pageIndex * 5;
    let lastPageItemIndex = firstPageItemIndex + 5;
    this.matListDataSource = new MatTableDataSource(this.simpleUserList.slice(firstPageItemIndex, lastPageItemIndex));
  }
}
