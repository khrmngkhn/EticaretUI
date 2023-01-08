import { Directive, ElementRef, HostListener, Output, Renderer2 } from '@angular/core';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  @Output() outputData:EventEmitter<any>=new EventEmitter();

  constructor
    (
      private element: ElementRef,
      private _renderer: Renderer2,
      private productService: ProductService,
      private spinner:NgxSpinnerService
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
    this.spinner.show(SpinnerType.SquareJjellyBox);
    const td = HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(td.id);
    $(td.parentElement).fadeOut(500,()=>{
      this.outputData.emit();
    });
  }


}
