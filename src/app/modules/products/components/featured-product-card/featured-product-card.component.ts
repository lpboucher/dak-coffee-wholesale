import { Component, Input } from "@angular/core";
import { ModalService } from "@core/views/modal.service";

import { CloudinaryImage } from "@cloudinary/base";

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
        const url = `/Products/Thumbs/${ this.product.images.thumb }`;
        const cloudName = { cloudName: "dak-coffee-roasters" };

        return new CloudinaryImage(url, cloudName).toURL();
    }

    constructor(private modalService: ModalService<NotificationModalComponent>) { }

    async onGetNotifiedClicked(): Promise<void> {
        this.modalService.open(NotificationModalComponent);
    }
}
