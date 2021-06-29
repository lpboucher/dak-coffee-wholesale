import { ChangeDetectorRef, Component } from "@angular/core";

import { AuthService } from "@core/authentication/authentication.service";
import { PricingTierService } from "@core/pricing/pricing-tier.service";

import { SidebarComponent } from "@modules/backbone/components/sidebar/sidebar.component";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent extends SidebarComponent {
    showSidebar = false;
    onBurgerMenuClick: () => void = () => { this.showSidebar = true; }

    constructor(
        authService: AuthService,
        pricingTierService: PricingTierService,
        changeDetectorRef: ChangeDetectorRef,
    ) {
        super(authService, pricingTierService, changeDetectorRef);
    }

    onClickedOffSidebar(): void {
        this.showSidebar = false;
    }
}
