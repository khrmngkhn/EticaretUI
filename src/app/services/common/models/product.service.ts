import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { ListProduct } from 'src/app/contracts/list-product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallback?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallback();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";

        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message)

      });

  }

  async read(page:number=0,size:number=5,successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{totalCount:number;products:ListProduct[]}> {
    const promiseData: Promise<{totalCount:number;products:ListProduct[]}> = this.httpClientService.get<{totalCount:number;products:ListProduct[]}>({
      controller: "products",
      queryString:`page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d=>successCallBack())
      .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promiseData;
  }
}