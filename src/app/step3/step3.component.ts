import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Config, ConfigList } from '../configs/configs';
import { Model, ModelList } from '../models/models';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit{
  @Input()configList:ConfigList={configs:[],towHitch:false,yoke:false};
  @Input()modelList:ModelList={colors:[],code:'',description:''};
  @Input()showStep3Component:boolean=false;
  @Input()color:Model={code:'',description:'',price:0};
  @Input()config:Config={id:0,description:'',price:0,range:0,speed:0};
  @Input() imageUrl?:HTMLImageElement;//SafeUrl={};
  @Input()includeTow:boolean=false;
  @Input()includeYoke:boolean=false;
  priceTowHitch:number=0;
  priceYoke:number=0;
  

  total:number=0;
  constructor(private router:Router){}
  ngOnInit(): void {
    this.priceYoke=this.configList.yoke?1000:0;
    this.priceTowHitch=this.configList.towHitch?1000:0;
  }
  calcTotal(priceTowHitch:number,priceYoke:number,configPrice:number,colorPrice:number):number{
    return priceTowHitch+priceYoke+configPrice+colorPrice;
  }
  
}
