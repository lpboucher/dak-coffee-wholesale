import { Component, Input } from "@angular/core";
import { ImageService } from "@core/views/image.service";
import { ModalService } from "@core/views/modal.service";

import { NotificationModalComponent } from "@shared/components/modals";

import { Product } from "@shared/models/classes/product.class";
import { Coffee } from "@shared/models/classes/coffee.class";
import { CommunicationApiService } from "@app/core/communication/communication.service";

@Component({
    selector: "app-featured-product-card",
    templateUrl: "./featured-product-card.component.html",
    styleUrls: ["./featured-product-card.component.scss"]
})
export class FeaturedProductCardComponent {
    readonly limitedNumberOfFlavors: number = 3;
    @Input() product!: Product;

    get imageUrl(): string {
        if (this.product.images.thumb == null) { return ""; }
        return this.imageService.getProductThumbUrl(this.product.images.thumb);
    }

    get flavours(): string[] {
        return this.product.productType === "coffee"
            ? (this.product as Coffee).tastingNotes.slice(0, this.limitedNumberOfFlavors) ?? []
            : [];
    }

    constructor(
        private imageService: ImageService,
        private modalService: ModalService<NotificationModalComponent>,
        private notificationService: CommunicationApiService,
    ) { }

    async onGetNotifiedClicked(name: string): Promise<void> {
        this.notificationService.setProductNameForNotification(name);
        this.modalService.open(NotificationModalComponent);
    }
}
