import { Component } from "@angular/core";

import { ImageService } from "@core/views/image.service";

@Component({
    selector: "app-request-access-steps",
    templateUrl: "./request-access-steps.component.html",
    styleUrls: ["./request-access-steps.component.scss"]
})
export class RequestAccessStepsComponent {
    get imageUrl(): string {
        return this.imageService.getOtherImageUrl("wholesalepicture_rjd4ej", "Intros");
    }
    constructor(private imageService: ImageService) {}
}
