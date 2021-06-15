import { Component, Input } from "@angular/core";
import { ModalService } from "@core/views/modal.service";

import { CloudinaryImage } from "@cloudinary/base";

import { Product } from "@shared/models/classes/product.class";
import { GetNotifiedConfirmationModalComponent } from "@modules/products/components/get-notified-confirmation-modal/get-notified-confirmation-modal.component";

@Component({
    selector: "app-featured-product-card",
    templateUrl: "./featured-product-card.component.html",
    styleUrls: ["./featured-product-card.component.scss"]
})
export class FeaturedProductCardComponent {
    @Input() product!: Product;

    get imageUrl(): string {
        const url = `/Products/Thumbs/${ this.product.images.thumb }`;
        const cloudName = { cloudName: "dak-coffee-roasters" };

        return new CloudinaryImage(url, cloudName).toURL();
    }

    constructor(private modalService: ModalService<GetNotifiedConfirmationModalComponent>) { }

    async showModal(): Promise<void> {
        this.modalService.open(GetNotifiedConfirmationModalComponent);
    }
}
