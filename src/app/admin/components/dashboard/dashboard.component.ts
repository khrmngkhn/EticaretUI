import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertify:AlertifyService) { }

  ngOnInit(): void {

  }

  m(){
    this.alertify.messagge("Merhabba",{delay:1,messageType:MessageType.Notify,position:Position.BottomRight,dismissOthers:false})

  }

  d(){
    this.alertify.dismis()
  }

}
