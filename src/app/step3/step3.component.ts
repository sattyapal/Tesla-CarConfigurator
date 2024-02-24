import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Config, ConfigList } from '../configs/configs';
import { Model, ModelList } from '../models/models';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModelsService } from '../models/models.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit,OnChanges{
  @Input()configList:ConfigList={configs:[],towHitch:false,yoke:false};
  @Input()modelList:ModelList={colors:[],code:'',description:''};
  @Input()showStep3Component:boolean=false;
  @Input()color:Model={code:'',description:'',price:0};
  @Input()config:Config={id:0,description:'',price:0,range:0,speed:0};
  @Input() imageUrl?:HTMLImageElement;//SafeUrl={};
  includeTow:boolean=false;
  includeYoke:boolean=false;
  priceTowHitch:number=0;
  priceYoke:number=0;
  totalCost:number=0;
 
  total:number=0;
  constructor(private router:Router,private modelService:ModelsService){}
  ngOnInit(): void {
    //this.priceYoke=this.configList.yoke?1000:0;
    //this.priceTowHitch=this.configList.towHitch?1000:0;
  }
  ngOnChanges(){
    this.includeYoke=this.getIncludeYokeValue();
    this.includeTow=this.getIncludeTowValue();
    this.priceYoke=this.includeYoke?1000:0;
    this.priceTowHitch=this.includeTow?1000:0;
  } 
  /*calcTotal(priceTowHitch:number,priceYoke:number,configPrice:number,colorPrice:number):number{

    return (this.priceTowHitch+this.priceYoke+configPrice+colorPrice);
  }*/

  getTotalCost(){
    if(this.includeYoke){
      this.priceYoke=1000;
    }else{
      this.priceYoke=0;
    }
    if(this.includeTow){
      this.priceTowHitch=1000;
    }else{
      this.priceTowHitch=0;
    }
    this.totalCost=Number(this.priceTowHitch)+Number(this.priceYoke)+Number(this.config.price)+Number(this.color.price);
    return this.totalCost;
  }
  getIncludeTowValue(): boolean {
    return this.modelService.includeTow;
  }
  getIncludeYokeValue(): boolean {
    return this.modelService.includeYoke;
  }

}
