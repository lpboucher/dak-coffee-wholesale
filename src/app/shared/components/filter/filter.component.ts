import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "@shared/models/classes/product.class";
import { Coffee } from "@shared/models/classes/coffee.class";

@Component({
    selector: "app-filter",
    templateUrl: "./filter.component.html",
    styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
    @Input() tempProducts: Product[] = [];
    private filter: Map<string, Map<string, boolean>> = new Map();
    private openKey?: string = undefined;

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void {
        const coffees: Coffee[] = this.tempProducts.filter(p => p.productType == "coffee").map(p => p as Coffee);

        const origins = Array.from(new Set(coffees.map(c => c.origin))) as string[];
        const processes = Array.from(new Set(coffees.map(c => c.process))) as string[];
        const varieties = Array.from(new Set(coffees.map(c => c.varietal))) as string[];

        const originsSet = new Map(origins.map(o => [o, false]));
        const processesSet = new Map(processes.map(p => [p, false]));
        const varietiesSet = new Map(varieties.map(v => [v, false]));

        this.filter.set("Origins", originsSet);
        this.filter.set("Processes", processesSet);
        this.filter.set("Varieties", varietiesSet);

        console.log(this.filter);
    }

    toggleOpenKey(key: string): void {
        if (this.isOpenKey(key)) {
            this.openKey = undefined;
        } else {
            this.openKey = key;
        }
    }

    isOpenKey(key: string): boolean {
        return this.openKey == key;
    }

    removeKeyFromFilter(key: string) {
        const f = ((map: Map<string, boolean>) => {
            for (let [subkey, _] of map) {
                map.set(subkey, false);
            }

            this.filter.set(key, map);
        });

        this.changeFilter(key, f);
    }

    toggleOptionInFilter(key: string, value: string): void {
        const f = ((map: Map<string, boolean>) => {
            if (map.has(value)) {
                map.set(value, !map.get(value));
                this.filter.set(key, map);
            }
        });

        this.changeFilter(key, f);
    }

    private changeFilter(key: string, f: (map: Map<string, boolean>) => void): void {
        let values = this.filter.get(key);
        if (values == undefined) {
            return;
        }

        f(values);

        this.updateQueryParams();
    }

    updateQueryParams(): void {
        let activeFilters: { [key: string]: string[] } = {};

        for (let [key, value] of this.filter) {
            const active = Array.from(value.entries())
                .filter(([_, active]) => active)
                .map(([name, _]) => name);

            if (active.length > 0) {
                activeFilters[key] = active;
            }
        }

        this.router.navigate([], { queryParams: activeFilters });
    }

    availableFilterKeys(): string[] {
        return Array.from(this.filter.keys());
    }

    availableFilterKeyValues(key: string): string[] {
        let values = this.filter.get(key);
        if (values == undefined) {
            return [];
        }

        return Array.from(values).map(([name, _]) => name);
    }
}
