import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }
  message(message:string, title:string,toastrOption:Partial<ToastrOption>){
    this.toastr[toastrOption.messageType](message,title,{
      positionClass:toastrOption.position
    });

  }
}

export class ToastrOption{
  messageType:ToastrMessageType;
  position:ToastrPosition
}

export enum ToastrMessageType{
  Success="success",
  Error="error",
  Info="info",
  Warning="warning"


}

export enum ToastrPosition{
TopRight="toast-top-right",
BottomRight="toast-bottom-right",
BottomLeft="toast-bottom-right",
TopLeft="toast-top-left",
TopFullWidth="top-full-width",
BottomFullWidth="toast-bottom-full-width",
TopCenter="toast-top-center",
BottomCenter="toast-bottom-center",

}
