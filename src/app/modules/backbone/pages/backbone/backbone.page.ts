import { Component, OnInit } from "@angular/core";

import { CartService } from "@core/cart/cart.service";

@Component({
    selector: "app-backbone",
    templateUrl: "./backbone.page.html",
    styleUrls: ["./backbone.page.scss"]
})
export class BackbonePageComponent implements OnInit {

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
    }

}
