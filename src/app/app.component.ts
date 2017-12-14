import { Component, ChangeDetectorRef, ViewChildren, AfterContentInit, AfterViewInit, QueryList } from '@angular/core';

import { SimpleAlertViewComponent } from 'app/simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {

  public isAddTimerVisible:boolean = false;
  public time:number = 0;
  public timers: Array<number> = [];

  @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;


  constructor( private cdRef:ChangeDetectorRef) { 
    this.timers = [2, 9, 185];
  }

  ngAfterViewInit() {
    this.alerts.forEach(item => {
      if(!item.title){
        item.title = "Johab";
        item.message = "Aprende";
      }
 
    });
    this.cdRef.detectChanges();
  }
  ngAfterContentInit() {
    
  }

  logCountdownEnd() {
    console.log("Finish");
  }

  public showAddTimer(){
    this.isAddTimerVisible = true;
  }

  public hideAddTimer(){
    this.isAddTimerVisible = false;
  }

  public submitAddTimer(){
this.timers.push(this.time);
    this.hideAddTimer();
  }

  public showEndTimerAlert(){
    this.alerts.first.show();
  }



}
