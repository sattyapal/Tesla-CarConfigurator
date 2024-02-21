import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Model, ModelList } from '../models/models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModelsService } from '../models/models.service';
import { Observable, Subject, catchError, of } from 'rxjs';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {
@Input()showStep1Component:boolean=false;
modelSelect:ModelList={colors:[],code:'',description:''};
colorSelect:Model={code:'',description:'',price:0};
optionsSelected=false;
imageUrl?:HTMLImageElement//SafeUrl={};
@Output() isStep2buttonDisable=new EventEmitter<boolean>();
selectedChoice?:boolean;
mainModel={
  code:'',description:''
};
colorModel={
  code:'',description:''
};
@Output() informStep2=new EventEmitter();
image?:Blob;
checkColor?:Model[];
constructor(private modelService:ModelsService,private sanitizer:DomSanitizer){}
error$=new Subject<string>();
models$=this.modelService.getModels$.pipe(
  catchError((err)=>{
    this.error$.next(err.message);
    return of([]);
  }));
  onOptionsSelected(modelSelect:ModelList){
    this.mainModel.description=modelSelect.description;
    this.modelSelect=modelSelect;
    this.filterSubByCode(modelSelect.description).forEach((item) => this.checkColor=item);

      
  this.modelService.modelListValue.next(this.modelSelect);
  this.modelService.colorValue.next({code:'',description:'',price:0});
  this.selectedChoice=true;
  this.imageUrl=new Image();
  }
  filterSubByCode(description:string):Observable<Model[]|undefined>{
    return this.modelService.getModelsByCode(description);
  }
  onColorSelected(colorModel:Model){
    this.colorModel.description=this.colorSelect.description;
    this.optionsSelected=true;
    this.loadImageUrl();
    this.informStep2.emit(true);
    this.modelService.modelCodeValue.next(this.modelSelect.code);
    this.modelService.colorValue.next(this.colorSelect);
    this.isStep2buttonDisable.emit(false);
  }
  loadImageUrl(){
    //this.imageUrl=this.modelService.loadImageHttp(this.modelSelect.code,this.colorSelect.code).subscribe((i)=>{
     // this.image=i;
     // this.imageUrl=this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image));
   // });
   this.imageUrl=this.modelService.loadImageHttp(this.modelSelect.code,this.colorSelect.code);
   this.modelService.imageUrl.next(this.imageUrl);
  }
}
