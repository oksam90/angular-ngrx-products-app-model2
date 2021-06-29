import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Product } from "../model/product.model";

@Injectable({
    providedIn: 'root'
  })
export class ProductService {

    constructor(private http:HttpClient){
    }

    getAllProducts():Observable<Product[]>{
         let host=(Math.random()>0.2)?environment.host:environment.loadhost;
      //let host= environment.host;
        return this.http.get<Product[]>(host+"/products");
    }
    getSelectedProducts():Observable<Product[]>{
        let host=environment.host
        return this.http.get<Product[]>(host+"/products?selected=true");
    }
    getAvailableProducts():Observable<Product[]>{
        let host=environment.host
        return this.http.get<Product[]>(host+"/products?available=true");
    }

    searchProducts(keyword:string):Observable<Product[]>{
      let host=environment.host
      return this.http.get<Product[]>(host+"/products?name_like="+keyword);
    }

    public setSelected(product:Product):Observable<Product>{
      return this.http.put<Product>(environment.host+"/products/"+product.id,{...product,selected:!product.selected});
    }

    deleteProduct(id:number):Observable<void>{
      return this.http.delete<void>(environment.host+"/products/"+id);
    }

    saveProduct(product:Product):Observable<Product>{
      return this.http.post<Product>(environment.host+"/products/",product);
    }

    getProductById(id:number):Observable<Product>{
      return this.http.get<Product>(environment.host+"/products/"+id);
    }

    updateProduct(product:Product):Observable<Product>{
      return this.http.put<Product>(environment.host+"/products/"+product.id,product);
    }
}
