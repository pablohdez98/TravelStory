import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'portal.page.html',
  styleUrls: ['portal.page.scss'],
})
export class PortalPage {
  public currentTab: string;
  constructor() {}
  changeTab(tabs) {
    this.currentTab = tabs.getSelected();
  }
}
