import { Component, ElementRef, ViewChild, 
  AfterContentInit, AfterViewInit, Renderer2,
ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

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
  public simpleAlert: ComponentRef<SimpleAlertViewComponent> = null;


  @ViewChild("timerInput") timeInput: ElementRef;
  @ViewChild("alert", {read:ViewContainerRef}) alertContainer: ViewContainerRef;


  constructor(private renderer:Renderer2,
  private resolver: ComponentFactoryResolver) { 
    this.timers = [2, 9, 185];
  }

  ngAfterViewInit() {
    console.log (this.timeInput);

    this.renderer.setAttribute(this.timeInput.nativeElement,
    "placeholder", "Enter seconds");

    this.renderer.addClass(this.timeInput.nativeElement,
      "time-in"); 
  }
  ngAfterContentInit() {
    const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
    this.simpleAlert = this.alertContainer.createComponent(alertFactory);
  }

  logCountdownEnd() {
    console.log("Finish");
  }

  public showAddTimer(){

    this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
    this.isAddTimerVisible = true;
    setTimeout(()=>{
      this.timeInput.nativeElement.focus();
    });
    
  }

  public hideAddTimer(){
    this.isAddTimerVisible = false;
  }

  public submitAddTimer(){
this.timers.push(this.time);
    this.hideAddTimer();
  }

  public showEndTimerAlert(){
    this.simpleAlert.instance.show();
  }



}
