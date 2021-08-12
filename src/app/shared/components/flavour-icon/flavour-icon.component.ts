import { Component, Inject, Input } from "@angular/core";

import { FlavourMap } from "@shared/models/types/flavour.type";
import { sentenceToKebab } from "@utils/helper";

@Component({
    selector: "app-flavour-icon",
    templateUrl: "./flavour-icon.component.html",
    styleUrls: ["./flavour-icon.component.scss"]
})
export class FlavourIconComponent {
    @Input() flavour: string = "";

    get flavourFilePath(): string {
        return this.flavours[sentenceToKebab(this.flavour)] || "";
    }

    constructor(@Inject("flavours") private flavours: FlavourMap) {}
}
