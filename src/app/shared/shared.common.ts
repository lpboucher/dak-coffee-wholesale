import { FilterComponent } from "@shared/components/filter/filter.component";
import { GridListComponent } from "@shared/components/grid-list/grid-list.component";
import { ToggleWidgetComponent } from "@shared/components/toggle-widget/toggle-widget.component";
import { WidgetComponent } from "@shared/components/widget/widget.component";
import {
    ModalBackboneComponent,
    WalletModalComponent,
    SamplesConfirmationModalComponent,
    NotificationModalComponent,
} from "@shared/components/modals"

import { SnipcartAddDirective } from "@shared/directives/snipcart-add.directive";

import { ClampPipe } from "@shared/pipes/clamp.pipe";
import { FilterPipe } from "@shared/pipes/filter.pipe";
import { VolumeDiscountPipe } from "@shared/pipes/volume-discount.pipe";
import { WithLoaderPipe } from "@shared/pipes/loader.pipe";

export const componentDeclarations: any[] = [
    FilterComponent,
    GridListComponent,
    ModalBackboneComponent,
    ToggleWidgetComponent,
    WidgetComponent,
    WalletModalComponent,
    SamplesConfirmationModalComponent,
    NotificationModalComponent,

    SnipcartAddDirective,

    ClampPipe,
    FilterPipe,
    VolumeDiscountPipe,
    WithLoaderPipe
];

export const providerDeclarations: any[] = [
    ClampPipe,
    VolumeDiscountPipe,
];
