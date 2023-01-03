import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  @Output() createdProduct:EventEmitter<Create_Product>=new EventEmitter();

  constructor(spiner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spiner);
  }

  ngOnInit(): void {
  }

  create(Name: HTMLInputElement, Stock: HTMLInputElement, Price: HTMLInputElement) {
    this.showSpinner(SpinnerType.SquareJjellyBox);
    const create_product: Create_Product = new Create_Product();
    create_product.name = Name.value;
    create_product.stock = parseInt(Stock.value)
    create_product.price = parseFloat(Price.value)

 

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.SquareJjellyBox);
      this.alertify.messagge("Ürün başarıyla eklenmiştir", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.BottomRight
      });
      this.createdProduct.emit(create_product);
    },errorMessage=>{
      this.alertify.messagge(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.BottomRight
      });
    });
  }

}
