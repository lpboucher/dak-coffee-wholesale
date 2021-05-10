import { Component, OnInit } from '@angular/core';

import { ProductService } from '@app/core/products/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    constructor(productService: ProductService ) { }

    ngOnInit(): void {
    }

}
