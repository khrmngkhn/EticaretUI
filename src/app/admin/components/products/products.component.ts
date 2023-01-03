import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);
   }
   @ViewChild(ListComponent) listComponents:ListComponent
   createdProduct(createdProduct:Create_Product){
    this.listComponents.getProducts();

   }

  ngOnInit(): void {
    // this.showSpinner(SpinnerType.SquareJjellyBox);
    // this.httpClientService.get<Create_Product[]>({
    //   controller:"products"
    // }).subscribe(data=>console.log(data));

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name:"Kalem",
    //   stock:100,
    //   price:15
    // }).subscribe();

    //  this.httpClientService.put({
    //   controller:"products"
    // },{
    //   id:"06609AB0-C68E-4876-9492-08DAED53BE35",
    //   name:"Renkli Kalem",
    //   stock:33,
    //   price:5.5
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller:"products"
    // },"06609AB0-C68E-4876-9492-08DAED53BE35").subscribe();


    // this.httpClientService.get({baseUrl:"https://jsonplaceholder.typicode.com",controller:"posts"}).subscribe(data=>console.log(data))
    //this.httpClientService.get({fullEndPoint:"https://jsonplaceholder.typicode.com/posts"}).subscribe(data=>console.log(data))

  }

}
