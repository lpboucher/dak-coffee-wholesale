import { FilterComponent } from "@shared/components/filter/filter.component";
import { GridListComponent } from "@shared/components/grid-list/grid-list.component";
import { WalletWidgetComponent } from "@shared/components/wallet-widget/wallet-widget.component";

import { ClampPipe } from "@shared/pipes/clamp.pipe";
import { FilterPipe } from "@shared/pipes/filter.pipe";

export const componentDeclarations: any[] = [
    FilterComponent,
    GridListComponent,
    WalletWidgetComponent,

    ClampPipe,
    FilterPipe,
];

export const providerDeclarations: any[] = [
];
