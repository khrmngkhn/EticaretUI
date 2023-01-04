import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['name', 'stock', 'price','createdDate','updatedDate','edit','delete'];
  dataSource:MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;


 
//new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  constructor(spinner:NgxSpinnerService, private productService:ProductService,private alertifyService:AlertifyService) {
    super(spinner);
  }

  async getProducts(){
    this.showSpinner(SpinnerType.SquareJjellyBox);
    const allProducts:{totalCount:number;products:ListProduct[]}= await this.productService.read(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,()=>this.hideSpinner(SpinnerType.SquareJjellyBox),errorMessage=>this.alertifyService.messagge("Hata",{dismissOthers:true,messageType:MessageType.Error,position:Position.BottomRight}))

    this.dataSource=new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length=allProducts.totalCount;

  }

 async ngOnInit() {
   await this.getProducts();
  }

  async pageChange(){
    await this.getProducts();
  }

  // delete(id,event){
  //   const img:HTMLImageElement=event.srcElement;
  //   $(img.parentElement.parentElement).fadeOut(500);

  // }


}
