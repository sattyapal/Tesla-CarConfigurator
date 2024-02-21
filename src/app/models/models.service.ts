import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ConfigService } from '../configs/config.service';
import { Config, ConfigList } from '../configs/configs';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { Model, ModelList } from './models';
import { worker } from '../../main';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  public  headers = new HttpHeaders();
  configList:ConfigList={configs:[],towHitch:false,yoke:false};
  configs?:Config[];
  @Output()informStep3=new EventEmitter();
  modelCode?:string|undefined;
  colorCode?:string|undefined;
  modelCodeValue:BehaviorSubject<string>=new BehaviorSubject("");
  color:Model={code:'',description:'',price:0};
modelList:ModelList={colors:[],code:'',description:''};
config:Config={id:0,description:'',price:0,range:0,speed:0};
image?:HTMLImageElement//new Blob();
imageUrl:BehaviorSubject<HTMLImageElement |undefined>=new BehaviorSubject(this.image);
colorValue:BehaviorSubject<Model>=new BehaviorSubject(this.color);
modelListValue:BehaviorSubject<ModelList>=new BehaviorSubject(this.modelList);
configValue:BehaviorSubject<Config>=new BehaviorSubject(this.config);
configListValue:BehaviorSubject<ConfigList>=new BehaviorSubject(this.configList);
worker=worker;
id?:number;
  constructor(private http:HttpClient,private configService:ConfigService) { }

getOptions(id:number){
return this.http.get('/options/${id}');

}
getModels$=this.http.get<ModelList[]>('/models').pipe(
  shareReplay(1)
);
getModels(){
  return this.http.get<ModelList[]>('/models');
}
getModelsByCode(description:string):Observable<Model[] | undefined>{
const response=this.getModels().pipe(map(res=>res.filter(items=>items.description==description))).pipe(map(result=>{
  return result.at(0)?.colors;
}));
return response;
}
loadImageHttp(modelCode:string ,colorCode:string):HTMLImageElement{
const url='https://interstate21.com/tesla-app/images/'+modelCode+'/'+colorCode+'.jpg';
    const image=new Image();
    image.src=url;
    return image;
     //this.headers.set('Access-Control-Allow-Origin',"*");
  //return this.http.get('https://interstate21.com/tesla-app/images/'+modelCode+'/'+colorCode+'.jpg',{headers:this.headers,responseType:"blob"});
   // return this.http.get('/assets/images/'+modelCode+'/'+colorCode+'.jpg',{responseType:"blob"});
      
}
getCodeByDescription(modelDesc:String,colorDesc:string){
this.getModels$.pipe(map(res=>res.filter(items=>items.description===modelDesc && 
  items.colors.filter((colorMap)=>colorMap.description===colorDesc)))).pipe(map(result=>{
    this.modelCode=result.at(0)?.code;
  }));
  
  this.getModels$.pipe(map(res=> res.filter(items=>items.description===modelDesc &&
    items.colors.filter((colorMap)=>colorMap.description===colorDesc)))).pipe(map(result=>{
      this.colorCode=result.at(0)?.colors.filter(col=>col.description===colorDesc).at(0)?.code;
      }));
}
step2Renderer(code:string){
  this.configService.getConfigByModelCode(code).subscribe((data)=>{
    this.configList.configs=data.configs;
    this.configList.yoke=data.yoke;
    this.configList.towHitch=data.towHitch;
  });
  return this.configList;
}
}
