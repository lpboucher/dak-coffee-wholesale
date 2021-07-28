import { Component, Input } from "@angular/core";

@Component({
    selector: "app-flavour-icon",
    templateUrl: "./flavour-icon.component.html",
    styleUrls: ["./flavour-icon.component.scss"]
})
export class FlavourIconComponent {
    @Input() flavour: string = "";

    get svgSource(): string {
        return `assets/svgs/flavour-icons/${ this.filename }.svg`;
    }

    private get filename(): string {
        return this.flavour
            .toLowerCase()
            .replace(" ", "-");
    }
}
