import { FilterComponent } from "@shared/components/filter/filter.component";
import { GridListComponent } from "@shared/components/grid-list/grid-list.component";
import { ToggleWidgetComponent } from "@shared/components/toggle-widget/toggle-widget.component";
import { WidgetComponent } from "@shared/components/widget/widget.component";
import { ModalBackboneComponent, WalletModalComponent, SamplesConfirmationModalComponent } from "@shared/components/modals"

import { SnipcartAddDirective } from "@shared/directives/snipcart-add.directive";

import { ClampPipe } from "@shared/pipes/clamp.pipe";
import { FilterPipe } from "@shared/pipes/filter.pipe";
import { VolumeDiscountPipe } from "@shared/pipes/volume-discount.pipe";

export const componentDeclarations: any[] = [
    FilterComponent,
    GridListComponent,
    ModalBackboneComponent,
    ToggleWidgetComponent,
    WidgetComponent,
    WalletModalComponent,
    SamplesConfirmationModalComponent,

    SnipcartAddDirective,

    ClampPipe,
    FilterPipe,
    VolumeDiscountPipe,
];

export const providerDeclarations: any[] = [
    ClampPipe,
    VolumeDiscountPipe,
];
