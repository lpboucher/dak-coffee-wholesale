import { Component, Input } from "@angular/core";
import { ImageService } from "@core/views/image.service";
import { ModalService } from "@core/views/modal.service";

import { Product } from "@shared/models/classes/product.class";
import { NotificationModalComponent } from "@app/modules/products/components/notification-modal/notification-modal.component";

@Component({
    selector: "app-featured-product-card",
    templateUrl: "./featured-product-card.component.html",
    styleUrls: ["./featured-product-card.component.scss"]
})
export class FeaturedProductCardComponent {
    @Input() product!: Product;

    get imageUrl(): string {
        if (this.product.images.thumb == null) { return ""; }
        return this.imageService.getProductThumbUrl(this.product.images.thumb);
    }

    constructor(
        private imageService: ImageService,
        private modalService: ModalService<NotificationModalComponent>,
    ) { }

    async onGetNotifiedClicked(): Promise<void> {
        this.modalService.open(NotificationModalComponent);
    }
}
