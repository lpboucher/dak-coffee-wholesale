import { FilterComponent } from "@shared/components/filter/filter.component";
import { GridListComponent } from "@shared/components/grid-list/grid-list.component";
import { WalletWidgetComponent } from "@shared/components/wallet-widget/wallet-widget.component";
import { ModalComponent } from "@shared/components/modal/modal.component";
import { CartWidgetComponent } from "@shared/components/cart-widget/cart-widget.component";
import { ToggleWidgetComponent } from "@shared/components/toggle-widget/toggle-widget.component";

import { SnipcartAddDirective } from "@shared/directives/snipcart-add.directive";

import { ClampPipe } from "@shared/pipes/clamp.pipe";
import { FilterPipe } from "@shared/pipes/filter.pipe";

export const componentDeclarations: any[] = [
    FilterComponent,
    GridListComponent,
    ModalComponent,
    WalletWidgetComponent,
    CartWidgetComponent,
    ToggleWidgetComponent,

    SnipcartAddDirective,

    ClampPipe,
    FilterPipe,
];

export const providerDeclarations: any[] = [
];
