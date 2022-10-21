import { Injectable } from '@angular/core';
declare var alertify: any


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }

  // messagge(message: string, messaggeType: MessageType, position: Position,delay:number=3,dismissOthers:boolean=false)
   messagge(message: string, options:Partial<AlertifyOptions>)
   {
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    const msg=alertify[options.messageType](message);

    if(options.dismissOthers)
    msg.dismissOthers();
  }

  dismis(){
    alertify.dismissAll();
  }
}
export class AlertifyOptions{
  messageType: MessageType = MessageType.Notify;
  position: Position = Position.BottomRight;
  delay:number=10;
  dismissOthers: boolean = false;

}

export enum MessageType {
  Error = "error",
  Message = "message",
  Success = "success",
  Warning = "warning",
  Notify = "notify"
}



export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center"
}
