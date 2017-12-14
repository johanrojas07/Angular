import { TabComponent } from './../tab/tab.component';
import { Tab } from './../tab/tab.interface';
import { Component, AfterContentInit, OnInit, ContentChildren, QueryList, OnDestroy} from '@angular/core';



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy, AfterContentInit{

  @ContentChildren(TabComponent) public tabs:QueryList<TabComponent>;
  private tabClickSubscriptions:any[] = [];

  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy() {
    if(this.tabClickSubscriptions){
    this.tabClickSubscriptions.forEach(
      item=> item.unsubscribe());
    }   
  }

  ngAfterContentInit(){
    console.log(this.tabs);
    this.tabs.forEach(tab=>{
      let subscription = tab.onClick.subscribe(()=>{
        console.log(`tab ${tab.title} content clicked`);
         });
         this.tabClickSubscriptions.push(subscription);
    });
    this.selectTab(this.tabs.first);
  }
  


  selectTab(tab:Tab) {
    this.tabs.forEach(tab => tab.isActive = false);
    tab.isActive = true;
  }  

}
