import { GridListComponent } from "@shared/components/grid-list/grid-list.component";
import { WalletWidgetComponent } from "@shared/components/wallet-widget/wallet-widget.component";
import { FilterComponent } from "@shared/components/filter/filter.component";
import { FilterPipe } from "@shared/pipes/filter.pipe";

export const componentDeclarations: any[] = [
    GridListComponent,
    WalletWidgetComponent,
    FilterComponent,
    FilterPipe,
];

export const providerDeclarations: any[] = [
];
