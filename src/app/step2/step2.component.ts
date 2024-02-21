import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Config, ConfigList } from '../configs/configs';
import { ModelsService } from '../models/models.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
@Input() showStep2Component:boolean=false;
configSelect:Config={id:0,description:'',price:0,range:0,speed:0};
modelCode:string='';
@Input()configList:ConfigList={configs:[],towHitch:false,yoke:false};
@Output() informStep3=new EventEmitter();
@Input() imageUrl?:HTMLImageElement;
constructor ( private route:Router,private modelService:ModelsService){}
onSelect(config:Config){
  this.modelService.configValue.next(this.configSelect);
  this.informStep3.emit(true);
}
}
