import {Component} from '@angular/core';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Config, ConfigList } from './configs/configs';
import { ModelsService } from './models/models.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Model, ModelList } from './models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl:'./app.component.html',
  styleUrl:'./app.component.scss',
  imports: [AsyncPipe, JsonPipe,Step1Component,Step2Component,Step3Component,CommonModule,RouterLink,RouterModule],
  providers:[HttpClientModule]
})
export class AppComponent {
 name = 'Angular';
  constructor(private modelService:ModelsService,private sanitizer:DomSanitizer){}
modelCode:string='';
configList:ConfigList={configs:[],towHitch:false,yoke:false};
image?:HTMLImageElement//SafeUrl={};
buttonClicked:string='';
color:Model={code:'',description:'',price:0};
modelList:ModelList={colors:[],code:'',description:''};
config:Config={id:0,description:'',price:0,range:0,speed:0};
dispalyStep1Component:boolean=false;
dispalyStep2Component:boolean=false;
dispalyStep3Component:boolean=false;
isStep2ButtonDisable:boolean=true;
isStep3ButtonDisable:boolean=true;
onStep1BtnClick(){
  this.dispalyStep1Component=true;
this.dispalyStep2Component=false;
this.dispalyStep3Component=false;
this.buttonClicked='step1';
}
onStep2BtnClick(){
  this.dispalyStep1Component=false;
  this.dispalyStep2Component=true;
  this.dispalyStep3Component=false;
  this.modelService.modelCodeValue.subscribe((data)=>{
this.modelCode=data;
  });
  if(this.buttonClicked=='step1'){
  this.configList=this.modelService.step2Renderer(this.modelCode);
  this.isStep3ButtonDisable=true;
  }
  this.modelService.configValue.subscribe((data)=>{
    this.config=data;
  });
  this.modelService.imageUrl.subscribe((data)=>{
    this.image=data;
  });
  this.buttonClicked='step2';
}
  isStep2Enabled() {
    this.isStep2ButtonDisable=false;
  }
  isStep3Enabled(){
    this.isStep3ButtonDisable=false;
  }
  setStep2ButtonEnabled(event:any){
    this.isStep2ButtonDisable=event.value;
    console.log("isStep2ButtonDisable="+event.value);
    
  }
onStep3BtnClick(){
  this.dispalyStep3Component=true;
  this.dispalyStep1Component=false;
  this.dispalyStep2Component=false;
  this.buttonClicked='step3';
  this.modelService.colorValue.subscribe((data)=>{
    if(data.description!=null){
      this.color=data;
    }else{
      this.color={code:'',description: '',price:0};
    }
    
  });

  this.modelService.modelListValue.subscribe((data)=>{
    this.modelList=data;
  });
  this.modelService.configValue.subscribe((data)=>{
    if(data.description!=null){
    this.config=data;
  }else{
    this.config={id:0,description:'',price:0,range:0,speed:0};
  }

  });
  this.modelService.imageUrl.subscribe((data)=>{
    this.image=data;
    //this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
  });
}
  }

 