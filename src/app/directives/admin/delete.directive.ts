import { Directive, ElementRef, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  @Output() outputData: EventEmitter<any> = new EventEmitter();
  @Input() controller: string;

  constructor
    (
      private element: ElementRef,
      private _renderer: Renderer2,
      private httpClientService: HttpClientService,
      private spinner: NgxSpinnerService,
      public dialog: MatDialog,
      private alertifyService:AlertifyService
    ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "assets/delete.png");
    img.setAttribute("style", "pointer");
    // img.width=30;
    // img.height=30;
    _renderer.appendChild(element.nativeElement, img);
  }

  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.SquareJjellyBox);
      const td = HTMLTableCellElement = this.element.nativeElement;

      this.httpClientService.delete({ controller: this.controller }, td.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle"
        }, 700, () => {
          this.outputData.emit();
          this.alertifyService.messagge(
            "Ürün başarıyla silinmiştir",
            {
              dismissOthers:true,
              messageType:MessageType.Success,
              position:Position.BottomRight
          });
        });
      },(errorResponse:HttpErrorResponse)=>{
        this.spinner.hide(SpinnerType.SquareJjellyBox);
        this.alertifyService.messagge(
          "Bir hata olutu. Lütfen daha sonra tekrar deneyiniz",
          {dismissOthers:true,
            messageType:MessageType.Error,
            position:Position.BottomRight
        });

      });


    });


  }
  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}

