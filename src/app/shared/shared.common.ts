import { FilterComponent } from "@shared/components/filter/filter.component";
import { GridListComponent } from "@shared/components/grid-list/grid-list.component";
import { ToggleWidgetComponent } from "@shared/components/toggle-widget/toggle-widget.component";
import { WidgetComponent } from "@shared/components/widget/widget.component";
import { BurgerMenuComponent } from "@shared/components/burger-menu/burger-menu.component";
import { NavigationComponent } from "@shared/abstracts/navigation/navigation.component";
import { DropdownComponent } from "@shared/components/dropdown/dropdown.component";
import { QuantityInputComponent } from "@shared/components/quantity-input/quantity-input.component";
import { BaseProductComponent } from "@shared/abstracts/base-product/base-product.component";
import { FlavourIconComponent } from "@shared/components/flavour-icon/flavour-icon.component";
import {
    ModalBackboneComponent,
    WalletModalComponent,
    SamplesConfirmationModalComponent,
    NotificationModalComponent,
    VolumeSelectionModalComponent,
} from "@shared/components/modals";

import { SnipcartAddDirective } from "@shared/directives/snipcart-add.directive";
import { BindQueryParamsDirective } from "@shared/directives/bind-query-params.directive";

import { AdjustedProductPricePipe } from "@shared/pipes/adjusted-product-price.pipe";
import { CartModifierPipe } from "@shared/pipes/cart-modifier.pipe";
import { ClampPipe } from "@shared/pipes/clamp.pipe";
import { FilterPipe } from "@shared/pipes/filter.pipe";
import { FormatPricePipe } from "@shared/pipes/format-price.pipe";
import { VolumeDiscountPipe } from "@shared/pipes/volume-discount.pipe";
import { WeightPipe } from "@shared/pipes/weight.pipe";
import { ProductsToFiltersPipe } from "@shared/pipes/products-to-filters.pipe";
import { WithLoaderPipe } from "@shared/pipes/loader.pipe";

import { FLAVOUR_MAP } from "@utils/constants/flavours";

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
    VolumeSelectionModalComponent,
    NavigationComponent,
    QuantityInputComponent,
    BaseProductComponent,
    FlavourIconComponent,

    SnipcartAddDirective,
    BindQueryParamsDirective,

    AdjustedProductPricePipe,
    ClampPipe,
    FilterPipe,
    VolumeDiscountPipe,
    WithLoaderPipe,
    FormatPricePipe,
    WeightPipe,
    ProductsToFiltersPipe,
    CartModifierPipe,
];

export const providerDeclarations: any[] = [
    AdjustedProductPricePipe,
    ClampPipe,
    VolumeDiscountPipe,
    CartModifierPipe,
    WeightPipe,
   ProductsToFiltersPipe,
    {
        provide: "flavours",
        useValue: FLAVOUR_MAP,
    },
];
