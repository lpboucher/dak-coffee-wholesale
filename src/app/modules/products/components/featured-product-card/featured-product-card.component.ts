import { Component, Input } from "@angular/core";
import { ModalService } from "@core/views/modal.service";

import { Product } from "@shared/models/classes/product.class";
import { GetNotifiedConfirmationModalComponent } from "@modules/products/components/get-notified-confirmation-modal/get-notified-confirmation-modal.component";

@Component({
    selector: "app-featured-product-card",
    templateUrl: "./featured-product-card.component.html",
    styleUrls: ["./featured-product-card.component.scss"]
})
export class FeaturedProductCardComponent {
    @Input() product!: Product;

    constructor(private modalService: ModalService<GetNotifiedConfirmationModalComponent>) { }

    async showModal(): Promise<void> {
        this.modalService.open(GetNotifiedConfirmationModalComponent);
    }
}
