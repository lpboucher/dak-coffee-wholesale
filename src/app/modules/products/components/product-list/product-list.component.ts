import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Coffee } from '@shared/models/classes/coffee.interface';

import { ProductService } from '@app/core/products/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products$: Observable<Coffee[]> = new Observable();

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.products$ = this.productService.getProducts();
    }

}
