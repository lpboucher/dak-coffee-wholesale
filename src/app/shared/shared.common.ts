import { FilterComponent } from "@shared/components/filter/filter.component";
import { GridListComponent } from "@shared/components/grid-list/grid-list.component";
import { ToggleWidgetComponent } from "@shared/components/toggle-widget/toggle-widget.component";
import { WidgetComponent } from "@shared/components/widget/widget.component";
import { BurgerMenuComponent } from "@shared/components/burger-menu/burger-menu.component";
import { NavigationComponent } from "@shared/abstracts/navigation/navigation.component";
import { DropdownComponent } from "@shared/components/dropdown/dropdown.component";
import { QuantityInputComponent } from "@shared/components/quantity-input/quantity-input.component";
import { BaseProductComponent } from "@shared/abstracts/base-product/base-product.component";
import {
    ModalBackboneComponent,
    WalletModalComponent,
    SamplesConfirmationModalComponent,
    NotificationModalComponent,
} from "@shared/components/modals";

import { SnipcartAddDirective } from "@shared/directives/snipcart-add.directive";

import { ClampPipe } from "@shared/pipes/clamp.pipe";
import { FilterPipe } from "@shared/pipes/filter.pipe";
import { VolumeDiscountPipe } from "@shared/pipes/volume-discount.pipe";
import { WithLoaderPipe } from "@shared/pipes/loader.pipe";
import { FormatPricePipe } from "@shared/pipes/format-price.pipe";

export const componentDeclarations: any[] = [
    FilterComponent,
    GridListComponent,
    ModalBackboneComponent,
    ToggleWidgetComponent,
    WidgetComponent,
    WalletModalComponent,
    BurgerMenuComponent,
    DropdownComponent,
    SamplesConfirmationModalComponent,
    NotificationModalComponent,
    NavigationComponent,
    QuantityInputComponent,
    BaseProductComponent,

    SnipcartAddDirective,

    ClampPipe,
    FilterPipe,
    VolumeDiscountPipe,
    WithLoaderPipe,
    FormatPricePipe,
];

export const providerDeclarations: any[] = [
    ClampPipe,
    VolumeDiscountPipe,
];
