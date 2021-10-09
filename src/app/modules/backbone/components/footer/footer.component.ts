import { Component } from "@angular/core";

import { chunks } from "@utils/helper";
import { FOOTER_NAVIGATION, FooterNavigationItemType } from "@utils/constants/navigation";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
    readonly numberOfColumns: number = 3;
    footerColumns: FooterNavigationItemType[][] = chunks(FOOTER_NAVIGATION, this.numberOfColumns);
}
