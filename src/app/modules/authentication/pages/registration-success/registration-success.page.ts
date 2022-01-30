import { Component } from "@angular/core";

import { ImageService } from "@core/views/image.service";

@Component({
    selector: "app-registration-success",
    templateUrl: "./registration-success.page.html",
    styleUrls: ["./registration-success.page.scss"]
})
export class RegistrationSuccessPage {
    get imageUrl(): string {
        return this.imageService.getOtherImageUrl("bagwebsite_eteg6f", "Intros");
    }
    constructor(private imageService: ImageService) {}
}
