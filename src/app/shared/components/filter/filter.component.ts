import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { FilterType } from "@shared/models/types/filter-type.type";


@Component({
    selector: "app-filter",
    templateUrl: "./filter.component.html",
    styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
    @Input() filterOptions: FilterType = {};
    private activeFilter: FilterType = {};
    private openKey?: string = undefined;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.setupInitialFilter();
    }

    private setupInitialFilter(): void {
        const queryParams = this.activatedRoute.snapshot.queryParams;

        for (const key of Object.keys(queryParams)) {
            let currentOptions = queryParams[key];

            if (!Array.isArray(currentOptions)) {
                currentOptions = [currentOptions];
            }

            this.activeFilter[key] = currentOptions;
        }
    }

    toggleOpenMenu(key: string): void {
        if (this.isOpenMenu(key)) {
            this.openKey = undefined;
        } else {
            this.openKey = key;
        }
    }

    isOpenMenu(key: string): boolean {
        return this.openKey == key;
    }

    removeKeyFromFilter(key: string) {
        delete this.activeFilter[key];
        this.updateQueryParams();
    }

    toggleOptionInFilter(key: string, value: string): void {
        if (this.activeFilter[key] == undefined || !this.activeFilter[key].includes(value)) {
            this.addOptionToFilter(key, value);
        } else {
            this.removeOptionFromFilter(key, value);
        }
    }

    addOptionToFilter(key: string, value: string): void {
        if (this.activeFilter[key] == undefined) {
            this.activeFilter[key] = [];
        }

        this.activeFilter[key].push(value);
        this.updateQueryParams();
    }

    removeOptionFromFilter(key: string, value: string): void {
        this.activeFilter[key] = this.activeFilter[key].filter(f => f != value);

        if (this.activeFilter[key].length == 0) {
            delete this.activeFilter[key];
        }

        this.updateQueryParams();
    }

    updateQueryParams(): void {
        this.router.navigate([], { queryParams: this.activeFilter });
    }

    availableFilterKeys(): string[] {
        return Object.keys(this.filterOptions);
    }

    availableFilterOptions(key: string): string[] {
        return this.filterOptions[key];
    }
}
